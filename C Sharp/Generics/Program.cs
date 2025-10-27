// See https://aka.ms/new-console-template for more information

using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;

public class Stack<T>
{
    private List<T> elements = new List<T>();

    public void Push(T item)
    {
        elements.Add(item);
    }

    public T Pop()
    {
        if (elements.Count == 0)
        
            Console.WriteLine("The stack is empty!");
        
        T topItem = elements[elements.Count - 1];
        elements.RemoveAt(elements.Count - 1);
        return topItem;
        
    }

     public T Peek() {
        if (elements.Count == 0)
            Console.WriteLine("The stack is empty!");

        
        return elements[elements.Count - 1];

        }
    

     public void Display()
    {
        Console.WriteLine("The Stack:");
        for (int i = elements.Count - 1; i >= 0; i--)
        {
            Console.WriteLine(elements[i]);
        }
    }

    public bool IsEmpty()
    {
        return elements.Count == 0;
    }

}

class Program
{
    static void Main()
    {
        Console.WriteLine("!!! Stack with int !!!");
        Stack<int> integerStack = new Stack<int>();
        integerStack.Push(100);
        integerStack.Push(200);
        integerStack.Push(300);
        integerStack.Display();

        Console.WriteLine($"\nThe top item is: {integerStack.Peek()}");
        Console.WriteLine($"\nPopped item: {integerStack.Pop()}");
        integerStack.Display();

        Console.WriteLine("\n!!! Stack with String !!!");
        Stack<string> stringStack = new Stack<string>();
        stringStack.Push("Keerti");
        stringStack.Push("Balaji");
        stringStack.Push("Rahul");
        stringStack.Display();

        Console.WriteLine($"\nThe top item is: {stringStack.Peek()}");
        Console.WriteLine($"\nPopped item: {stringStack.Pop()}");
        stringStack.Display();



    }
}
