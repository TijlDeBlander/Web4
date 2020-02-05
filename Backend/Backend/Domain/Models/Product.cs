using Backend.Domain.Requests;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Domain.Models
{
    public class Product
    {
        [BsonId] [BsonRepresentation(BsonType.ObjectId)]
        public string Id; 
        
        public string Name;

        public double Price;

        public double PriceWithDiscount;

        public IDiscount Discount;

        public void calculatePrice()
        {
            PriceWithDiscount = Discount.CalculateNewPrice(Price);
        }

        public Product()
        {
        }

        public Product(NewProductRequest req)
        {
            if(req.Id != null)
                Id = req.Id;
            Name = req.Name;
            Price = req.Price;
            if (!req.DiscountAmount.Equals(0))
            {
                IDiscount disc;
                if(req.DiscountIsAbsolute)
                    disc = new AbsoluteDiscount();
                else
                    disc = new PercentageDiscount();
                disc.Amount = req.DiscountAmount;
                disc.Reason = req.Reason;
                Discount = disc;
                calculatePrice();
            }
        }
    }
}