# Unit 2 Processes

## Processes and IPC

### PYQ-23
Unit: 2 Processes
Topic: Processes and IPC
Type: written
Asked in: OSN Quiz 2 (alt set) 2020, Q6 (not recorded)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Explain the notion of a process. Explain the reason for introducing the process concept. (as copied on a student answer sheet)
Answer: **Notion:** a process is a program in execution: an active entity with a program counter, registers, a stack, data, a heap and allocated resources (open files, devices), described to the OS by its PCB. A program is passive; the same program can be several processes.

**Why it was introduced:** multiprogramming and time-sharing put several programs in memory at once and switch the CPU among them. The OS needs a unit that (1) can be **stopped and resumed** exactly where it left off, which requires saving its state (the PCB); (2) **owns resources**, so memory, files and devices can be allocated, protected and reclaimed per activity; and (3) can be **scheduled** and accounted for. The process gives each running activity the illusion of its own CPU (a virtual CPU), so programs can be written as if alone on the machine, while the OS manages concurrency in one uniform way.
Marking points:
- Notion: a process is a program in execution: an active entity with a program counter, registers, a stack, data, a heap and allocated resources (open files, devices), described to the OS by its PCB.
- Why it was introduced: multiprogramming and time-sharing put several programs in memory at once and switch the CPU among them.
- A program is passive; the same program can be several processes.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-24
Unit: 2 Processes
Topic: Processes and IPC
Type: written
Asked in: AOS End-sem 2025, Q3 (5 marks); AOS Mid-sem 2025, Q1d (3 marks); OSN Quiz 1 2022, Q7 (2 marks); AOS Quiz 1 2025, Q7 (2 marks)
Times asked: 4
Reworded versions: "Explain why the medium-term scheduler is introduced." (AOS Mid-sem 2025); "Justify the requirement of medium-term scheduler." (OSN Quiz 1 2022)
In syllabus: yes
Question: Justify the requirement of medium-term scheduler by explaining the corresponding issues if you do not employ medium-term scheduler.
Answer: **Key:** in a computer system, if all the processes are I/O bound, the ready queue will be empty and the CPU will be idle. If all the processes are CPU bound, the I/O queue will be empty, the devices will go unutilized, and the system will be imbalanced. In this situation, the medium-term scheduler is included by introducing **swapping**. The basic idea is that it can be advantageous to forcibly remove a CPU-bound process from memory and introduce an I/O-bound process, or remove an I/O-bound process and introduce a CPU-bound one. Swapping means removing a process from main memory to disk to improve performance; at some later time the process can be reintroduced into main memory and its execution continued where it left off. Swapping improves the process mix (I/O and CPU) when main memory is unavailable.

**Why it is needed.** The long-term scheduler decides admission once, but conditions change after processes are admitted. The CPU and I/O mix can drift: if all processes in memory are I/O-bound, the ready queue is empty and the CPU idles; if all are CPU-bound, the device queues are empty and devices sit unused. Memory can also fill up. The medium-term scheduler fixes this with swapping: it removes a process from memory to disk, reducing the degree of multiprogramming, and later swaps it back in to continue where it left off. By choosing which process to swap out (for example, a CPU-bound one when there are too many), it restores a good mix even when main memory is not available.

**Issues without it.**

- An admitted process holds memory until it ends, even if it is blocked for a long time, so ready processes waiting on disk cannot be loaded.
- A bad mix persists, leaving either the CPU or the devices underused.
- There is no way to lower MPL after admission, so overload (too many processes competing for memory) cannot be relieved.
- Time-sharing systems often have no real long-term scheduler, since every logged-in user is admitted; without a medium-term scheduler, nothing would control MPL at all.
Marking points:
- in a computer system, if all the processes are I/O bound, the ready queue will be empty and the CPU will be idle.
- An admitted process holds memory until it ends, even if it is blocked for a long time, so ready processes waiting on disk cannot be loaded.
- A bad mix persists, leaving either the CPU or the devices underused.
- There is no way to lower MPL after admission, so overload (too many processes competing for memory) cannot be relieved.
- Time-sharing systems often have no real long-term scheduler, since every logged-in user is admitted; without a medium-term scheduler, nothing would control MPL at all.
- Why it is needed: The long-term scheduler decides admission once, but conditions change after processes are admitted.
Answer source: professor's key
Weak / low priority: no

### PYQ-25
Unit: 2 Processes
Topic: Processes and IPC
Type: written
Asked in: OSN Quiz 1 2022, Q6 (2 marks); AOS Quiz 1 2025, Q6 (2 marks)
Times asked: 2
Reworded versions: none
In syllabus: yes
Question: Explain the terms "waiting queue" and "Ready queue" in the Operating System. When the process enters and exits from waiting queue.
Answer: **Key:** **ready queue**: contains the list of processes which are ready to run if the CPU is allocated. **Waiting queue**: contains the list of processes which are waiting for some event to happen; they cannot be executed even if the CPU is available. A process **enters** the waiting queue when, during its execution, it needs to wait for disk I/O or any other event. It **exits** when the event it is waiting for is over: the process moves from the waiting queue to the ready queue.
Marking points:
- ready queue: contains the list of processes which are ready to run if the CPU is allocated.
- Waiting queue: contains the list of processes which are waiting for some event to happen; they cannot be executed even if the CPU is available.
- A process enters the waiting queue when, during its execution, it needs to wait for disk I/O or any other event.
- It exits when the event it is waiting for is over: the process moves from the waiting queue to the ready queue.
Answer source: professor's key
Weak / low priority: no

