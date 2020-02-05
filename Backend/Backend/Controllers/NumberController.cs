using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("Number")]
    public class NumberController: ControllerBase
    {

        [HttpGet]
        public int kaka()
        {
            return 1;
        }
    }
}