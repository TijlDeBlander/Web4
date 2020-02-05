using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Domain.Models
{
    public interface IDiscount
    {
        [BsonId] [BsonRepresentation(BsonType.ObjectId)]
        string Id { get; set; }

        double Amount { get; set; }

        string Reason { get; set; }

        double CalculateNewPrice(double oldPrice);
    }
}