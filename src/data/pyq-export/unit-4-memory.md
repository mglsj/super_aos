# Unit 4 Memory

## Memory Management

### PYQ-99
Unit: 4 Memory
Topic: Memory Management
Type: written
Asked in: OSN Quiz 2 2022, A2 (2 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Two versions of a program P, called Ps and Pd, are developed using static and dynamic memory allocation, respectively. When an effort is made to execute Ps, an OS gives the message "Insufficient memory, can not run the program." However, the same OS executes program Pd without any difficulties. Explain why this happens.
Answer: **Ps (static allocation):** the program is compiled with static memory allocation, so the object program contains physical addresses. It can therefore be executed only from one fixed location. If that part of memory is not available, Ps cannot be run from anywhere else, and the OS reports insufficient memory.

**Pd (dynamic allocation):** the compiler generates relocatable code. At execution, the base register is filled with the starting address of whatever memory is available, and the relocatable code is converted to absolute addresses using the contents of the base register. Pd can run wherever sufficient contiguous memory is free, so it executes successfully.

**Core sentence:** Ps is bound to one place in memory; Pd is bound at run time through the base register, so any free region will do.

**Second reading worth one extra line.** In the textbook this question comes from (Dhamdhere), static allocation also means memory for all data is reserved before execution at its maximum size, while dynamic allocation reserves only what is actually needed as the program runs, so Ps demands more memory than Pd. The professor's key uses the relocation argument above; lead with that and add this as a supporting point.
Marking points:
- Ps is bound to one place in memory; Pd is bound at run time through the base register, so any free region will do.
- Ps (static allocation): the program is compiled with static memory allocation, so the object program contains physical addresses.
- Pd (dynamic allocation): the compiler generates relocatable code.
- Second reading worth one extra line: In the textbook this question comes from (Dhamdhere), static allocation also means memory for all data is reserved before execution at its maximum size, while dynamic allocation reserves only what is actually needed as …
Answer source: professor's key
Weak / low priority: no

### PYQ-100
Unit: 4 Memory
Topic: Memory Management
Type: written
Asked in: OSN End-sem 2022, Q13.2 (part of a 5-mark question); AOS End-sem 2025, Q11b (1 part of a 5-mark question)
Times asked: 2
Reworded versions: none
In syllabus: yes
Question: Developments in operating systems have generally occurred in an evolutionary rather than revolutionary fashion. For each of the following transitions, describe the primary motivations of operating systems designers that led them to produce the new type of system from the old. b. Fixed partition multiprogramming systems with absolute translation and loading to fixed partition multiprogramming systems with relocatable translation and loading.
Answer: **Motivation: to make the programmer's job easy.**

With absolute translation and loading, the programmer has to know the starting address of the program while developing it, and the job can run only in the partition it was translated for. If that partition is busy, the job waits even when another partition is free, so memory is wasted.

Relocatable translation relieves the programmer of these execution details. The program can be loaded into different portions of main memory, into whichever partition is free, and it becomes possible to suspend a program and resume it later.
Marking points:
- Motivation: to make the programmer's job easy.
- With absolute translation and loading, the programmer has to know the starting address of the program while developing it, and the job can run only in the partition it was translated for.
- If that partition is busy, the job waits even when another partition is free, so memory is wasted.
- Relocatable translation relieves the programmer of these execution details.
Answer source: professor's key
Weak / low priority: no

### PYQ-101
Unit: 4 Memory
Topic: Memory Management
Type: written
Asked in: OSN Quiz 2 2022, A7 (2 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Explain the difference between dynamic loading and dynamic linking.
Answer: **Dynamic loading:** in static loading the entire program is loaded at once. In dynamic loading a routine is not loaded until it is called. It is used to obtain better memory-space utilization, and all routines are kept on disk in a relocatable load format.

**Dynamic linking:** in static linking, system language libraries are treated like any other object module and the loader combines them into the binary program image. In dynamic linking the linking is postponed until execution time. A small piece of code, the stub, is used to locate the appropriate memory-resident library routine; the stub replaces itself with the address of the routine and executes it.

**Difference:** dynamic loading postpones *loading* a routine and uses no stub; dynamic linking postpones *linking* a library routine and works through a stub. Dynamic loading needs no OS support, dynamic linking does.

**Slip in the key.** The key's last line reads "the notion of stub is not used in dynamic linking". That is a typing slip: the stub is exactly what dynamic linking uses (the same key says so two lines earlier), and it is dynamic *loading* that has no stub. Write it the correct way round.
Marking points:
- Dynamic loading: in static loading the entire program is loaded at once.
- Dynamic linking: in static linking, system language libraries are treated like any other object module and the loader combines them into the binary program image.
- Difference: dynamic loading postpones loading a routine and uses no stub; dynamic linking postpones linking a library routine and works through a stub.
- Slip in the key: The key's last line reads "the notion of stub is not used in dynamic linking".
Answer source: professor's key
Weak / low priority: no

### PYQ-102
Unit: 4 Memory
Topic: Memory Management
Type: written
Asked in: OSN Quiz 6 2020, Q2 (6 marks); OSN Quiz 2 2022, A8 (2 marks)
Times asked: 2
Reworded versions: none
In syllabus: yes
Question: Explain the problems if you swap a process with pending I/Os.
Answer: **Core sentence (key):** if you swap out a process with pending I/O, the I/O is executed asynchronously and overwrites the memory of the other process that was swapped in in place of the old one, which leads to incorrect execution.

**Why it happens.** The I/O request was issued with the address of a buffer inside the process's memory. The device completes the transfer later, on its own schedule, and writes to that physical address. By then the process has been swapped out and another process occupies the same memory, so the new process's code or data is corrupted, and the original process never receives its data.

**For the 6-mark version, add the solutions:**

- **Never swap a process with pending I/O.** Simple, but difficult to guarantee if the process accesses devices asynchronously, and it restricts which process the swapper may choose.
- **Do I/O only into OS buffers.** The device always writes into kernel memory, which is never swapped; the transfer from OS buffer to process memory happens only when the process is swapped back in. The cost is an extra copy of the data.

The same hazard appears in compaction, and has the same two fixes (latch the job in memory during I/O, or do I/O only into OS buffers).
Marking points:
- if you swap out a process with pending I/O, the I/O is executed asynchronously and overwrites the memory of the other process that was swapped in in place of the old one, which leads to incorrect execution.
- Never swap a process with pending I/O.
- Do I/O only into OS buffers.
- Why it happens: The I/O request was issued with the address of a buffer inside the process's memory.
Answer source: professor's key
Weak / low priority: no

### PYQ-103
Unit: 4 Memory
Topic: Memory Management
Type: written
Asked in: OSN End-sem 2022, Q13.3 (part of a 5-mark question); AOS End-sem 2025, Q11c (1 part of a 5-mark question)
Times asked: 2
Reworded versions: none
In syllabus: yes
Question: Developments in operating systems have generally occurred in an evolutionary rather than revolutionary fashion. For each of the following transitions, describe the primary motivations of operating systems designers that led them to produce the new type of system from the old. c. Fixed partition multiprogramming to variable partition multiprogramming.
Answer: **Motivation (key):** with fixed partitions the distribution of memory is not effective and memory is underutilized.

The programmer has to know the size of the partition in order to write the program. Because partition sizes are decided in advance, some programs underutilize their partition, leaving the unused part of it wasted (internal fragmentation), whereas other programs need additional memory that no partition can give them even though memory is free elsewhere.

Variable partitions allocate to each process exactly the amount it needs out of a hole, so partition sizes follow the jobs instead of the jobs following the partitions. One line to finish with: the new scheme removes the waste inside partitions but creates holes between them, which is external fragmentation.
Marking points:
- Motivation (key): with fixed partitions the distribution of memory is not effective and memory is underutilized.
- The programmer has to know the size of the partition in order to write the program.
- Because partition sizes are decided in advance, some programs underutilize their partition, leaving the unused part of it wasted (internal fragmentation), whereas other programs need additional memory that no partition can give them even though memory is free elsewhere.
- Variable partitions allocate to each process exactly the amount it needs out of a hole, so partition sizes follow the jobs instead of the jobs following the partitions.
Answer source: professor's key
Weak / low priority: no

### PYQ-104
Unit: 4 Memory
Topic: Memory Management
Type: numerical
Asked in: OSN Quiz 6 2020, Q3 (6 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Given memory partitions (holes) of 100K, 500K, 200K, 300K and 600 K (in order), how would each of the First-fit, Best-fit, and Worst-fit algorithms place processes of 212K, 417K, 112K and 426K (in order)? Which algorithm makes efficient use of memory?
Answer: Take the processes in arrival order and update the hole list after every placement.

**First-fit** (first hole that is big enough):

| Process | Goes into | Holes afterwards (in order) |
| --- | --- | --- |
| 212K | 500K hole (100K is too small) | 100, **288**, 200, 300, 600 |
| 417K | 600K hole (the first four are too small) | 100, 288, 200, 300, **183** |
| 112K | 288K hole (the remainder of the 500K hole) | 100, **176**, 200, 300, 183 |
| 426K | **none: must wait** | largest hole is 300K |

**Best-fit** (smallest hole that is big enough):

| Process | Goes into | Holes afterwards |
| --- | --- | --- |
| 212K | 300K hole | 100, 500, 200, **88**, 600 |
| 417K | 500K hole | 100, **83**, 200, 88, 600 |
| 112K | 200K hole | 100, 83, **88**, 88, 600 |
| 426K | 600K hole | 100, 83, 88, 88, **174** |

**Worst-fit** (largest hole):

| Process | Goes into | Holes afterwards |
| --- | --- | --- |
| 212K | 600K hole | 100, 500, 200, 300, **388** |
| 417K | 500K hole (now the largest) | 100, **83**, 200, 300, 388 |
| 112K | 388K hole (now the largest) | 100, 83, 200, 300, **276** |
| 426K | **none: must wait** | largest hole is 300K |

**Conclusion:** best-fit makes the most efficient use of memory here; it is the only algorithm that allocates all four processes.

**Traps.** (1) After a placement the leftover part stays in the list at the same position as a smaller hole, and later processes may use it: the 112K process in first-fit goes into the 288K remainder, not into the 200K hole. (2) Worst-fit re-evaluates "largest" every time: after 212K takes the 600K hole, the largest hole is 500K, not 388K.
Marking points:
- Conclusion: best-fit makes the most efficient use of memory here; it is the only algorithm that allocates all four processes.
- Traps: (1) After a placement the leftover part stays in the list at the same position as a smaller hole, and later processes may use it: the 112K process in first-fit goes into the 288K remainder …
- Take the processes in arrival order and update the hole list after every placement.
- First-fit (first hole that is big enough):
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-105
Unit: 4 Memory
Topic: Memory Management
Type: written
Asked in: OSN Quiz 6 2020, Q1 (6 marks); OSN End-sem 2022, Q13.4 (part of a 5-mark question); AOS End-sem 2025, Q11d (1 part of a 5-mark question)
Times asked: 3
Reworded versions: none
In syllabus: yes
Question: Developments in operating systems have generally occurred in an evolutionary rather than revolutionary fashion. For the following transition, describe the primary motivations of operating systems designers that led them to produce the new type of system from the old: Contiguous storage allocation systems to non-contiguous storage allocation systems.
Answer: **Core sentence (key, End 2022):** in contiguous storage allocation systems the allocation scheme is inflexible; what is stored cannot grow.

**Full answer for 6 marks.** In a contiguous system every process must occupy one unbroken block of memory. That single requirement causes four problems:

1. **External fragmentation.** As processes arrive and leave, free memory breaks into scattered holes. A request can fail although the total free memory is enough, because no single hole is large enough (by the 50-percent rule about one-third of memory can become unusable).
2. **Costly repair.** The only cure inside the contiguous scheme is compaction, which copies processes around, is possible only with execution-time relocation, and is complicated by pending I/O.
3. **Inflexibility.** A process cannot grow in place unless the adjacent memory happens to be free; otherwise it must be moved or terminated.
4. **Placement overhead.** The OS must run first-fit, best-fit or worst-fit searches over the hole list for every allocation.

**What non-contiguous allocation changes.** The logical address space of a process is allowed to be non-contiguous, so a process can be given physical memory wherever it is available. With paging, memory is divided into fixed-size frames and any free frame can serve any page, which eliminates external fragmentation, removes the need for compaction, and lets a process grow by taking one more frame. The price is a page table and a translation on every reference.

**About the key's wording.** The End 2022 key's one-line answer speaks of files that cannot grow, which is the same argument applied to disk space. The question says "storage", which in the older terminology covers main memory too, and the 2020 paper asked it in the memory-management quiz. Give the memory argument above and include the "cannot grow" line.
Marking points:
- in contiguous storage allocation systems the allocation scheme is inflexible; what is stored cannot grow.
- External fragmentation.
- Costly repair.
- Inflexibility.
- Placement overhead.
- Full answer for 6 marks: In a contiguous system every process must occupy one unbroken block of memory.
Answer source: professor's key
Weak / low priority: no

### PYQ-106
Unit: 4 Memory
Topic: Memory Management
Type: written
Asked in: OSN Quiz 2 2022, A9 (2 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: What is the purpose of "translation lookaside-buffer"?
Answer: **What it is:** a translation look-aside buffer (TLB) is a memory cache that stores the recent translations of virtual memory to physical memory.

**Purpose (key):** with paging, several main-memory accesses are required to access data, some for the page table and one for the data itself. The TLB is used to reduce these main-memory accesses. Once a pair ⟨page id, frame id⟩ has been retrieved, it is stored in the TLB; if the next access is to the same page, the information in the TLB is used instead of the page table. So the TLB reduces the time taken to access a user memory location.

One line that earns the second mark: it is an associative memory, so all entries are searched in parallel, and with a 98% hit ratio the slowdown from paging falls from 100% to about 22% (122 ns against 100 ns).
Marking points:
- What it is: a translation look-aside buffer (TLB) is a memory cache that stores the recent translations of virtual memory to physical memory.
- Purpose (key): with paging, several main-memory accesses are required to access data, some for the page table and one for the data itself.
- The TLB is used to reduce these main-memory accesses.
Answer source: professor's key
Weak / low priority: no

### PYQ-107
Unit: 4 Memory
Topic: Memory Management
Type: numerical
Asked in: OSN Quiz 6 2020, Q4 (6 marks); OSN Quiz 6 (alt set) 2020, Q3 (not recorded)
Times asked: 2
Reworded versions: none
In syllabus: yes
Question: Assume a page size of 4Kbytes and that a page table entry takes 4 bytes, how many levels of page tables would be required to map a 64-bit address space, if the top level page fits into a single page?
Answer: **Step 1, offset bits.** Page size = 4 KB = 2^12 bytes, so the offset takes 12 bits. Bits left for page numbers = 64 − 12 = **52**.

**Step 2, entries per page of page table.** One page holds 4096 / 4 = 1024 = 2^10 entries, so each level can resolve **10 bits**.

**Step 3, levels.** 52 / 10 = 5.2, so 5 levels cover only 50 bits and a sixth is needed: **6 levels**. The top level uses the remaining 2 bits (4 entries), which certainly fits in a single page.

**Check by coverage:** one level maps 2^10 × 2^12 = 2^22 bytes; each further level multiplies by 2^10: 2^32, 2^42, 2^52, 2^62, 2^72. The fifth level reaches only 2^62 < 2^64; the sixth reaches 2^72 ≥ 2^64.

**Answer: 6 levels.** A memory reference that misses the TLB would then need 6 page-table accesses plus the data access, which is why hierarchical paging is considered inappropriate for 64-bit address spaces, and hashed or inverted page tables are used instead.

**Do not quote "seven".** The slide's "seven levels for the 64-bit UltraSPARC" is for that machine's own page and entry sizes. With the numbers given in this question the answer is 6. Always derive it from the page size and entry size in the question.
Marking points:
- Final answer: Answer: 6 levels: A memory reference that misses the TLB would then need 6 page-table accesses plus the data access, which is why hierarchical paging is considered inappropriate for 64-bit address spaces, and hashed or inverted page tables are used instead.
- A memory reference that misses the TLB would then need 6 page-table accesses plus the data access, which is why hierarchical paging is considered inappropriate for 64-bit address spaces, and hashed or inverted page tables are used instead.
- Step 1, offset bits: Page size = 4 KB = 2^12 bytes, so the offset takes 12 bits.
- Step 2, entries per page of page table.
- Step 3, levels: 52 / 10 = 5.2, so 5 levels cover only 50 bits and a sixth is needed: 6 levels.
- Check by coverage: one level maps 2^10 × 2^12 = 2^22 bytes; each further level multiplies by 2^10: 2^32, 2^42, 2^52, 2^62, 2^72.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-108
Unit: 4 Memory
Topic: Memory Management
Type: numerical
Asked in: AOS End-sem 2025, Q13 (5 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Suppose we have a computer system with a 44-bit virtual address, page size of 64K and 4 bytes per page table entry. (i) How many pages are there in the virtual address space? (ii) Suppose we use two-level paging and arrange for all page tables to fit into a single page frame. How will the bits of the address be divided up? (iii) Suppose we have a 4 GB program such that the entire program and all necessary page tables (using two-level paging) are in memory. How many frames of memory are used by the program, including its page tables? (Note: frame size = page size)
Answer: **(i)** Page size 64 KB = 2^16 bytes, so the offset is 16 bits. Pages = 2^44 / 2^16 = **2^28 = 268,435,456 pages**.

**(ii)** One page frame holds 2^16 / 4 = 2^14 entries, so a page table that fits in one frame resolves 14 bits. The 28-bit page number splits into two 14-bit parts:

| outer page number p1 | inner page number p2 | offset d |
| --- | --- | --- |
| **14 bits** | **14 bits** | **16 bits** |

Check: 14 + 14 + 16 = 44.

**(iii)** Program pages = 4 GB / 64 KB = 2^32 / 2^16 = **65,536 frames**. Each inner page table maps 2^14 pages (1 GB), so the program needs 2^16 / 2^14 = **4 inner tables** (4 frames), plus **1 outer table** (1 frame). Total = 65,536 + 4 + 1 = **65,541 frames**.

State the assumption: the 4 GB is contiguous in the virtual address space and starts on a 1 GB boundary. If it straddles a boundary it needs 5 inner tables, giving 65,542. No official key exists; this is my own solution.
Marking points:
- Final answer: Total = 65,536 + 4 + 1 = 65,541 frames.
- (i) Page size 64 KB = 2^16 bytes, so the offset is 16 bits.
- (ii) One page frame holds 2^16 / 4 = 2^14 entries, so a page table that fits in one frame resolves 14 bits.
- (iii) Program pages = 4 GB / 64 KB = 2^32 / 2^16 = 65,536 frames.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-109
Unit: 4 Memory
Topic: Memory Management
Type: written
Asked in: OSN Quiz 6 (alt set) 2020, Q2 (not recorded); OSN Quiz 2 2022, A6 (2 marks)
Times asked: 2
Reworded versions: "Discuss the positive and negative aspects of the inverted page table approach. (as copied on a student answer sheet)" (OSN Quiz 6 (alt set) 2020)
In syllabus: yes
Question: Explain its positive and negative aspects of inverted page table approach.
Answer: **What it is (key):** one entry is maintained for each real page of memory. The entry consists of the virtual address of the page stored in that real memory location, with information about the process that owns the page. There is only one page table in the system. Each virtual address is a triple ⟨process-id, page number, offset⟩; when a memory reference occurs, ⟨process-id, page number⟩ is presented to the memory subsystem and the inverted page table is searched for a match.

**Positive aspect:** it decreases the amount of memory needed to store page tables, because the table has one entry per frame instead of one table per process.

**Negative aspect:** it increases the time needed to search the table when a page reference occurs. A hash table is used to limit the search to one, or at most a few, page-table entries.

It is used for systems with address spaces greater than 32 bits: the 64-bit UltraSPARC and PowerPC.

A second negative point from the textbook, worth one line: shared memory is hard to implement, because each frame has exactly one ⟨process-id, page number⟩ entry, so one physical page cannot be mapped at two virtual addresses at the same time.
Marking points:
- What it is (key): one entry is maintained for each real page of memory.
- Positive aspect: it decreases the amount of memory needed to store page tables, because the table has one entry per frame instead of one table per process.
- Negative aspect: it increases the time needed to search the table when a page reference occurs.
Answer source: professor's key
Weak / low priority: no

### PRED-66
Unit: 4 Memory
Topic: Memory Management
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-99, PYQ-100
In syllabus: yes
Question: Justify the observation: "Most operating systems delay address binding until execution time, even though it needs extra hardware."
Answer: **Core sentence:** only execution-time binding lets a process be moved while it is running, and almost everything a modern memory manager does depends on moving processes.

With compile-time or load-time binding the logical and physical addresses are the same, so the process is fixed in place once loaded: a swapped-out process must return to exactly the same location, and compaction is impossible. With execution-time binding the logical and physical addresses differ and the MMU maps one to the other on every reference, so the OS can swap a process back into any free region, compact memory, and later page it. The cost is the mapping hardware (a relocation register at minimum), which is cheap compared with the flexibility gained.
Marking points:
- only execution-time binding lets a process be moved while it is running, and almost everything a modern memory manager does depends on moving processes.
- With compile-time or load-time binding the logical and physical addresses are the same, so the process is fixed in place once loaded: a swapped-out process must return to exactly the same location, and compaction is impossible.
- With execution-time binding the logical and physical addresses differ and the MMU maps one to the other on every reference, so the OS can swap a process back into any free region, compact memory, and later page it.
- The cost is the mapping hardware (a relocation register at minimum), which is cheap compared with the flexibility gained.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-67
Unit: 4 Memory
Topic: Memory Management
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025)
In syllabus: yes
Question: A process runs with relocation register = 14000 and limit register = 3000. What happens when it references (a) logical address 346, (b) logical address 3200?
Answer: The logical address is first compared with the limit register, and only then relocated.

(a) 346 < 3000, so it is legal. Physical address = 346 + 14000 = **14346**.

(b) 3200 ≥ 3000, so the hardware **traps to the operating system** with an addressing error. No physical address is formed.

**Core sentence:** the limit register holds a range of *logical* addresses and the relocation register holds the smallest *physical* address, so the check uses the logical value and the addition comes after it.
Marking points:
- Final answer: Physical address = 346 + 14000 = 14346.
- the limit register holds a range of logical addresses and the relocation register holds the smallest physical address, so the check uses the logical value and the addition comes after it.
- The logical address is first compared with the limit register, and only then relocated.
- (a) 346 < 3000, so it is legal.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-68
Unit: 4 Memory
Topic: Memory Management
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025); same section as PYQ-101
In syllabus: yes
Question: A two-pass assembler has pass 1 = 70K, pass 2 = 80K, symbol table = 20K and common routines = 30K. Only 150K of memory is available and there is no hardware support for memory management. Show how the program can still be run, and state two drawbacks of the method.
Answer: Loading everything needs 70 + 80 + 20 + 30 = **200K > 150K**, so the program cannot run as it is. Pass 1 and pass 2 are never needed at the same time, so define two **overlays**:

- Overlay A = symbol table + common routines + pass 1 = 20 + 30 + 70 = **120K**
- Overlay B = symbol table + common routines + pass 2 = 20 + 30 + 80 = **130K**

Both are below 150K (also with a 10K overlay driver: 130K and 140K). Run overlay A; when pass 1 finishes, the overlay driver reads overlay B into memory, overwriting A, and transfers control to pass 2.

**Drawbacks:** (1) special loading and linking algorithms are needed to construct overlays, and writing the overlay driver requires complete knowledge of the program's structure, so the design is complex and is the user's burden; (2) each switch of overlay costs extra disk I/O. For these reasons overlays are limited to microcomputers and embedded systems.
Marking points:
- Final answer: Overlay A = symbol table + common routines + pass 1 = 20 + 30 + 70 = 120K
- Overlay B = symbol table + common routines + pass 2 = 20 + 30 + 80 = 130K
- Overlay B = symbol table + common routines + pass 2 = 20 + 30 + 80 = 130K
- Drawbacks: (1) special loading and linking algorithms are needed to construct overlays, and writing the overlay driver requires complete knowledge of the program's structure, so the design is complex and is the user's burden; (2) each …
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-69
Unit: 4 Memory
Topic: Memory Management
Type: true/false
Based on: imitates the professor's TRUE/FALSE correct-and-justify items (OSN End 2022 Q1, AOS End 2025 Q1); same section as PYQ-102
In syllabus: yes
Question: TRUE or FALSE, correct if false and justify: "A process that has been swapped out can always be swapped back into any free region of memory."
Answer: **FALSE.** Corrected: a swapped-out process can be swapped back into a different region *only if binding is done at execution time*; with binding at assembly or load time it must be swapped back into the same memory space it occupied before.

**Justification:** under compile-time or load-time binding the absolute addresses are already fixed inside the code, so the process is correct only at its original location. Under execution-time binding the code holds logical addresses and the relocation register supplies the base on every reference, so loading the register with a new value is all that is needed to run the process somewhere else.
Marking points:
- States FALSE.
- Corrected: a swapped-out process can be swapped back into a different region only if binding is done at execution time; with binding at assembly or load time it must be swapped back into the same memory space it occupied before.
- under compile-time or load-time binding the absolute addresses are already fixed inside the code, so the process is correct only at its original location.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-70
Unit: 4 Memory
Topic: Memory Management
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-103
In syllabus: yes
Question: A system has 2560K of memory with a 400K resident OS. Under FCFS, P1 (600K), P2 (1000K) and P3 (300K) are loaded. P2 terminates and P4 (700K) is allocated. P5 (500K) now arrives. Can it be loaded? Justify, and give two ways the system could get it running.
Answer: **Memory map at that moment:** OS 0–400K, P1 400–1000K, P4 1000–1700K, hole 1700–2000K (300K), P3 2000–2300K, hole 2300–2560K (260K).

**No, P5 cannot be loaded.** Total free memory is 300K + 260K = 560K, which is more than the 500K requested, but contiguous allocation needs a single hole of at least 500K and the largest hole is 300K. This is **external fragmentation**: enough total memory exists to satisfy the request, but it is not contiguous.

**Two ways forward:**

- **Wait.** When P1 terminates it leaves a 600K hole at 400–1000K; P5 goes into 400–900K and a 100K hole remains. This is what the slide's example does.
- **Compaction.** Move P3 down next to P4 so the two holes merge into one 560K block, then load P5. This is possible only if relocation is dynamic (execution-time binding), and it costs the time to copy 300K.
Marking points:
- Memory map at that moment: OS 0–400K, P1 400–1000K, P4 1000–1700K, hole 1700–2000K (300K), P3 2000–2300K, hole 2300–2560K (260K).
- No, P5 cannot be loaded: Total free memory is 300K + 260K = 560K, which is more than the 500K requested, but contiguous allocation needs a single hole of at least 500K and the largest hole is 300K.
- No, P5 cannot be loaded.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-71
Unit: 4 Memory
Topic: Memory Management
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-105
In syllabus: yes
Question: Distinguish internal fragmentation from external fragmentation. For each of the following, state which kind it suffers from and why: fixed partitions, variable partitions, paging, pure segmentation.
Answer: **External fragmentation:** enough total free memory exists to satisfy a request but it is not contiguous. **Internal fragmentation:** memory allocated to a process is larger than what it requested, and the difference is wasted inside the allocation.

| Scheme | Suffers from | Reason |
| --- | --- | --- |
| Fixed partitions | Internal | A process smaller than its partition wastes the rest of the partition |
| Variable partitions | External | Blocks are cut to size, so the waste appears as scattered holes between blocks |
| Paging | Internal only | Any free frame fits any page, so no hole is ever too small; but the last page of a process is rarely full |
| Pure segmentation | External | Segments vary in length, so allocating them is again the dynamic storage-allocation problem |

**Core sentence:** fixed-size units waste space inside the unit, variable-size units waste space between the units.
Marking points:
- fixed-size units waste space inside the unit, variable-size units waste space between the units.
- External fragmentation: enough total free memory exists to satisfy a request but it is not contiguous.
- Fixed partitions: Internal
- Variable partitions: External
- Paging: Internal only
- Pure segmentation: External
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-72
Unit: 4 Memory
Topic: Memory Management
Type: true/false
Based on: imitates the professor's TRUE/FALSE correct-and-justify items (OSN End 2022 Q1, AOS End 2025 Q1); same section as PYQ-105
In syllabus: yes
Question: TRUE or FALSE, correct if false and justify: "Compaction can be used to remove external fragmentation in a system that binds addresses at load time."
Answer: **FALSE.** Corrected: compaction is possible only if relocation is dynamic and is done at execution time.

**Justification:** compaction moves processes to new physical locations. With load-time binding the absolute addresses were fixed into the code when it was loaded, so a moved process would reference its old locations and fail. With execution-time binding the code holds logical addresses, and moving a process only requires copying it and loading its new base into the relocation register. Even then, a process with pending I/O must be latched in memory or do its I/O through OS buffers.
Marking points:
- States FALSE.
- Corrected: compaction is possible only if relocation is dynamic and is done at execution time.
- compaction moves processes to new physical locations.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-73
Unit: 4 Memory
Topic: Memory Management
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025)
In syllabus: yes
Question: A system uses 1 KB pages. A process has the page table: page 0 → frame 5, page 1 → frame 2, page 2 → frame 7, page 3 → invalid. Translate the logical addresses 1030, 2375 and 3500.
Answer: Page size = 1024 bytes. Page number = address div 1024, offset = address mod 1024, physical = frame × 1024 + offset.

| Logical | Page | Offset | Frame | Physical address |
| --- | --- | --- | --- | --- |
| 1030 | 1 | 1030 − 1024 = 6 | 2 | 2 × 1024 + 6 = **2054** |
| 2375 | 2 | 2375 − 2048 = 327 | 7 | 7 × 1024 + 327 = 7168 + 327 = **7495** |
| 3500 | 3 | 3500 − 3072 = 428 | invalid | **trap to the OS** |

**Core sentence:** the page number selects the entry and the offset is carried over unchanged; an entry marked invalid means the page is not part of the process's logical address space, so the reference traps.
Marking points:
- the page number selects the entry and the offset is carried over unchanged; an entry marked invalid means the page is not part of the process's logical address space, so the reference traps.
- Page size = 1024 bytes.
- Page number = address div 1024, offset = address mod 1024, physical = frame × 1024 + offset.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-74
Unit: 4 Memory
Topic: Memory Management
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025)
In syllabus: yes
Question: The page size is 2,048 bytes. How many frames does a process of 72,766 bytes need, and how much internal fragmentation results? What is the expected internal fragmentation per process in general?
Answer: 72,766 ÷ 2,048 = 35 full pages (35 × 2,048 = 71,680 bytes) with 72,766 − 71,680 = **1,086 bytes** left over.

The leftover needs a page of its own, so the process is allocated **36 frames**. Internal fragmentation = 2,048 − 1,086 = **962 bytes**.

In general a process's last page is on average half full, so the expected internal fragmentation is **half a page per process**. That argues for small pages, while the size of the page table argues for large ones.
Marking points:
- Final answer: Internal fragmentation = 2,048 − 1,086 = 962 bytes.
- 72,766 ÷ 2,048 = 35 full pages (35 × 2,048 = 71,680 bytes) with 72,766 − 71,680 = 1,086 bytes left over.
- The leftover needs a page of its own, so the process is allocated 36 frames.
- In general a process's last page is on average half full, so the expected internal fragmentation is half a page per process.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-75
Unit: 4 Memory
Topic: Memory Management
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025); same section as PYQ-106
In syllabus: yes
Question: A TLB lookup takes 10 ns and a memory access takes 100 ns. (a) Find the effective access time with a 90% hit ratio and the percentage slowdown compared with unpaged memory. (b) What hit ratio is needed to keep the slowdown at or below 15%?
Answer: **Costs.** Hit: 10 + 100 = 110 ns. Miss: 10 + 100 + 100 = 210 ns.

