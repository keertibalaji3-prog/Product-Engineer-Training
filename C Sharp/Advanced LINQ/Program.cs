// See https://aka.ms/new-console-template for more information

using System;

class Product
{
    public string name { get; set; }
    public string category { get; set; }

    public int price { get; set; }
}

class Program
{
    static void Main()
    {
        List<Product> products = new List<Product>
        {
            new Product { name = "Mobile", category = "e-gadgets", price = 20000},
            new Product { name = "Smart Watch", category = "e-gadgets", price = 3000},
            new Product { name = "Notebook", category = "stationary", price = 30},
            new Product { name = "Pencils", category = "stationary", price = 10},
            new Product { name = "Shirt", category = "clothes", price = 600},
            new Product { name = "T-shirt", category = "clothes", price = 230},
            new Product { name = "Hoodies", category = "clothes", price = 350}

        };

        var grpByCat = from pro in products
                       group pro by pro.category into gro
                       orderby gro.Count() descending
                       select new { category = gro.Key, Count = gro.Count() };

        Console.WriteLine("Product's count by category");
        foreach (var items in grpByCat)
        {
            Console.WriteLine($"{items.category} : {items.Count} products");
        }
    }
}
