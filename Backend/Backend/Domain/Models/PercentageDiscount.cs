using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Domain.Models
{
    [BsonDiscriminator("PercentageDiscount")]
    public class PercentageDiscount : IDiscount
    {
        public string Id { get; set; }
        public double Amount { get; set; }
        public string Reason { get; set; }
        
        public double CalculateNewPrice(double oldPrice)
        {
            return (Amount / 100) * oldPrice;
        }
    }
}