**(a)** EAT = 0.90 × 110 + 0.10 × 210 = 99 + 21 = **120 ns**. Slowdown = (120 − 100) / 100 = **20%**.

**(b)** Let the hit ratio be h. EAT = 110h + 210(1 − h) = 210 − 100h. For a slowdown of at most 15%, EAT ≤ 115 ns:

210 − 100h ≤ 115 ⟹ 100h ≥ 95 ⟹ **h ≥ 0.95**. A hit ratio of at least 95% is needed.

**Convention trap.** Some texts ignore the TLB search time on a miss, or charge it on a hit only. The slide's convention charges the TLB search in both cases (120 and 220 with its numbers). State the two costs explicitly, as above, so the examiner can follow whichever convention you use.
Marking points:
- Final answer: 210 − 100h ≤ 115 ⟹ 100h ≥ 95 ⟹ h ≥ 0.95.
- Costs: Hit: 10 + 100 = 110 ns.
- (a) EAT = 0.90 × 110 + 0.10 × 210 = 99 + 21 = 120 ns.
- (b) Let the hit ratio be h.
- Convention trap: Some texts ignore the TLB search time on a miss, or charge it on a hit only.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-76
Unit: 4 Memory
Topic: Memory Management
Type: true/false
Based on: imitates the professor's TRUE/FALSE correct-and-justify items (OSN End 2022 Q1, AOS End 2025 Q1); same section as PYQ-106
In syllabus: yes
Question: TRUE or FALSE, correct if false and justify: "On every context switch the TLB must be flushed."
Answer: **FALSE.** Corrected: the TLB must be flushed on a context switch only if it does not support address-space identifiers (ASIDs).

