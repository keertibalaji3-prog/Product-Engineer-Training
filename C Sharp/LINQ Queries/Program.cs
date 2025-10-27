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
            new Product { name = "T-shirt", category = "clothes", price = 230}
        };

        string findCategory = "clothes";
        var findProducts = products.Where(p => p.category == findCategory).ToList();

        double avgPrice = findProducts.Average(a => a.price);

        Console.WriteLine($"Products found in {findCategory} category: ");
        findProducts.ForEach(p => Console.WriteLine($"{p.name} - ${p.price}"));

        Console.WriteLine($"\nAverage Price: ${avgPrice}");
    }
}