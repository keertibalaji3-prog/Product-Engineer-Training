// See https://aka.ms/new-console-template for more information

using System;
using ECommerceApp;

class Program
{
    static void Main()
    {
        Product[] products = new Product[5];

        products[0] = new Product(1, "Notebook", 50.00, 3);
        products[1] = new Product(2, "Pen", 30.00, 10);
        products[2] = new Product(3, "Sketch", 35.00, 5);
        products[3] = new Product(4, "A4 Sheet Bundle", 400.00, 6);
        products[4] = new Product(5, "Stapler", 70.00, 15);

        Shopppingcart cart = new Shopppingcart();
        bool running = true;

        while (running)
        {
            Console.WriteLine(" \n !!!!! E-Commerce Console Application !!!!!");
            Console.WriteLine("1. View Available Products");
            Console.WriteLine("2. Add Products to the Cart");
            Console.WriteLine("3. View Cart");
            Console.WriteLine("4. Remove Product from the Cart");
            Console.WriteLine("5. Checkout");
            Console.WriteLine("6. Exit");
            Console.WriteLine("Enter Your Choice: ");

            try
            {
                int choice = int.Parse(Console.ReadLine());

                switch (choice)
                {
                    case 1:
                        Console.WriteLine("Available Products: ");
                        for (int i = 0; i < products.Length; i++)
                        {
                            products[i].disProduct();
                        }
                        break;

                    case 2:
                        Console.WriteLine("Enter Product ID to add: ");
                        int id = int.Parse(Console.ReadLine());

                        Product prodToAdd = null;
                        for (int i = 0; i < products.Length; i++)
                        {
                            if (products[i].ID == id)
                            {
                                prodToAdd = products[i];
                                break;
                            }
                        }

                        if (prodToAdd == null)
                        {
                            Console.WriteLine("Invalid Product ID!");
                            break;
                        }

                        Console.Write("Enter quantity: ");
                        int qty = int.Parse(Console.ReadLine());
                        cart.AddProduct(prodToAdd, qty);
                        break;

                    case 3:
                        cart.DisCart();
                        break;

                    case 4:
                        Console.Write("Enter Product ID to remove: ");
                        int removeId = int.Parse(Console.ReadLine());
                        cart.RemoveProduct(removeId);
                        break;

                    case 5:
                        cart.CheckOut();
                        break;

                    case 6:
                        running = false;
                        Console.WriteLine("Exiting from the Console Application..");
                        break;

                    default:
                        Console.WriteLine("Invalid Choice, Try again please");
                        break;
                }
            }

            catch (FormatException)
            {
                Console.WriteLine("Error: Please enter a valid numeric input");
            }

            catch (Exception ex)
            {
                Console.WriteLine($"Unexpected error: {ex.Message}");
            }
        }
    }
}