**Justification:** a TLB entry maps a page number to a frame number, and the same page number means different frames in different processes. Without ASIDs the entries of the old process would give wrong translations to the new one, so the TLB is erased whenever a new page table is selected. With ASIDs each entry carries the identifier of the process it belongs to; a lookup matches only entries with the running process's ASID, so entries of several processes can coexist and no flush is needed. Avoiding the flush also avoids the burst of TLB misses that follows every switch.
Marking points:
- States FALSE.
- Corrected: the TLB must be flushed on a context switch only if it does not support address-space identifiers (ASIDs).
- a TLB entry maps a page number to a frame number, and the same page number means different frames in different processes.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-77
Unit: 4 Memory
Topic: Memory Management
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to processes and threads; same section as PYQ-106
In syllabus: yes
Question: When the CPU scheduler switches from process A to process B, what must the dispatcher do for memory management under (i) contiguous allocation with relocation and limit registers, and (ii) paging with a TLB that has no ASIDs? Using your answer, justify why switching between two threads of the same process is cheaper than switching between two processes.
Answer: **(i) Contiguous allocation.** The dispatcher loads the relocation register and the limit register with B's values as part of the context switch (these are privileged instructions). If B is not in main memory and there is no free memory, a process is first swapped out and B swapped in. The direct cost is two register loads.

