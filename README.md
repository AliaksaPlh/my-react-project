## Performance Analysis

---

### Before Optimization

| Action                  | Commit Duration (ms) | Render Duration (ms) | InteractionType |
| ----------------------- | -------------------- | -------------------- | --------------- |
| Sorting by name         | 2.6                  | 99                   | onClick         |
| Sorting population asc  | 2.9                  | 109.4                | onClick         |
| Sorting population desc | 2.3                  | 114.9                | onClick         |
| Searching a country     | 1.4                  | 56.2                 | onChange        |
| Selecting a year        | 2.4                  | 97.1                 | onChange        |
| Adding 2 columns        | 3.8                  | 86.3                 | onClick         |
| Removing 2 columns      | 3.2                  | 68.1                 | onClick         |

---

![alt text](image-2.png)
![alt text](image-4.png)
![alt text](image-7.png)
![alt text](image-9.png)
![alt text](image-10.png)
![alt text](image-13.png)
![alt text](image-15.png)

### After Optimization

| Action                  | Commit Duration (ms) | Render Duration (ms) | InteractionType |
| ----------------------- | -------------------- | -------------------- | --------------- |
| Sorting by name         | 2.1                  | 84.3                 | onClick         |
| Sorting population asc  | 1.8                  | 96.3                 | onClick         |
| Sorting population desc | 2.0                  | 96.3                 | onClick         |
| Searching a country     | 1.2                  | 32.4                 | onChange        |
| Selecting a year        | 1.9                  | 81.7                 | onChange        |
| Adding 2 columns        | 3.5                  | 79.7                 | onClick         |
| Removing 2 columns      | 3                    | 51                   | onClick         |

![alt text](image-1.png)
![alt text](image-5.png)
![alt text](image-6.png)
![alt text](image-8.png)
![alt text](image-11.png)
![alt text](image-12.png)
![alt text](image-14.png)

# Optimization techniques applied:

useMemo for context, filtering, searching, sorting
useCallback for event handlers
Suspense for Main component
