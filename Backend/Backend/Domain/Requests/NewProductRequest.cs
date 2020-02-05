using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.WebUtilities;

namespace Backend.Domain.Requests
{
    public class NewProductRequest
    {
        
        [Required] 
        public string Name { get; set; }

        [Required] 
        public double Price { get; set; }

        public bool DiscountIsAbsolute { get; set; }

        public double DiscountAmount { get; set; }

        public string Reason { get; set; }
        
        public string Id { get; set; }

        public NewProductRequest()
        {
            
        }
    }
}