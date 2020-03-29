using System.Collections.Generic;
using Backend.Domain.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("customer/")]
    public class CustomerController: ControllerBase
    {
        private UserService _us;

        public CustomerController(UserService us)
        {
            _us = us;
        }

        [HttpGet]
        [Route("GetAll")]
        public List<User> GetAll()
        {
            return _us.GetCustomers();
        }

        [HttpDelete]
        [Route("{id}")]
        public User Deleteuser(string id)
        {
            return _us.DeleteUser(id);
        }
    }
}