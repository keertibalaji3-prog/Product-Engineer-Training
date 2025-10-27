// See https://aka.ms/new-console-template for more information

using System;

class Program
{
    public delegate int Calculate(int x, int y);

    static void Main(string[] args)
    {
        Calculate add = new Calculate(Sum);
        Calculate sub = new Calculate(Sub);
        Calculate mul = new Calculate(Mul);
        Calculate div = new Calculate(Div);


        Console.WriteLine(add(10, 20));
        Console.WriteLine(sub(10, 20));
        Console.WriteLine(mul(5, 3));
        Console.WriteLine(div(10, 2));

        
    }

    public static int Sum(int x, int y)
    {
        return x + y;
    }

    public static int Sub(int x, int y)
    {
        return x - y;
    }

    public static int Mul(int x, int y)
    {
        return x * y;
    }

    public static int Div(int x, int y)
    {
        return x / y;
    }

   
        
}
