// See https://aka.ms/new-console-template for more information

using System;

class Program
{
    static void Main(string[] args)
    {
        int x, y, result;
        try
        {
            Console.WriteLine("Enter  number1: ");
            x = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter number2: ");
            y = Convert.ToInt32(Console.ReadLine());

            result = x / y;

            Console.WriteLine("Result: " + result);
        }

        catch (DivideByZeroException e)
        {
            Console.WriteLine("You can't Divide by zero");

        }
    }
}





