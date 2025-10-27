// See https://aka.ms/new-console-template for more information

using System;



class Program
{
    static void Main(string[] args)
    {
        List<int> nums = new List<int> { 1, 4, 53, 32, 57, 98, 86,55};

        List<int> even_nums = nums.Where(n => n % 2 == 0).ToList();

        Console.WriteLine("Even numbers in the list: ");
        even_nums.ForEach(n => Console.WriteLine(n));

    }
  


}
