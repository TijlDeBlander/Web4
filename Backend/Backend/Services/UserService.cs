using System;
using System.Collections;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Backend.Data;
using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Backend.Domain.Requests;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;

namespace Backend.Services
{
    public class UserService
    {
        private IMongoCollection<User> _users;
        private string _key;

        public UserService(IDatabaseSettings settings, IAppSettings appSettings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);
            _key = appSettings.key;
        }


        public User AddUser(RegisterRequest request)
        {
            User user = new User(request);
            _users.InsertOne(user);
            return user;
        }

        public bool EmailAlreadyUsed(string email)
        {
            return _users.Find(u => u.Email.Equals(email) ).Any();
        }

        public bool AuthorizeUser(LoginRequest login)
        {
            User user = _users.Find(u => u.Email.Equals(login.Email)).First();
            
            byte[] password = System.Text.Encoding.ASCII.GetBytes(login.Password);
            password = new System.Security.Cryptography.SHA256Managed().ComputeHash(password);
            return StructuralComparisons.StructuralEqualityComparer.Equals(password, user.Password);
            
        }

        public string GetToken(string email)
        {
            User user = _users.Find(u => u.Email.Equals(email)).First();
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = System.Text.Encoding.ASCII.GetBytes(_key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var ret = tokenHandler.WriteToken(token);
            return ret;
        }
    }
    
    
}