**(ii) Paging, TLB without ASIDs.** The dispatcher changes the PTBR and PTLR to point to B's page table, and the TLB must be flushed so that B does not use A's translations. The register change is cheap; the real cost comes afterwards, because B starts with an empty TLB and every first reference to a page is a TLB miss that costs an extra memory access (more with multi-level tables).

**Threads.** Threads of one process share the same address space: the same code, data and page table. A switch between them changes the CPU registers, program counter and stack pointer only; PTBR and PTLR stay the same and the TLB contents remain valid. So a thread switch has neither the address-space switch nor the TLB refill.

**Core sentence:** the expensive part of a process switch is not saving registers but changing the address space, and threads are cheap because they do not change it.
Marking points:
- the expensive part of a process switch is not saving registers but changing the address space, and threads are cheap because they do not change it.
- (i) Contiguous allocation: The dispatcher loads the relocation register and the limit register with B's values as part of the context switch (these are privileged instructions).
- (ii) Paging, TLB without ASIDs: The dispatcher changes the PTBR and PTLR to point to B's page table, and the TLB must be flushed so that B does not use A's translations.
- Threads: Threads of one process share the same address space: the same code, data and page table.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-78
Unit: 4 Memory
Topic: Memory Management
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to synchronization
In syllabus: yes
Question: A system supports 40 users of a text editor that has 150K of code and 50K of data space per user. (a) How much memory is needed without sharing and with shared pages? (b) What property must the code have? (c) Connecting to the synchronization chapter: why can 40 processes execute the shared code pages concurrently with no locks, while a shared data page would need them?
Answer: **(a)** Without sharing each user needs 150K + 50K = 200K, so 40 × 200K = **8000K**. With sharing there is one copy of the code and 40 copies of the data: 150K + 40 × 50K = 150K + 2000K = **2150K**. Saving = 5850K.

**(b)** The code must be **reentrant**: non-self-modifying code that never changes during execution. It must also appear at the same location in the logical address space of every process that shares it.

**(c)** A race condition needs at least one process to *write* shared data while another reads or writes it; that is what makes a region of code a critical section. Reentrant code pages are read-only, so every process only reads them, and each process's changing state (its data, stack and registers) is private. With no shared variable being modified there is no critical section, and the read-only protection bit in the page table enforces this in hardware. A shared data page is different: two processes could update the same variable, which is exactly the critical-section problem, and it would need mutual exclusion (a semaphore or monitor).

**Core sentence:** sharing without locks is safe exactly when what is shared is never written.
Marking points:
- sharing without locks is safe exactly when what is shared is never written.
- (a) Without sharing each user needs 150K + 50K = 200K, so 40 × 200K = 8000K.
- (b) The code must be reentrant: non-self-modifying code that never changes during execution.
- (c) A race condition needs at least one process to write shared data while another reads or writes it; that is what makes a region of code a critical section.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-79
Unit: 4 Memory
Topic: Memory Management
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025); same section as PYQ-107, PYQ-108, PYQ-109
In syllabus: yes
Question: A system uses two-level paging. A memory access takes 100 ns and a TLB search takes 20 ns. (a) How long does a memory reference take with no TLB? (b) What is the effective access time with a TLB whose hit ratio is 98%? (c) Compare with single-level paging at the same hit ratio and comment.
Answer: **(a)** Without a TLB every reference needs the outer page table, the inner page table and then the data: 3 × 100 = **300 ns**.

