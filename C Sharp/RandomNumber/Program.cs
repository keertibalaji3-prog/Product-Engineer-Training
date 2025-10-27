// See https://aka.ms/new-console-template for more information

using System;

class Program
{
    static void Main(string[] args)
    {
        Random random = new Random();
        int target = random.Next(1, 101);
        int guess = 0; 

        Console.WriteLine("Guess Number\n");
        Console.WriteLine("🧩 Hint: Guess the number between 1 - 100\n");

        while (guess != target)
        {
            Console.Write("Enter your guess number: ");
            string? input = Console.ReadLine();

            if (!int.TryParse(input, out guess))
            {
                Console.WriteLine("Please enter a valid number.\n");
                continue;
            }

            if (guess < 1 || guess > 100)
            {
                Console.WriteLine("Please enter a number between 1 and 100.\n");
                continue;
            }

            if (guess < target)
            {
                Console.WriteLine("Your guess is too low.\n");
            }
            else if (guess > target)
            {
                Console.WriteLine("Your guess is too high.\n");
            }
        }

        Console.WriteLine("Fantastic!! You guessed the correct number!");
    }
}
