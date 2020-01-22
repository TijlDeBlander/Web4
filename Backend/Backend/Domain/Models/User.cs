using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Domain.Models
{
    public class User
    {
        [BsonId] [BsonRepresentation(BsonType.ObjectId)]
        public string Id; 
        
        public string Email;

        public string Password;

        public DateTime BirthDate;


        public User()
        {
        }
    }
}