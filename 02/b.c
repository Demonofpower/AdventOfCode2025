#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    FILE *file = fopen("input.txt", "r");

    long long total_count = 0;

    char buffer[4096];
    
    while (fgets(buffer, sizeof(buffer), file)) {
        buffer[strcspn(buffer, "\n")] = 0;
        
        char *token = strtok(buffer, ",");
        while (token != NULL) {
            long long start;
            long long end;

            sscanf(token, "%lld-%lld", &start, &end);
            
            for (long long i = start; i <= end; i++)
            {
                char str[32];
                sprintf(str, "%lld", i);

                int len = strlen(str);
    
                for (int plen = 1; plen <= len/2; plen++) {
                    if (len % plen != 0) continue;
                    
                    int is_repeating = 1;
                    for (int pos = plen; pos < len; pos += plen) {
                        if (strncmp(str, str + pos, plen) != 0) {
                            is_repeating = 0;
                            break;
                        }
                    }
                    
                    if (is_repeating) {
                        total_count += i;
                        break;
                    }
                }
            }
            
            token = strtok(NULL, ",");
        }
    }

    fclose(file);

    printf("%lld\n", total_count);

    return 0;
}