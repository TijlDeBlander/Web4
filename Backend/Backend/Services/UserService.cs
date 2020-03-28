using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Backend.Data;
using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Backend.Domain.Requests;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
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
            return _users.Find(u => u.Email.Equals(email)).Any();
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
                    new Claim(ClaimTypes.Name, user.Id),
                    new Claim(ClaimTypes.Role, user.Role), 
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var ret = tokenHandler.WriteToken(token);
            return ret;
        }

        public User GetUser(string id)
        {
            Console.WriteLine(id);
            
            return _users.Find(u =>
                u.Id.Equals(id)
            ).First();
        }

        public void AddToCart(AddToCartRequest req)
        {
            var filter = Builders<User>.Filter.Eq("Id",req.UserId);

            User user = GetUser(req.UserId);
            for (int i = 0; i < req.Amount; i++)
            {
                user.AddToCart(req.ProductId);
            }

            var update = Builders<User>.Update.Set("Cart", user.Cart);
            _users.UpdateOne(filter, update);
        }

        public void RemoveFromCart(string Uid, string Pid)
        {
            User user = GetUser(Uid);
            user.Cart.Remove(Pid);
            var filter = Builders<User>.Filter.Eq("Id",Uid);
            var update = Builders<User>.Update.Set("Cart", user.Cart);
            _users.UpdateOne(filter, update); 
        }

        public List<User> GetCustomers()
        {
            return _users.FindSync(u => u.Role.Equals("Customer")).ToList();
        }
    }
}
    
    
