using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceApp
{
    class Shopppingcart
    {
        private Product[] cartItems = new Product[30];
        private int cartCount = 0;

        public void AddProduct(Product product, int quantity)
        {
            if (product.Quantity < quantity)
            {
                Console.WriteLine("Sorry not enough stocks available");
                return;
            }

            int index = -1;
            for (int i = 0; i < cartCount; i++)
            {
                if (cartItems[i].ID == product.ID)
                {
                    index = i;
                    break;
                }
            }

            if (index != -1)
            {
                cartItems[index].Quantity += quantity;
            }
            else
            {
                cartItems[cartCount] = new Product(product.ID, product.Name, product.Price, quantity);
                cartCount++;
            }

            product.Quantity -= quantity;
            Console.WriteLine($"{quantity} {product.Name} added to cart");

        }

        public void RemoveProduct(int ProductID)
        {
            int index = -1;
            for (int i = 0; i < cartCount; i++)
            {
                if (cartItems[i].ID == ProductID)
                {
                    index = i;
                    break;
                }
            }

            if (index != -1)
            {
                Console.WriteLine("The product is not found!");
                return;
            }

            Console.WriteLine($"{cartItems[index].Name} removed from the cart");

            for (int i = index; i < cartCount - 1; i++)
            {
                cartItems[i] = cartItems[i + 1];
            }
            cartCount--;

        }

        public void DisCart()
        {
            if (cartCount == 0)
            {
                Console.WriteLine("Your cart is Empty");
                return;
            }

            double total = 0;

            Console.WriteLine("Items in your cart: ");
            for (int i = 0; i < cartCount; i++)
            {
                double subtotal = cartItems[i].Price * cartItems[i].Quantity;
                total += subtotal;
                Console.WriteLine($"ID: {cartItems[i].ID} | Name: {cartItems[i].Name} | Quantity: {cartItems[i].Quantity} | Subtotal: ${subtotal}");
            }
            Console.WriteLine($"Total: ${total}");
        }

        public double CalTotal()
        {
            double total = 0;
            for (int i = 0; i < cartCount; i++)
            {
                total += cartItems[i].Price * cartItems[i].Quantity;
            }
            return total;
        }

        public void CheckOut()
        {
            if (cartCount == 0)
            {
                Console.WriteLine("Your cart is empty, Please add items before checking out.");
                return;
            }

            double total = CalTotal();
            Console.WriteLine($"Your total amount: ₹{total}");
            Console.WriteLine("Thank you for shopping !!");

            cartCount = 0;
        }

    }
}

