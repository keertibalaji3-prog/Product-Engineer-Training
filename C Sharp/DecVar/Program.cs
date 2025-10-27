// See https://aka.ms/new-console-template for more information 

using DecVar;
using System;

class Program
{
    static void Main(string[] args)
    {
        int age = 17;
        string name = "Keerti Balaji";
        char initial = 'M';
        bool hasJob = true;
        double cgpa = 8.5;

        Console.WriteLine($"Name is: {name} \nInitial is: {initial} \nAge is: {age} \nHas Job ?: {hasJob} \nCGPA is: {cgpa}");

        int a = 10;
        int b = 3;

        Console.WriteLine("\n !! Arithmetic Operations !!\n");
        Console.WriteLine("Addition of a and b is: " + (a + b));
        Console.WriteLine("Subtraction of a and b is: " + (a - b));
        Console.WriteLine("Multiplication of a and b is: " + (a * b));
        Console.WriteLine("Division of a and b is: " + (a / b));
        Console.WriteLine("Modulous of a and b is: " + (a % b));

        Console.WriteLine("\n !! Comparison and Logical Operators !! \n");
        if(age >= 18 && hasJob == true)
        {
            Console.WriteLine("An adult and has a Job");
        }

        else if( age >= 18 && hasJob == false)
        {
            Console.WriteLine("An adult and has no Job");
        }

        else if(age <= 18 || cgpa != 9)
        {
            Console.WriteLine("Not an adult and cgpa less than 9");
        }
        Keerti k = new Keerti();
        k.dis();
    }
}