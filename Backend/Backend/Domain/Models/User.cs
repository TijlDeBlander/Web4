using System;
using Backend.Domain.Requests;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Domain.Models
{
    public class User
    {
        [BsonId] [BsonRepresentation(BsonType.ObjectId)]
        public string Id; 
        
        public string Email;

        public Byte[] Password;

        public DateTime BirthDate;


        public User()
        {
        }

        public User(RegisterRequest r)
        {
            Email = r.Email;
            BirthDate = r.BirthDate;
            byte[] data = System.Text.Encoding.ASCII.GetBytes(r.Password);
                Password = new System.Security.Cryptography.SHA256Managed().ComputeHash(data);
        }
    }
}