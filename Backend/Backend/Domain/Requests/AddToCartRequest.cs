using Backend.Domain.Models;

namespace Backend.Domain.Requests
{
    public class AddToCartRequest
    {
        public string ProductId{ get; set; }
        public int Amount { get; set; }
        public string UserId { get; set; }

        public AddToCartRequest()
        {
            
        }
        
    }
}