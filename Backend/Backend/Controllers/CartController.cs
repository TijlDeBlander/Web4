using System.Collections.Generic;
using Backend.Domain.Models;
using Backend.Domain.Requests;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("cart/")]
    public class CartController : ControllerBase
    {

        private UserService _us;
        public CartController(UserService us)
        {
            this._us = us;
        }

        [HttpGetAttribute]
        public ActionResult<Dictionary<string, int>> GetCart(string id)
        {
            return _us.GetUser(id).Cart;
        }

        [HttpPostAttribute]
        public ActionResult<Dictionary<string, int>> AddToCart(AddToCartRequest req)
        {
            _us.AddToCart(req);
            return _us.GetUser(req.UserId).Cart;
        }

        [HttpPost]
        [Route("delete")]
        public void DeleteFromCart(AddToCartRequest req)
        {
           _us.RemoveFromCart(req.UserId,req.ProductId); 
        }

    }
}