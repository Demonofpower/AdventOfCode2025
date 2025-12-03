#include <fstream>
#include <iostream>
#include <string>

int main()
{
    long long result = 0;

    std::ifstream file("input.txt");

    std::string line;
    while (std::getline(file, line))
    {
        int max_values[12] = {0};

        int curr_index = -1;

        for (size_t i = 0; i < 12; i++)
        {
            for (size_t j = curr_index + 1; j <= line.size() - 12 + i; j++)
            {
                int current = line[j] - '0';

                if (current > max_values[i])
                {
                    max_values[i] = current;
                    curr_index = j;
                }
            }
        }

        long multiplier = 100000000000L;
        for (size_t i = 0; i < 12; i++)
        {
            result += max_values[i] * multiplier;
            multiplier /= 10;
        }
    }

    std::cout << result << std::endl;
}