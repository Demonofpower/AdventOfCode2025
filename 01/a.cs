using System;
using System.IO;

var start = 50;
var secret = 0;

var lines = File.ReadAllLines("input.txt");

foreach (var line in lines)
{
    var coefficient = line[0] == 'R' ? 1 : -1;
    var value = int.Parse(line.Substring(1));

    start += coefficient * value;

    start = start % 100;

    if(start == 0) secret++;
}

Console.WriteLine(secret);