### PYQ-26
Unit: 2 Processes
Topic: Processes and IPC
Type: written
Asked in: OSN Quiz 2 2020, Q1 (4 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: What do you understand by the term "long term scheduler"?
Answer: The long-term (job) scheduler selects which processes from the job pool on mass storage are brought into memory, into the ready queue. It controls the degree of multiprogramming; MPL is stable when the average rate of process creation equals the average departure rate. It runs infrequently, so it can afford to choose carefully, and its key task is to admit a good mix of I/O-bound and CPU-bound processes so that neither the CPU nor the devices sit idle. Time-sharing systems often have little or no long-term scheduler, since every user is admitted.
Marking points:
- The long-term (job) scheduler selects which processes from the job pool on mass storage are brought into memory, into the ready queue.
- It controls the degree of multiprogramming; MPL is stable when the average rate of process creation equals the average departure rate.
- It runs infrequently, so it can afford to choose carefully, and its key task is to admit a good mix of I/O-bound and CPU-bound processes so that neither the CPU nor the devices sit idle.
- Time-sharing systems often have little or no long-term scheduler, since every user is admitted.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-27
Unit: 2 Processes
Topic: Processes and IPC
Type: written
Asked in: OSN Quiz 2 (alt set) 2020, Q2 (not recorded)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Explain the role of the short-term scheduler. (as copied on a student answer sheet)
Answer: The short-term (CPU) scheduler selects one process from the ready queue and allocates the CPU to it; the **dispatcher** then gives control to that process (context switch, switch to user mode, jump to the right location in the program).

It runs very frequently: whenever a process blocks, finishes, or (with preemption) is interrupted by the timer, at least once every ~100 ms. So it must be **fast**: if it takes 10 ms to decide to run a process for 100 ms, 10 / (100 + 10) ≈ 9% of the CPU is wasted on scheduling alone.

Its policy (Block 3: FCFS, SJF, priority, round robin, multilevel feedback) decides CPU utilization, throughput, waiting and response times, and whether I/O-bound processes get the quick service that keeps the devices busy.
Marking points:
- The short-term (CPU) scheduler selects one process from the ready queue and allocates the CPU to it; the dispatcher then gives control to that process (context switch, switch to user mode, jump to the right location in the program).
- It runs very frequently: whenever a process blocks, finishes, or (with preemption) is interrupted by the timer, at least once every ~100 ms.
- So it must be fast: if it takes 10 ms to decide to run a process for 100 ms, 10 / (100 + 10) ≈ 9% of the CPU is wasted on scheduling alone.
- Its policy (Block 3: FCFS, SJF, priority, round robin, multilevel feedback) decides CPU utilization, throughput, waiting and response times, and whether I/O-bound processes get the quick service that keeps the devices busy.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-28
Unit: 2 Processes
Topic: Processes and IPC
Type: written
Asked in: AOS Mid-sem 2025, Q3 (5 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Suppose a multiprogrammed system has a load of N processes with individual total execution times t1, t2, ..., tN. How would it be possible that T > t1 + t2 + ... + tN? What would cause the total execution time to exceed the sum of individual execution times?
Answer: Each ti counts only the time the process itself executes. T is the elapsed time to finish all N, and it also includes time in which none of the processes is doing its own work:

- **Context switches.** Each switch saves and loads PCB state (1–1000 µs) with no useful work done, and time-sharing causes many of them. Switching also disturbs caches and the TLB, so each process runs slower afterwards.
- **Scheduler execution.** The short-term scheduler runs at least every 100 ms; that time is charged to no process.
- **CPU idle during I/O.** If at some moment every process is waiting for I/O, for example with an I/O-heavy mix, the CPU idles and T grows while no ti does.
- **Swapping.** The medium-term scheduler moves processes to and from disk, and a process cannot run until it is back.
- **Interrupts and system calls.** Handling device and timer interrupts and OS services takes CPU time.
- **Contention and synchronization.** Processes may block on shared resources or locks, and memory pressure can cause extra paging.

**Core sentence:** T includes OS overhead (context switching, scheduling, interrupt handling, swapping) and idle periods when all processes are blocked, none of which belong to any ti.
Marking points:
- T includes OS overhead (context switching, scheduling, interrupt handling, swapping) and idle periods when all processes are blocked, none of which belong to any ti.
- Context switches.
- Scheduler execution.
- CPU idle during I/O.
- Interrupts and system calls.
- Contention and synchronization.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-29
Unit: 2 Processes
Topic: Processes and IPC
Type: written
Asked in: OSN End-sem 2022, Q2.1 (3 marks); OSN Quiz 4 (alt set) 2020, Q1 (not recorded)
Times asked: 2
Reworded versions: none
In syllabus: yes
Question: Suppose a multiprogrammed system has a load of N processes with individual total execution times t1, t2, …, tN (each measured running alone, including its I/O). How would it be possible that the total time to complete all of them is close to max(t1, …, tN), much less than the sum?
Answer: **Key (End 2022):** in a multiprogrammed system the CPU is given to another process whenever the running one blocks for I/O. While the longest process Pi is executing, it might have blocked several times, and during that time there is a possibility that the other processes might have finished.

**Detail:** each ti includes both CPU bursts and I/O waits. Run one after another, the total is Σti because the CPU idles during each process's I/O. With multiprogramming, one process's I/O overlaps others' computation (and different processes can use different devices at once), so the idle gaps of the long process are filled with the work of the short ones. In the best case the whole load finishes when the longest one does: T ≈ max(ti). This is the whole point of multiprogramming (Block 1). It cannot go below max(ti), and the next question shows the overheads that push it back up.

Pair this with the T > Σti question: overlap pulls T down toward max(ti); switching, scheduling, swapping and contention push it up.
Marking points:
- in a multiprogrammed system the CPU is given to another process whenever the running one blocks for I/O.
- Detail: each ti includes both CPU bursts and I/O waits.
- While the longest process Pi is executing, it might have blocked several times, and during that time there is a possibility that the other processes might have finished.
Answer source: professor's key
Weak / low priority: no

### PYQ-30
Unit: 2 Processes
Topic: Processes and IPC
Type: written
Asked in: OSN Quiz 2 2020, Q2 (4 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: What are the strengths and weaknesses of the two models of inter-process communication?
Answer:
|  | Shared memory | Message passing |
| --- | --- | --- |
| Strengths | Fast: after setup, data moves at memory speed with no system calls. Convenient for large amounts of data. | No shared variables, so no conflicts to guard. OS handles delivery and synchronization. Works naturally across machines. Good for small data. |
| Weaknesses | Programmer must synchronize; race conditions possible. Harder to use across machines. | Slower: each send and receive is a system call and data is copied through the kernel. Design issues of naming, buffering, message size and failures. |
Marking points:
- Strengths: Fast: after setup, data moves at memory speed with no system calls. Convenient for large amounts of data.
- Weaknesses: Programmer must synchronize; race conditions possible. Harder to use across machines.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-31
Unit: 2 Processes
Topic: Processes and IPC
Type: written
Asked in: OSN Quiz 2 (alt set) 2020, Q1 (not recorded)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Explain merits and demerits of synchronous and asynchronous communication. (as copied on a student answer sheet)
Answer:
|  | Synchronous (blocking) | Asynchronous (non-blocking) |
| --- | --- | --- |
| Meaning | Blocking send waits until the message is received (or accepted by the link); blocking receive waits until a message is available | Send returns immediately; receive returns a message or null |
| Merits | Simple to program and reason about; implicit synchronization (with both blocking, a rendezvous: sender knows the message arrived); no buffering needed (zero capacity works); flow control is automatic | Sender and receiver keep working: more concurrency, better use of CPU and link; tolerant of slow or absent partners |
| Demerits | Less concurrency: a process waits even when it has other work; a slow or failed partner can block the other indefinitely; risk of deadlock if both wait on each other | Needs buffering in the kernel (queues can grow); the sender does not know whether the message arrived (needs acknowledgements); harder to program and debug |

Choose synchronous when the sender must know the message was delivered before continuing; asynchronous when throughput and overlap matter more than confirmation.
Marking points:
- Meaning: Blocking send waits until the message is received (or accepted by the link); blocking receive waits until a message is available
- Merits: Simple to program and reason about; implicit synchronization (with both blocking, a rendezvous: sender knows the message arrived); no buffering needed (zero capacity works); flow control is automatic
- Demerits: Less concurrency: a process waits even when it has other work; a slow or failed partner can block the other indefinitely; risk of deadlock if both wait on each other
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-13
Unit: 2 Processes
Topic: Processes and IPC
Type: true/false
Based on: imitates the professor's TRUE/FALSE correct-and-justify items (OSN End 2022 Q1, AOS End 2025 Q1); same section as PYQ-23
In syllabus: yes
Question: TRUE or FALSE, correct if false and justify: "A process in the waiting state moves directly to the running state when its I/O completes."
Answer: **False.** Corrected: when the I/O completes, the process moves from waiting to *ready*. The completion interrupt only makes it eligible to run; the CPU may be busy with another process, and the short-term scheduler must pick it from the ready queue before it runs.
Marking points:
- States FALSE.
- Corrected: when the I/O completes, the process moves from waiting to ready.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-14
Unit: 2 Processes
Topic: Processes and IPC
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025); same section as PYQ-24, PYQ-25, PYQ-26, PYQ-27
In syllabus: yes
Question: Why must the short-term scheduler be fast, while the long-term scheduler can afford to be slow? Support your answer with a calculation.
Answer: The short-term scheduler runs at least once every 100 ms, and every run is overhead. If each decision took 10 ms, then 10/(100+10) ≈ 9% of CPU time would be spent just choosing, not executing. So it must be very fast.

The long-term scheduler runs only when a process leaves the system, which may be minutes apart. It can take time to choose carefully, and a careful choice (a good mix of I/O-bound and CPU-bound jobs) pays off for the whole time those jobs are in memory.
Marking points:
- The short-term scheduler runs at least once every 100 ms, and every run is overhead.
- If each decision took 10 ms, then 10/(100+10) ≈ 9% of CPU time would be spent just choosing, not executing.
- So it must be very fast.
- The long-term scheduler runs only when a process leaves the system, which may be minutes apart.
- It can take time to choose carefully, and a careful choice (a good mix of I/O-bound and CPU-bound jobs) pays off for the whole time those jobs are in memory.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-15
Unit: 2 Processes
Topic: Processes and IPC
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025)
In syllabus: yes
Question: A program calls fork() once and then prints 200 lines, each containing its pid. How many lines appear in total, and in what order? If a program calls fork() three times in sequence, how many processes exist at the end?
Answer: **400 lines.** After fork(), parent and child both continue at the next statement, each with its own copy of the address space, so each prints 200 lines with its own pid. The order is unpredictable: the lines interleave according to how the scheduler switches between the two processes.

**Three forks give 8 processes.** Each fork doubles the number of processes executing it, so 2^3 = 8 processes in total, of which 7 are newly created.
Marking points:
- Final answer: Three forks give 8 processes: Each fork doubles the number of processes executing it, so 2^3 = 8 processes in total, of which 7 are newly created.
- 400 lines: After fork(), parent and child both continue at the next statement, each with its own copy of the address space, so each prints 200 lines with its own pid.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-16
Unit: 2 Processes
Topic: Processes and IPC
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-30, PYQ-31
In syllabus: yes
Question: In the shared-memory bounded-buffer solution with buffer size N, why can the buffer hold at most N − 1 items? What are the weaknesses of this solution?
Answer: The empty condition is `in == out`. If all N slots could be filled, `in` would wrap around to equal `out` again, and "full" would look identical to "empty". So "full" is defined as `(in+1) % N == out`, one slot early, and one slot always stays unused.

**Weaknesses.** The producer and consumer busy-wait in empty loops, wasting CPU. Using all N slots needs a shared counter updated by both processes, which creates a race condition without synchronization. Correctness rests entirely on the programmer, since the OS only provides the shared region.
Marking points:
- Weaknesses: The producer and consumer busy-wait in empty loops, wasting CPU.
- The empty condition is in == out.
- If all N slots could be filled, in would wrap around to equal out again, and "full" would look identical to "empty".
- So "full" is defined as (in+1) % N == out, one slot early, and one slot always stays unused.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-17
Unit: 2 Processes
Topic: Processes and IPC
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-30, PYQ-31
In syllabus: yes
Question: Compare direct and indirect communication in message passing. P1, P2 and P3 share mailbox A; P1 sends and both P2 and P3 execute receive. Who gets the message? Give the possible solutions.
Answer: **Direct:** processes name each other (send(P, msg), receive(Q, msg)). The link is established automatically, with exactly one link per pair. Addressing can be symmetric or asymmetric (receive(id, msg) from any sender). Disadvantage: names are hard-coded, so changing a process's name breaks every process that refers to it.

**Indirect:** messages go through mailboxes (send(A, msg), receive(A, msg)). A link exists only if the processes share a mailbox; a pair can have several links, and a link can involve more than two processes. The mailbox owner can pass ownership and privileges to others through system calls. This is more flexible.

**Who gets the message:** with plain indirect communication it is ambiguous. Solutions: allow a link to be associated with at most two processes; allow only one process at a time to execute receive; or let the system select the receiver arbitrarily and notify the sender who received it.
Marking points:
- Direct: processes name each other (send(P, msg), receive(Q, msg)).
- Indirect: messages go through mailboxes (send(A, msg), receive(A, msg)).
- Who gets the message: with plain indirect communication it is ambiguous.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-18
Unit: 2 Processes
Topic: Processes and IPC
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-30, PYQ-31
In syllabus: yes
Question: Process P must continue only after its message has actually reached Q. The link has bounded capacity. Is send() enough? If not, what must P and Q do? What changes with zero capacity?
Answer: With non-zero capacity, send() returns once the message is queued in the link, so P does not know whether Q has received it. P and Q need an explicit acknowledgment: P does send(Q, msg) and then receive(Q, ack); Q does receive(P, msg) and then send(P, "ack"). P continues only after the ack arrives.

With zero capacity, no message can wait in the link, so the sender blocks until the receiver takes it (a rendezvous). The completion of send() itself tells P that Q has the message.
Marking points:
- With non-zero capacity, send() returns once the message is queued in the link, so P does not know whether Q has received it.
- P and Q need an explicit acknowledgment: P does send(Q, msg) and then receive(Q, ack); Q does receive(P, msg) and then send(P, "ack").
- P continues only after the ack arrives.
- With zero capacity, no message can wait in the link, so the sender blocks until the receiver takes it (a rendezvous).
- The completion of send() itself tells P that Q has the message.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-19
Unit: 2 Processes
Topic: Processes and IPC
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: A local procedure call executes exactly once. Why is that hard to guarantee for a remote procedure call? Compare at-most-once, at-least-once and exactly-once semantics.
Answer: Over a network, a request or its reply can be lost, and the client cannot tell which. If it resends, the server may run the procedure twice; if it does not, the procedure may never run.

**At-most-once:** delivered once or not at all; no retries, so fast and cheap, but data can be lost (acceptable for sensor readings). **At-least-once:** retry until acknowledged, so nothing is lost, but duplicates are possible; the sender must keep state. **Exactly-once:** neither loss nor duplication, achieved by retries plus duplicate filtering with state on both sides; the most expensive and slowest, and difficult to implement in a distributed system.
Marking points:
- At-most-once: delivered once or not at all; no retries, so fast and cheap, but data can be lost (acceptable for sensor readings).
- Over a network, a request or its reply can be lost, and the client cannot tell which.
- If it resends, the server may run the procedure twice; if it does not, the procedure may never run.
- At-least-once: retry until acknowledged, so nothing is lost, but duplicates are possible; the sender must keep state.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-20
Unit: 2 Processes
Topic: Processes and IPC
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Distinguish ordinary pipes from named pipes. Why does an ordinary pipe require a parent–child relationship? Explain how "ls | more" works.
Answer: **Ordinary pipe:** unidirectional (producer writes fd[1], consumer reads fd[0]); cannot be accessed from outside the process that created it. **Named pipe:** bidirectional, exists by name, needs no relationship, and several processes can use it.

An ordinary pipe has no name. The only way another process can get its descriptors is to inherit them, and that happens through fork(). So the communicating processes must be related.

**ls | more:** the shell creates a pipe, then forks two children. In the first, it connects standard output to the pipe's write end and execs ls; in the second, it connects standard input to the read end and execs more. ls writes its listing into the pipe and more reads and displays it. Neither program knows a pipe is involved, because a pipe looks like a file.
Marking points:
- Ordinary pipe: unidirectional (producer writes fd[1], consumer reads fd[0]); cannot be accessed from outside the process that created it.
- ls | more: the shell creates a pipe, then forks two children.
- Named pipe: bidirectional, exists by name, needs no relationship, and several processes can use it.
- An ordinary pipe has no name.
Answer source: written by Claude, no key
Weak / low priority: no

## Threads

### PYQ-32
Unit: 2 Processes
Topic: Threads
Type: written
Asked in: OSN Quiz 1 2022, Q4 (2 marks); AOS Quiz 1 2025, Q4 (2 marks)
Times asked: 2
Reworded versions: none
In syllabus: yes
Question: Explain how the multi-threading framework can exploit the power of multi-processing architectures as compared to the process framework?
Answer: **Key:** the process framework means a process with a single thread. It can use only a single CPU, as it has only a single stream of execution. Multithreading exploits multiprocessor architectures: as a multithreaded process has several streams of execution, each thread may be running in parallel on a different processor. A single-threaded process can run only on a single CPU, no matter how many are available.

And compared with splitting the work into several processes: threads share the address space, so they are cheaper to create and switch, and communicate through memory without OS intervention.
Marking points:
- the process framework means a process with a single thread.
- It can use only a single CPU, as it has only a single stream of execution.
- Multithreading exploits multiprocessor architectures: as a multithreaded process has several streams of execution, each thread may be running in parallel on a different processor.
- A single-threaded process can run only on a single CPU, no matter how many are available.
Answer source: professor's key
Weak / low priority: no

### PYQ-33
Unit: 2 Processes
Topic: Threads
Type: written
Asked in: OSN Quiz 2 2020, Q4 (4 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Do you agree that "multithreading framework improves both Concurrency and Parallelism on multicore system?" Justify your answer.
Answer: **Yes, but they are different things.** *Concurrency* means more than one task is in progress at a time; it is possible even on a single core, by interleaving. *Parallelism* means more than one task actually executes at the same instant, which needs more than one core.

Threads give concurrency because, on one core, when one thread blocks for I/O another thread of the same application keeps running, so the application stays responsive. On a multicore system, threads also give parallelism: separate threads are scheduled on separate cores and run simultaneously, so the work finishes sooner (data parallelism, distributing subsets of the data; or task parallelism, distributing different operations).

**Qualification:** the gain is limited by Amdahl's law, by the serial fraction of the program and by the challenges of dividing the work, balancing it, splitting the data, managing dependencies and testing.
Marking points:
- Yes, but they are different things: Concurrency means more than one task is in progress at a time; it is possible even on a single core, by interleaving.
- Qualification: the gain is limited by Amdahl's law, by the serial fraction of the program and by the challenges of dividing the work, balancing it, splitting the data, managing dependencies and testing.
- Threads give concurrency because, on one core, when one thread blocks for I/O another thread of the same application keeps running, so the application stays responsive.
- On a multicore system, threads also give parallelism: separate threads are scheduled on separate cores and run simultaneously, so the work finishes sooner (data parallelism, distributing subsets of the data; or task parallelism, distributing different operations).
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-34
Unit: 2 Processes
Topic: Threads
Type: written
Asked in: OSN Mid-sem 2022, Q4 (5 marks); OSN Quiz 2 2020, Q3 (4 marks); OSN Quiz 2 (alt set) 2020, Q3 (not recorded)
Times asked: 3
Reworded versions: "Consider a multiprocessor system and a multi threaded program using many-to-many threading model. Let the number of user-level threads in the program be more than the number of processors in the system. Discuss the performance implications of the following: "The number of kernel threads allocated to the program is less than the number of processors"." (OSN Quiz 2 2020)
In syllabus: yes
Question: Consider a multiprocessor system and a multi threaded program using many-to-many threading model. Let the number of user-level threads in the program be more than the number of processors in the system. Discuss the performance implications of the following scenarios. (i) The number of kernel threads allocated to the program is less than the number of processors. (ii) The number of kernel threads allocated to the program is equal to the number of processors. (iii) The number of kernel threads allocated to the program is greater than the number of processors but less than the number of user-level threads.
Answer: **Key (Mid 2022):** (i) all the processors are not fully utilized; some will not have any work, so the system is underutilized. (ii) All the processors are utilized; however, if a user program executes a blocking system call through a kernel thread, that CPU will be idle. (iii) CPU utilization will be high (modern operating systems): since there are more kernel threads than processors, if one kernel thread is blocked another kernel thread can be allocated to the CPU. Similarly, more than one user-level thread can be attached to each kernel thread, so if a user-level thread makes a blocking system call, another user-level thread can be executed by the kernel thread.

**(i) Fewer kernel threads than processors:** the program cannot use all processors, because a user thread runs only through a kernel thread. Some processors stay idle, so the system is underutilized.

**(ii) Equal:** all processors can be used. But if a user thread makes a *blocking system call*, its kernel thread blocks, and that processor goes idle with no spare kernel thread to take over.

**(iii) More kernel threads than processors (but fewer than user threads):** best utilization. When one kernel thread blocks, another can be scheduled on the CPU; and since several user threads are attached to each kernel thread, when a user thread blocks the library can run another user thread on the same kernel thread. This is what modern operating systems do.
Marking points:
- (i) all the processors are not fully utilized; some will not have any work, so the system is underutilized.
- (i) Fewer kernel threads than processors: the program cannot use all processors, because a user thread runs only through a kernel thread.
- (ii) Equal: all processors can be used.
Answer source: professor's key
Weak / low priority: no

### PYQ-35
Unit: 2 Processes
Topic: Threads
Type: written
Asked in: AOS Mid-sem 2025, Q4 (5 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Assume an OS maps user-level threads to the kernel using the many-to-many model, where the mapping is done through LWPs. The system allows developers to create real-time threads. Is it necessary to bind a real-time thread to an LWP? What will happen if you do not map a real-time thread to an LWP?
Answer: **Yes, it must be bound.** In the many-to-many model, an LWP is the virtual processor: the kernel schedules kernel threads, and a user thread runs only when the thread library attaches it to an LWP. Binding a thread permanently to its own LWP is exactly what the *two-level model* allows.

**If it is not bound:**

- The thread may be **ready but have no LWP** , because the library multiplexes many user threads onto fewer LWPs. It then waits for a virtual processor, and this wait is not bounded, so its deadline can be missed.
- Its **priority is invisible to the kernel** . The kernel schedules LWPs, not user threads, so a real-time priority set inside the library cannot be honoured by the kernel scheduler.
- If another user thread on the same LWP makes a **blocking system call** , the LWP blocks and the real-time thread is stuck behind it.
- The library would have to preempt and re-attach threads, adding unpredictable latency.

**Core sentence:** real-time work needs a guaranteed and predictable CPU share, and only a dedicated LWP (a kernel-scheduled entity) can give that; without it the thread's response time depends on the thread library's multiplexing decisions.
Marking points:
- real-time work needs a guaranteed and predictable CPU share, and only a dedicated LWP (a kernel-scheduled entity) can give that; without it the thread's response time depends on the thread library's multiplexing decisions.
- The thread may be ready but have no LWP , because the library multiplexes many user threads onto fewer LWPs.
- Its priority is invisible to the kernel .
- If another user thread on the same LWP makes a blocking system call , the LWP blocks and the real-time thread is stuck behind it.
- The library would have to preempt and re-attach threads, adding unpredictable latency.
- Yes, it must be bound: In the many-to-many model, an LWP is the virtual processor: the kernel schedules kernel threads, and a user thread runs only when the thread library attaches it to an LWP.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-36
Unit: 2 Processes
Topic: Threads
Type: written
Asked in: OSN Mid-sem 2022, Q1c (2 marks); OSN Quiz 2 2020, Q6 (4 marks)
Times asked: 2
Reworded versions: "What is the purpose of thread pools?" (OSN Quiz 2 2020)
In syllabus: yes
Question: Discuss the concept of thread pools.
Answer: **Key (Mid 2022):** the concept of thread pools is used to increase the efficiency of the operating system. The idea is to create a number of threads at system startup and place them in a pool, where they sit and wait for work. If the pool has no available thread, the server waits until one is free. It is faster to service a request with an existing thread than to wait to create a new thread. A thread pool limits the number of threads at any point, which is important on systems that cannot support a large number of concurrent threads.
Marking points:
- the concept of thread pools is used to increase the efficiency of the operating system.
- The idea is to create a number of threads at system startup and place them in a pool, where they sit and wait for work.
- If the pool has no available thread, the server waits until one is free.
- It is faster to service a request with an existing thread than to wait to create a new thread.
Answer source: professor's key
Weak / low priority: no

### PYQ-37
Unit: 2 Processes
Topic: Threads
Type: true/false
Asked in: AOS End-sem 2025, Q1.5 (1 mark)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: TRUE or FALSE. If FALSE, correct it and justify the corrected sentence; if TRUE, justify it. Fewer than five sentences. "The notion of "Thread pools" is employed to control MPL."
Answer: **False.** MPL is the number of *processes* in memory, and it is controlled by the long-term and medium-term schedulers. A thread pool bounds the number of *threads inside one process*, to avoid the cost of creating a thread per request and to keep a single application from exhausting system resources. Corrected: thread pools control the degree of concurrency within a process, not the degree of multiprogramming.
Marking points:
- States FALSE.
- False: MPL is the number of processes in memory, and it is controlled by the long-term and medium-term schedulers.
- A thread pool bounds the number of threads inside one process, to avoid the cost of creating a thread per request and to keep a single application from exhausting system resources.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-21
Unit: 2 Processes
Topic: Threads
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-32, PYQ-33
In syllabus: yes
Question: What do threads of one process share, and what do they keep private? Why is creating a thread much cheaper than creating a process?
Answer: **Shared:** code section, data section, heap, open files and other OS resources of the process. **Private per thread:** thread id, program counter, register set and stack.

**Cheaper because** creating a process must allocate and initialize a new address space and copy or set up its resources, while a thread reuses the existing address space and resources: only a stack, registers and a small control block are needed. Context switching between threads of one process is also cheaper, since the memory map (and often the TLB contents) need not be changed.

**Four benefits:** responsiveness (the program keeps running while one thread blocks), resource sharing (no explicit IPC needed), economy (cheap creation and switching), scalability (threads run in parallel on multiple cores).
Marking points:
- Shared: code section, data section, heap, open files and other OS resources of the process.
- Cheaper because creating a process must allocate and initialize a new address space and copy or set up its resources, while a thread reuses the existing address space and resources: only a stack, registers …
- Four benefits: responsiveness (the program keeps running while one thread blocks), resource sharing (no explicit IPC needed), economy (cheap creation and switching), scalability (threads run in parallel on multiple cores).
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-22
Unit: 2 Processes
Topic: Threads
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-34, PYQ-35
In syllabus: yes
Question: Compare the many-to-one, one-to-one and many-to-many multithreading models. Which does a modern OS use, and why?
Answer:
| Model | Idea | Strength | Weakness |
| --- | --- | --- | --- |
| Many-to-one | Many user threads on one kernel thread; the library manages everything | Cheap, no kernel involvement | One blocking system call blocks the whole process; no parallelism on multiple cores |
| One-to-one | Each user thread has its own kernel thread (Linux, Windows) | True parallelism; one blocked thread doesn't block others | Every thread costs a kernel thread, so the number must be limited |
| Many-to-many | Many user threads multiplexed onto a smaller or equal number of kernel threads (via LWPs) | Create as many user threads as you like, with real parallelism; blocking is handled by the library | Complex to implement; the developer has less control over which thread runs when |
| Two-level | Many-to-many, but a thread may be *bound* to its own kernel thread | Gives predictability where it is needed, e.g. real-time threads | Same complexity |

Most current systems use one-to-one, because kernel threads are no longer so expensive and the model is simple and gives full parallelism; many-to-many is the more flexible design and is the one exam questions build scenarios on.
Marking points:
- Many-to-one: Many user threads on one kernel thread; the library manages everything
- One-to-one: Each user thread has its own kernel thread (Linux, Windows)
- Many-to-many: Many user threads multiplexed onto a smaller or equal number of kernel threads (via LWPs)
- Two-level: Many-to-many, but a thread may be bound to its own kernel thread
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-23
Unit: 2 Processes
Topic: Threads
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-36, PYQ-37
In syllabus: yes
Question: A multithreaded process calls fork() and then exec(). What should fork duplicate, and why does the answer depend on whether exec follows?
Answer: Some systems provide two versions of fork: one that duplicates **all** threads and one that duplicates only the **calling** thread.

If exec() is called immediately after, duplicating all threads is wasted work, since exec replaces the entire image and all the copied threads are discarded: duplicate only the calling thread. If the child does *not* call exec and is meant to continue the parent's work, duplicating all threads is appropriate.

Related care: a thread that holds a lock at fork time leaves the child with a lock nobody will release, so a child that does not exec must be written carefully.
Marking points:
- Some systems provide two versions of fork: one that duplicates all threads and one that duplicates only the calling thread.
- If exec() is called immediately after, duplicating all threads is wasted work, since exec replaces the entire image and all the copied threads are discarded: duplicate only the calling thread.
- If the child does not call exec and is meant to continue the parent's work, duplicating all threads is appropriate.
- Related care: a thread that holds a lock at fork time leaves the child with a lock nobody will release, so a child that does not exec must be written carefully.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-24
Unit: 2 Processes
Topic: Threads
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-36, PYQ-37
In syllabus: yes
Question: Distinguish asynchronous and deferred thread cancellation. Why do systems prefer deferred cancellation?
Answer: **Asynchronous cancellation:** the target thread is terminated immediately. **Deferred cancellation:** the target checks periodically at cancellation points and terminates itself in an orderly way.

Deferred is preferred because immediate termination can leave the system inconsistent: resources may not be reclaimed, a shared data structure may be left half-updated, and locks the thread holds are never released, which can deadlock the rest of the process. With deferred cancellation the thread cancels at a safe point, after releasing locks and freeing resources.
Marking points:
- Asynchronous cancellation: the target thread is terminated immediately.
- Deferred cancellation: the target checks periodically at cancellation points and terminates itself in an orderly way.
- Deferred is preferred because immediate termination can leave the system inconsistent: resources may not be reclaimed, a shared data structure may be left half-updated, and locks the thread holds are never released, which can deadlock the rest of the process.
- With deferred cancellation the thread cancels at a safe point, after releasing locks and freeing resources.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-25
Unit: 2 Processes
Topic: Threads
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Blocks 9 and 10; same section as PYQ-36, PYQ-37
In syllabus: yes
Question: Using Blocks 9 and 10, explain why a context switch between two threads of the same process is much cheaper than one between two processes.
Answer: **Same in both:** save and restore registers, program counter and stack pointer (in the PCB or thread control block), and run the scheduler.

**Only between processes:** the address space changes, so the OS must switch the page-table base register; on a CPU with an untagged TLB the **TLB is flushed**, so the new process starts with TLB misses, each costing extra memory accesses for the page-table walk (Block 9's effective access time falls). The new process's working set is also not in the CPU caches, so it suffers cache misses, and if its pages were stolen it may page-fault (Block 10).

**Between threads:** same address space, same page tables, so no TLB flush; much of the working set is shared and still cached. The slide quotes Solaris: creating a process is 30 times slower than creating a thread, and context switching is 30 times slower.
Marking points:
- Same in both: save and restore registers, program counter and stack pointer (in the PCB or thread control block), and run the scheduler.
- Only between processes: the address space changes, so the OS must switch the page-table base register; on a CPU with an untagged TLB the TLB is flushed, so the new process starts with TLB misses, each costing extra …
- Between threads: same address space, same page tables, so no TLB flush; much of the working set is shared and still cached.
Answer source: written by Claude, no key
Weak / low priority: no

## CPU Scheduling

### PYQ-38
Unit: 2 Processes
Topic: CPU Scheduling
Type: written
Asked in: AOS Mid-sem 2025, Q1e (3 marks); OSN Mid-sem 2022, Q1b (2 marks)
Times asked: 2
Reworded versions: none
In syllabus: yes
Question: Some simple OSs use non-preemptive scheduling. Give an example of a problem that can occur when the OS uses non-preemptive scheduling.
Answer: **Key (Mid 2022):** if the OS uses non-preemptive scheduling, the kernel process cannot be interrupted. As a result, other processes wait for the completion of the kernel process, and the execution time is unpredictable. It is difficult to give the CPU to a high-priority process soon after the interrupt, and difficult to guarantee application-specific time constraints.

Under non-preemptive scheduling a process keeps the CPU until it terminates or blocks; in particular a process running in kernel mode cannot be interrupted.

- **Everything waits behind it.** A long CPU-bound process (or a long kernel operation) makes every other process, including urgent ones, wait until it finishes. Execution time becomes unpredictable, so application-specific time constraints cannot be guaranteed: it is unsuitable for real-time work.
- **Interrupts cannot be acted on promptly.** After an interrupt makes a high-priority process ready, the CPU cannot be given to it soon.
- **Poor interactive response** and, in the worst case, a process in an infinite loop that never yields keeps the machine forever.

**Example to state:** a process computing a Fourier transform for 10 seconds starts running; an interactive editor becomes ready 1 ms later but cannot run until the 10 seconds are over.
Marking points:
- if the OS uses non-preemptive scheduling, the kernel process cannot be interrupted.
- Everything waits behind it.
- Interrupts cannot be acted on promptly.
- Poor interactive response and, in the worst case, a process in an infinite loop that never yields keeps the machine forever.
- Example to state: a process computing a Fourier transform for 10 seconds starts running; an interactive editor becomes ready 1 ms later but cannot run until the 10 seconds are over.
Answer source: professor's key
Weak / low priority: no

### PYQ-39
Unit: 2 Processes
Topic: CPU Scheduling
Type: written
Asked in: OSN Mid-sem 2022, Q1e (2 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Discuss how the following pairs of scheduling criteria conflict in certain settings: CPU utilization and response time.
Answer: **Key:** if CPU utilization increases, it does not mean that response time improves; on the other hand it may get worse. For example, if you run a CPU-bound job, the utilization increases, but the response time of the other processes is affected.

CPU utilization is maximized by keeping the CPU busy and switching as little as possible, which favours long CPU bursts and few context switches. Response time is minimized by switching often, so that every interactive process gets the CPU soon after it becomes ready, and each switch is pure overhead that lowers utilization.

**Example:** running a CPU-bound job keeps utilization very high, but the response time of other processes suffers; conversely, a very small round-robin quantum gives excellent response time while spending a large fraction of the CPU on context switches.
Marking points:
- if CPU utilization increases, it does not mean that response time improves; on the other hand it may get worse.
- Example: running a CPU-bound job keeps utilization very high, but the response time of other processes suffers; conversely, a very small round-robin quantum gives excellent response time while spending a large fraction of the CPU on …
- For example, if you run a CPU-bound job, the utilization increases, but the response time of the other processes is affected.
- CPU utilization is maximized by keeping the CPU busy and switching as little as possible, which favours long CPU bursts and few context switches.
Answer source: professor's key
Weak / low priority: no

### PYQ-40
Unit: 2 Processes
Topic: CPU Scheduling
Type: written
Asked in: OSN Mid-sem 2022, Q1a (2 marks); OSN Quiz 4 2020, Q1 (4 marks)
Times asked: 2
Reworded versions: none
In syllabus: yes
Question: Explain how FCFS CPU scheduler penalizes I/O bound processes.
Answer: **Key (Mid 2022):** in FCFS, if there is one CPU-bound process followed by I/O-bound processes, the CPU-bound process has a long CPU burst cycle and the I/O-bound processes have short CPU burst cycles. The I/O-bound processes have to wait to complete the long CPU burst. In this way FCFS penalizes I/O-bound processes.

I/O-bound processes have short CPU bursts: they need the CPU briefly, then start an I/O and wait. Under FCFS there is no preemption, so if a long CPU-bound process is running, every I/O-bound process must wait for that entire burst to finish just to get a few milliseconds of CPU.

The effect repeats: after its short burst the I/O-bound process goes to the device queue, finishes I/O quickly and returns to the ready queue, only to queue behind the CPU-bound process again. Meanwhile the devices sit idle while the CPU-bound process computes. This is the **convoy effect**: average waiting time rises and both CPU and device utilization suffer.
Marking points:
- in FCFS, if there is one CPU-bound process followed by I/O-bound processes, the CPU-bound process has a long CPU burst cycle and the I/O-bound processes have short CPU burst cycles.
- The I/O-bound processes have to wait to complete the long CPU burst.
- In this way FCFS penalizes I/O-bound processes.
- I/O-bound processes have short CPU bursts: they need the CPU briefly, then start an I/O and wait.
Answer source: professor's key
Weak / low priority: no

### PYQ-41
Unit: 2 Processes
Topic: CPU Scheduling
Type: true/false
Asked in: OSN Quiz 4 (alt set) 2020, Q2 (not recorded)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Identify whether the following statement is TRUE or FALSE. If the statement is FALSE, correct it and justify the corrected sentence. If the statement is TRUE, justify it. Restrict the justification to a few (less than five) sentences. (The statement itself was not copied on the only surviving source, a student answer sheet. The student's answer shows it was a claim about FCFS scheduling that is FALSE because of the convoy effect.)
Answer: **FALSE.** FCFS is not fair to every kind of process: it suffers from the **convoy effect**.

If a long CPU-bound process arrives first, every I/O-bound process queued behind it waits for the whole CPU burst, even though each needs the CPU only briefly. Meanwhile the I/O devices sit idle, so both CPU and device utilization fall and the average waiting time rises.

Corrected statement (in the spirit of the student's answer): "FCFS suffers from the convoy effect, which penalizes I/O-bound processes; SJF and round robin avoid it."
Marking points:
- FALSE, with a corrected statement.
- Names the convoy effect.
- Long CPU-bound process ahead makes short I/O-bound processes wait.
- Devices idle, utilization falls, average waiting time rises.
- SJF or RR avoid it.
Answer source: student answers
Weak / low priority: no

### PYQ-42
Unit: 2 Processes
Topic: CPU Scheduling
Type: written
Asked in: AOS Mid-sem 2025, Q6 (5 marks); OSN Mid-sem 2022, Q6 (5 marks); OSN Quiz 4 2020, Q2 (10 marks)
Times asked: 3
Reworded versions: "Consider a variation of round robin we will call progressive round robin. In progressive round-robin, each process has its own time quantum. This starts out at 50ms, and increases by 50 ms each time it goes through the round-robin queue. Give the advantages and disadvantages of this variant over ordinary-round robin with respect to the users of batch jobs and interactive jobs." (OSN Quiz 4 2020)
In syllabus: yes
Question: A system is receiving both batch jobs and interactive jobs. Normally, round robin makes the users of interactive jobs happy. Consider a variation of round robin we will call progressive round robin. In progressive round-robin, each process has its own time quantum. This starts out at 50ms, and increases by 50 ms each time it goes through the round-robin queue. Give the advantages and disadvantages of this variant over ordinary-round robin with respect to the users of batch jobs and interactive jobs.
Answer: **Key (ordinary round robin):** independent of burst time, ordinary round robin gives equal priority to all kinds of jobs. As a result, interactive processes, which have bursts less than the time quantum, are processed with good response time. A process is guaranteed to get the CPU slot after (time quantum × (MPL − 1)). The interactive processes receive higher priority than batch processes; the performance of batch processes suffers if more interactive processes start arriving. This is unfair for batch jobs.

**Key (progressive round robin):** processes are processed like FIFO. As the time quantum increases, the batch job consumes CPU time; as a result, the interactive processes may have to wait for a longer time as compared to ordinary round robin. The batch processes receive fair treatment as compared to ordinary round robin. The negative point is that one batch job with a long burst time may force everyone to wait, resulting in the convoy effect, which is not possible in ordinary round robin.

**Ordinary round robin.** Independent of burst time, it gives equal priority to all kinds of jobs. Interactive processes, whose bursts are shorter than the quantum, finish within their slice and so get good response time; a process is guaranteed the CPU within (quantum × (MPL−1)). Interactive processes effectively receive higher priority than batch processes, and batch performance suffers as more interactive processes arrive: unfair to batch jobs.

**Progressive round robin.** As the quantum grows, long-running processes are treated more and more like FIFO. Batch jobs keep the CPU for longer stretches, so they get fairer treatment and fewer context switches (less overhead for long jobs). The cost is that an interactive process may have to wait behind a batch job's large quantum, so response time is worse than under ordinary round robin. In the worst case one long batch job's huge quantum makes everyone wait: a **convoy effect**, which cannot happen with ordinary round robin.

|  | Ordinary RR | Progressive RR |
| --- | --- | --- |
| Interactive users | Good response time | Worse: may wait through large quanta |
| Batch users | Unfair, suffers as interactive load grows | Fairer, fewer context switches |
| Overhead | More context switches | Fewer for long jobs |
| Risk | — | Convoy effect |
Marking points:
- independent of burst time, ordinary round robin gives equal priority to all kinds of jobs.
- processes are processed like FIFO.
- Ordinary round robin: Independent of burst time, it gives equal priority to all kinds of jobs.
- Progressive round robin: As the quantum grows, long-running processes are treated more and more like FIFO.
Answer source: professor's key
Weak / low priority: no

### PYQ-43
Unit: 2 Processes
Topic: CPU Scheduling
Type: written
Asked in: OSN Mid-sem 2022, Q1d (2 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Consider a system implementing multilevel queue scheduling. What strategy can a computer user employ to maximize the amount of CPU time allocated to the user's process?
Answer: **Key:** in multilevel scheduling there are multiple queues, each with a limit on the time quantum; the time quantum increases as the queue level increases. A new process is assigned to the first queue; if its burst exceeds the quantum, it is pushed to the next-level queue. A job in a lower queue is not taken up until the higher-level queues are empty. **Strategy for the user:** program the process so that its burst time is less than the time quantum of the first queue.

That is, break the computation into short bursts with a voluntary I/O or yield (for example a trivial I/O) before the quantum runs out: the process keeps being treated as interactive, stays in the top queue and is always served first.
Marking points:
- in multilevel scheduling there are multiple queues, each with a limit on the time quantum; the time quantum increases as the queue level increases.
- A new process is assigned to the first queue; if its burst exceeds the quantum, it is pushed to the next-level queue.
- A job in a lower queue is not taken up until the higher-level queues are empty.
- Strategy for the user: program the process so that its burst time is less than the time quantum of the first queue.
Answer source: professor's key
Weak / low priority: no

### PYQ-44
Unit: 2 Processes
Topic: CPU Scheduling
Type: true/false
Asked in: AOS End-sem 2025, Q1.10 (1 mark); OSN End-sem 2022, Q1.1 (1 mark); OSN Quiz 4 2020, Q4 (4 marks)
Times asked: 3
Reworded versions: none
In syllabus: yes
Question: Identify whether the following statement is TRUE or FALSE. If the statement is FALSE, correct it and justify the corrected sentence. If the statement is TRUE, justify it. Restrict the justification to a few (less than five) sentences. "As compared to CPU-bound process, OS gives higher priority for I/O bound process."
Answer: **Key: TRUE.** The I/O-bound processes require short CPU bursts. To improve CPU and I/O utilization, the OS gives high priority to I/O-bound processes.

**True** for general-purpose operating systems. An I/O-bound process uses only a short CPU burst and then releases the CPU to wait for a device, so giving it the CPU first costs very little and has two benefits: the I/O devices are kept busy in parallel with computation, improving overall utilization and throughput, and interactive users get good response time. A CPU-bound process would otherwise hold the CPU for a long burst while the devices idle.

Mechanisms: priority computed from recent CPU usage (UNIX), or multilevel feedback queues where a process that uses its full quantum is demoted. CPU-bound processes are not starved, because priority rises again while they wait (aging).
Marking points:
- States TRUE.
- The I/O-bound processes require short CPU bursts.
- True for general-purpose operating systems.
Answer source: professor's key
Weak / low priority: no

### PYQ-45
Unit: 2 Processes
Topic: CPU Scheduling
Type: written
Asked in: OSN End-sem 2022, Q3 (5 marks); OSN End-sem (question list) 2021, Q1 (not given); OSN Quiz 4 (alt set) 2020, Q3 (not recorded)
Times asked: 3
Reworded versions: none
In syllabus: yes
Question: The kernel of a multiprogramming system classifies a program as CPU-bound or I/O-bound and assigns appropriate priority to it. What would be the consequence of a wrong classification of programs for throughput and response times in a multi-programming system?
Answer: **Key:** normally the system gives high priority to I/O-bound programs. The I/O-bound programs get good response times, and good throughput is realized for CPU-bound programs. Suppose the system considers CPU-bound programs as I/O-bound and vice versa. Then the system gives high priority to CPU-bound programs. The ready queue will have more I/O-bound programs waiting. As a result, **I/O utilization will decrease**. The I/O-bound users wait a long time, i.e. they realize **longer response times**. If there is a continuous stream of CPU-bound processes, the I/O-bound processes **starve** for CPU cycles. The throughput of I/O-bound processes will decrease and the throughput of CPU-bound processes will increase.

**Add for full marks:** overall system throughput also falls, because the devices sit idle while the CPU-bound jobs run (the convoy effect), and CPU and I/O no longer overlap. A partial misclassification (only some programs wrong) gives the same effect in proportion. Schedulers that classify dynamically (MLFQ, UNIX's recent-CPU-usage priority) correct a wrong classification automatically, because a "CPU-bound" job that actually does short bursts rises again.
Marking points:
- normally the system gives high priority to I/O-bound programs.
- Add for full marks: overall system throughput also falls, because the devices sit idle while the CPU-bound jobs run (the convoy effect), and CPU and I/O no longer overlap.
- The I/O-bound programs get good response times, and good throughput is realized for CPU-bound programs.
- Suppose the system considers CPU-bound programs as I/O-bound and vice versa.
Answer source: professor's key
Weak / low priority: no

### PYQ-46
Unit: 2 Processes
Topic: CPU Scheduling
Type: written
Asked in: OSN Mid-sem 2022, Q3 (5 marks); OSN Quiz 2 2020, Q5 (4 marks)
Times asked: 2
Reworded versions: "Suppose a CPU scheduling algorithm favors those programs that have used little processor time in the recent past. Explain why this algorithm favors I/O-bound processes and yet does not permanently deny processor time to CPU-bound processes?" (OSN Quiz 2 2020)
In syllabus: yes
Question: Explain the terms "CPU-bound process" and "I/O bound process" through examples. Suppose a CPU scheduling algorithm favors those programs that have used little processor time in the recent past. Explain why this algorithm favours I/O-bound processes and yet does not permanently deny processor time to CPU-bound processes?
Answer: **Key:** a CPU-bound process uses significant CPU time, for example computing a fast Fourier transform. An I/O-bound process uses little processor time, for example reading a file. Suppose the ready queue contains both. If the CPU gives priority to I/O-bound processes, it finishes them quickly and the remaining time is used for CPU-bound processes; in this way both I/O utilization and CPU utilization are improved. Otherwise, if the processor gave priority to processes that consumed more CPU time in the past, I/O processes would not get CPU time while there are CPU-bound processes in the ready queue.

**CPU-bound:** spends most of its time computing, with long CPU bursts; example, computing a fast Fourier transform. **I/O-bound:** spends most of its time waiting for I/O, with short CPU bursts; example, a program reading a file, or an editor.

**Why it favours I/O-bound processes:** they use little CPU time by nature, so their recent-usage measure stays low and their priority stays high. They get the CPU quickly, do their short burst, and go back to I/O. This is good for the system: I/O-bound processes are finished quickly and the devices are kept busy, while the remaining time goes to CPU-bound work, improving both I/O and CPU utilization.

**Why CPU-bound processes are not starved:** the measure is of *recent* usage. A CPU-bound process that is denied the CPU stops accumulating compute time, so its recent usage decays and its priority rises until it is scheduled. It is a negative-feedback loop: using the CPU lowers your priority, waiting raises it. (This is exactly the UNIX compute-to-real-time ratio scheme, and the same idea as aging.)
Marking points:
- a CPU-bound process uses significant CPU time, for example computing a fast Fourier transform.
- CPU-bound: spends most of its time computing, with long CPU bursts; example, computing a fast Fourier transform.
- Why it favours I/O-bound processes: they use little CPU time by nature, so their recent-usage measure stays low and their priority stays high.
- Why CPU-bound processes are not starved: the measure is of recent usage.
Answer source: professor's key
Weak / low priority: no

### PYQ-47
Unit: 2 Processes
Topic: CPU Scheduling
Type: true/false
Asked in: AOS End-sem 2025, Q1.6 (1 mark)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: TRUE or FALSE. If FALSE, correct it and justify the corrected sentence; if TRUE, justify it. Fewer than five sentences. "The notion of "load balancing" counteracts with the notion of "processor affinity"."
Answer: **True.** Processor affinity keeps a thread on the processor whose cache already holds its data, avoiding the cost of repopulating a new cache (and TLB). Load balancing moves threads between processors, by push or pull migration, to keep all of them busy. Every migration destroys the affinity benefit, so a scheduler has to trade one against the other: migrate only when the imbalance is large enough to be worth the lost cache warmth.
Marking points:
- States TRUE.
- True: Processor affinity keeps a thread on the processor whose cache already holds its data, avoiding the cost of repopulating a new cache (and TLB).
- Load balancing moves threads between processors, by push or pull migration, to keep all of them busy.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-48
Unit: 2 Processes
Topic: CPU Scheduling
Type: written
Asked in: OSN Quiz 4 2020, Q3 (6 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Explain the application of priority inheritance protocol?
Answer: **The problem it solves is priority inversion.** A low-priority process L holds a lock that a high-priority process H needs. H blocks. A medium-priority process M, which needs no lock, preempts L. Now H waits indirectly behind M, so a high-priority process is effectively running at low priority, and the inversion can last arbitrarily long. In a real-time system this causes missed deadlines (the classic case is the Mars Pathfinder resets).

**The protocol:** a process holding a resource that a higher-priority process needs *temporarily inherits* the higher priority, until it releases the resource, then returns to its own priority. L now runs at H's priority, so M cannot preempt it; L finishes the critical section quickly, releases the lock, and H proceeds.

**Application:** any system where priorities and shared resources coexist, especially real-time and embedded systems; Solaris uses it with turnstiles, and it appears in real-time kernels and priority-based mutexes.
Marking points:
- The problem it solves is priority inversion.
- The protocol: a process holding a resource that a higher-priority process needs temporarily inherits the higher priority, until it releases the resource, then returns to its own priority.
- Application: any system where priorities and shared resources coexist, especially real-time and embedded systems; Solaris uses it with turnstiles, and it appears in real-time kernels and priority-based mutexes.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-49
Unit: 2 Processes
Topic: CPU Scheduling
Type: written
Asked in: OSN Mid-sem 2022, Q5 (5 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: UNIX is unsuitable for real-time applications because a process executing in kernel mode may not be interrupted. Explain the reasons.
Answer: **The design:** traditional UNIX has a non-preemptive kernel. A process inside a system call runs until it blocks or returns to user mode; an interrupt is serviced, but if it makes a higher-priority process ready, the switch is deferred until the current process leaves the kernel. This keeps kernel data consistent without locks on a uniprocessor.

**Why that rules out real time:**

- **Unbounded dispatch latency:** a real-time process that becomes ready must wait for whatever system call the current process is in. Some system calls are long (large reads and writes, fork, exec), so the wait is long and, worse, unpredictable; a hard deadline cannot be guaranteed. Solaris measures 100 ms dispatch latency without kernel preemption against 2 ms with it.
- **Priority inversion:** a low-priority process in the kernel holding a resource delays a high-priority one, and nothing raises its priority.
- **Time-sharing priorities decay:** UNIX lowers the priority of processes that use the CPU (recent CPU usage), which suits interactive fairness but contradicts real-time needs, where a critical process's priority must not degrade.
- Other unpredictable delays: demand paging and swapping, and the buffer cache's delayed writes.

**Fixes:** preemption points in long system calls, or a fully preemptible kernel with locks around shared kernel data, plus fixed real-time priorities and priority inheritance (Solaris, modern Linux).

No key page exists for this question in the scanned Mid 2022 key; this is my own answer, built from the slides.
Marking points:
- Unbounded dispatch latency: a real-time process that becomes ready must wait for whatever system call the current process is in.
- Priority inversion: a low-priority process in the kernel holding a resource delays a high-priority one, and nothing raises its priority.
- Time-sharing priorities decay: UNIX lowers the priority of processes that use the CPU (recent CPU usage), which suits interactive fairness but contradicts real-time needs, where a critical process's priority must …
- Other unpredictable delays: demand paging and swapping, and the buffer cache's delayed writes.
- The design: traditional UNIX has a non-preemptive kernel.
- Fixes: preemption points in long system calls, or a fully preemptible kernel with locks around shared kernel data, plus fixed real-time priorities and priority inheritance (Solaris, modern Linux).
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-50
Unit: 2 Processes
Topic: CPU Scheduling
Type: written
Asked in: OSN Quiz 4 (alt set) 2020, Q4 (not recorded)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Why are preemption points included in system calls? (as copied on a student answer sheet)
Answer: In a non-preemptive kernel, a high-priority (for example real-time) process that becomes ready must wait until the running process's system call completes, which can take long and makes dispatch latency large and unpredictable.

A **preemption point** is a place inside a long system call where kernel data structures are in a consistent state, so it is safe to switch. At each such point the kernel checks whether a higher-priority process is waiting; if so, it preempts the current process there and dispatches the high-priority one. This bounds dispatch latency to the longest stretch between preemption points, instead of the longest system call, without making the whole kernel preemptible.

**Limitation:** only a few safe points can be placed in practice, so latency is reduced but not small; the full solution is a preemptible kernel with all kernel data protected by locks.
Marking points:
- Limitation: only a few safe points can be placed in practice, so latency is reduced but not small; the full solution is a preemptible kernel with all kernel data protected by locks.
- In a non-preemptive kernel, a high-priority (for example real-time) process that becomes ready must wait until the running process's system call completes, which can take long and makes dispatch latency large and unpredictable.
- A preemption point is a place inside a long system call where kernel data structures are in a consistent state, so it is safe to switch.
- At each such point the kernel checks whether a higher-priority process is waiting; if so, it preempts the current process there and dispatches the high-priority one.
- This bounds dispatch latency to the longest stretch between preemption points, instead of the longest system call, without making the whole kernel preemptible.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-51
Unit: 2 Processes
Topic: CPU Scheduling
Type: written
Asked in: OSN Quiz 3 (set 2) 2020, Q2 (4 marks)
Times asked: 1
Reworded versions: none
In syllabus: no: research-paper question; the end-sem topic list names no research papers
Question: Describe the scheduling algorithm followed in UNIX.
Answer: UNIX uses **priority scheduling with negative feedback**. Each user process's priority is computed from the ratio of compute time to real time it has consumed recently: a process that used a lot of CPU gets a lower priority. The priorities are recomputed every second; processes of equal priority are served round robin; a higher-priority process preempts a lower one (at the next return from the kernel). System processes waiting for events have fixed priorities, ordered disk events above teletype events above time-of-day events, all above user processes.

**Effect:** interactive and I/O-bound processes, which use little CPU, keep high priority and get fast response; CPU-bound processes sink but their priority recovers as their recent usage decays, so they are not starved. It is the mechanism behind q2 and q6 above.
Marking points:
- Effect: interactive and I/O-bound processes, which use little CPU, keep high priority and get fast response; CPU-bound processes sink but their priority recovers as their recent usage decays, so they are not starved.
- UNIX uses priority scheduling with negative feedback.
- Each user process's priority is computed from the ratio of compute time to real time it has consumed recently: a process that used a lot of CPU gets a lower priority.
- The priorities are recomputed every second; processes of equal priority are served round robin; a higher-priority process preempts a lower one (at the next return from the kernel).
- System processes waiting for events have fixed priorities, ordered disk events above teletype events above time-of-day events, all above user processes.
Answer source: written by Claude, no key
Weak / low priority: yes: from the UNIX research paper; the end-sem list names no research papers. The idea (priority from recent CPU usage) is still worth one line in the I/O-bound questions.

### PRED-26
Unit: 2 Processes
Topic: CPU Scheduling
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-39
In syllabus: yes
Question: Define the five scheduling criteria and say which ones a batch system and an interactive system each care about most. Why is the quantum's size a trade-off?
Answer: **Criteria:** CPU utilization (keep the CPU busy, maximize); throughput (processes completed per unit time, maximize); turnaround time (submission to completion, minimize); waiting time (time in the ready queue, minimize; this is what the scheduler actually affects); response time (request to first response, minimize).

A **batch** system optimizes utilization, throughput and turnaround. An **interactive** system optimizes response time, and variance in response time matters too: predictable is better than fast-on-average.

**Quantum:** too large and round robin degenerates into FCFS, so response time suffers; too small and context-switch overhead consumes a large share of the CPU (if the switch costs 10% of the quantum, 10% of the CPU is wasted). Rule of thumb: the quantum should be long enough that about 80% of CPU bursts finish inside it.
Marking points:
- Criteria: CPU utilization (keep the CPU busy, maximize); throughput (processes completed per unit time, maximize); turnaround time (submission to completion, minimize); waiting time (time in the ready queue, minimize; this is what the scheduler actually affects) …
- Quantum: too large and round robin degenerates into FCFS, so response time suffers; too small and context-switch overhead consumes a large share of the CPU (if the switch costs 10% of the quantum, 10% …
- A batch system optimizes utilization, throughput and turnaround.
- An interactive system optimizes response time, and variance in response time matters too: predictable is better than fast-on-average.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-27
Unit: 2 Processes
Topic: CPU Scheduling
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025); same section as PYQ-40
In syllabus: yes
Question: Processes P1, P2, P3 arrive at time 0 with bursts 24, 3 and 3 ms. Compute average waiting and turnaround time for FCFS (in that order), SJF, and RR with quantum 4 ms.
Answer:
| Policy | Schedule | Waiting times | Avg waiting | Avg turnaround |
| --- | --- | --- | --- | --- |
| FCFS | P1 0–24, P2 24–27, P3 27–30 | 0, 24, 27 | **17 ms** | (24+27+30)/3 = **27 ms** |
| SJF | P2 0–3, P3 3–6, P1 6–30 | 6, 0, 3 | **3 ms** | (30+3+6)/3 = **13 ms** |
| RR, q = 4 | P1 0–4, P2 4–7, P3 7–10, P1 10–30 | P1: 10−4 = 6; P2: 4; P3: 7 | **5.66 ms** | (30+7+10)/3 = **15.66 ms** |

**Reading of the result:** FCFS suffers the convoy effect because the long job is first. SJF is provably optimal for average waiting time, but needs the burst lengths, which are not known in advance (they are estimated by exponential averaging τn₊1 = α·tn + (1−α)·τn). RR sits in between and gives much better response time, at the cost of context switches; the rule of thumb is that 80% of bursts should be shorter than the quantum.
Marking points:
- Reading of the result: FCFS suffers the convoy effect because the long job is first.
- FCFS: P1 0–24, P2 24–27, P3 27–30
- SJF: P2 0–3, P3 3–6, P1 6–30
- RR, q = 4: P1 0–4, P2 4–7, P3 7–10, P1 10–30
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-28
Unit: 2 Processes
Topic: CPU Scheduling
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025); same section as PYQ-40
In syllabus: yes
Question: P1 (arrival 0, burst 8), P2 (1, 4), P3 (2, 9), P4 (3, 5). Draw Gantt charts and compute the average waiting time for (a) non-preemptive SJF and (b) preemptive SJF (SRTF).
Answer: **(a) Non-preemptive SJF:** at 0 only P1 is there, so it runs 0–8. Then the shortest waiting: P2 8–12, P4 12–17, P3 17–26.

Waiting = start − arrival: P1 0, P2 8 − 1 = 7, P4 12 − 3 = 9, P3 17 − 2 = 15. Average = 31 / 4 = **7.75 ms**.

**(b) SRTF:** P1 runs 0–1; at 1, P2 (4) is shorter than P1's remaining 7, so P2 runs 1–5 (P3 and P4 arrive meanwhile but are not shorter than P2's remaining time); then the shortest remaining: P4 (5) 5–10, P1 (7) 10–17, P3 (9) 17–26.

Waiting = completion − arrival − burst: P1 17 − 0 − 8 = 9, P2 5 − 1 − 4 = 0, P3 26 − 2 − 9 = 15, P4 10 − 3 − 5 = 2. Average = 26 / 4 = **6.5 ms**.

Preemption lets a newly arrived short job jump ahead, cutting the average from 7.75 to 6.5 ms, at the cost of more context switches and the possibility that a long job starves.
Marking points:
- Final answer: Average = 26 / 4 = 6.5 ms.
- (a) Non-preemptive SJF: at 0 only P1 is there, so it runs 0–8.
- (b) SRTF: P1 runs 0–1; at 1, P2 (4) is shorter than P1's remaining 7, so P2 runs 1–5 (P3 and P4 arrive meanwhile but are not shorter than P2's remaining time); then the shortest remaining: P4 …
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-29
Unit: 2 Processes
Topic: CPU Scheduling
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025); same section as PYQ-40
In syllabus: yes
Question: With α = 1/2 and τ0 = 10 ms, the actual CPU bursts are 6, 4, 6, 4, 13, 13, 13 ms. Compute the predictions τ1 to τ7. What do α = 0 and α = 1 mean?
Answer: τn+1 = ½ tn + ½ τn:

| n | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| actual tn | 6 | 4 | 6 | 4 | 13 | 13 | 13 |  |
| predicted τn | 10 | 8 | 6 | 6 | 5 | 9 | 11 | 12 |

(τ1 = (6 + 10)/2 = 8; τ2 = (4 + 8)/2 = 6; τ3 = (6 + 6)/2 = 6; τ4 = (4 + 6)/2 = 5; τ5 = (13 + 5)/2 = 9; τ6 = (13 + 9)/2 = 11; τ7 = (13 + 11)/2 = 12.)

**α = 0:** τn+1 = τn, recent history does not count. **α = 1:** τn+1 = tn, only the last burst counts. Expanding the formula, each older burst's weight shrinks by (1 − α), so the prediction tracks a change in behaviour (here from short to long bursts) within a few bursts.
Marking points:
- Final answer: α = 1: τn+1 = tn, only the last burst counts.
- α = 0: τn+1 = τn, recent history does not count.
- predicted τn: 10
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-30
Unit: 2 Processes
Topic: CPU Scheduling
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-42
In syllabus: yes
Question: Priority scheduling can starve low-priority processes. What is the standard remedy, and why does it work? How is a multilevel feedback queue related?
Answer: **Remedy: aging.** Gradually increase the priority of a process that has been waiting a long time. Since a waiting process's priority keeps rising, it must eventually become the highest-priority runnable process and be scheduled, so no process waits forever. (The legend: an IBM 7094 shut down in 1973 was found to have a low-priority job submitted in 1967 that had never run.)

**Multilevel feedback queues** implement the same idea with movement between queues: a process that uses its whole quantum is demoted to a lower-priority queue with a larger quantum, and a process that waits too long in a low queue is promoted. This automatically favours short, interactive (I/O-bound) processes while preventing starvation of long ones. Its parameters: number of queues, the algorithm in each queue, the rules for promotion and demotion, and which queue a new process enters.
Marking points:
- Remedy: aging: Gradually increase the priority of a process that has been waiting a long time.
- Multilevel feedback queues implement the same idea with movement between queues: a process that uses its whole quantum is demoted to a lower-priority queue with a larger quantum, and a process that waits too long …
- Remedy: aging.
- Since a waiting process's priority keeps rising, it must eventually become the highest-priority runnable process and be scheduled, so no process waits forever.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-31
Unit: 2 Processes
Topic: CPU Scheduling
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-47
In syllabus: yes
Question: Distinguish process-contention scope from system-contention scope. Which models use PCS, and what goes wrong for a high-priority thread under PCS?
Answer: **PCS:** the thread library schedules the user threads of one process onto the available LWPs; threads compete only with threads of the same process, by programmer-assigned priority. Used in the many-to-one and many-to-many models.

**SCS:** the kernel schedules kernel threads onto CPUs; every thread competes with all threads in the system. One-to-one systems (Linux, Windows) use only SCS.

**The problem:** under PCS a high-priority user thread is guaranteed to win only against threads of its own process, and only for an LWP; if the LWPs are all busy or blocked, it waits, and the kernel does not know its priority when choosing among LWPs of different processes. That is why a real-time thread must be bound to its own LWP (Block 2), effectively giving it system-contention scope.
Marking points:
- PCS: the thread library schedules the user threads of one process onto the available LWPs; threads compete only with threads of the same process, by programmer-assigned priority.
- SCS: the kernel schedules kernel threads onto CPUs; every thread competes with all threads in the system.
- The problem: under PCS a high-priority user thread is guaranteed to win only against threads of its own process, and only for an LWP; if the LWPs are all busy or blocked, it waits, and the kernel …
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-32
Unit: 2 Processes
Topic: CPU Scheduling
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025); same section as PYQ-48
In syllabus: yes
Question: P1 has period 50 and processing time 25; P2 has period 80 and processing time 35; deadlines equal periods; both arrive at 0. (a) Can rate-monotonic scheduling meet all deadlines? (b) Can EDF? Show the schedules up to time 160.
Answer: **CPU utilization** = 25/50 + 35/80 = 0.5 + 0.4375 = **0.94**, above the rate-monotonic bound for two processes, 2(2^1/2 − 1) ≈ 0.83, so RMS is not guaranteed to work.

**(a) RMS** (P1 higher priority, shorter period): P1 0–25; P2 25–50 (25 of its 35 done); P1's second instance arrives at 50 and preempts: P1 50–75; P2 75–85. P2 completes at **85 > its deadline 80**: **missed**.

**(b) EDF:** P1 (deadline 50) 0–25; P2 (deadline 80) 25–60: at 50, P1's new instance has deadline 100, later than 80, so P2 continues and finishes at 60 ✓; P1 60–85 (deadline 100 ✓); P2's second instance arrives at 80 (deadline 160) and runs 85–100; at 100 P1's third instance (deadline 150) preempts it: P1 100–125 ✓; P2 125–145 (finishes 145 ≤ 160 ✓). **All deadlines met.**

EDF can schedule any set with utilization ≤ 1 (ignoring switching costs); RMS, with static priorities, is optimal among static schemes but may fail above its bound.
Marking points:
- Final answer: (b) EDF: P1 (deadline 50) 0–25; P2 (deadline 80) 25–60: at 50, P1's new instance has deadline 100, later than 80, so P2 continues and finishes at 60 ✓; P1 60–85 (deadline 100 ✓); P2's second instance arrives at 80 (deadline 160) and runs 85–100; at 100 …
- CPU utilization = 25/50 + 35/80 = 0.5 + 0.4375 = 0.94, above the rate-monotonic bound for two processes, 2(2^1/2 − 1) ≈ 0.83, so RMS is not guaranteed to work.
- (a) RMS (P1 higher priority, shorter period): P1 0–25; P2 25–50 (25 of its 35 done); P1's second instance arrives at 50 and preempts: P1 50–75; P2 75–85.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-33
Unit: 2 Processes
Topic: CPU Scheduling
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025)
In syllabus: yes
Question: On average 7 processes arrive per second, and there are normally 14 processes in the ready queue. What is the average waiting time per process? Why is this result useful even when the distributions are unknown?
Answer: Little's law n = λ × W gives W = n / λ = 14 / 7 = **2 seconds**.

It holds for any scheduling algorithm and any arrival distribution, as long as the system is in steady state (processes leave as fast as they arrive). So given any two of the three quantities, measured or required, the third follows without a detailed model.
Marking points:
- Final answer: Little's law n = λ × W gives W = n / λ = 14 / 7 = 2 seconds.
- It holds for any scheduling algorithm and any arrival distribution, as long as the system is in steady state (processes leave as fast as they arrive).
- So given any two of the three quantities, measured or required, the third follows without a detailed model.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-34
Unit: 2 Processes
Topic: CPU Scheduling
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Blocks 7 and 11
In syllabus: yes
Question: FCFS CPU scheduling, FCFS disk scheduling and FIFO packet scheduling in a router share one weakness. Name it, and show how each layer fixes it with an idea from this block.
Answer: **The weakness:** serving strictly in arrival order lets one large or distant request delay everything behind it: the **convoy effect**, unfairness to small requests and poor utilization of the other resources.

| Layer | FIFO problem | Fix | Same idea as |
| --- | --- | --- | --- |
| CPU (this block) | Short I/O-bound jobs wait behind a long CPU burst | SJF / SRTF; round robin; MLFQ | — |
| Disk (Block 11) | The head zig-zags; total seek is large | SSTF serves the closest request first; SCAN/C-SCAN bound the wait | SSTF = SJF on seek distance, with the same starvation risk; C-SCAN's uniform wait is like RR's bounded wait |
| Router (Block 7) | One greedy flow fills the queue; others starve | Fair queueing: a queue per flow served round robin; weighted fair queueing gives weights | Round robin with per-flow queues; WFQ's byte-by-byte virtual finish times are like a weighted quantum |

The same trade-off reappears each time: favouring short requests improves the average but risks starving long ones, so each fix adds a bound (aging, sweeping, per-flow fairness).
Marking points:
- The weakness: serving strictly in arrival order lets one large or distant request delay everything behind it: the convoy effect, unfairness to small requests and poor utilization of the other resources.
- CPU (this block): Short I/O-bound jobs wait behind a long CPU burst
- Disk (Block 11): The head zig-zags; total seek is large
- Router (Block 7): One greedy flow fills the queue; others starve
Answer source: written by Claude, no key
Weak / low priority: no

## Synchronization

### PYQ-52
Unit: 2 Processes
Topic: Synchronization
Type: written
Asked in: AOS End-sem 2025, Q2.2 (3 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: What is the implication if a solution to the critical section problem does not satisfy the "Progress" condition?
Answer: **Progress** requires that if no process is in its critical section and some processes want to enter, only those not in their remainder sections take part in deciding who goes next, and the decision cannot be postponed indefinitely.

**If it fails:** the critical section can sit *empty* while processes wait to enter it. The resource is idle although it is wanted, so throughput and CPU utilization drop, response time grows, and in the worst case the waiting is indefinite, which is a deadlock or livelock. Also, a process in its remainder section, which has nothing to do with the resource, can influence or block the decision, so a process that has crashed or is slow in non-critical code can stop others from ever entering.

**Classic example:** strict alternation with a shared `turn` variable. If it is P0's turn but P0 stays in its remainder section, P1 cannot enter even though the critical section is free.
Marking points:
- Progress requires that if no process is in its critical section and some processes want to enter, only those not in their remainder sections take part in deciding who goes next, and the decision cannot …
- If it fails: the critical section can sit empty while processes wait to enter it.
- Classic example: strict alternation with a shared turn variable.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-53
Unit: 2 Processes
Topic: Synchronization
Type: written
Asked in: AOS Quiz 2 2025, Q1 (2 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Explain the issue of "busy waiting". What are the implications?
Answer: Busy waiting means a process loops continuously testing a condition (`while (lock) ;`) while waiting to enter its critical section, instead of giving up the CPU. This is what a **spinlock** does.

**Implications:** it wastes CPU cycles that another process could use; in a multiprogrammed single-processor system it is pure loss, because the process that could release the lock cannot run while the waiter spins; it also generates cache-coherence traffic on multiprocessors. The remedy is a blocking implementation: the waiting process calls a `block()` operation, is put on a waiting queue for the semaphore, and is moved back to the ready queue by `wakeup()` when the lock is released.

**But busy waiting is not always wrong:** if the critical section is very short and another core holds the lock, spinning is cheaper than two context switches. That is why multiprocessor kernels use spinlocks.
Marking points:
- Implications: it wastes CPU cycles that another process could use; in a multiprogrammed single-processor system it is pure loss, because the process that could release the lock cannot run while the waiter spins; it also generates …
- But busy waiting is not always wrong: if the critical section is very short and another core holds the lock, spinning is cheaper than two context switches.
- Busy waiting means a process loops continuously testing a condition (while (lock) ;) while waiting to enter its critical section, instead of giving up the CPU.
- This is what a spinlock does.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-54
Unit: 2 Processes
Topic: Synchronization
Type: written
Asked in: AOS End-sem 2025, Q2.3 (3 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: When developing an application, how do you decide whether you should employ "spinlock" or "semaphore"?
Answer: The decision compares two costs: the CPU wasted while spinning, against the cost of two context switches (block and wake up).

| Use a spinlock when | Use a semaphore (blocking lock) when |
| --- | --- |
| The critical section is very short, so the expected spin is shorter than a context switch | The critical section is long, or the holder may sleep or do I/O inside it |
| There are multiple processors, so the holder can be running on another CPU while you spin | Single processor: spinning can never succeed, since the holder cannot run until you yield |
| You are in kernel code where blocking is not allowed (e.g. an interrupt handler) | Contention is high or the wait may be long (waiting for I/O, for a buffer to fill) |
| Lock hold time is predictable and small | Hold time is unpredictable |

Solaris's adaptive mutex is the hybrid: spin if the lock holder is currently running on another CPU, otherwise block.
Marking points:
- The critical section is very short, so the expected spin is shorter than a context switch: The critical section is long, or the holder may sleep or do I/O inside it
- There are multiple processors, so the holder can be running on another CPU while you spin: Single processor: spinning can never succeed, since the holder cannot run until you yield
- You are in kernel code where blocking is not allowed (e.g. an interrupt handler): Contention is high or the wait may be long (waiting for I/O, for a buffer to fill)
- Lock hold time is predictable and small: Hold time is unpredictable
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-55
Unit: 2 Processes
Topic: Synchronization
Type: written
Asked in: OSN Quiz 3 (set 1) 2020, Q3 (4 marks)
Times asked: 1
Reworded versions: none
In syllabus: no: research-paper question; the end-sem topic list names no research papers
Question: What motivated Dijkstra to introduce semaphores?
Answer: **The trigger was interrupts.** In his recollections, Dijkstra describes how interrupts let the processor compute at full speed while devices work, but made execution non-deterministic: interrupts arrive at unpredictable moments, so the same program could behave differently on different runs, and shared data could be left inconsistent. Testing could not cover all interleavings.

**His response:** view the system as a set of **cooperating sequential processes**, each simple and sequential, and give them one primitive to synchronize: a process stops at a specified place until it receives a specific signal. The semaphore, with its atomic P (wait) and V (signal), expresses both mutual exclusion (initial value 1) and condition synchronization or resource counting (initial value 0 or n), and lets a waiting process be suspended instead of probing in a loop.

So semaphores turned "unpredictable interrupts touching shared data" into a structured discipline that can be reasoned about, which was the basis of the THE system.
Marking points:
- The trigger was interrupts: In his recollections, Dijkstra describes how interrupts let the processor compute at full speed while devices work, but made execution non-deterministic: interrupts arrive at unpredictable moments, so the same program could behave differently on different …
- His response: view the system as a set of cooperating sequential processes, each simple and sequential, and give them one primitive to synchronize: a process stops at a specified place until it receives a specific signal.
- In his recollections, Dijkstra describes how interrupts let the processor compute at full speed while devices work, but made execution non-deterministic: interrupts arrive at unpredictable moments, so the same program could behave differently on different runs, and shared data could …
- Testing could not cover all interleavings.
Answer source: written by Claude, no key
Weak / low priority: yes: research-paper question; the end-sem topic list names no research papers

### PYQ-56
Unit: 2 Processes
Topic: Synchronization
Type: written
Asked in: OSN End-sem 2022, Q4 (5 marks); OSN End-sem (question list) 2021, Q2 (not given)
Times asked: 2
Reworded versions: none
In syllabus: yes
Question: Given that the monitor construct protects a critical section by allowing one process at a time, why do you require "c.wait" and "c.signal" operations in the monitor? How are they different from the "wait" and "signal" operations of a semaphore?
Answer: **Key:** there are two kinds of waiting to access a resource. One is **mutual-exclusion waiting** (a fast process has to wait if the buffer is full for writing, and also if the buffer is empty for reading) to avoid a race condition, and the other is **conditional waiting** to avoid inconsistency. The monitor construct takes care of mutual-exclusion waiting, so we do not need the "wait" and "signal" constructs of the semaphore, because by keeping a resource in the monitor the protection is achieved, i.e. there is no danger of more than one process accessing the resource in parallel. However, it does not provide protection against the danger of violating conditional waiting: for example, a producer process cannot overwrite a full buffer, or a consumer process cannot read an empty buffer. To be safe from such actions, "c.wait" and "c.signal" operations are provided in the monitor construct. The usual "wait" and "signal" operations do not provide such safety. So "c.wait" and "c.signal" of the monitor construct are different from "wait" and "signal" of the semaphore.

**The precise differences, worth adding:** c.wait always suspends the caller and **releases the monitor** (a semaphore wait releases nothing, which is why waiting on a semaphore inside a critical section deadlocks); c.signal with no waiter is **lost**, while a semaphore signal is remembered in the counter; and a condition variable has no value, so the condition must be re-tested (usually in a loop) after waking.
Marking points:
- there are two kinds of waiting to access a resource.
- The precise differences, worth adding: c.wait always suspends the caller and releases the monitor (a semaphore wait releases nothing, which is why waiting on a semaphore inside a critical section deadlocks); c.signal with no waiter is lost, while a semaphore …
- One is mutual-exclusion waiting (a fast process has to wait if the buffer is full for writing, and also if the buffer is empty for reading) to avoid a race condition, and the other is conditional waiting to avoid inconsistency.
- The monitor construct takes care of mutual-exclusion waiting, so we do not need the "wait" and "signal" constructs of the semaphore, because by keeping a resource in the monitor the protection is achieved, i.e.
Answer source: professor's key
Weak / low priority: no

### PYQ-57
Unit: 2 Processes
Topic: Synchronization
Type: true/false
Asked in: AOS End-sem 2025, Q1.1 (1 mark)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: TRUE or FALSE. If FALSE, correct it and justify the corrected sentence; if TRUE, justify it. Fewer than five sentences. "There is no difference between "wait" in semaphore and "wait (conditional wait)" in monitor."
Answer: **FALSE.** Corrected: semaphore wait and monitor conditional wait (x.wait) are different.

**Justification:** semaphore wait decrements a counter and blocks only if no signal is available, so it is used for mutual-exclusion waiting and for counting; earlier signals are remembered. Monitor x.wait is for **conditional waiting** only (mutual exclusion is already given by the monitor): it always suspends the caller and releases the monitor, and a signal sent when no one was waiting has no effect, so nothing is remembered. (Professor's End 2022 key: the monitor takes care of mutual-exclusion waiting; c.wait and c.signal provide conditional waiting, which semaphore wait and signal do not.)
Marking points:
- States FALSE.
- Corrected: semaphore wait and monitor conditional wait (x.wait) are different.
- semaphore wait decrements a counter and blocks only if no signal is available, so it is used for mutual-exclusion waiting and for counting; earlier signals are remembered.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-58
Unit: 2 Processes
Topic: Synchronization
Type: true/false
Asked in: OSN End-sem 2022, Q1.2 (1 mark); AOS End-sem 2025, Q1.2 (1 mark); AOS End-sem 2025, Q1.4 (1 mark)
Times asked: 3
Reworded versions: "TRUE or FALSE. If FALSE, correct it and justify the corrected sentence; if TRUE, justify it. Fewer than five sentences. "It is possible to reduce "busy waiting" with monitors over semaphores."" (AOS End-sem 2025 (Q1.4))
In syllabus: yes
Question: Identify whether the following statement is TRUE or FALSE. If the statement is FALSE, correct it and justify the corrected sentence. If the statement is TRUE, justify it. Restrict the justification to a few (less than five) sentences. "With monitors, it is possible to reduce busy waiting over semaphores."
Answer: **Key: FALSE.** With monitors it is easy to develop programs for critical-section problems. The same kind of busy waiting, if any, exists in both structures.

**Corrected statement:** monitors make synchronization easier and less error-prone, but do not reduce busy waiting compared with (blocking) semaphores. A monitor is itself typically implemented with semaphores (mutex, next, x_sem), so whatever busy waiting exists in the semaphore implementation (the short spin protecting wait and signal) exists in the monitor too.

Follow the key here. Your mid-sem question bank argued TRUE "in the sense that matters for correctness"; the professor's answer is FALSE, and it is consistent: both block waiting processes in queues, and both spin only inside their implementation.
Marking points:
- States FALSE.
- With monitors it is easy to develop programs for critical-section problems.
- Corrected statement: monitors make synchronization easier and less error-prone, but do not reduce busy waiting compared with (blocking) semaphores.
Answer source: professor's key
Weak / low priority: no

### PYQ-59
Unit: 2 Processes
Topic: Synchronization
Type: written
Asked in: AOS Quiz 2 2025, Q2 (2 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: For synchronization, Solaris provides system calls related to (i) adaptive mutex and (ii) semaphore. Explain the difference.
Answer: **Adaptive mutex:** protects short critical sections. It starts as a standard spinlock. If the lock is held by a thread *currently running on another CPU*, the waiter spins, because the lock will be released soon and spinning is cheaper than a context switch. If the holder is *not running*, the waiter blocks and sleeps until it is woken. On a single-processor system it always blocks, since spinning could never succeed.

**Semaphore (and condition variables):** used for longer code segments, where a thread is expected to hold the lock for a long time. Here spinning would waste too much CPU, so the waiting thread always sleeps.

**Difference in one line:** the adaptive mutex chooses between spinning and sleeping based on whether the holder is running; the semaphore always sleeps, and suits long critical sections.
Marking points:
- Adaptive mutex: protects short critical sections.
- Semaphore (and condition variables): used for longer code segments, where a thread is expected to hold the lock for a long time.
- Difference in one line: the adaptive mutex chooses between spinning and sleeping based on whether the holder is running; the semaphore always sleeps, and suits long critical sections.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-60
Unit: 2 Processes
Topic: Synchronization
Type: written
Asked in: AOS Quiz 2 2025, Q3 (2 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: For synchronization, Solaris provides the concept of turnstiles. What is the purpose of turnstiles?
Answer: A turnstile is a queue structure holding the threads blocked on a lock (an adaptive mutex or a reader-writer lock). Rather than giving every synchronization object its own queue, each *kernel thread* owns a turnstile, and a thread blocking on a lock lends its turnstile to that lock; the first thread to block on the object provides the queue, and it is returned when no thread is blocked there. This keeps the number of turnstiles proportional to the number of threads, not to the number of locks, which would otherwise be huge.

The turnstile also orders the waiting threads by priority and is the mechanism through which Solaris implements **priority inheritance**: a low-priority thread holding a lock needed by a higher-priority thread inherits that priority through the turnstile until it releases the lock, which avoids priority inversion.
Marking points:
- A turnstile is a queue structure holding the threads blocked on a lock (an adaptive mutex or a reader-writer lock).
- Rather than giving every synchronization object its own queue, each kernel thread owns a turnstile, and a thread blocking on a lock lends its turnstile to that lock; the first thread to block on the object provides the queue …
- This keeps the number of turnstiles proportional to the number of threads, not to the number of locks, which would otherwise be huge.
- The turnstile also orders the waiting threads by priority and is the mechanism through which Solaris implements priority inheritance: a low-priority thread holding a lock needed by a higher-priority thread inherits that priority through the turnstile until it releases …
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-61
Unit: 2 Processes
Topic: Synchronization
Type: written
Asked in: AOS Mid-sem 2025, Q7 (5 marks); OSN Mid-sem 2022, Q7 (5 marks); OSN Quiz 5 2020, Q1 (12 marks); OSN End-sem (question list) 2021, Q13 (not given)
Times asked: 4
Reworded versions: "A single-lane bridge connects the Vermont villages of North Tunbridge and South Tunbridge. Farmers use it to deliver produce by truck. The bridge can become deadlocked if a northbound and a southbound farmer get on the bridge at the same time. Using semaphores, design an algorithm to prevent deadlock." (AOS Mid-sem 2025); "The north/south single-lane bridge problem (the question page is missing from the surviving scan; the professor's key solves it with a monitor)." (OSN Mid-sem 2022); "An old bridge on a busy highway is too narrow to permit two-way traffic, so one-way traffic is to be implemented on ... (the list cuts the statement off here)" (OSN End-sem (question list) 2021)
In syllabus: yes
Question: An old bridge on a busy highway is too narrow to permit two-way traffic, so one-way traffic is to be implemented on the bridge by alternatively permitting vehicles travelling in opposite direction to use the bridge. The following rules are formulated for use of bridge: (a) Any time the bridge is used by vehicle(s) travelling in one direction only. (b) If the vehicles are waiting to cross the bridge at both ends, only one vehicle from one end is allowed to cross the bridge before a vehicle from the other end starts crossing the bridge. (c) If no vehicles are waiting at one end, then any number of vehicles from the other end are permitted to cross the bridge. Develop a program (Pseudocode) to synchronize vehicles with semaphores.
Answer: **Minimal answer (prevents deadlock, 5 marks):** treat the bridge as one resource. `semaphore bridge = 1;` each truck does `wait(bridge); cross; signal(bridge);`. Only one truck is ever on the bridge, so two opposing trucks can never meet. It is correct but wasteful (trucks going the same way could share), so improve it as below.

**Full answer (rules a, b, c):**

```
semaphore mutex = 1;              /* protects all the shared variables  */
semaphore go[2] = {0, 0};         /* trucks waiting at end N (0), S (1) */
int on_bridge = 0, dir = NONE;    /* how many are crossing, and which way */
int waiting[2] = {0, 0};

arrive(d) {                       /* d = 0 or 1; other = 1 - d */
    wait(mutex);
    if ((on_bridge == 0 || dir == d) && waiting[1-d] == 0) {
        on_bridge++; dir = d;     /* rule (a) and (c): join traffic going my way */
        signal(mutex);
    } else {
        waiting[d]++;             /* opposite traffic, or someone waits opposite */
        signal(mutex);
        wait(go[d]);              /* woken already counted as on the bridge */
    }
}

depart(d) {
    wait(mutex);
    on_bridge--;
    if (on_bridge == 0) {                       /* bridge just became empty */
        if (waiting[1-d] > 0) {                 /* rule (b): one from the other end */
            waiting[1-d]--; on_bridge = 1; dir = 1-d; signal(go[1-d]);
        } else if (waiting[d] > 0) {            /* rule (c): nobody opposite, release my side */
            dir = d;
            while (waiting[d] > 0) { waiting[d]--; on_bridge++; signal(go[d]); }
        } else dir = NONE;
    }
    signal(mutex);
}

truck(d) { arrive(d); cross the bridge; depart(d); }
```

**Why it is correct:**

- **No deadlock / rule (a):** a truck joins only if the bridge is empty or already carries its direction, so opposing trucks are never on the bridge together. The mutex is never held while waiting on another semaphore.
- **Rule (c):** while no one waits at the other end, every arriving truck going the current way joins immediately, any number of them.
- **Rule (b) and no starvation:** as soon as a truck waits at the other end, new trucks from this end stop joining (waiting[1−d] > 0); the bridge drains, and the last truck off hands it to exactly one waiting truck from the other end; when that one leaves, if trucks wait at this end, one of them goes next, and so on: strict alternation while both ends wait, so neither side waits forever.
- **Baton passing:** the departing truck updates on_bridge, dir and waiting on behalf of the trucks it wakes, so a woken truck enters without re-checking and no newcomer can slip in between.

The Mid 2022 key wrote the same idea as a **monitor** with a condition variable (enter: `while (bridge busy the other way || it is the other side's turn) free.wait();`; exit: `free.broadcast()`), which is worth mentioning as the cleaner alternative. Learn one version thoroughly; the semaphore one above is what the question asks for.
Marking points:
- No deadlock / rule (a): a truck joins only if the bridge is empty or already carries its direction, so opposing trucks are never on the bridge together.
- Rule (c): while no one waits at the other end, every arriving truck going the current way joins immediately, any number of them.
- Rule (b) and no starvation: as soon as a truck waits at the other end, new trucks from this end stop joining (waiting[1−d] > 0); the bridge drains …
- Baton passing: the departing truck updates on_bridge, dir and waiting on behalf of the trucks it wakes, so a woken truck enters without re-checking and no newcomer can slip …
- Minimal answer (prevents deadlock, 5 marks): treat the bridge as one resource.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-62
Unit: 2 Processes
Topic: Synchronization
Type: written
Asked in: AOS End-sem 2025, Q10 (5 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Jurassic Park consists of a dinosaur museum and a park for safari riding. There are "m" passengers and "n" single-passenger cars. Passengers wander around the museum for a while, then line up to take a ride in a safari car. When a car is available, it loads the one passenger it can hold and rides around the park for a random amount of time. If the "n" cars are all out riding passengers around, then the passenger who wants to ride waits; if a car is ready to load but there are no waiting passengers, then the car waits. Use semaphores to synchronize the "m" passenger processes and the "n" car processes. Is your solution deadlock and/or starvation free? Discuss.
Answer: **Shared state:** a FIFO queue of the ids of cars that are ready to load, protected by a mutex; a counting semaphore for how many such cars exist; and, per car, a handshake pair: "the passenger is in" and "the ride is over".

```
semaphore car_avail = 0;         /* number of cars waiting to load (counts the queue) */
semaphore mutex = 1;             /* protects free_cars                                */
semaphore boarded[n] = {0};      /* passenger -> car j : "I am in"                    */
semaphore ride_over[n] = {0};    /* car j -> its passenger : "you may get out"        */
queue free_cars;                 /* ids of cars ready to load, in order              */

passenger() {
    while (true) {
        wander around the museum;
        wait(car_avail);                   /* line up: blocks while all n cars are out */
        wait(mutex); j = dequeue(free_cars); signal(mutex);
        signal(boarded[j]);                /* get into car j                           */
        wait(ride_over[j]);                /* ride until car j brings me back          */
    }
}

car(j) {
    while (true) {
        wait(mutex); enqueue(free_cars, j); signal(mutex);
        signal(car_avail);                 /* "I am ready to load"                     */
        wait(boarded[j]);                  /* car waits here if no passenger is waiting */
        ride around the park for a random time;
        signal(ride_over[j]);              /* unload the passenger                      */
    }
}
```

**Meets the rules:** a passenger blocks on car_avail exactly when no car is ready (all n out); a ready car blocks on boarded[j] exactly when no passenger has claimed it; each car carries one passenger at a time, because it waits for a single boarded[j] and does not re-enqueue itself until ride_over[j] is signalled.

**Deadlock free:** the mutex is held only for one enqueue or dequeue, never while waiting on anything else, so there is no hold-and-wait (Block 5). Every wait has a matching signal: car_avail is signalled once per enqueued car and waited once per dequeue, so a passenger who passes car_avail always finds a car in the queue; boarded[j] is signalled only by the passenger who took car j, and ride_over[j] only by car j. There is no cycle of processes waiting for each other.

**Starvation:** **free** if semaphores are strong (FIFO waiting queues): waiting passengers get cars in the order they lined up, and since every ride ends, a car returns to the queue in finite time, so every passenger eventually rides. Cars are taken in FIFO order from free_cars, so every car is used in turn. If the semaphore wakes waiters in arbitrary order (a weak semaphore), a passenger could be overtaken forever by later arrivals: state the FIFO assumption. A car waiting with no passengers is not starvation; it is the required behaviour.

No official key exists; this is my own solution. A common simpler version uses only car_avail and a passenger_waiting semaphore without per-car handshakes; it loses the guarantee that the passenger rides in the car it boarded and that the car waits for the ride to end before reloading, so keep the per-car semaphores.
Marking points:
- Shared state: a FIFO queue of the ids of cars that are ready to load, protected by a mutex; a counting semaphore for how many such cars exist; and, per car, a handshake pair: "the passenger is …
- Meets the rules: a passenger blocks on car_avail exactly when no car is ready (all n out); a ready car blocks on boarded[j] exactly when no passenger has claimed it; each car carries one passenger at a time …
- Deadlock free: the mutex is held only for one enqueue or dequeue, never while waiting on anything else, so there is no hold-and-wait (Block 5).
- Starvation: free if semaphores are strong (FIFO waiting queues): waiting passengers get cars in the order they lined up, and since every ride ends, a car returns to the queue in finite time, so every passenger …
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-35
Unit: 2 Processes
Topic: Synchronization
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-52
In syllabus: yes
Question: State the three requirements a solution to the critical-section problem must satisfy. What is a race condition, and why is counter++ unsafe?
Answer: **Requirements:** *mutual exclusion* (at most one process in its critical section); *progress* (if the section is free, only processes wanting to enter decide who enters, and the decision is not postponed indefinitely); *bounded waiting* (a bound on how many times others may enter after a process has made its request, so no starvation).

**Race condition:** several processes access and manipulate shared data concurrently, and the outcome depends on the order in which the accesses happen.

`counter++` is not atomic: it compiles to load register ← counter; increment register; store counter ← register. If two processes interleave their loads and stores (P loads 5, Q loads 5, both store 6), one update is lost. Correct execution requires the whole sequence to be indivisible, which is what a lock, semaphore or atomic instruction (test-and-set, compare-and-swap) provides.
Marking points:
- Requirements: mutual exclusion (at most one process in its critical section); progress (if the section is free, only processes wanting to enter decide who enters, and the decision is not postponed indefinitely); bounded waiting (a bound …
- Race condition: several processes access and manipulate shared data concurrently, and the outcome depends on the order in which the accesses happen.
- counter++ is not atomic: it compiles to load register ← counter; increment register; store counter ← register.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-36
Unit: 2 Processes
Topic: Synchronization
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: For the three initial two-process attempts (shared turn; check-then-set flags; set-then-check flags), say which requirement each violates, with the interleaving or situation that shows it.
Answer: **Algorithm 1 (turn):** violates **progress**. If turn = 0 and P0 is in its remainder section (or has terminated), P1 cannot enter even though the CS is free. It forces strict alternation, so the faster process runs at the slower one's pace.

**Algorithm 2 (check, then set my flag):** violates **mutual exclusion**. P0 tests flag[1] = false; P1 tests flag[0] = false; P0 sets flag[0] = true and enters; P1 sets flag[1] = true and enters: both in the CS.

**Algorithm 3 (set my flag, then check):** preserves mutual exclusion but violates **progress** through **deadlock**: P0 sets flag[0] = true, P1 sets flag[1] = true, then each loops forever waiting for the other's flag to drop.

Peterson combines Algorithm 3's flags with Algorithm 1's turn, used only to break the tie.
Marking points:
- Algorithm 1 (turn): violates progress.
- Algorithm 2 (check, then set my flag): violates mutual exclusion.
- Algorithm 3 (set my flag, then check): preserves mutual exclusion but violates progress through deadlock: P0 sets flag[0] = true, P1 sets flag[1] = true, then each loops forever waiting for the other's flag …
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-37
Unit: 2 Processes
Topic: Synchronization
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Write Peterson's algorithm for two processes and show that it satisfies mutual exclusion, progress and bounded waiting. Why can it still fail on a modern multiprocessor?
Answer:
```
flag[0] = flag[1] = false;   /* shared */  int turn;
P_i (j = 1 - i):
  flag[i] = true;            /* I want to enter            */
  turn = j;                  /* but you go first if you want */
  while (flag[j] && turn == j) ;   /* busy wait            */
  /* critical section */
  flag[i] = false;
  /* remainder section */
```

**Mutual exclusion:** if both were in the CS, flag[0] = flag[1] = true, so each passed its while only because turn equalled its own index; but turn holds a single value, 0 or 1, and the process that wrote it last gave the turn away and must still be waiting. Contradiction.

**Progress:** Pi waits only if flag[j] is true and turn = j. If Pⱼ is not interested, flag[j] = false and Pi enters at once; if both are interested, turn decides and one enters. A process in its remainder section has flag = false and cannot block anyone.

**Bounded waiting:** when Pⱼ leaves it sets flag[j] = false; if it tries again it sets turn = i, so Pi enters after at most **one** entry by Pⱼ.

**Modern hardware:** the proof assumes loads and stores happen in program order. Processors and compilers may reorder the independent writes to flag[i] and turn, or a read before a write, and then both can enter. A memory barrier between the writes and the test (or atomic hardware instructions) is needed.
Marking points:
- Mutual exclusion: if both were in the CS, flag[0] = flag[1] = true, so each passed its while only because turn equalled its own index; but turn holds a single value, 0 or 1, and the process …
- Progress: Pi waits only if flag[j] is true and turn = j.
- Bounded waiting: when Pⱼ leaves it sets flag[j] = false; if it tries again it sets turn = i, so Pi enters after at most one entry by Pⱼ.
- Modern hardware: the proof assumes loads and stores happen in program order.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-38
Unit: 2 Processes
Topic: Synchronization
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Thread 1: `while (!flag) ; print x;` Thread 2: `x = 100; flag = true;` with flag = false and x = 0 initially. What is the expected output, how can the output be 0, and how do memory barriers fix it?
Answer: **Expected:** 100.

**How 0 happens:** flag and x are independent variables, so the processor (or compiler) may reorder thread 2's stores to `flag = true; x = 100;`, or make flag visible to the other processor before x on a weakly ordered memory model. Thread 1 then sees flag = true and prints the old x = 0. (Thread 1's loads of flag and x can also be reordered.)

**Fix:** thread 2 executes `x = 100; memory_barrier(); flag = true;`, guaranteeing the store to x is complete and visible before the store to flag; thread 1 executes `while (!flag) memory_barrier(); print x;`, guaranteeing flag is loaded before x. Memory barriers are low-level instructions used by kernel developers for mutual exclusion.
Marking points:
- Expected: 100.
- How 0 happens: flag and x are independent variables, so the processor (or compiler) may reorder thread 2's stores to flag = true; x = 100;, or make flag visible to the other processor before x on …
- Fix: thread 2 executes x = 100; memory_barrier(); flag = true;, guaranteeing the store to x is complete and visible before the store to flag; thread 1 executes while (!flag) memory_barrier(); print x;, guaranteeing flag is …
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-39
Unit: 2 Processes
Topic: Synchronization
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-53, PYQ-54
In syllabus: yes
Question: Show that the test-and-set lock satisfies mutual exclusion and progress but not bounded waiting. How is bounded waiting added? Give the priority scenario in which the spinlock deadlocks.
Answer: **Mutual exclusion:** TestAndSet reads and sets the lock in one indivisible step, so exactly one process can see lock = false and set it to true; every other caller sees true and spins until the holder sets lock = false.

**Progress:** trivially true: when the lock is free, the first process to execute TestAndSet enters.

**No bounded waiting:** when the lock is released, whichever spinning process happens to execute TestAndSet first wins; an unlucky process can lose every time and starve.

**Adding it:** each process sets waiting[i] = true and spins while (waiting[i] && key), with key = TestAndSet(&lock). On exit, the holder looks for the next j in cyclic order i+1, …, i−1 with waiting[j] = true and sets waiting[j] = false (passing the CS to it directly); only if none waits does it set lock = false. A waiting process enters within n − 1 turns.

**Priority deadlock:** low-priority P1 holds the lock; high-priority P2 becomes ready, preempts P1 and spins on the lock. P2 never yields (it is busy and higher priority) and P1 never runs to release the lock: both stuck. Priority inheritance (Block 3) or blocking locks avoid it.
Marking points:
- Mutual exclusion: TestAndSet reads and sets the lock in one indivisible step, so exactly one process can see lock = false and set it to true; every other caller sees true and spins until the holder sets …
- Progress: trivially true: when the lock is free, the first process to execute TestAndSet enters.
- No bounded waiting: when the lock is released, whichever spinning process happens to execute TestAndSet first wins; an unlucky process can lose every time and starve.
- Adding it: each process sets waiting[i] = true and spins while (waiting[i] && key), with key = TestAndSet(&lock).
- Priority deadlock: low-priority P1 holds the lock; high-priority P2 becomes ready, preempts P1 and spins on the lock.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-40
Unit: 2 Processes
Topic: Synchronization
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-55
In syllabus: yes
Question: What is a counting semaphore versus a binary semaphore? How is a semaphore implemented without busy waiting, and why must wait() and signal() themselves be atomic?
Answer: **Binary semaphore:** value 0 or 1, behaves like a mutex lock. **Counting semaphore:** unrestricted range, used to count instances of a resource (e.g. five identical printers: initialize to 5; each wait takes one, each signal returns one; a process blocks when the value is 0).

**Without busy waiting:** each semaphore keeps a value and a list of waiting processes. `wait()` decrements the value; if it becomes negative, the process is added to the list and calls `block()`, giving up the CPU. `signal()` increments; if the value is still ≤ 0, one process is removed from the list and `wakeup()` puts it in the ready queue. A negative value's magnitude is the number of waiting processes.

**Atomicity:** wait and signal read and modify the semaphore's value, so two processes executing them at once form a race that can let two processes into the critical section. They must be executed indivisibly: on a single processor by disabling interrupts, on a multiprocessor by a hardware instruction such as test-and-set or compare-and-swap (often with a short spinlock inside the implementation, which is acceptable because the critical section is a few instructions).
Marking points:
- Binary semaphore: value 0 or 1, behaves like a mutex lock.
- Without busy waiting: each semaphore keeps a value and a list of waiting processes.
- Atomicity: wait and signal read and modify the semaphore's value, so two processes executing them at once form a race that can let two processes into the critical section.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-41
Unit: 2 Processes
Topic: Synchronization
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-55
In syllabus: yes
Question: A programmer protects a critical section with semaphore mutex = 1. What happens if a process (a) writes signal(mutex) … wait(mutex); (b) writes wait(mutex) … wait(mutex); (c) omits wait(mutex)? What construct was introduced to prevent such errors, and why does it help?
Answer: **(a)** Mutual exclusion is violated: the process enters without waiting and its signal raises the value, so several processes may be in their CS at once.

**(b)** Deadlock: the process blocks on its second wait, and no one will ever signal.

**(c)** Mutual exclusion is violated (this process enters freely); omitting signal instead would deadlock everyone else.

**The fix:** monitors. The compiler inserts the entry and exit code for every monitor procedure, so mutual exclusion cannot be forgotten or mis-ordered, and all synchronization code is in one module, which is easier to verify. With semaphores, access is correct only if *every* process accessing the resource is programmed correctly.
Marking points:
- (a) Mutual exclusion is violated: the process enters without waiting and its signal raises the value, so several processes may be in their CS at once.
- (b) Deadlock: the process blocks on its second wait, and no one will ever signal.
- (c) Mutual exclusion is violated (this process enters freely); omitting signal instead would deadlock everyone else.
- The fix: monitors.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-42
Unit: 2 Processes
Topic: Synchronization
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Write the bounded-buffer producer–consumer solution using semaphores. What goes wrong if the producer executes wait(mutex) before wait(empty)?
Answer:
```
semaphore mutex = 1;    /* mutual exclusion on the buffer */
semaphore empty = n;    /* number of free slots   */
semaphore full  = 0;    /* number of filled slots */

producer:                       consumer:
  wait(empty);                    wait(full);
  wait(mutex);                    wait(mutex);
  /* add item to buffer */        /* remove item from buffer */
  signal(mutex);                  signal(mutex);
  signal(full);                   signal(empty);
```

The counting semaphores `empty` and `full` do the waiting for space and for data; `mutex` protects the buffer itself. Note the symmetry: the producer waits on empty and signals full, the consumer the reverse.

**If the order is swapped** (wait(mutex) then wait(empty)) with a full buffer: the producer holds the mutex and then blocks on `empty`. The consumer, the only one who could create an empty slot, blocks on `wait(mutex)`, which the producer will never release. Neither can proceed: **deadlock**. The rule is to acquire the resource-counting semaphore first and the mutex last, and release in the opposite order.
Marking points:
- If the order is swapped (wait(mutex) then wait(empty)) with a full buffer: the producer holds the mutex and then blocks on empty.
- producer:                       consumer:
  wait(empty);                    wait(full);
  wait(mutex);                    wait(mutex);
  / add item to buffer /        / remove item from buffer /
  signal(mutex);                  signal(mutex);
  signal(full);                   signal(empty);
- The counting semaphores empty and full do the waiting for space and for data; mutex protects the buffer itself.
- Note the symmetry: the producer waits on empty and signals full, the consumer the reverse.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-43
Unit: 2 Processes
Topic: Synchronization
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Five philosophers sit around a table with one chopstick between each pair; each needs both neighbouring chopsticks to eat. Show how the obvious semaphore solution deadlocks, and give two fixes.
Answer: **Obvious solution:** `semaphore chopstick[5] = {1,…}`; philosopher i does wait(chopstick[i]); wait(chopstick[(i+1)%5]); eat; signal both.

**Deadlock:** if all five pick up their left chopstick at the same time, every chopstick is held and every philosopher waits forever for the right one. All four conditions hold: mutual exclusion, hold and wait, no preemption, circular wait.

**Fixes:** (1) allow at most four philosophers at the table at once (breaks circular wait); (2) make an odd-numbered philosopher pick up left then right and an even-numbered one right then left, i.e. impose a total order on resources (also breaks circular wait); (3) pick up both chopsticks only if both are free, inside a critical section or a monitor with a condition variable per philosopher (breaks hold and wait). Any solution must also avoid starvation, not just deadlock.
Marking points:
- Obvious solution: semaphore chopstick[5] = {1,…}; philosopher i does wait(chopstick[i]); wait(chopstick[(i+1)%5]); eat; signal both.
- Deadlock: if all five pick up their left chopstick at the same time, every chopstick is held and every philosopher waits forever for the right one.
- Fixes: (1) allow at most four philosophers at the table at once (breaks circular wait); (2) make an odd-numbered philosopher pick up left then right and an even-numbered one right then left, i.e.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-44
Unit: 2 Processes
Topic: Synchronization
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: In the readers–writers problem, the first solution gives readers priority. What problem does that cause, and how is it fixed? What is the trade-off?
Answer: **First (reader-priority) solution:** no reader waits unless a writer already holds the resource. If readers keep arriving, the read count never drops to zero, so the writer waits forever: **writer starvation**.

**Second (writer-priority) solution:** once a writer is waiting, no new reader may start. That removes writer starvation but can starve readers instead.

**Fix in practice:** a fair or queue-based policy (FIFO among waiting readers and writers, or a turnstile ordered by arrival/priority), so neither side waits indefinitely; the cost is less concurrency among readers. Reader-writer locks are worth their extra overhead only when reads greatly outnumber writes.
Marking points:
- First (reader-priority) solution: no reader waits unless a writer already holds the resource.
- Second (writer-priority) solution: once a writer is waiting, no new reader may start.
- Fix in practice: a fair or queue-based policy (FIFO among waiting readers and writers, or a turnstile ordered by arrival/priority), so neither side waits indefinitely; the cost is less concurrency among readers.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-45
Unit: 2 Processes
Topic: Synchronization
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Block 5; same section as PYQ-61, PYQ-62
In syllabus: yes
Question: P0 executes wait(S); wait(Q); and P1 executes wait(Q); wait(S); with S = Q = 1. Show which of the four necessary conditions for deadlock (Block 5) hold, and give two ways to remove the deadlock using Block 5's ideas.
Answer: If P0 gets S and P1 gets Q, each then waits for the other's semaphore forever. All four conditions hold: **mutual exclusion** (a binary semaphore admits one holder), **hold and wait** (each holds one and waits for the other), **no preemption** (a semaphore cannot be taken back), **circular wait** (P0 → Q held by P1 → S held by P0).

**Fixes:** (1) **break circular wait** with a global order: every process acquires S before Q (resource ordering, the standard prevention technique); (2) **break hold and wait**: acquire both at once, e.g. under a single outer mutex, or release S if Q is not available and retry. The dining-philosophers fixes are exactly these: an asymmetric order for one philosopher, or picking up both chopsticks only if both are free.
Marking points:
- Fixes: (1) break circular wait with a global order: every process acquires S before Q (resource ordering, the standard prevention technique); (2) break hold and wait: acquire both at once, e.g.
- If P0 gets S and P1 gets Q, each then waits for the other's semaphore forever.
- All four conditions hold: mutual exclusion (a binary semaphore admits one holder), hold and wait (each holds one and waits for the other), no preemption (a semaphore cannot be taken back), circular wait (P0 → Q held by P1 → …
- The dining-philosophers fixes are exactly these: an asymmetric order for one philosopher, or picking up both chopsticks only if both are free.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-46
Unit: 2 Processes
Topic: Synchronization
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Blocks 3 and 14; same section as PYQ-61, PYQ-62
In syllabus: yes
Question: Explain why a preemptive kernel on a multiprocessor needs spinlocks rather than disabling interrupts, and how Amdahl's law (Block 14) explains why kernels try to avoid shared locks altogether on many cores.
Answer: **Spinlocks, not interrupt disabling:** disabling interrupts stops preemption only on the local CPU; another CPU can still enter the same critical section. A spinlock in shared memory, built from an atomic instruction, excludes all CPUs. Because the holder is running on another CPU and kernel critical sections are short, spinning is cheaper than blocking, and a thread holding a spinlock is not preempted (Windows), so others never spin long.

**Amdahl:** a shared lock serializes every CPU that needs it, so the time inside the lock is the sequential fraction α of kernel work. As cores increase, speedup is capped at 1/α and contention adds cache-coherence traffic on the lock itself. Hence per-CPU data structures, finer-grained locks, lock-free techniques and transactional memory: they shrink α. (The Corey paper from the mid-sem made the same argument: let applications control sharing so that by default only one core touches each kernel structure.)
Marking points:
- Spinlocks, not interrupt disabling: disabling interrupts stops preemption only on the local CPU; another CPU can still enter the same critical section.
- Amdahl: a shared lock serializes every CPU that needs it, so the time inside the lock is the sequential fraction α of kernel work.
- A spinlock in shared memory, built from an atomic instruction, excludes all CPUs.
- Because the holder is running on another CPU and kernel critical sections are short, spinning is cheaper than blocking, and a thread holding a spinlock is not preempted (Windows), so others never spin long.
Answer source: written by Claude, no key
Weak / low priority: no

## Deadlocks

### PYQ-63
Unit: 2 Processes
Topic: Deadlocks
Type: written
Asked in: OSN Quiz 5 2020, Q2 (5 marks); OSN Quiz 2 2022, A1 (2 marks); AOS Quiz 2 2025, Q5 (2 marks); AOS Quiz 2 2026, Q1 (2 marks)
Times asked: 4
Reworded versions: "Compare the deadlock prevention algorithms by preventing circular-wait with the deadlock avoidance algorithm (i.e., the banker's algorithm) with respect to the following: runtime overheads and system throughput." (OSN Quiz 5 2020)
In syllabus: yes
Question: Compare the deadlock prevention algorithms by preventing circular-wait with the various deadlock avoidance algorithms (like the banker's algorithm) with respect to the following: runtime overheads and system throughput.
Answer: **(i) Runtime overheads.**

- *Banker's algorithm* : the runtime overhead is **O(m × n^2)** , where m is the number of resource types and n the number of processes, and the algorithm is executed **for every request** . So the runtime overhead is high.
- *Prevention by circular wait* : the resource ordering is a static rule the programmer or system follows, so the runtime overhead is **very low or nil** .

**(ii) Throughput.**

- *Banker's algorithm* : **no process is aborted** ; a request that would create an unsafe state is only delayed. If contention is high the algorithm works well and gives the highest throughput.
- *Prevention* : throughput is **reduced significantly** . A process may be rejected several times, work is repeated, and CPU cycles are wasted.

**One-line summary:** prevention moves the cost out of run time and into lost throughput; the Banker's algorithm does the reverse, paying O(m × n^2) per request to keep utilization and throughput high.

If marks allow, add the information cost: the Banker's algorithm needs every process to declare its *maximum claim in advance*, which prevention does not.
Marking points:
- Banker's algorithm : the runtime overhead is O(m × n^2) , where m is the number of resource types and n the number of processes, and the algorithm is executed …
- Prevention by circular wait : the resource ordering is a static rule the programmer or system follows, so the runtime overhead is very low or nil .
- Banker's algorithm : no process is aborted ; a request that would create an unsafe state is only delayed.
- Prevention : throughput is reduced significantly .
- (i) Runtime overheads.
- (ii) Throughput.
Answer source: professor's key
Weak / low priority: no

### PYQ-64
Unit: 2 Processes
Topic: Deadlocks
Type: true/false
Asked in: OSN Quiz 5 2020, Q3 (5 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Identify whether the following statement is TRUE or FALSE. If the statement is FALSE, correct it and justify the corrected sentence. If the statement is TRUE, justify it. Restrict the justification to a few (less than five) sentences. "Deadlock prevention protocols improve CPU utilization."
Answer: **FALSE.** Corrected: deadlock prevention protocols *reduce* resource and CPU utilization and lower system throughput; what they improve is reliability, since the system can never enter a deadlock state.

**Justification, protocol by protocol:**

- *Hold and wait, protocol 1* : all resources are requested before execution begins, so a resource like the printer is held for the entire run and used only at the end. It is allocated but unused for a long time, and other processes that need it wait, idle.
- *Hold and wait, protocol 2* : the process must release everything before asking again, so work already done can be repeated, and it may starve waiting to re-acquire what it gave up.
- *No preemption* : the holder's resources are taken away and the process restarts, so the CPU cycles it already consumed are wasted.
- *Circular wait* : the fixed ordering forces a process to acquire a resource earlier than it needs it, or to release and restart.

**Core sentence:** prevention is conservative — it restrains requests even in situations where no deadlock would ever have occurred — and that conservatism is paid for in idle resources and repeated work. This is exactly why deadlock *avoidance* was introduced (slide 8.20 opens with "deadlock prevention algorithms → low device utilization, and reduced system throughput").
Marking points:
- States FALSE.
- Corrected: deadlock prevention protocols reduce resource and CPU utilization and lower system throughput; what they improve is reliability, since the system can never enter a deadlock state.
- prevention is conservative — it restrains requests even in situations where no deadlock would ever have occurred — and that conservatism is paid for in idle resources and repeated work.
- Hold and wait, protocol 1 : all resources are requested before execution begins, so a resource like the printer is held for the entire run and used only at …
- Hold and wait, protocol 2 : the process must release everything before asking again, so work already done can be repeated, and it may starve waiting to re-acquire what it …
- No preemption : the holder's resources are taken away and the process restarts, so the CPU cycles it already consumed are wasted.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-65
Unit: 2 Processes
Topic: Deadlocks
Type: true/false
Asked in: AOS Quiz 2 2025, Q4 (2 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: TRUE/FALSE (correct and justify): "Deadlock prevention algorithm designed by violating no preemption condition suffers from starvation problem."
Answer: **TRUE.**

**Justification.** The protocol says: if a process holding some resources requests one that cannot be granted immediately, all the resources it currently holds are preempted (implicitly released), and it is restarted only when it can regain its old resources together with the new one. Equivalently, resources may be taken away from a *waiting* process to satisfy another process's request. Nothing in the rule limits how often this can happen to the same process: a process that needs many resources, or popular ones, can lose them every time it has to wait, restart, and lose them again while other processes keep finishing. That indefinite postponement is starvation.

**Core sentence:** no-preemption prevention can repeatedly preempt and restart the same process, so it may starve; the usual fix is the one used for victim selection in recovery — count the preemptions and stop choosing a process once the count is high (aging).
Marking points:
- States TRUE.
- no-preemption prevention can repeatedly preempt and restart the same process, so it may starve; the usual fix is the one used for victim selection in recovery — count the preemptions and stop choosing a process once the count is high (aging).
- The protocol says: if a process holding some resources requests one that cannot be granted immediately, all the resources it currently holds are preempted (implicitly released), and it is restarted only when it can regain …
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-66
Unit: 2 Processes
Topic: Deadlocks
Type: written
Asked in: AOS End-sem 2025, Q2.1 (3 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Deadlock prevention protocols which violate "circular wait" may suffer from starvation problem. YES/NO. Justify.
Answer: **YES, it may.**

**How the protocol works.** Each resource type gets a number F(R), and a process may request Rj only if F(Rj) is greater than the number of every resource it already holds; to get a lower-numbered resource it must first release the higher ones. That guarantees no cycle can form in the wait-for relation, so there is no deadlock.

**Why starvation is still possible.** The ordering only fixes the *order* in which one process asks; it says nothing about *which* waiting process is given a resource when it is freed. A process that needs a popular low-numbered resource can keep losing it to newly arriving processes, and a process that has to release its higher-numbered resources to go back for a lower one can lose those too. Freedom from deadlock (no cycle) is not freedom from starvation (bounded waiting).

**When it does not starve.** If every resource's wait queue is served in FIFO order, then because there is no cycle every chain of waiting ends at a process that can run, and every process eventually gets its turn. So the honest answer is "yes, unless the allocation within each resource is fair" — and that is the sentence that earns the third mark.
Marking points:
- How the protocol works: Each resource type gets a number F(R), and a process may request Rj only if F(Rj) is greater than the number of every resource it already holds; to get a lower-numbered resource it must first …
- Why starvation is still possible: The ordering only fixes the order in which one process asks; it says nothing about which waiting process is given a resource when it is freed.
- When it does not starve: If every resource's wait queue is served in FIFO order, then because there is no cycle every chain of waiting ends at a process that can run, and every process eventually gets its turn.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-67
Unit: 2 Processes
Topic: Deadlocks
Type: true/false
Asked in: AOS End-sem 2025, Q1.3 (1 mark)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: TRUE or FALSE. If FALSE, correct it and justify the corrected sentence; if TRUE, justify it. Fewer than five sentences. "Deadlock avoidance approach improves resource utilization over deadlock prevention approach based on the violation of no pre-emption condition."
Answer: **TRUE.**

**Justification.** Prevention by violating no-preemption takes resources away from any process that has to wait and restarts it later, so allocated resources are released before they have been used to completion, the work done with them is thrown away and redone, and the rule cannot be applied at all to resources whose state cannot be saved, such as locks and printers. Avoidance never forces a release: it grants a request whenever the resulting state is still safe, so resources stay in productive use and are only held back when granting would risk deadlock. The price avoidance pays instead is runtime overhead (a safety check of order m × n^2 on every request) and the need to know each process's maximum claim in advance.
Marking points:
- States TRUE.
- Prevention by violating no-preemption takes resources away from any process that has to wait and restarts it later, so allocated resources are released before they have been used to completion, the work done with them …
- Avoidance never forces a release: it grants a request whenever the resulting state is still safe, so resources stay in productive use and are only held back when granting would risk deadlock.
- The price avoidance pays instead is runtime overhead (a safety check of order m × n^2 on every request) and the need to know each process's maximum claim in advance.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-68
Unit: 2 Processes
Topic: Deadlocks
Type: numerical
Asked in: OSN End-sem 2022, Q7 (5 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: A system has four resource types with total C = <6, 4, 4, 2>. The resource allocator is considering allocating resources according to the tables below. Is this a safe state? Why or why not? **Maximum claim** — P0: 3 2 1 1 · P1: 1 2 0 2 · P2: 1 1 2 0 · P3: 3 2 1 0 · P4: 2 1 0 1 **Current allocation** — P0: 2 0 1 1 · P1: 1 1 0 0 · P2: 1 1 0 0 · P3: 1 0 1 0 · P4: 0 1 0 1
Answer: **Step 1 — Available.** Total allocated = (2+1+1+1+0, 0+1+1+0+1, 1+0+0+1+0, 1+0+0+0+1) = (5, 3, 2, 2).  
 Available = C − allocated = (6,4,4,2) − (5,3,2,2) = **(1, 1, 2, 0)**.

**Step 2 — Need = Max − Allocation.**

|  | Max | Allocation | Need |
| --- | --- | --- | --- |
| P0 | 3 2 1 1 | 2 0 1 1 | 1 2 0 0 |
| P1 | 1 2 0 2 | 1 1 0 0 | 0 1 0 2 |
| P2 | 1 1 2 0 | 1 1 0 0 | 0 0 2 0 |
| P3 | 3 2 1 0 | 1 0 1 0 | 2 2 0 0 |
| P4 | 2 1 0 1 | 0 1 0 1 | 2 0 0 0 |

**Step 3 — Safety algorithm.** Work = Available = (1,1,2,0):

| Try | Need ≤ Work? | Work after it finishes |
| --- | --- | --- |
| P0 (1,2,0,0) | no — needs 2 of R1, only 1 free | — |
| P1 (0,1,0,2) | no — needs 2 of R3, 0 free | — |
| **P2 (0,0,2,0)** | yes ≤ (1,1,2,0) | (1,1,2,0) + (1,1,0,0) = (2,2,2,0) |
| **P0 (1,2,0,0)** | yes ≤ (2,2,2,0) | (2,2,2,0) + (2,0,1,1) = (4,2,3,1) |
| **P3 (2,2,0,0)** | yes ≤ (4,2,3,1) | (4,2,3,1) + (1,0,1,0) = (5,2,4,1) |
| **P4 (2,0,0,0)** | yes ≤ (5,2,4,1) | (5,2,4,1) + (0,1,0,1) = (5,3,4,2) |
| **P1 (0,1,0,2)** | yes ≤ (5,3,4,2) | (5,3,4,2) + (1,1,0,0) = (6,4,4,2) = C ✓ |

**Answer: yes, the state is SAFE**, because the safe sequence **<P2, P0, P3, P4, P1>** exists — every process can be finished in that order using only the free resources plus what the earlier ones return, and Work ends equal to C with Finish[i] = true for all i.

Note for the exam: P1 fails at the start only because of R3, of which none is free; it becomes satisfiable as soon as P0 returns its instance. Always say *which* resource blocks a process, not just "not enough".
Marking points:
- Final answer: Answer: yes, the state is SAFE, because the safe sequence <P2, P0, P3, P4, P1> exists — every process can be finished in that order using only the free resources plus what the earlier ones return, and Work ends equal to C with Finish[i] = …
- , because the safe sequence <P2, P0, P3, P4, P1> exists — every process can be finished in that order using only the free resources plus what the earlier ones return, and Work ends equal to C with Finish[i] = true for all i.
- Step 1 — Available: Total allocated = (2+1+1+1+0, 0+1+1+0+1, 1+0+0+1+0, 1+0+0+0+1) = (5, 3, 2, 2).
- Step 2 — Need = Max − Allocation.
- Step 3 — Safety algorithm: Work = Available = (1,1,2,0):
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-69
Unit: 2 Processes
Topic: Deadlocks
Type: written
Asked in: OSN End-sem (question list) 2021, Q12 (not given)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Consider the following ways of handling deadlock: (1) the Banker's algorithm, (2) detect deadlock and kill a thread, releasing all its resources, (3) reserve all resources in advance, (4) restart a thread and release all its resources if it needs to wait, (5) resource ordering, (6) detect deadlock and roll back the thread's actions. (a) Rank them by the concurrency they permit (how many threads can make progress without waiting when there is no deadlock). (b) Rank them by efficiency (least processor overhead), assuming deadlock is rare.
Answer: **First sort the six into the block's families** — that is what makes the ranking easy to defend: (3), (4) and (5) are *prevention* (break hold-and-wait, no-preemption and circular wait respectively), (1) is *avoidance*, and (2) and (6) are *detection plus recovery* (termination and rollback).

| Rank | (a) Most concurrency first | Why |
| --- | --- | --- |
| 1–2 | (6) detect and roll back, (2) detect and kill | No restriction at all while there is no deadlock: every request is granted whenever the resource is free |
| 3 | (1) Banker's | Grants a free resource unless the state would become unsafe, so a thread occasionally waits even though no deadlock would have happened |
| 4 | (5) resource ordering | Threads must acquire in a fixed order, often earlier than needed, so resources are held idle |
| 5 | (4) restart if it must wait | Any wait throws away the thread's progress and everything it held |
| 6 | (3) reserve all in advance | Every resource is held for the whole life of the thread, used or not |

| Rank | (b) Least overhead first | Why |
| --- | --- | --- |
| 1 | (3) reserve all in advance | One check when the thread starts, nothing afterwards |
| 2 | (5) resource ordering | A number comparison on each request |
| 3 | (2) detect and kill | Nothing on the normal path; a periodic detection run, and since deadlock is rare, recovery is rare |
| 4 | (6) detect and roll back | The same detection, plus the continuous cost of checkpointing or logging so that a rollback is possible |
| 5 | (1) Banker's | The safety algorithm, of order m × n^2, on *every* request |
| 6 | (4) restart if it must wait | Waits are common even when deadlock is rare, so work is redone constantly |

**Core sentence:** concurrency and efficiency pull in opposite directions — the methods that restrict requests (prevention) are cheapest to run but allow the least concurrency, and the methods that let everything run (detection) allow the most concurrency but pay for it in detection and recovery.
Marking points:
- concurrency and efficiency pull in opposite directions — the methods that restrict requests (prevention) are cheapest to run but allow the least concurrency, and the methods that let everything run (detection) allow the most concurrency but pay for it in detection and recovery.
- First sort the six into the block's families — that is what makes the ranking easy to defend: (3), (4) and (5) are prevention (break hold-and-wait, no-preemption and circular wait respectively), (1) is avoidance …
- 1–2: (6) detect and roll back, (2) detect and kill
- 3: (1) Banker's
- 4: (5) resource ordering
- 5: (4) restart if it must wait
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-47
Unit: 2 Processes
Topic: Deadlocks
Type: true/false
Based on: imitates the professor's TRUE/FALSE correct-and-justify items (OSN End 2022 Q1, AOS End 2025 Q1)
In syllabus: yes
Question: "A cycle in the resource-allocation graph always means the system is deadlocked." True or false? If false, correct it and justify.
Answer: **False.** Corrected: a cycle always means deadlock only when there is exactly *one instance of each resource type* in the cycle. With several instances per type, a cycle means deadlock is possible, not certain.

**Justification:** with multiple instances, a process outside the cycle may hold an instance of a resource the cycle needs. When that process finishes and releases it, a waiting process in the cycle can be satisfied, and the cycle breaks without any deadlock. The absence of a cycle, however, always guarantees no deadlock, so a cycle is necessary but not sufficient in the multi-instance case.
Marking points:
- States FALSE.
- Corrected: a cycle always means deadlock only when there is exactly one instance of each resource type in the cycle.
- with multiple instances, a process outside the cycle may hold an instance of a resource the cycle needs.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-48
Unit: 2 Processes
Topic: Deadlocks
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Most operating systems, including UNIX, ignore the deadlock problem. Justify this design decision.
Answer: **Core sentence:** deadlocks are infrequent, while prevention, avoidance and detection all charge their cost on every request or at every invocation, so an occasional hang is cheaper than a permanent tax on normal operation.

Supporting points: prevention lowers resource utilization and system throughput continuously; avoidance needs each process to declare its maximum future claim in advance, which ordinary application programs cannot supply; the detection algorithm costs O(m × n^2) each time it runs, and recovery destroys work through termination or rollback. Since the system can also deadlock inside the kernel only rarely, UNIX assumes deadlock will not occur and leaves recovery to the user (kill the process) and the programmer (consistent lock ordering), which is exactly the "manual recovery when performance degrades" the slide mentions.
Marking points:
- deadlocks are infrequent, while prevention, avoidance and detection all charge their cost on every request or at every invocation, so an occasional hang is cheaper than a permanent tax on normal operation.
- Supporting points: prevention lowers resource utilization and system throughput continuously; avoidance needs each process to declare its maximum future claim in advance, which ordinary application programs cannot supply; the detection algorithm costs O(m × n^2) each time it runs …
- Since the system can also deadlock inside the kernel only rarely, UNIX assumes deadlock will not occur and leaves recovery to the user (kill the process) and the programmer (consistent lock ordering), which is exactly the "manual recovery when performance …
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-49
Unit: 2 Processes
Topic: Deadlocks
Type: true/false
Based on: imitates the professor's TRUE/FALSE correct-and-justify items (OSN End 2022 Q1, AOS End 2025 Q1); same section as PYQ-67
In syllabus: yes
Question: "An unsafe state is a deadlocked state." True or false? Correct it and justify.
Answer: **False.** Corrected: an unsafe state is a state in which deadlock is *possible*, not one in which deadlock has occurred.

**Justification:** safe means a safe sequence exists, so no deadlock can happen whatever the processes do next. Unsafe only means no such sequence can be guaranteed; whether a deadlock actually occurs depends on the future requests the processes make, which the OS does not control. Every deadlocked state is unsafe, but many unsafe states run to completion without deadlock. Avoidance is therefore conservative: it refuses some requests that would have turned out fine, in exchange for the guarantee of never entering the unsafe region at all.
Marking points:
- States FALSE.
- Corrected: an unsafe state is a state in which deadlock is possible, not one in which deadlock has occurred.
- safe means a safe sequence exists, so no deadlock can happen whatever the processes do next.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-50
Unit: 2 Processes
Topic: Deadlocks
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-67
In syllabus: yes
Question: In the 12-tape-drive example the system is safe at t0, and becomes unsafe when P2 is granted one more drive. Explain what the mistake was and what the avoidance algorithm should have done.
Answer: At t0, P0/P1/P2 hold 5/2/2 with maximum needs 10/4/9, so 3 drives are free and <P1, P0, P2> is a safe sequence: P1 needs only 2 more and finishes, returning 4 (free = 5); P0 then takes its 5 and finishes, returning 10 (free = 10); P2 takes its remaining 7.

After granting P2 one more drive, only 2 are free and P2's remaining need rises to 6. P1 can still be satisfied with 2, but after it returns its 4, free = 4, while P0 needs 5 and P2 needs 6. No process can be completed, so no safe sequence exists.

**Core sentence:** the mistake was granting P2's request even though the resulting state had no safe sequence; the avoidance algorithm should have made P2 *wait*, even though a free drive was physically available, since availability is not the criterion — the existence of a safe sequence afterwards is.
Marking points:
- the mistake was granting P2's request even though the resulting state had no safe sequence; the avoidance algorithm should have made P2 wait, even though a free drive was physically available, since availability is not the criterion — the existence of a safe sequence afterwards is.
- At t0, P0/P1/P2 hold 5/2/2 with maximum needs 10/4/9, so 3 drives are free and <P1, P0, P2> is a safe sequence: P1 needs only 2 more and finishes, returning 4 (free = 5); P0 then takes its 5 …
- After granting P2 one more drive, only 2 are free and P2's remaining need rises to 6.
- P1 can still be satisfied with 2, but after it returns its 4, free = 4, while P0 needs 5 and P2 needs 6.
- No process can be completed, so no safe sequence exists.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-51
Unit: 2 Processes
Topic: Deadlocks
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-63, PYQ-68
In syllabus: yes
Question: In the Banker's algorithm, a request passes both checks — it is within the process's Need and within Available — yet the system still refuses it. Explain how that is possible and what the algorithm does next.
Answer: The two checks only confirm that the request is legal and physically satisfiable. The algorithm then *pretends* to allocate (Available −= Request, Allocation += Request, Need −= Request) and runs the safety algorithm on the resulting state. If no safe sequence exists in that state, the request is refused even though the resources are sitting free.

The algorithm restores the old resource-allocation state exactly as it was, and Pi waits. The slide's own example is P0 requesting (0,2,0) after P1's request has been granted: it is within Need and Available, but the resulting state is unsafe, so it is denied.

**Core sentence:** availability is not the criterion — the existence of a safe sequence *after* the allocation is.
Marking points:
- availability is not the criterion — the existence of a safe sequence after the allocation is.
- The two checks only confirm that the request is legal and physically satisfiable.
- The algorithm then pretends to allocate (Available −= Request, Allocation += Request, Need −= Request) and runs the safety algorithm on the resulting state.
- If no safe sequence exists in that state, the request is refused even though the resources are sitting free.
- The algorithm restores the old resource-allocation state exactly as it was, and Pi waits.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-52
Unit: 2 Processes
Topic: Deadlocks
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: A system has three resource types A (7 instances), B (2), C (6), with Available = (0,0,0). Allocation — P0: (0,1,0), P1: (2,0,0), P2: (3,0,3), P3: (2,1,1), P4: (0,0,2). Request — P0: (0,0,0), P1: (2,0,1), P2: (0,0,1), P3: (1,0,0), P4: (0,0,2). Is the system deadlocked? If so, which processes are involved?
Answer: **Initialize.** Work = Available = (0,0,0). Finish[i] = false for every process whose Allocationi ≠ 0 — that is all five here (none holds nothing).

| Try | Requesti ≤ Work? | Work after |
| --- | --- | --- |
| **P0 (0,0,0)** | yes ≤ (0,0,0) | (0,0,0) + Alloc0 (0,1,0) = **(0,1,0)** |
| P1 (2,0,1) | no — 2 of A, none free | — |
| P2 (0,0,1) | no — 1 of C, none free | — |
| P3 (1,0,0) | no — 1 of A, none free | — |
| P4 (0,0,2) | no — 2 of C, none free | — |

No further index satisfies the test, and Finish[i] = false for P1, P2, P3 and P4.

**Answer: the system is deadlocked**, and the deadlock consists of **P1, P2, P3 and P4**. We can reclaim the resources held by P0, but they are insufficient to fulfil any of the other processes' requests.

Contrast worth stating: with P2 requesting (0,0,0) instead, the sequence <P0, P2, P3, P1, P4> completes and there is no deadlock. A single extra instance of C requested by P2 is what tips the system over.
Marking points:
- , and the deadlock consists of P1, P2, P3 and P4.
- Initialize: Work = Available = (0,0,0).
- P0 (0,0,0): yes ≤ (0,0,0)
- P1 (2,0,1): no — 2 of A, none free
- P2 (0,0,1): no — 1 of C, none free
- P3 (1,0,0): no — 1 of A, none free
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-53
Unit: 2 Processes
Topic: Deadlocks
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: When, and how often, should the deadlock-detection algorithm be invoked? Explain the issues with invoking it too often and too rarely.
Answer: It depends on two things: **how often a deadlock is likely to occur**, and **how many processes would need to be rolled back** — one for each disjoint cycle.

- **Too often** (for example on every request): the algorithm costs O(m × n^2) each time, so the overhead is unacceptable; against that, it detects the deadlock the moment it forms and pinpoints the process whose request caused it.
- **Too rarely** (arbitrary invocation): several cycles may have formed, so there is no way to tell which of the many deadlocked processes "caused" the deadlock, and more processes must be rolled back, destroying more work. Resources also stay idle for longer while the deadlocked processes sit blocked.

Practical compromise from the slides: invoke it **once per hour**, or **when CPU utilization drops below 40%** — the symptom of processes sitting blocked instead of running.
Marking points:
- Too often (for example on every request): the algorithm costs O(m × n^2) each time, so the overhead is unacceptable; against that, it detects the deadlock the moment it forms …
- Too rarely (arbitrary invocation): several cycles may have formed, so there is no way to tell which of the many deadlocked processes "caused" the deadlock, and more processes must be …
- It depends on two things: how often a deadlock is likely to occur, and how many processes would need to be rolled back — one for each disjoint cycle.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-54
Unit: 2 Processes
Topic: Deadlocks
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-69
In syllabus: yes
Question: Recovery by resource preemption has to address three issues. Name them and explain how each is handled.
Answer:
- **Selecting a victim.** Which process loses its resources? Choose so as to minimize cost: how many resources the deadlocked process is holding, and how much execution time it has already consumed.
- **Rollback.** A process stripped of a resource cannot continue normally, so it must be returned to some safe state and restarted from there. Roll back only as far as necessary to break the deadlock, since a total rollback (abort and restart) is the most expensive option.
- **Starvation.** If the cost function always points at the same process, it is picked as victim every time and never completes. The solution is to **include the number of rollbacks in the cost factor** , so a process that has already been rolled back repeatedly becomes an expensive victim.

Add if marks allow: preemption is only possible for resources whose state can be saved and restored, such as CPU registers and memory; a printer or tape drive mid-job cannot be preempted cleanly.
Marking points:
- Selecting a victim.
- Which process loses its resources?
- Choose so as to minimize cost: how many resources the deadlocked process is holding, and how much execution time it has already consumed.
- A process stripped of a resource cannot continue normally, so it must be returned to some safe state and restarted from there.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-55
Unit: 2 Processes
Topic: Deadlocks
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: State the four necessary conditions for deadlock. For each, describe how a prevention protocol attacks it and what it costs.
Answer:
| Condition | Meaning | How to attack it | Cost |
| --- | --- | --- | --- |
| Mutual exclusion | At least one resource is non-sharable | Make resources sharable where possible (read-only files); spool a device so processes never hold it (the printer daemon) | Impossible for genuinely non-sharable resources, so this is rarely usable |
| Hold and wait | A process holds one resource and waits for another | Request all resources before starting, or require a process to hold none when it requests more | Low resource utilization (resources held but unused); starvation of processes needing popular resources |
| No preemption | A resource is released only voluntarily | Preempt the holder's resources when its request cannot be satisfied; restart it later | Only for resources whose state can be saved and restored; lost work; starvation |
| Circular wait | A cycle of processes each waiting for the next | Impose a total ordering on resource types and require requests in increasing order | Unnatural request order for the programmer; may force early acquisition or release and restart; starvation possible |

All four must hold simultaneously for deadlock, so breaking any one is enough. Prevention is conservative, so it costs utilization; that is why most general-purpose systems instead use deadlock *avoidance* for some resources and otherwise simply ignore the problem (the "ostrich" approach), leaving it to the application.
Marking points:
- Mutual exclusion: At least one resource is non-sharable
- Hold and wait: A process holds one resource and waits for another
- No preemption: A resource is released only voluntarily
- Circular wait: A cycle of processes each waiting for the next
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-56
Unit: 2 Processes
Topic: Deadlocks
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025)
In syllabus: yes
Question: System with resources A(10), B(5), C(7). Allocation / Max: P0 (0,1,0)/(7,5,3); P1 (2,0,0)/(3,2,2); P2 (3,0,2)/(9,0,2); P3 (2,1,1)/(2,2,2); P4 (0,0,2)/(4,3,3). Is the state safe? What if P1 requests (1,0,2)?
Answer: **Available** = total − allocated = (10,5,7) − (7,2,5) = **(3,3,2)**. **Need** = Max − Allocation: P0 (7,4,3), P1 (1,2,2), P2 (6,0,0), P3 (0,1,1), P4 (4,3,1).

**Safety algorithm:** Work = (3,3,2).

- P1: Need (1,2,2) ≤ (3,3,2) → run; Work = (3,3,2)+(2,0,0) = (5,3,2)
- P3: Need (0,1,1) ≤ (5,3,2) → run; Work = (7,4,3)
- P4: Need (4,3,1) ≤ (7,4,3) → run; Work = (7,4,5)
- P0: Need (7,4,3) ≤ (7,4,5) → run; Work = (7,5,5)
- P2: Need (6,0,0) ≤ (7,5,5) → run; Work = (10,5,7)

All processes finish, so the state is **safe**, with safe sequence <P1, P3, P4, P0, P2>.

**Request P1 = (1,0,2):** check Request ≤ Need (1,0,2) ≤ (1,2,2) ✓ and Request ≤ Available (1,0,2) ≤ (3,3,2) ✓. Pretend to grant: Available = (2,3,0); P1's Allocation = (3,0,2), Need = (0,2,0). Run safety: P1 (0,2,0) ≤ (2,3,0) → Work (5,3,2); then P3, P4, P0, P2 as before. Safe sequence <P1, P3, P4, P0, P2> exists, so the request can be **granted immediately**.

Remember the difference: *safe* means a sequence exists in which every process can finish; an unsafe state is not necessarily deadlocked, but the system can no longer guarantee that it won't be.
Marking points:
- Final answer: Request P1 = (1,0,2): check Request ≤ Need (1,0,2) ≤ (1,2,2) ✓ and Request ≤ Available (1,0,2) ≤ (3,3,2) ✓.
- P1: Need (1,2,2) ≤ (3,3,2) → run; Work = (3,3,2)+(2,0,0) = (5,3,2)
- P3: Need (0,1,1) ≤ (5,3,2) → run; Work = (7,4,3)
- P4: Need (4,3,1) ≤ (7,4,3) → run; Work = (7,4,5)
- P0: Need (7,4,3) ≤ (7,4,5) → run; Work = (7,5,5)
- P2: Need (6,0,0) ≤ (7,5,5) → run; Work = (10,5,7)
Answer source: written by Claude, no key
Weak / low priority: no
