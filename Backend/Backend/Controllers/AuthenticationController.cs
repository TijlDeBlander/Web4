using System;
using System.Net.Http;
using System.Text.Json;
using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Backend.Domain.Requests;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Backend.Controllers
{
    [ApiController]
    [Route("auth/")]
    public class AuthenticationController : ControllerBase
    {
        private UserService _us;
        public AuthenticationController(UserService us )
        {
            _us = us;
        }
        [HttpPost]
        [Route("register")]
        public ActionResult Register( RegisterRequest request)
        {
            if(!EmailValidator.IsValidEmail(request.Email))
                return BadRequest("Email does not exist");
            if (_us.EmailAlreadyUsed(request.Email))
                return BadRequest("Email already registered");
            
            return Ok(_us.AddUser(request));
        }

        
        [HttpPost]
        [Route("login")]
        public ActionResult Login(LoginRequest login)
        {
            
            if (!_us.EmailAlreadyUsed(login.Email))
                return BadRequest("This email is not connected to an account");
            if (_us.AuthorizeUser(login))
            {
                return Ok(JsonSerializer.Serialize(_us.GetToken(login.Email)));
            }
            return BadRequest("Email and password do not match");
        }

        [HttpGet]
        [Route("{id}")]
        public User getUser(string id)
        {
            return _us.GetUser(id);
        }
    }
}