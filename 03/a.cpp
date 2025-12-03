#include <fstream>
#include <iostream>
#include <string>

int main()
{
    long result = 0;

    std::ifstream file("input.txt");

    std::string line;
    while (std::getline(file, line))
    {
        int biggest = 0;
        int biggestIndex = 0;

        int second_biggest = 0;

        for (size_t i = 0; i < line.size() - 1; ++i)
        {
            int current = line[i] - '0';

            if (current > biggest)
            {
                biggest = current;
                biggestIndex = i;
            }
        }

        for (size_t i = biggestIndex + 1; i < line.size(); i++)
        {
            int current = line[i] - '0';

            if (current > second_biggest)
            {
                second_biggest = current;
            }
        }

        result += biggest * 10 + second_biggest;
    }

    std::cout << result << std::endl;
}