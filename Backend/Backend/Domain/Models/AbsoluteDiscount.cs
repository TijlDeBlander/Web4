using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Domain.Models
{
    
    [BsonDiscriminator("AbsoluteDiscount")]
    public class AbsoluteDiscount : IDiscount
    {
        public string Id { get; set; }
        public double Amount { get; set; }
        public string Reason { get; set; }
        public double CalculateNewPrice(double oldPrice)
        {
            return oldPrice - Amount;
        }
    }
}