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
        public AuthenticationController(UserService us)
        {
            _us = us;
        }
        [HttpPost]
        [Route("register")]
        public void Register()
        {
        }

        [HttpGet]
        [Route("login")]
        public void Login()
        {
         _us.TestDatabase();   
        }
    }
}