using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Backend.Controllers
{
    [ApiController]
    [Route("auth/")]
    public class AuthenticationController : ControllerBase 
    {
        [HttpPost]
        [Route("register")]
        public void Register()
        {
        }

        [HttpGet]
        [Route("login")]
        public void Login()
        {
            
        }
    }
}