using System;
using Backend.Data;
using Backend.Domain.Models;
using MongoDB.Driver;

namespace Backend.Services
{
    public class UserService
    {
        private IMongoCollection<User> _users;

        public UserService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>(settings.UsersCollectionName);
        }

        public void TestDatabase()
        {
            User u = new User {BirthDate = DateTime.Now, Email = "test", Password = "test"};
            _users.InsertOne(u);
        }
    }
}