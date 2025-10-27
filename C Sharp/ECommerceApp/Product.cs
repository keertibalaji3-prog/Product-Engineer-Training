using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceApp
{
    class Product
    {
        public int ID;
        public string Name;
        public double Price;
        public int Quantity;

        public Product(int id, string name, double price, int quantity)
        {
            this.ID = id;
            this.Name = name;
            this.Price = price;
            this.Quantity = quantity;
        }

        public void disProduct()
        {
            Console.WriteLine($"\n ID: {ID}\n Name: {Name}\n Price: ${Price}\n Quantity Available: {Quantity}");

        }
    }


}