**(b)** Hit: 20 + 100 = 120 ns. Miss: 20 + 300 = 320 ns. EAT = 0.98 × 120 + 0.02 × 320 = 117.6 + 6.4 = **124 ns**.

**(c)** Single-level paging gives 0.98 × 120 + 0.02 × 220 = 122 ns. The extra level costs only 2 ns on average, because the TLB makes misses rare. This is why the size-versus-speed trade-off of hierarchical tables is acceptable for 32-bit systems, and why it stops being acceptable when the number of levels grows to six or seven.
Marking points:
- Final answer: (c) Single-level paging gives 0.98 × 120 + 0.02 × 220 = 122 ns.
- (a) Without a TLB every reference needs the outer page table, the inner page table and then the data: 3 × 100 = 300 ns.
- (b) Hit: 20 + 100 = 120 ns.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-80
Unit: 4 Memory
Topic: Memory Management
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Compare paging and segmentation with respect to (a) the programmer's view, (b) address translation, (c) fragmentation and (d) sharing and protection.
Answer:
|  | Paging | Segmentation |
| --- | --- | --- |
| (a) View | Invisible to the programmer; a page is a fixed-size physical slice with no meaning | Supports the user's view: a program is a collection of variable-sized logical segments (main program, stack, symbol table…) |
| (b) Translation | Address split by bits into ⟨p, d⟩; the page table gives a frame number that replaces p; no comparison needed | Address is a two-tuple ⟨s, d⟩; the segment table gives base and limit; d is checked against the limit and added to the base |
| (c) Fragmentation | No external fragmentation; internal fragmentation in the last page (half a page on average) | No internal fragmentation; external fragmentation, because variable-length segments make allocation a dynamic storage-allocation problem |
| (d) Sharing, protection | Per page; possible (shared reentrant pages) but a page can mix code and data | Per segment, which matches logical units: a whole code segment is shared and marked execute-only |

**Core sentence:** paging is good for the system (simple allocation, no external fragmentation) and segmentation is good for the user (meaningful units), which is why real systems combine them.
Marking points:
- paging is good for the system (simple allocation, no external fragmentation) and segmentation is good for the user (meaningful units), which is why real systems combine them.
- (a) View: Invisible to the programmer; a page is a fixed-size physical slice with no meaning
- (b) Translation: Address split by bits into ⟨p, d⟩; the page table gives a frame number that replaces p; no comparison needed
- (c) Fragmentation: No external fragmentation; internal fragmentation in the last page (half a page on average)
- (d) Sharing, protection: Per page; possible (shared reentrant pages) but a page can mix code and data
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-81
Unit: 4 Memory
Topic: Memory Management
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Explain the issues that arise if a system uses pure segmentation, and how MULTICS removed them. What exactly changes in the segment-table entry?
Answer: **Issues with pure segmentation:**

- **External fragmentation.** Segments have different lengths, so memory breaks into holes, and a segment may be unplaceable although enough total memory is free.
- **Lengthy search times.** Each segment needs a hole large enough for all of it, found by a first-fit or best-fit search, possibly after compaction.

**MULTICS fix:** page the segments. Each segment is divided into fixed-size pages, and any free frame can hold any page, so no contiguous hole is ever needed. External fragmentation disappears (only internal fragmentation in the last page of each segment remains) and allocation needs no search.

**What changes:** the segment-table entry no longer holds the base address of the segment; it holds the base address of a *page table for that segment*. The offset within the segment is split into a page number and a page offset.

The cost is an extra table access per reference, which the TLB hides. The benefit is that the user keeps logical segments (for sharing and protection) while the system allocates in uniform frames.
Marking points:
- External fragmentation.
- Lengthy search times.
- MULTICS fix: page the segments.
- What changes: the segment-table entry no longer holds the base address of the segment; it holds the base address of a page table for that segment.
Answer source: written by Claude, no key
Weak / low priority: no

## Virtual Memory

