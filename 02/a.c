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
    
                if (len % 2 != 0) continue;
                
                int mid = len / 2;
        
                char left[16], right[16];
                strncpy(left, str, mid);
                left[mid] = '\0';
                strcpy(right, str + mid);
        
                long long left_num = atoll(left);
                long long right_num = atoll(right);
        
                if(left_num == right_num) total_count+=i;
            }
            
            token = strtok(NULL, ",");
        }
    }

    fclose(file);

    printf("%lld\n", total_count);

    return 0;
}