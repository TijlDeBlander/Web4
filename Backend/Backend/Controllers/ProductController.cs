using System;
using System.Collections.Generic;
using System.Text.Json;
using Backend.Domain.Dto;
using Backend.Domain.Models;
using Backend.Domain.Requests;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("product/")]
    public class ProductController : ControllerBase
    {
        private ProductService _ps;
        public ProductController(ProductService ps)
        {
            _ps = ps;
        }
        
        [HttpPost]
        public ActionResult<Product> CreateProduct(NewProductRequest npr)
        {
            Product product= new Product(npr);
            _ps.AddProduct(product);
            return Ok(JsonSerializer.Serialize(product));
        }

        [HttpGet]
        public IList<Product> GetAllProducts()
        {
            return _ps.GetAll();
        }

        [HttpGet]
        [Route("filter/{ids}")]
        public IList<CartProduct> GetSomeProducts(string ids)
        {
            IList<CartProduct> products = new List<CartProduct>();
                foreach (var s in ids.Split(","))
                {
                    string id = s.Split(";")[0];
                    int amount = Int32.Parse(s.Split(";")[1]);
                    CartProduct cp = new CartProduct(_ps.GetProduct(id));
                    cp.Id = id;
                    cp.Amount = amount;
                    products.Add(cp);
                }

                return products;
        }

        [HttpGet]
        [Route("{id}")]
        public Product GetProduct(String id)
        {
            return _ps.GetProduct(id);
        }
        [HttpGet]
        [Route("some/{ids}")]
        public List<Product> GetSomeProducts(List<string> ids)
        {
            List<Product> l = new List<Product>();
            ids.ForEach(id => l.Add(_ps.GetProduct(id)));
            return l;
        }

        [HttpPut]
        public ActionResult<Product> EditProduct(NewProductRequest p)
        {
            Product prod = new Product(p);
            Console.WriteLine(prod.Id);
            return _ps.UpdateProduct(prod);
        }

    }
}