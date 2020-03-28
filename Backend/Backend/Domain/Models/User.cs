using System;
using System.Collections.Generic;
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

        public Dictionary<string, int> Cart;

        public string Role;
        public User()
        { 
            if(Cart == null)
                Cart = new Dictionary<string, int>();
        }

        public User(RegisterRequest r)
        {
            Cart = new Dictionary<string, int>();
            Email = r.Email;
            BirthDate = r.BirthDate;
            Role = r.Role;
            byte[] data = System.Text.Encoding.ASCII.GetBytes(r.Password);
                Password = new System.Security.Cryptography.SHA256Managed().ComputeHash(data);
        }

        public void AddToCart(string p)
        {
            if (Cart.ContainsKey(p))
            {
                Cart[p] = Cart[p] + 1 ;
            }
            else
            {
                Cart.Add(p,1);
            }

            foreach (var cartValue in Cart.Values)
            {
               Console.WriteLine(cartValue); 
            }
        }
    }
}