### PYQ-110
Unit: 4 Memory
Topic: Virtual Memory
Type: written
Asked in: OSN End-sem 2022, Q5 (5 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: In addition to hardware support such as page table and secondary memory what kind of software support is needed to implement demand paging? Explain clearly.
Answer: **Core sentence:** the software must be able to restart any instruction after a page fault, restoring the state the instruction had before it began, because a fault can occur at any point during its execution.

**(i) Restart of an instruction after a page fault.** Consider "add the contents of A and B and replace the result in C". It runs as: fetch and decode the instruction; fetch A; fetch B; add A and B; store the sum in C. If the page faults when we try to store in C, we have to restart the instruction.

**(ii) Difficulty when the instruction modifies several locations.** With the IBM 360/370 MVC (move character) instruction, up to 256 bytes can be moved from one location to another, and source and destination may overlap. If the page fault occurs after a partial move, we cannot redo the instruction when the regions overlap. *Solutions:* use microcode to access both ends of both blocks, so that if a page fault is going to occur it occurs before anything is moved; or use temporary registers to hold the values of the overwritten locations, so that on a page fault the old values are written back to memory, restoring the memory state to what it was before the instruction started.

**(iii) Difficulty in machines with special addressing modes** that use a register as a pointer, such as auto-increment (increment after using) and auto-decrement (decrement before using). Consider `MOV (R2)+, -(R3)`: if the page fault occurs while storing through R3, we have to restart the instruction after restoring the values of R2 and R3. *Solution:* use a status register to record the register number and the amount modified, so that the OS can undo the effect of the partially executed instruction that caused the fault.

This is the key's answer, point for point. A good closing line: all of this must be transparent to the user.
Marking points:
- the software must be able to restart any instruction after a page fault, restoring the state the instruction had before it began, because a fault can occur at any point during its execution.
- (i) Restart of an instruction after a page fault.
- (iii) Difficulty in machines with special addressing modes that use a register as a pointer, such as auto-increment (increment after using) and auto-decrement (decrement before using).
Answer source: professor's key
Weak / low priority: no

### PYQ-111
Unit: 4 Memory
Topic: Virtual Memory
Type: numerical
Asked in: OSN End-sem (question list) 2021, Q11 (not given); OSN End-sem 2022, Q6 (5 marks); AOS End-sem 2025, Q9 (5 marks)
Times asked: 3
Reworded versions: none
In syllabus: yes
Question: A computer has a cache, main memory, and a disk used for virtual memory. If a referenced word is in the cache, 20 nsec are required to access it. If it is in main memory but not in the cache, 60 nsec are needed to load it into the cache, and then the reference is started again. If the word is not in main memory, 12 msec are required to fetch the word from the disk, followed by 60 nsec to copy it to the cache, and then the reference is started again. The cache hit ratio is 0.9 and the main memory hit ratio is 0.6. What is the average time, in nanoseconds, required to access a referenced word on this system?
Answer: **Three cases, with the cost of each complete path.** "The reference is started again" means the 20 ns cache access is paid at the end of every path.

| Where the word is | Probability | Total time |
| --- | --- | --- |
| In the cache | 0.9 | 20 ns |
| Not in cache, in main memory | 0.1 × 0.6 = 0.06 | 60 + 20 = 80 ns |
| Not in cache, not in main memory | 0.1 × 0.4 = 0.04 | 12 ms + 60 + 20 = 12,000,080 ns |

**Average access time** = 0.9 × 20 + 0.06 × 80 + 0.04 × 12,000,080

= 18 + 4.8 + 480,003.2 = **480,026 ns** (about 480 microseconds, or 0.48 ms).

**Comment worth a line:** the disk path is taken only 4% of the time but accounts for 480,003 of the 480,026 ns, so the page-fault rate dominates performance.

**About the numbers.** The scan of the 2022 key cuts this question off after "If a referenced word…", and the 2021 list gives only its first line. The wording matches the standard textbook problem, so I have used that problem's figures (20 ns, 60 ns, 12 ms, 0.9, 0.6). If the paper gives different figures, the method is identical: 12 ms = 12,000,000 ns, the main-memory hit ratio applies only to cache misses, and the restarted reference adds the cache time to both miss paths.
Marking points:
- Final answer: = 18 + 4.8 + 480,003.2 = 480,026 ns (about 480 microseconds, or 0.48 ms).
- Three cases, with the cost of each complete path.
- Average access time = 0.9 × 20 + 0.06 × 80 + 0.04 × 12,000,080
- Comment worth a line: the disk path is taken only 4% of the time but accounts for 480,003 of the 480,026 ns, so the page-fault rate dominates performance.
- About the numbers: The scan of the 2022 key cuts this question off after "If a referenced word…", and the 2021 list gives only its first line.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-112
Unit: 4 Memory
Topic: Virtual Memory
Type: written
Asked in: OSN Quiz 2 2022, A10 (2 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: What is the purpose of dirty bit entry in the page table?
Answer: **What it is (key):** a dirty bit, or modified bit, is a bit associated with a block of memory that indicates whether the block has been modified. It is set when the processor writes to that memory, and it then shows that the block has been modified and has not yet been saved to storage. When a block is to be replaced, its dirty bit is checked to see whether the block needs to be written back to secondary memory first, or can simply be removed.

**Purpose (key):** the dirty bit reduces the write requirement in case of a page fault. When a victim page is selected for replacement, normally we have to write the victim page back to disk and then bring in the requested page. If the dirty bit is not set, we need not write the victim's data.

One line more: this halves the I/O of a replacement for clean pages, since read-only pages such as program code are never dirty.
Marking points:
- What it is (key): a dirty bit, or modified bit, is a bit associated with a block of memory that indicates whether the block has been modified.
- Purpose (key): the dirty bit reduces the write requirement in case of a page fault.
- It is set when the processor writes to that memory, and it then shows that the block has been modified and has not yet been saved to storage.
- When a block is to be replaced, its dirty bit is checked to see whether the block needs to be written back to secondary memory first, or can simply be removed.
Answer source: professor's key
Weak / low priority: no

### PYQ-113
Unit: 4 Memory
Topic: Virtual Memory
Type: numerical
Asked in: AOS End-sem 2025, Q7 (5 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: A small computer has 8 page frames, each containing a page. The page frames contain virtual pages A, C, G, H, B, L, N and F in that order. Their respective load times were 18, 23, 5, 7, 32, 19, 3 and 8. Their reference bits are 1, 0, 1, 1, 0, 1, 1 and 0 and their modified bits are 1, 1, 1, 0, 0, 0, 1 and 1, respectively. What is the order that Enhanced Second Chance considers pages and which one is selected?
Answer: **Step 1, the order considered.** Second-chance algorithms keep pages in a circular FIFO queue and start at the oldest page, so sort by load time:

| Order | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Page | N | G | H | F | A | L | C | B |
| Load time | 3 | 5 | 7 | 8 | 18 | 19 | 23 | 32 |
| (ref, mod) | (1, 1) | (1, 1) | (1, 0) | (0, 1) | (1, 1) | (1, 0) | (0, 1) | **(0, 0)** |
| Class | 4 | 4 | 3 | 2 | 4 | 3 | 2 | **1** |

**Step 2, the scan.** Enhanced second chance replaces the first page it meets in the lowest non-empty class: (0, 0) first, then (0, 1), then (1, 0), then (1, 1). On the first pass it looks for (0, 0) without changing any bits: N, G, H, F, A, L, C are skipped and **B (0, 0)** is found.

**Answer:** pages are considered in the order N, G, H, F, A, L, C, B, and **B** is selected: it is neither recently used nor modified, so it can be dropped with no disk write.

**Contrast worth one line:** plain second chance (reference bit only) would clear N, G and H's bits and select **F**, the first page with reference bit 0; but F is dirty, so that choice costs a write. That difference is the point of the enhancement. Note that B is also the newest page, which pure FIFO would never pick. No official key exists; this is my own solution.
Marking points:
- Final answer: On the first pass it looks for (0, 0) without changing any bits: N, G, H, F, A, L, C are skipped and B (0, 0) is found.
- pages are considered in the order N, G, H, F, A, L, C, B, and B is selected: it is neither recently used nor modified, so it can be dropped with no disk write.
- Step 1, the order considered: Second-chance algorithms keep pages in a circular FIFO queue and start at the oldest page, so sort by load time:
- Step 2, the scan: Enhanced second chance replaces the first page it meets in the lowest non-empty class: (0, 0) first, then (0, 1), then (1, 0), then (1, 1).
- Contrast worth one line: plain second chance (reference bit only) would clear N, G and H's bits and select F, the first page with reference bit 0; but F is dirty, so that choice costs a write.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-114
Unit: 4 Memory
Topic: Virtual Memory
Type: true/false
Asked in: OSN Quiz 6 (alt set) 2020, Q4 (not recorded); OSN Quiz 2 2022, A3 (2 marks); OSN End-sem 2022, Q1.5 (1 mark); AOS End-sem 2025, Q1.7 (1 mark)
Times asked: 4
Reworded versions: none
In syllabus: yes
Question: Identify whether the following statement is TRUE or FALSE. If the statement is FALSE, correct it and justify the corrected sentence. If the statement is TRUE, justify it. Restrict the justification to a few (less than five) sentences. "Global frame allocation algorithm gives better throughput over local frame allocation algorithm."
Answer: **TRUE.**

**Justification (key):** the global allocation algorithm can use the unutilized frames of one process to allocate more frames to another process to improve performance. In this way, based on the locality requirement, the approach can adjust the frames to meet the demands of the processes. As a result, memory utilization and throughput can be improved.

Supporting contrast if there is room: with local replacement each process selects only from its own frames, the number of frames per process never changes, and free frames elsewhere may not be used. This is why global replacement is the one used in practice.

**Do not flip it.** Global replacement has a real disadvantage (a process's page-fault rate depends on the behaviour of other processes, and it is what lets thrashing spread), but the statement is about throughput, and all three papers and the key say TRUE.
Marking points:
- States TRUE.
- Justification (key): the global allocation algorithm can use the unutilized frames of one process to allocate more frames to another process to improve performance.
- Do not flip it: Global replacement has a real disadvantage (a process's page-fault rate depends on the behaviour of other processes, and it is what lets thrashing spread), but the statement is about throughput, and all three papers …
Answer source: professor's key
Weak / low priority: no

### PYQ-115
Unit: 4 Memory
Topic: Virtual Memory
Type: written
Asked in: OSN Quiz 6 (alt set) 2020, Q1 (not recorded)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: What is the cause of thrashing? How does the system detect thrashing? Once it detects it, what can it do? (as copied on a student answer sheet)
Answer: **Cause.** Thrashing is high paging activity: a process spends more time swapping pages in and out than executing. It is caused by a process not having enough frames, that is, fewer frames than the number of pages in active use (its current locality). It faults, must replace a page that is also in active use, and faults again at once. With global replacement the faulting process takes frames from other processes, which then fault as well, so the problem spreads. Processes queue for the paging device, the ready queue empties and CPU utilization falls. The OS, seeing low CPU utilization, increases the degree of multiprogramming, which takes away still more frames and makes matters worse.

**Detection.** The system evaluates the level of CPU utilization against the level of multiprogramming: thrashing shows as CPU utilization dropping sharply while the degree of multiprogramming is high, together with a very high page-fault rate and heavy activity on the paging device. It can also be detected directly from the working-set model: if the total demand D = Σ WSSi exceeds the number of available frames m, the system is thrashing. A per-process page-fault frequency above the upper bound is the same signal for one process.

**Elimination.**

- **Reduce the degree of multiprogramming:** suspend (swap out) one or more processes and distribute their frames among the remaining ones. The suspended processes are resumed later.
- **Working-set strategy:** give every process frames equal to its working-set size, and start a new process only if enough extra frames exist.
- **Page-fault-frequency control:** give a frame to a process whose fault rate exceeds the upper bound and take one from a process below the lower bound; suspend a process if no free frame is available.
- **Limit the spread** with local (or priority) replacement, so a thrashing process cannot steal frames from the others.

**Core sentence:** thrashing occurs when the sum of the localities exceeds available memory, and the only real cure is to give each running process as many frames as its locality needs by running fewer processes.

No professor's key exists for this question; the answer follows the slides.
Marking points:
- thrashing occurs when the sum of the localities exceeds available memory, and the only real cure is to give each running process as many frames as its locality needs by running fewer processes.
- Reduce the degree of multiprogramming: suspend (swap out) one or more processes and distribute their frames among the remaining ones.
- Working-set strategy: give every process frames equal to its working-set size, and start a new process only if enough extra frames exist.
- Page-fault-frequency control: give a frame to a process whose fault rate exceeds the upper bound and take one from a process below the lower bound; suspend a process if no …
- Limit the spread with local (or priority) replacement, so a thrashing process cannot steal frames from the others.
- Cause: Thrashing is high paging activity: a process spends more time swapping pages in and out than executing.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-82
Unit: 4 Memory
Topic: Virtual Memory
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Justify the observation: "Normally the entire program is not needed in main memory." State three benefits of being able to execute a program that is only partially in memory.
Answer: **Justification (give two or three of these):** programs contain code for unusual error conditions that is seldom executed; arrays, lists and tables are often declared far larger than what is used (100 by 100 elements declared, seldom more than 10 by 10 used); an assembler may reserve room for 3000 symbols while the average program has fewer than 200; certain options and features of a program are used rarely. Even when the whole program is needed, it is not all needed at the same time.

**Benefits:**

1. A program is no longer constrained by the amount of physical memory; users can write programs for an extremely large virtual address space.
2. Each program takes less physical memory, so more programs can run at the same time, which increases CPU utilization and throughput.
3. Less I/O is needed to load or swap each program into memory, so each program runs faster.
Marking points:
- A program is no longer constrained by the amount of physical memory; users can write programs for an extremely large virtual address space.
- Each program takes less physical memory, so more programs can run at the same time, which increases CPU utilization and throughput.
- Less I/O is needed to load or swap each program into memory, so each program runs faster.
- Justification (give two or three of these): programs contain code for unusual error conditions that is seldom executed; arrays, lists and tables are often declared far larger than what is used (100 by 100 elements …
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-83
Unit: 4 Memory
Topic: Virtual Memory
Type: true/false
Based on: imitates the professor's TRUE/FALSE correct-and-justify items (OSN End 2022 Q1, AOS End 2025 Q1)
In syllabus: yes
Question: TRUE or FALSE, correct if false and justify: "In a demand-paged system, a page-table entry marked invalid means the process has made an illegal memory reference and must be terminated."
Answer: **FALSE.** Corrected: in a demand-paged system an entry marked invalid means either that the reference is illegal *or* that the page is legal but not currently in main memory; only in the first case is the process terminated.

**Justification:** under demand paging the bit means "in memory" (1) or "not in memory" (0), and it is initially 0 for every entry because no page has been loaded yet. A reference to such a page traps to the OS as a page fault. The OS then consults another internal table (kept with the process control block) to decide: if the address is outside the process's logical address space, it aborts the process; if the page is just not in memory, it finds a free frame, reads the page in, sets the bit to 1 and restarts the instruction.
Marking points:
- States FALSE.
- Corrected: in a demand-paged system an entry marked invalid means either that the reference is illegal or that the page is legal but not currently in main memory; only in the first case is the process terminated.
- under demand paging the bit means "in memory" (1) or "not in memory" (0), and it is initially 0 for every entry because no page has been loaded yet.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-84
Unit: 4 Memory
Topic: Virtual Memory
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025); same section as PYQ-111
In syllabus: yes
Question: Memory access time is 100 ns and the page-fault service time is 25 ms. What page-fault rate keeps the performance degradation below 10%?
Answer: EAT = (1 − p) × 100 + p × 25,000,000 = 100 + 24,999,900 p ns.

A degradation of less than 10% means EAT < 110 ns:

100 + 24,999,900 p < 110 ⟹ 24,999,900 p < 10 ⟹ **p < 0.0000004** (4 × 10^−7).

**Answer:** fewer than one memory access in **2,500,000** may page-fault.

That such a tiny rate is needed is the reason page replacement and frame allocation matter so much.
Marking points:
- Final answer: Answer: fewer than one memory access in 2,500,000 may page-fault.
- EAT = (1 − p) × 100 + p × 25,000,000 = 100 + 24,999,900 p ns.
- A degradation of less than 10% means EAT < 110 ns:
- 100 + 24,999,900 p < 110 ⟹ 24,999,900 p < 10 ⟹ p < 0.0000004 (4 × 10^−7).
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-85
Unit: 4 Memory
Topic: Virtual Memory
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Compare accessing a file through memory mapping with accessing it through read() and write() system calls.
Answer:
|  | read() / write() | Memory-mapped file |
| --- | --- | --- |
| Access path | A system call for every access, with data copied between kernel buffer and user buffer | The file is mapped to pages; after the first fault on a page, access is an ordinary memory reference |
| Loading | The program asks for specific bytes | Demand paging brings in a page-sized portion of the file on first touch |
| Sharing | Each process has its own copy of the data in its buffer | Several processes can map the same file, sharing the pages in memory |

**Core sentence:** memory mapping simplifies file access by treating file I/O as memory access, and reuses the demand-paging machinery to do it.
Marking points:
- memory mapping simplifies file access by treating file I/O as memory access, and reuses the demand-paging machinery to do it.
- Access path: A system call for every access, with data copied between kernel buffer and user buffer
- Loading: The program asks for specific bytes
- Sharing: Each process has its own copy of the data in its buffer
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-86
Unit: 4 Memory
Topic: Virtual Memory
Type: true/false
Based on: imitates the professor's TRUE/FALSE correct-and-justify items (OSN End 2022 Q1, AOS End 2025 Q1)
In syllabus: yes
Question: TRUE or FALSE, correct if false and justify: "Allocating more frames to a process always reduces, or at least never increases, its number of page faults."
Answer: **FALSE.** Corrected: allocating more frames never increases the number of page faults for LRU and optimal replacement, but for some algorithms such as FIFO it can increase them (Belady's anomaly).

**Justification:** on the reference string 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5, FIFO gives 9 faults with 3 frames and 10 faults with 4 frames. LRU and optimal are stack algorithms: the set of pages in memory with n frames is always a subset of the set that would be in memory with n + 1 frames, so an extra frame can only turn faults into hits. FIFO has no such property, because which page is "oldest" depends on when faults happened, and that changes with the number of frames.
Marking points:
- States FALSE.
- Corrected: allocating more frames never increases the number of page faults for LRU and optimal replacement, but for some algorithms such as FIFO it can increase them (Belady's anomaly).
- on the reference string 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5, FIFO gives 9 faults with 3 frames and 10 faults with 4 frames.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-87
Unit: 4 Memory
Topic: Virtual Memory
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025)
In syllabus: yes
Question: Apply the optimal page-replacement algorithm to the reference string 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5 with 3 frames. Why is this algorithm studied if it cannot be implemented?
Answer:
| ref | 1 | 2 | 3 | 4 | 1 | 2 | 5 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| frame 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 3 | 4 | 4 |
| frame 2 |  | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 |
| frame 3 |  |  | 3 | 4 | 4 | 4 | 5 | 5 | 5 | 5 | 5 | 5 |
| fault? | F | F | F | F | · | · | F | · | · | F | F | · |

**OPT, 3 frames: 7 page faults**, 5 hits.

**Working of the decisions.** At the first 4: of the pages 1, 2, 3, page 3 is used farthest in the future (reference 10), so 3 is replaced. At 5: pages 1 and 2 are needed next, 4 is needed last, so 4 is replaced. At 3: pages 1 and 2 are never used again; either may go (the table replaces 1). At 4: again a page that is never used again is replaced.

**Why study it.** It needs future knowledge of the reference string, so no real system can run it. But it gives the lowest possible number of faults for a string, so it is the benchmark: an algorithm is judged by how close it comes to optimal (here FIFO 9 and LRU 10 against the optimal 7).
Marking points:
- Final answer: OPT, 3 frames: 7 page faults, 5 hits.
- Working of the decisions: At the first 4: of the pages 1, 2, 3, page 3 is used farthest in the future (reference 10), so 3 is replaced.
- Why study it: It needs future knowledge of the reference string, so no real system can run it.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-88
Unit: 4 Memory
Topic: Virtual Memory
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-113
In syllabus: yes
Question: Compare the counter and stack implementations of LRU. Why do real systems use neither?
Answer:
|  | Counter | Stack |
| --- | --- | --- |
| On each reference | Copy the clock into the page's counter field | Move the page's entry to the top of a doubly linked stack (6 pointer changes) |
| Finding the victim | Search the page table for the smallest counter | No search: the bottom of the stack is the LRU page |
| Weak point | Search time; clock overflow | Expensive update |

**Why neither is used:** both must update a data structure on every memory reference. Doing that in software would need an interrupt per reference and would slow every reference by about a factor of 10, and hardware that does it is too costly. Systems therefore approximate LRU with a hardware-maintained reference bit: additional reference bits, second chance (clock) or enhanced second chance.
Marking points:
- Why neither is used: both must update a data structure on every memory reference.
- On each reference: Copy the clock into the page's counter field
- Finding the victim: Search the page table for the smallest counter
- Weak point: Search time; clock overflow
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-89
Unit: 4 Memory
Topic: Virtual Memory
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-113
In syllabus: yes
Question: Four pages have (reference, modify) bits A = (1, 1), B = (0, 1), C = (1, 0), D = (0, 0). In what order would the enhanced second-chance algorithm prefer them as victims? Which replacements need a disk write?
Answer: **Order of preference: D, B, C, A**, that is (0, 0), then (0, 1), then (1, 0), then (1, 1).

- **D (0, 0):** neither recently used nor modified; the best victim, and no write is needed.
- **B (0, 1):** not recently used but modified; it must be written to disk before replacement.
- **C (1, 0):** recently used but clean; it will probably be used again soon.
- **A (1, 1):** recently used and modified; probably used again soon, and it needs a write.

**Core sentence:** the reference bit is the more significant of the two, because a wrong victim costs a future page fault, while a dirty victim costs only one extra write now.
Marking points:
- the reference bit is the more significant of the two, because a wrong victim costs a future page fault, while a dirty victim costs only one extra write now.
- D (0, 0): neither recently used nor modified; the best victim, and no write is needed.
- B (0, 1): not recently used but modified; it must be written to disk before replacement.
- C (1, 0): recently used but clean; it will probably be used again soon.
- A (1, 1): recently used and modified; probably used again soon, and it needs a write.
- Order of preference: D, B, C, A, that is (0, 0), then (0, 1), then (1, 0), then (1, 1).
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-90
Unit: 4 Memory
Topic: Virtual Memory
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025); same section as PYQ-114
In syllabus: yes
Question: A system has 64 free frames and two processes, P1 of 10 pages and P2 of 127 pages. Find the allocation under equal allocation and under proportional allocation. Which is better here, and what does neither scheme take into account?
Answer: **Equal allocation:** 64 / 2 = **32 frames each**. P1 has only 10 pages, so 22 of its frames are wasted, while P2 is short.

**Proportional allocation:** S = 10 + 127 = 137.

a1 = (10 / 137) × 64 = 4.67 ≈ **5 frames**; a2 = (127 / 137) × 64 = 59.33 ≈ **59 frames**. Total 64.

**Better:** proportional allocation, because each process shares the frames according to its needs and none are left idle.

**Neither considers priority:** a high-priority process is treated the same as a low-priority one. Priority allocation fixes this by making the ratio depend on priority, and by letting a faulting process take a frame from a lower-priority process.

**Number check.** The slide uses m = 64 and gets 5 and 59. The textbook version of this example uses 62 frames and gets 4 and 57. Use the m given in the question, and make sure every allocation is at least the architecture's minimum number of frames.
Marking points:
- Final answer: a1 = (10 / 137) × 64 = 4.67 ≈ 5 frames; a2 = (127 / 137) × 64 = 59.33 ≈ 59 frames.
- Equal allocation: 64 / 2 = 32 frames each.
- Proportional allocation: S = 10 + 127 = 137.
- Better: proportional allocation, because each process shares the frames according to its needs and none are left idle.
- Neither considers priority: a high-priority process is treated the same as a low-priority one.
- Number check: The slide uses m = 64 and gets 5 and 59.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-91
Unit: 4 Memory
Topic: Virtual Memory
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025)
In syllabus: yes
Question: A process has the page-reference string 2 6 1 5 7 7 7 7 5 1 | 6 2 3 4 1 2 | 3 4 4 4 3 4 3 4 4 4 | …, where t1 is the instant after the tenth reference and t2 the instant after the twenty-sixth. (a) With Δ = 10, find the working set and its size at t1 and at t2. (b) Three processes have working-set sizes 5, 2 and 6 and the system has 12 frames. What does the working-set model say, and what should the OS do?
Answer: **(a)** The working set is the set of distinct pages in the last 10 references.

At t1 the last ten references are 2, 6, 1, 5, 7, 7, 7, 7, 5, 1, so **WS(t1) = {1, 2, 5, 6, 7}** and WSS = **5**.

At t2 the last ten references are 3, 4, 4, 4, 3, 4, 3, 4, 4, 4, so **WS(t2) = {3, 4}** and WSS = **2**.

The size changes because the process has moved to a smaller locality.

**(b)** Total demand D = 5 + 2 + 6 = **13** frames, and m = 12. Since **D > m**, the system will thrash: at least one process cannot hold its working set. The OS should **suspend one process** and allocate its frames to the others. Suspending the process with WSS = 2 leaves D = 11 ≤ 12, so the remaining two processes run without thrashing; the suspended process is restarted later when frames are available.
Marking points:
- Final answer: (b) Total demand D = 5 + 2 + 6 = 13 frames, and m = 12.
- (a) The working set is the set of distinct pages in the last 10 references.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-92
Unit: 4 Memory
Topic: Virtual Memory
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Compare the working-set model and the page-fault-frequency approach as ways to prevent thrashing.
Answer:
|  | Working-set model | Page-fault frequency |
| --- | --- | --- |
| What it measures | The pages referenced in the last Δ references (an estimate of the locality) | The page-fault rate of the process |
| Control rule | Give each process WSSi frames; if D = Σ WSSi > m, suspend a process | Above the upper bound the process gains a frame; below the lower bound it loses a frame; if no frame is free, suspend a process |
| Cost | Must keep track of the working set: timer interrupts plus reference bits, and only approximately | Only a fault counter per process |
| Nature | Indirect: predicts need from the reference pattern | Direct: controls the symptom of thrashing itself |

**Core sentence:** both prevent thrashing by matching frames to need and suspending a process when memory is overcommitted; page-fault frequency does it more directly and more cheaply.
Marking points:
- both prevent thrashing by matching frames to need and suspending a process when memory is overcommitted; page-fault frequency does it more directly and more cheaply.
- What it measures: The pages referenced in the last Δ references (an estimate of the locality)
- Control rule: Give each process WSSi frames; if D = Σ WSSi > m, suspend a process
- Cost: Must keep track of the working set: timer interrupts plus reference bits, and only approximately
- Nature: Indirect: predicts need from the reference pattern
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-93
Unit: 4 Memory
Topic: Virtual Memory
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: An array is declared as int A[1024][1024] and each row is stored in one page. A process has fewer than 1024 frames. Program 1 runs "for j … for i … A[i][j] = 0" and Program 2 runs "for i … for j … A[i][j] = 0". How many page faults does each generate? Justify the observation that the user's awareness of paging can improve system performance.
Answer: **Program 1** (j in the outer loop) zeroes the array column by column: A[0][0], A[1][0], A[2][0], … Consecutive accesses are in different rows, hence in different pages. With fewer than 1024 frames, by the time the loop returns to row 0 its page has been replaced, so every access can fault: **1024 × 1024 = 1,048,576 page faults**.

**Program 2** (i in the outer loop) zeroes row by row: all 1024 words of one page are finished before the next page is touched. Each page faults once: **1024 page faults**.

**Justification:** both programs do identical work, but Program 2 has locality: its references stay within one page for a long time. Careful selection of data structures and programming structures increases locality, which lowers the page-fault rate and the number of pages in the working set, without any change to the OS.
Marking points:
- Program 1 (j in the outer loop) zeroes the array column by column: A[0][0], A[1][0], A[2][0], … Consecutive accesses are in different rows, hence in different pages.
- Program 2 (i in the outer loop) zeroes row by row: all 1024 words of one page are finished before the next page is touched.
- both programs do identical work, but Program 2 has locality: its references stay within one page for a long time.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-94
Unit: 4 Memory
Topic: Virtual Memory
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025)
In syllabus: yes
Question: (a) A TLB has 64 entries. Find the TLB reach with 4 KB pages and with 4 MB pages. (b) Give two arguments for a small page size and two for a large page size. (c) How do multiple page sizes resolve the conflict?
Answer: **(a)** TLB reach = TLB size × page size. With 4 KB pages: 64 × 4 KB = **256 KB**. With 4 MB pages: 64 × 4 MB = **256 MB**. A process whose working set is larger than the reach suffers TLB misses even when all its pages are in memory.

**(b)**

| Small pages | Large pages |
| --- | --- |
| Less internal fragmentation: memory is better utilized because pages are the unit of allocation | Smaller page table: fewer entries for the same address space |
| Better locality: only the data actually needed is brought into memory | Less I/O overhead: more is transferred per disk operation, and there are fewer page faults; also a larger TLB reach |

**(c)** Increasing the page size for everyone increases fragmentation, because not all applications need large pages. Providing **multiple page sizes** lets the applications that need a large reach use large pages, while the rest keep small pages and low fragmentation.
Marking points:
- Final answer: (c) Increasing the page size for everyone increases fragmentation, because not all applications need large pages.
- (a) TLB reach = TLB size × page size.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-95
Unit: 4 Memory
Topic: Virtual Memory
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to memory management
In syllabus: yes
Question: Block 9 said a process with pending I/O must not be swapped out. This block says pages involved in I/O must be locked in memory. Show that these are the same problem, describe what goes wrong in the paging case, and give the two solutions that work for both.
Answer: **The common cause.** I/O is asynchronous. A process issues a request naming a buffer in its memory and is then put on the device's wait queue; the transfer happens later, at a physical address fixed when the request was made. Meanwhile the CPU is given to other processes.

**What goes wrong with paging.** While the first process waits, other processes fault. With global replacement the replacement algorithm may choose the frame holding the waiting process's I/O buffer as its victim, since that page has not been referenced recently. The frame is given to another process. When the device finally performs the transfer, it writes into that frame, which now holds a different process's page. This is exactly the swapping hazard at the size of a single page: there the whole process was moved out from under the I/O, here one frame is.

**The two solutions, in both settings:**

1. **Never do I/O to user memory.** Do I/O only into OS buffers and copy between the OS buffer and the process's memory. This is always safe but costs an extra copy.
2. **Lock the pages.** Each frame gets a lock bit; a locked frame cannot be selected for replacement. Pages are locked before the I/O is issued and unlocked when it completes. The swapping version is "never swap a process with pending I/O" (latch the job in memory).

**Core sentence:** any policy that moves or reassigns memory (swapping, compaction, page replacement) must exclude memory that a device has been told to write to.
Marking points:
- any policy that moves or reassigns memory (swapping, compaction, page replacement) must exclude memory that a device has been told to write to.
- Never do I/O to user memory.
- Lock the pages.
- The common cause: I/O is asynchronous.
- What goes wrong with paging: While the first process waits, other processes fault.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-96
Unit: 4 Memory
Topic: Virtual Memory
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to virtual machines
In syllabus: yes
Question: A virtual machine monitor runs several guest operating systems and has promised them more memory in total than the host really has. Each guest runs its own demand paging. Using this block, explain (a) why the VMM cannot simply rely on the guests' page replacement, (b) what "double paging" is and why it performs badly, and (c) how a balloon driver gives a better result.
Answer: **(a)** Each guest believes it owns a fixed amount of "physical" memory and manages it with its own page tables, reference bits and replacement algorithm. The guest has no reason to free memory it thinks it owns, and it cannot see that the host is short. Memory is oversubscribed, so the VMM needs its own mechanism to take memory back, exactly as an OS must when the sum of the working sets exceeds the available frames (D > m).

**(b) Double paging.** The guest's page table says a page is in a physical frame, but the VMM has moved that page to its own backing store. There are now two independent levels of paging. It performs badly because the VMM does not know which guest pages are important: it has no view of the guest's working sets, so it may page out a page the guest is actively using. Worse, when the guest then decides to page out that same page, the VMM must first read it in from its backing store only so that the guest can write it to the guest's swap, which is two disk transfers for nothing.

**(c) Ballooning.** The VMM installs a pseudo-device driver, the balloon memory manager, in each guest. When the host is short, the VMM tells the balloon to allocate (and pin) memory inside the guest. The guest sees memory pressure and uses its *own* replacement algorithm to free pages, so the pages given up are the ones the guest itself judges least useful. The frames behind the balloon are returned to the VMM. When memory is plentiful the balloon deflates.

**Core sentence:** replacement works well only where the reference information is, so the best VMM policy is to make the guest do the choosing.

The VMM techniques are from the Virtual Machines slides (memory management under oversubscription); they are covered fully in Block 15.
Marking points:
- replacement works well only where the reference information is, so the best VMM policy is to make the guest do the choosing.
- (a) Each guest believes it owns a fixed amount of "physical" memory and manages it with its own page tables, reference bits and replacement algorithm.
- (b) Double paging: The guest's page table says a page is in a physical frame, but the VMM has moved that page to its own backing store.
- (c) Ballooning: The VMM installs a pseudo-device driver, the balloon memory manager, in each guest.
Answer source: written by Claude, no key
Weak / low priority: no
