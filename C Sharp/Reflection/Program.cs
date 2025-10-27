// See https://aka.ms/new-console-template for more information

using System;
using System.Reflection;

Console.WriteLine("Object Serialization: ");

var person = new Person { name = "Keerti", age = 22 };
var product = new Product { PName = "RC Car", price = 2000000 };

PrintProperties(person);
Console.WriteLine();
PrintProperties(product);

void PrintProperties(object obj)
{
    Type type = obj.GetType();
    Console.WriteLine($"Properties of {type.Name}:");
    foreach (var prop in type.GetProperties())
    {
        var value = prop.GetValue(obj);
        Console.WriteLine($"{prop.Name} = {value}");
    }
}

[Serializable]  
public class Person
{
    public string name { get; set; }
    public int age { get; set; }
}

[Serializable]
public class Product
{
    public string PName { get; set; }
    public int price { get; set; }
}