using System.Runtime.CompilerServices;
using System.Transactions;
using Backend.Domain.Models;

namespace Backend.Domain.Dto
{
    public class CartProduct : Product
    {
        
        public CartProduct(Product p)
        {
            Name = p.Name;
            Discount = p.Discount;
            Price = p.Price;
            PriceWithDiscount = p.PriceWithDiscount;
            Id = p.Id;
        }

        public int Amount;

    }
}