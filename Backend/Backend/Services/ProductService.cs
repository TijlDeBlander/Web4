using System.Collections.Generic;
using Backend.Data;
using Backend.Domain.Helpers;
using Backend.Domain.Models;
using MongoDB.Driver;

namespace Backend.Services
{
    public class ProductService
    {
        private IMongoCollection<Product> _products;

        public ProductService(IDatabaseSettings settings )
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _products = database.GetCollection<Product>(settings.ProductCollectionName);
        }

        public void AddProduct(Product p)
        {
           _products.InsertOne(p); 
        }

        public Product GetProduct(string id)
        {
            return _products.Find(p => p.Id.Equals(id)).First();
        }

        public IList<Product> GetAll()
        {
            return _products.Find(c => true).ToList();
        }

        public Product UpdateProduct(Product product)
        {
            _products.FindOneAndReplace((p => p.Id == product.Id), product);
            return _products.Find(p => p.Id == product.Id).First();
        }
    }
}