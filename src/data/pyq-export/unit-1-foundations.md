# Unit 1 Foundations

## System Complexity

### PYQ-1
Unit: 1 Foundations
Topic: System Complexity
Type: written
Asked in: OSN Quiz 1 2020, Q3 (4 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Like any system, the operating system has Input and Output. Based on the topics you have studied, what constitutes as Input and Output of an operating system?
Answer: **Input: events and requests.** System calls from programs, hardware interrupts from devices, timer interrupts, traps and exceptions (errors), commands from users, and the programs and data submitted to run.

**Output: services and decisions.** Resources allocated (CPU time, memory, devices, files), results and status returned from system calls, programs executed as processes, and error handling and messages.

So the OS behaves as an event-driven system: each interrupt or request comes in, and the OS responds with an allocation or service.

Link it to the slide: input and output are two of a system's nine characteristics, so start by saying the OS is a system whose environment is the users, programs and devices.
Marking points:
- Input: events and requests: System calls from programs, hardware interrupts from devices, timer interrupts, traps and exceptions (errors), commands from users, and the programs and data submitted to run.
- Output: services and decisions: Resources allocated (CPU time, memory, devices, files), results and status returned from system calls, programs executed as processes, and error handling and messages.
- System calls from programs, hardware interrupts from devices, timer interrupts, traps and exceptions (errors), commands from users, and the programs and data submitted to run.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-2
Unit: 1 Foundations
Topic: System Complexity
Type: written
Asked in: AOS End-sem 2025, Q4 (5 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Explain how the notions of "modularity", "abstraction" and "robustness principle" help in developing modern computer systems. What will happen if you do not follow them?
Answer: **Modularity** (divide and conquer): the system is designed as a set of interacting modules, each understood and built in isolation. With N statements and about N bugs, debugging a monolith costs about N^2, while K modules cost K × (N/K)^2 = N^2/K, a factor of K less. It allows incremental improvement: an inferior module can be replaced by a better one, which handles complexity caused by change. *Without it:* every change and every bug involves the whole program; debugging grows as N^2; a fix in one place breaks another; teams cannot work in parallel.

**Abstraction:** each module treats the others only through their external specifications, with no knowledge of their insides. A bug is then found by examining one module, and effects do not propagate across modules; modules can be reimplemented without changing their users (a system call's implementation can change while programs stay the same). *Without it:* modules depend on each other's internals, so a change or a fault in one propagates through the system; modularity alone does not help if every module looks inside every other.

**Robustness principle:** be tolerant of inputs and strict on outputs, with a safety margin: check inputs are within range and report out-of-tolerance ones. Each module accepts slightly imperfect input from others but produces exactly correct output, so small errors are absorbed instead of amplified. It is central to network protocols (accept what you can parse, send exactly to the standard), human interfaces and fault tolerance. *Without it:* one slightly malformed input crashes a component, and errors cascade across modules and machines; interoperability between independently built components fails.

**Together:** modularity divides the system, abstraction keeps the pieces independent, and robustness keeps the interfaces between them forgiving; without them, complexity (number of interconnections and propagation of effects) grows faster than anyone can understand, and the system becomes unbuildable and unmaintainable.
Marking points:
- Modularity (divide and conquer): the system is designed as a set of interacting modules, each understood and built in isolation.
- Abstraction: each module treats the others only through their external specifications, with no knowledge of their insides.
- Robustness principle: be tolerant of inputs and strict on outputs, with a safety margin: check inputs are within range and report out-of-tolerance ones.
- Together: modularity divides the system, abstraction keeps the pieces independent, and robustness keeps the interfaces between them forgiving; without them, complexity (number of interconnections and propagation of effects) grows faster than anyone can understand …
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-3
Unit: 1 Foundations
Topic: System Complexity
Type: written
Asked in: OSN Quiz 3 (set 1) 2020, Q1 (4 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Discuss how the notions of hierarchy and information hiding are helpful in easing the development of operating system?
Answer: **Hierarchy** arranges the OS in levels, where each level uses only the levels below. Correctness can be reasoned about and tested one level at a time, starting from the bottom, instead of all at once. THE was verified this way.

**Information hiding** means each level keeps its data structures and implementation private and exposes only operations. Higher levels see an abstract machine; for example, above the memory manager a process sees segments, not where pages physically sit. Changes inside a level do not propagate upward.

Together they reduce complexity, localise errors, and make design, debugging and maintenance manageable.
Marking points:
- Hierarchy arranges the OS in levels, where each level uses only the levels below.
- Information hiding means each level keeps its data structures and implementation private and exposes only operations.
- Correctness can be reasoned about and tested one level at a time, starting from the bottom, instead of all at once.
- THE was verified this way.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-1
Unit: 1 Foundations
Topic: System Complexity
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Justify the observation: "Computer systems have no nearby bounds on composition, unlike analog and other engineered systems." What, then, limits their growth?
Answer: **Digital, so noise does not accumulate.** In an analog system every component contributes noise (vibration, electromagnetic radiation, drifting physical behaviour), and the noise adds up as components are chained, until it dominates the system's behaviour: that sets a physical limit on size (a photocopy of a photocopy degrades). In a digital system a range of analog values represents 0 or 1, and every gate restores the signal, so a signal does not accumulate noise as it passes through a string of devices. Noise therefore does not limit the number of devices; a chip can hold billions of transistors. A failure (0 becoming 1) is a big mistake, and big mistakes are easy to detect.

**Software has no physical limits.** Hardware is still bounded by physics (speed of light); software is not, so programs grow to millions of statements. Its abstractions leak, which is the software equivalent of noise.

**Fast change.** Technology improves so quickly (about 30% a year in cost) that systems are redesigned before they settle.

**What limits growth:** only the ability of humans to understand the system. That is why the course's tools (modularity, abstraction, layering, hierarchy, iteration, keep it simple) are about understanding, not about physics.
Marking points:
- Digital, so noise does not accumulate: In an analog system every component contributes noise (vibration, electromagnetic radiation, drifting physical behaviour), and the noise adds up as components are chained, until it dominates the system's behaviour: that sets a physical limit on …
- Software has no physical limits: Hardware is still bounded by physics (speed of light); software is not, so programs grow to millions of statements.
- Fast change: Technology improves so quickly (about 30% a year in cost) that systems are redesigned before they settle.
- What limits growth: only the ability of humans to understand the system.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-2
Unit: 1 Foundations
Topic: System Complexity
Type: true/false
Based on: imitates the professor's TRUE/FALSE correct-and-justify items (OSN End 2022 Q1, AOS End 2025 Q1)
In syllabus: yes
Question: TRUE or FALSE, correct if false and justify: "Adding one more requirement to a system increases its complexity in proportion to the number of requirements already present."
Answer: **FALSE.** Corrected: adding a requirement increases complexity **out of proportion** (the principle of escalating complexity).

**Justification:** a new requirement interacts with every existing one, and the interactions grow faster than the requirements themselves. In the telephone example, "call forwarding" must be reconciled with "call waiting", "call blocking", "caller ID blocking" and the rest, each pair needing a decision about what happens when both apply. With n features there are up to n(n − 1)/2 pairwise interactions.
Marking points:
- States FALSE.
- Corrected: adding a requirement increases complexity out of proportion (the principle of escalating complexity).
- a new requirement interacts with every existing one, and the interactions grow faster than the requirements themselves.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-3
Unit: 1 Foundations
Topic: System Complexity
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025); same section as PYQ-2, PYQ-3
In syllabus: yes
Question: A 20,000-statement program is to be split into modules. Using the slide's model (bugs ∝ N, time to fix a bug ∝ N), by what factor does splitting it into 20 modules reduce debugging time? What assumption does the argument depend on, and which tool provides it?
Answer: **Monolith:** ≈ N × N = 20,000^2 = 4 × 10^8 units. **20 modules** of 1,000 statements: each costs 1,000^2 = 10^6, total 20 × 10^6 = 2 × 10^7. Reduction factor = 4 × 10^8 / 2 × 10^7 = **20 = K**.

**Assumption:** a bug found in a module can be located and fixed by examining only that module, so the time per bug is proportional to the module's size, not the program's. That holds only if effects do not propagate between modules, which is what **abstraction** provides (each module is used only through its specification). Without it, a bug may require reading other modules, and the cost drifts back toward N^2.
Marking points:
- Final answer: Reduction factor = 4 × 10^8 / 2 × 10^7 = 20 = K.
- Monolith: ≈ N × N = 20,000^2 = 4 × 10^8 units.
- Assumption: a bug found in a module can be located and fixed by examining only that module, so the time per bug is proportional to the module's size, not the program's.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-4
Unit: 1 Foundations
Topic: System Complexity
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Blocks 6 and 8; same section as PYQ-2, PYQ-3
In syllabus: yes
Question: Give two examples of the robustness principle in the networking part of the course, and one place where it can be misused.
Answer: **Tolerant of input:** a TCP receiver accepts segments that arrive out of order, duplicated or late, buffering and reordering them by sequence number instead of rejecting them (Block 8); a data-link receiver with selective repeat buffers out-of-order frames (Block 6).

**Strict on output:** senders transmit exactly to the protocol specification: correct checksums, sequence numbers, window advertisements and segment formats, so every independently built receiver can parse them.

**Safety margin:** checksums and CRCs detect out-of-tolerance input and discard it, and the error is reported (no acknowledgement), which triggers retransmission.

**Misuse:** being too tolerant can hide bugs or create security holes: a receiver that silently accepts malformed headers may be exploited, and widespread tolerance lets sloppy senders persist. So "tolerant" must still mean "within checked tolerance".
Marking points:
- Tolerant of input: a TCP receiver accepts segments that arrive out of order, duplicated or late, buffering and reordering them by sequence number instead of rejecting them (Block 8); a data-link receiver with selective repeat buffers out-of-order frames …
- Strict on output: senders transmit exactly to the protocol specification: correct checksums, sequence numbers, window advertisements and segment formats, so every independently built receiver can parse them.
- Safety margin: checksums and CRCs detect out-of-tolerance input and discard it, and the error is reported (no acknowledgement), which triggers retransmission.
- Misuse: being too tolerant can hide bugs or create security holes: a receiver that silently accepts malformed headers may be exploited, and widespread tolerance lets sloppy senders persist.
Answer source: written by Claude, no key
Weak / low priority: no

## History of Operating Systems

### PYQ-4
Unit: 1 Foundations
Topic: History of Operating Systems
Type: written
Asked in: OSN Quiz 1 2020, Q4 (4 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: How spooling has improved the CPU utilization?
Answer: Card readers and printers are far slower than the CPU, so without spooling the CPU waits on them. Spooling uses the disk as a large buffer: input is read onto disk ahead of time and output is written to disk and printed later. The CPU reads and writes the fast disk instead of the slow device, and the I/O of one job overlaps the computation of another, keeping both CPU and devices busy. Because many jobs now sit on disk (a job pool), the OS can also choose which job to run next, which made multiprogramming possible.
Marking points:
- Card readers and printers are far slower than the CPU, so without spooling the CPU waits on them.
- Spooling uses the disk as a large buffer: input is read onto disk ahead of time and output is written to disk and printed later.
- The CPU reads and writes the fast disk instead of the slow device, and the I/O of one job overlaps the computation of another, keeping both CPU and devices busy.
- Because many jobs now sit on disk (a job pool), the OS can also choose which job to run next, which made multiprogramming possible.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-5
Unit: 1 Foundations
Topic: History of Operating Systems
Type: written
Asked in: AOS End-sem 2025, Q11a, Q11e (2 parts of a 5-mark question)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Developments in operating systems have generally occurred in an evolutionary rather than revolutionary fashion. For each of the following transitions, describe the primary motivations of operating systems designers that led them to produce the new type of system from the old. a. Single user dedicated systems to multiprogramming. e. Single user dedicated systems with manual job-to-job transition to single user dedicated systems with single stream batch processing systems.
Answer: **(e) Manual job-to-job transition → single-stream batch.** In serial processing, every job needed manual setup (mount the compiler tape, run, unmount, mount the assembler, run, load the object program) and users booked the machine on a sign-up sheet, so the very expensive CPU sat idle during setup and between users; an error meant starting over. **Motivation: cut the setup and transition time to raise CPU utilization.** First an operator ran jobs and batched similar ones together; then a **resident monitor** sequenced jobs automatically from control cards, so the machine passed from one job to the next without human delay.

**(a) Single-user dedicated → multiprogramming.** Even with batching, one job at a time leaves the CPU idle whenever that job waits for I/O, because mechanical devices are far slower than the CPU (a 20-cards-per-second reader against thousands of instructions per second). A single user can keep neither the CPU nor the I/O busy. **Motivation: overlap one job's I/O with another's computation, so the CPU always has a job to execute**, raising CPU and device utilization and throughput. Spooling (disk as a buffer) made a pool of jobs available on disk to choose from. Multiprogramming keeps several jobs in memory and switches when one waits; it is the first time the OS makes decisions (job scheduling, memory management, CPU scheduling, device allocation).

**One thread through both:** the CPU was the most expensive component, and each transition removed a cause of its idle time; each also forced new OS functions and hardware support (protection, timer, interrupts).
Marking points:
- (e) Manual job-to-job transition → single-stream batch.
- (a) Single-user dedicated → multiprogramming: Even with batching, one job at a time leaves the CPU idle whenever that job waits for I/O, because mechanical devices are far slower than the CPU (a 20-cards-per-second reader against thousands of instructions per …
- One thread through both: the CPU was the most expensive component, and each transition removed a cause of its idle time; each also forced new OS functions and hardware support (protection, timer, interrupts).
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-6
Unit: 1 Foundations
Topic: History of Operating Systems
Type: written
Asked in: OSN Quiz 1 2022, Q1 (2 marks); AOS Quiz 1 2025, Q1 (2 marks)
Times asked: 2
Reworded versions: none
In syllabus: yes
Question: What is the objective of "time-sharing"? Why the same objective can not be realized through multiprogramming?
Answer: **Key:** the objective of time-sharing is to realize interactive computing. It cannot be realized through multiprogramming because in multiprogramming the scheduler releases the CPU only when it encounters an I/O operation. Sometimes it may take a long time to encounter I/O, so other processes may have to wait for the CPU for an unpredictable duration, and interactive computing is difficult. In time-sharing, the CPU is interrupted after a fixed time period.

So time-sharing adds a **timer interrupt** to multiprogramming: each user gets the CPU within a bounded time and has the impression of a dedicated machine.
Marking points:
- the objective of time-sharing is to realize interactive computing.
- It cannot be realized through multiprogramming because in multiprogramming the scheduler releases the CPU only when it encounters an I/O operation.
- Sometimes it may take a long time to encounter I/O, so other processes may have to wait for the CPU for an unpredictable duration, and interactive computing is difficult.
- In time-sharing, the CPU is interrupted after a fixed time period.
Answer source: professor's key
Weak / low priority: no

### PYQ-7
Unit: 1 Foundations
Topic: History of Operating Systems
Type: written
Asked in: OSN Quiz 1 2022, Q10 (2 marks); AOS Quiz 1 2025, Q10 (2 marks); OSN Quiz 3 (set 1) 2020, Q4 (4 marks); OSN Quiz 3 (set 2) 2020, Q6 (4 marks)
Times asked: 4
Reworded versions: "Explain the context of "probe instructions" in Dijkstra's paper entitled "My recollections of OS design". List the problems caused by probe instructions." (OSN Quiz 3 (set 1) 2020); "Discuss basic problem faced by Dijkstra when he started designing the operating system. Explain how he has employed "probe instructions" and "interrupts" in OS design." (OSN Quiz 3 (set 2) 2020)
In syllabus: no: research-paper question; the end-sem topic list names no research papers
Question: In the paper "My recollections of OS design", What are the problems with the probe instructions. How interrupts solved the problem and introduced new problems?
Answer: **Key:** problem created by probe instructions: processor time is wasted. Since executing a probe instruction takes time, if the processor probes the peripheral with high frequency it slows down the computation, while probing with low frequency increases the reaction time. Solution with interrupts: interrupts helped save processor time and use it for executing user programs. While the computer calculates at full speed, a piece of dedicated hardware monitors the outside world for completion signals from communication devices; when a completion (for example a data transfer) is detected, the device interrupts the processor. New problems: as the timing of interrupts is unpredictable, they raised several synchronization and consistency issues, which were resolved in due course.
Marking points:
- problem created by probe instructions: processor time is wasted.
- Since executing a probe instruction takes time, if the processor probes the peripheral with high frequency it slows down the computation, while probing with low frequency increases the reaction time.
- Solution with interrupts: interrupts helped save processor time and use it for executing user programs.
- While the computer calculates at full speed, a piece of dedicated hardware monitors the outside world for completion signals from communication devices; when a completion (for example a data transfer) is detected, the device interrupts the processor.
Answer source: professor's key
Weak / low priority: yes: a research-paper question; the end-sem topic list names no research papers. It was asked three times in quizzes, so read the key once.

### PRED-5
Unit: 1 Foundations
Topic: History of Operating Systems
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-4, PYQ-5, PYQ-6
In syllabus: yes
Question: The resident monitor of a simple batch system relied on four hardware features: memory protection, a timer, privileged instructions and interrupts. For each, explain what would go wrong without it.
Answer: **Memory protection:** while the user program runs, the monitor sits in the same memory. Without protection, a buggy job could overwrite the monitor, and the batch would stop with no way to continue to the next job. With it, the hardware detects the illegal access and transfers control to the monitor.

**Timer:** without it, a job in an infinite loop would hold the CPU forever and the rest of the batch would never run. The timer interrupts after a set time and returns control to the monitor.

**Privileged instructions:** without them, a job could perform I/O directly, reading past its own control cards into the next job's data, or change the timer and protection settings. With them, I/O and control instructions run only in the monitor, and a user attempt traps to it.

**Interrupts:** they let the monitor seize and relinquish control flexibly: a device completing I/O, the timer expiring or an error all transfer control to the monitor without the job's cooperation.

These four are exactly the protection mechanisms of every modern OS (section 6): batch systems invented them.
Marking points:
- Memory protection: while the user program runs, the monitor sits in the same memory.
- Timer: without it, a job in an infinite loop would hold the CPU forever and the rest of the batch would never run.
- Privileged instructions: without them, a job could perform I/O directly, reading past its own control cards into the next job's data, or change the timer and protection settings.
- Interrupts: they let the monitor seize and relinquish control flexibly: a device completing I/O, the timer expiring or an error all transfer control to the monitor without the job's cooperation.
Answer source: written by Claude, no key
Weak / low priority: no

## Hardware Review

### PYQ-8
Unit: 1 Foundations
Topic: Hardware Review
Type: written
Asked in: OSN Quiz 1 2020, Q1 (4 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Is it possible to build an operating system without employing the notion of "caching". Discuss.
Answer: In principle yes: every access could go straight to main memory or disk. In practice no, because the speed gap between levels of the storage hierarchy is huge, and caching is what hides it. Caching appears at every level: hardware caches between CPU and memory, the TLB, main memory acting as a cache for disk (virtual memory), and the OS buffer cache for disk blocks. Because programs show locality, a small fast cache serves most accesses. Without caching, every access would pay the cost of the slowest level and performance would collapse.
Marking points:
- In principle yes: every access could go straight to main memory or disk.
- In practice no, because the speed gap between levels of the storage hierarchy is huge, and caching is what hides it.
- Caching appears at every level: hardware caches between CPU and memory, the TLB, main memory acting as a cache for disk (virtual memory), and the OS buffer cache for disk blocks.
- Because programs show locality, a small fast cache serves most accesses.
- Without caching, every access would pay the cost of the slowest level and performance would collapse.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-9
Unit: 1 Foundations
Topic: Hardware Review
Type: written
Asked in: OSN Quiz 1 2020, Q2 (4 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Elaborate the issue of "cache coherency".
Answer: Caching means one datum can exist as several copies: on disk, in memory, in cache, in a register. Every user must see the most recent value. With a single CPU this is manageable. In a multiprocessor, each CPU has its own cache, so if one CPU updates its copy, the copies in other caches become stale. Hardware must provide cache coherency, invalidating or updating the other copies so all CPUs see the latest value. In distributed systems, with replicas on different machines, keeping copies consistent is harder still. On multicore machines this coherence traffic makes shared data expensive, which is the starting point of the Corey paper.
Marking points:
- Caching means one datum can exist as several copies: on disk, in memory, in cache, in a register.
- Every user must see the most recent value.
- With a single CPU this is manageable.
- In a multiprocessor, each CPU has its own cache, so if one CPU updates its copy, the copies in other caches become stale.
- Hardware must provide cache coherency, invalidating or updating the other copies so all CPUs see the latest value.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-10
Unit: 1 Foundations
Topic: Hardware Review
Type: written
Asked in: OSN Quiz 1 2020, Q5 (4 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Operating system is called as a "Interrupt Controller". Justify.
Answer: A modern OS is interrupt-driven. With no process to run, no I/O and no user activity, it simply waits. Every entry into the OS is an interrupt of some kind: a device completing I/O, the timer (for time-sharing and CPU protection), a system call (a trap, or software interrupt), or an error (an exception). The OS code largely runs as interrupt handlers, reached through the interrupt vector, and after each one it decides what runs next. So the OS is effectively the component that receives and handles interrupts and acts on them.
Marking points:
- A modern OS is interrupt-driven.
- With no process to run, no I/O and no user activity, it simply waits.
- Every entry into the OS is an interrupt of some kind: a device completing I/O, the timer (for time-sharing and CPU protection), a system call (a trap, or software interrupt), or an error (an exception).
- The OS code largely runs as interrupt handlers, reached through the interrupt vector, and after each one it decides what runs next.
- So the OS is effectively the component that receives and handles interrupts and acts on them.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-11
Unit: 1 Foundations
Topic: Hardware Review
Type: written
Asked in: AOS Mid-sem 2025, Q1b (3 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Do you believe that whenever a higher priority interrupt occurs, the computer switches execution to the interrupt routine? What is the corresponding hardware mechanism?
Answer: **Not always, and not instantly.** The CPU checks for interrupts only at the end of the current instruction (the interrupt cycle after fetch and execute). It switches only if interrupts are enabled: the kernel disables them while saving state or in short critical sections, and maskable interrupts can be masked. If the CPU is already servicing an interrupt, the new one preempts it only if it has higher priority; otherwise it stays pending. Non-maskable interrupts (for example, hardware failure) cannot be disabled.

**Hardware mechanism.** Devices raise interrupt-request lines into a priority interrupt controller, which has priority levels and an interrupt mask register, plus the interrupt-enable bit in the PSW. When an interrupt is accepted, hardware saves the PC and PSW on the stack, switches to kernel mode, and uses the interrupt number to index the interrupt vector, which holds the handler addresses.

**One-line answer:** it switches only if interrupts are enabled and the new priority is higher than the current one, after finishing the current instruction; implemented by priority levels, masking and the interrupt vector.
Marking points:
- Not always, and not instantly: The CPU checks for interrupts only at the end of the current instruction (the interrupt cycle after fetch and execute).
- Hardware mechanism: Devices raise interrupt-request lines into a priority interrupt controller, which has priority levels and an interrupt mask register, plus the interrupt-enable bit in the PSW.
- One-line answer: it switches only if interrupts are enabled and the new priority is higher than the current one, after finishing the current instruction; implemented by priority levels, masking and the interrupt vector.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-12
Unit: 1 Foundations
Topic: Hardware Review
Type: written
Asked in: OSN Quiz 1 2022, Q3 (2 marks); AOS Quiz 1 2025, Q3 (2 marks)
Times asked: 2
Reworded versions: none
In syllabus: yes
Question: Explain the advantage of "DMA" data transfer over "interrupt initiated data transfer".
Answer: **Key:** to transfer large data from disk or any peripheral to main memory with interrupt-initiated transfer, the CPU is interrupted for every byte. The DMA mechanism allows the transfer of a large chunk of data without frequent interrupts. As a result, the data transfer is fast.

**Detail:** with DMA the CPU issues one command (direction, device address, memory address, count); the DMA controller moves the whole block directly between the device and memory, and interrupts once per block. The CPU is free for other work meanwhile, losing only some memory-bus cycles to the controller.
Marking points:
- to transfer large data from disk or any peripheral to main memory with interrupt-initiated transfer, the CPU is interrupted for every byte.
- Detail: with DMA the CPU issues one command (direction, device address, memory address, count); the DMA controller moves the whole block directly between the device and memory, and interrupts once per block.
- The DMA mechanism allows the transfer of a large chunk of data without frequent interrupts.
- As a result, the data transfer is fast.
Answer source: professor's key
Weak / low priority: no

### PYQ-13
Unit: 1 Foundations
Topic: Hardware Review
Type: written
Asked in: OSN Quiz 1 2022, Q2 (2 marks); AOS Quiz 1 2025, Q2 (2 marks)
Times asked: 2
Reworded versions: none
In syllabus: yes
Question: In earlier operating systems, there was no mode bit. How the mode bit has enhanced the protection in the modern operating systems?
Answer: **Key:** sensitive tasks, such as setting the timer, should be operated only by the operating system. With no mode bit it was difficult to restrict the execution of sensitive programs by the user efficiently. The mode bit allowed a mechanism so that the OS has control over sensitive tasks: by classifying the tasks into two groups, **privileged and non-privileged**, it restricts user programs from executing privileged tasks. Development of OSes became relatively simple after the mode bit emerged.

Without a mode bit, any program could execute any instruction: do I/O directly, change the timer, or overwrite the OS. One faulty program could crash the whole system (as in MS-DOS).

The mode bit (kernel 0, user 1) lets the hardware split instructions into privileged and non-privileged. Privileged ones (I/O, loading the timer, loading base/limit registers, disabling interrupts, halt) run only in kernel mode; in user mode they trap to the OS. Interrupts and system calls switch to kernel mode, and the OS switches back before returning. I/O, memory and CPU protection are all built on this, and user programs reach privileged services only through system calls.
Marking points:
- sensitive tasks, such as setting the timer, should be operated only by the operating system.
- With no mode bit it was difficult to restrict the execution of sensitive programs by the user efficiently.
- The mode bit allowed a mechanism so that the OS has control over sensitive tasks: by classifying the tasks into two groups, privileged and non-privileged, it restricts user programs from executing privileged tasks.
- Development of OSes became relatively simple after the mode bit emerged.
Answer source: professor's key
Weak / low priority: no

### PRED-6
Unit: 1 Foundations
Topic: Hardware Review
Type: true/false
Based on: imitates the professor's TRUE/FALSE correct-and-justify items (OSN End 2022 Q1, AOS End 2025 Q1); same section as PYQ-8, PYQ-9, PYQ-10, PYQ-11
In syllabus: yes
Question: TRUE or FALSE, correct if false and justify: "DMA removes the CPU from I/O entirely."
Answer: **False.** Corrected: DMA removes the CPU from the per-word data movement, not from I/O. The CPU still sets up each transfer (direction, device, memory address, count) and handles the completion interrupt once per block. While the DMA controller uses the memory bus, the CPU may also be slowed or made to wait for the bus (cycle stealing).
Marking points:
- States FALSE.
- Corrected: DMA removes the CPU from the per-word data movement, not from I/O.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-7
Unit: 1 Foundations
Topic: Hardware Review
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-13
In syllabus: yes
Question: Which of the following should be privileged, and why? (a) set the timer (b) read the clock (c) clear memory (d) issue a trap (e) turn off interrupts (f) modify the device-status table (g) switch from user to kernel mode (h) access an I/O device.
Answer: **Privileged:** a, c, e, f, g, h. Each one would let a user program take control of the machine or damage others: setting the timer could stop the OS regaining control, disabling interrupts has the same effect, clearing memory could wipe the OS or other programs, the device-status table and I/O are shared, and switching to kernel mode directly would bypass all protection.

**Not privileged:** b and d. Reading the clock is harmless. Issuing a trap must be allowed, because it is the controlled way a user program enters the kernel (a system call).
Marking points:
- Privileged: a, c, e, f, g, h.
- Not privileged: b and d.
- Each one would let a user program take control of the machine or damage others: setting the timer could stop the OS regaining control, disabling interrupts has the same effect, clearing memory could wipe the OS or other programs …
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-8
Unit: 1 Foundations
Topic: Hardware Review
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-13
In syllabus: yes
Question: Why is a system call implemented as a trap (software interrupt) instead of an ordinary procedure call into the kernel?
Answer: Kernel code has to run in kernel mode, and a user program cannot set the mode bit itself; that would defeat protection. A trap is the only controlled entry: the hardware switches to kernel mode and jumps through the vector to a fixed OS entry point, so the user cannot jump to an arbitrary kernel address. The OS then identifies the call by its number, validates the parameters (passed in registers, a memory block, or the stack), performs the service, and returns to user mode at the instruction after the call.
Marking points:
- Kernel code has to run in kernel mode, and a user program cannot set the mode bit itself; that would defeat protection.
- A trap is the only controlled entry: the hardware switches to kernel mode and jumps through the vector to a fixed OS entry point, so the user cannot jump to an arbitrary kernel address.
- The OS then identifies the call by its number, validates the parameters (passed in registers, a memory block, or the stack), performs the service, and returns to user mode at the instruction after the call.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-9
Unit: 1 Foundations
Topic: Hardware Review
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-13
In syllabus: yes
Question: Three user programs misbehave: one enters an infinite loop, one tries to store a new address into the interrupt vector, and one tries to write directly to the disk. For each, which protection mechanism stops it, and how?
Answer: **Infinite loop: CPU protection.** Before dispatching the program, the OS loads the timer (a privileged instruction). When the timer reaches zero it interrupts, the hardware switches to kernel mode, and the OS regains control to terminate or reschedule the program.

**Writing the interrupt vector: memory protection.** Base and limit registers define the program's legal range, and the vector lies outside it. The hardware compares every address; an out-of-range access traps to the OS as an addressing error. Loading base and limit is privileged, so the program cannot widen its own range.

**Writing the disk directly: I/O protection.** All I/O instructions are privileged, so executing one in user mode traps to the OS. The program must use a system call, and the OS checks the request.

All three depend on the mode bit.
Marking points:
- Infinite loop: CPU protection: Before dispatching the program, the OS loads the timer (a privileged instruction).
- Writing the interrupt vector: memory protection: Base and limit registers define the program's legal range, and the vector lies outside it.
- Writing the disk directly: I/O protection: All I/O instructions are privileged, so executing one in user mode traps to the OS.
Answer source: written by Claude, no key
Weak / low priority: no

## System Structures

### PYQ-14
Unit: 1 Foundations
Topic: System Structures
Type: written
Asked in: OSN Quiz 1 2022, Q5 (2 marks); AOS Quiz 1 2025, Q5 (2 marks); OSN Quiz 2 (alt set) 2020, Q4 (not recorded)
Times asked: 3
Reworded versions: "What will happen if you design an OS based on policy decisions? (opening words as copied on a student answer sheet)" (OSN Quiz 2 (alt set) 2020)
In syllabus: yes
Question: Give one example of "mechanism" and one example of "policy". What will happen if you design operating systems based on only policy decisions?
Answer: **Key:** separation of policy and mechanism is an important principle. Mechanisms describe how things are done; policies describe what will be done. Mechanisms do not change often; policies may change. **Examples of mechanism:** the timer used for CPU protection; a priority algorithm for scheduling. **Examples of policy:** how long the timer is set; which process gets the priority. If you implement an operating system using only policies, it has to be updated frequently, as policies change often. So it is better to leave the policy specifications to users.
Marking points:
- separation of policy and mechanism is an important principle.
- Mechanisms describe how things are done; policies describe what will be done.
- Mechanisms do not change often; policies may change.
- Examples of mechanism: the timer used for CPU protection; a priority algorithm for scheduling.
Answer source: professor's key
Weak / low priority: no

### PYQ-15
Unit: 1 Foundations
Topic: System Structures
Type: written
Asked in: AOS Mid-sem 2025, Q1c (3 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Why is the separation of mechanism and policy a desired principle?
Answer: A mechanism says how something is done (the timer for CPU protection); a policy says what will be done (how long the timer is set, which process gets priority). Policies change often, from site to site and over time, while mechanisms rarely change.

If they are separated, a change of policy only changes a parameter, not the OS code. One general mechanism can support many policies, which gives flexibility. If they are fused, every policy change forces a redesign of the mechanism. Microkernels take this furthest: the kernel provides only mechanisms and policies are decided at user level.
Marking points:
- A mechanism says how something is done (the timer for CPU protection); a policy says what will be done (how long the timer is set, which process gets priority).
- Policies change often, from site to site and over time, while mechanisms rarely change.
- If they are separated, a change of policy only changes a parameter, not the OS code.
- One general mechanism can support many policies, which gives flexibility.
- If they are fused, every policy change forces a redesign of the mechanism.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-16
Unit: 1 Foundations
Topic: System Structures
Type: written
Asked in: AOS Mid-sem 2025, Q1a (3 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: What is the main advantage of the layered approach to system design? What is the disadvantage?
Answer: **Advantage: modularity.** Layer t uses only the operations of layers below it, through well-defined interfaces, and hides its own data structures. So the OS can be designed, debugged and verified one layer at a time: debug layer 1 on correct hardware, then layer 2 assuming layer 1 is correct, and so on. A change inside one layer does not spread to the others.

**Disadvantages.** First, defining the layers is hard, because every layer may use only lower ones while real dependencies are often circular. For example, the memory manager needs the disk driver for swapping, and the disk driver needs memory for buffers. Second, performance: a request passes down through several layers, each adding a call and parameter handling, so it is slower than a monolithic design.
Marking points:
- Advantage: modularity: Layer t uses only the operations of layers below it, through well-defined interfaces, and hides its own data structures.
- Disadvantages: First, defining the layers is hard, because every layer may use only lower ones while real dependencies are often circular.
- Advantage: modularity.
- So the OS can be designed, debugged and verified one layer at a time: debug layer 1 on correct hardware, then layer 2 assuming layer 1 is correct, and so on.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-17
Unit: 1 Foundations
Topic: System Structures
Type: written
Asked in: OSN Quiz 1 2022, Q8 (2 marks); AOS Quiz 1 2025, Q8 (2 marks); OSN Quiz 2 (alt set) 2020, Q5 (not recorded)
Times asked: 3
Reworded versions: "What are the advantages of "layered design"? (as copied on a student answer sheet)" (OSN Quiz 2 (alt set) 2020)
In syllabus: yes
Question: Explain how the notion of layering has helped in developing the operating system?
Answer: **Key:** earlier operating systems were monolithic. As the OS is a very big program, debugging and modification according to hardware changes was a huge task; a small change used to result in modifications at multiple routines. Layering decomposes functionality into layers such that hardware is level 0 and layer t accesses functionality at layer t − 1 or less, via appropriately defined system calls; information hiding was the main concept. **Advantages:** it resulted in a systematic design methodology called modular design with well-defined interfaces between layers; it helps in prototyping and development; the association between function and layer eases overall OS design; and since development and debugging can be done layer by layer, it simplified debugging and system verification.

The 2020 version asked "the advantages of layered design": the same list. Add the debugging argument: test layer 1 on correct hardware, then layer 2 assuming layer 1 is correct; an error found while testing layer P must be in layer P, because the layers beneath are already verified.
Marking points:
- earlier operating systems were monolithic.
- As the OS is a very big program, debugging and modification according to hardware changes was a huge task; a small change used to result in modifications at multiple routines.
- Layering decomposes functionality into layers such that hardware is level 0 and layer t accesses functionality at layer t − 1 or less, via appropriately defined system calls; information hiding was the main concept.
- Advantages: it resulted in a systematic design methodology called modular design with well-defined interfaces between layers; it helps in prototyping and development; the association between function and layer eases overall OS design; and since development and debugging can be done …
Answer source: professor's key
Weak / low priority: no

### PYQ-18
Unit: 1 Foundations
Topic: System Structures
Type: true/false
Asked in: OSN End-sem 2022, Q1.3 (1 mark)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Identify whether the following statement is TRUE or FALSE. If the statement is FALSE, correct it and justify the corrected sentence. If the statement is TRUE, justify it. Restrict the justification to a few (less than five) sentences. "It is easier to port micro-kernel operating system from one hardware to another hardware as compared to non-micro-kernel operating system."
Answer: **Key: TRUE.** A micro-kernel OS contains only the essential features of the OS. The code size is small, so it is easy to port to another hardware as compared to a normal OS.

Detail: only the small kernel (IPC, low-level memory and scheduling mechanisms) touches the hardware; the file servers, drivers' policies and other services run in user space above it and move to the new machine unchanged.
Marking points:
- States TRUE.
- A micro-kernel OS contains only the essential features of the OS.
- The code size is small, so it is easy to port to another hardware as compared to a normal OS.
Answer source: professor's key
Weak / low priority: no

### PYQ-19
Unit: 1 Foundations
Topic: System Structures
Type: written
Asked in: OSN Quiz 3 (set 1) 2020, Q2 (4 marks); OSN Quiz 3 (set 2) 2020, Q5 (4 marks)
Times asked: 2
Reworded versions: none
In syllabus: no: research-paper question; the end-sem topic list names no research papers
Question: There are five levels in THE operating system. Discuss the advantages of hierarchical organization considering the sample functions or operations of level 0 and level 1. What would have happened, if the services of level 0 and level 1 would have been written in a single level?
Answer: **Level 0: processor allocation.** It handles the clock and other interrupts and allocates the processor among processes. Above it, each process behaves as if it has its own processor, and interrupts are invisible.

**Level 1: memory management (segment controller).** It moves pages between core and drum. Above it, processes see segments and never care where a page physically is.

**Advantage.** Level 1 can be written as a normal sequential process that assumes it has a processor and never deals with interrupts, because level 0 already hid them. Each level can be tested on its own, bottom up.

**If merged.** The memory-management code would itself have to handle interrupts and processor switching. The two concerns would interleave, the number of states to reason about would multiply, errors in one would appear in the other, and testing or verifying the combined level would become impractical.
Marking points:
- Level 0: processor allocation: It handles the clock and other interrupts and allocates the processor among processes.
- Level 1: memory management (segment controller): It moves pages between core and drum.
- Advantage: Level 1 can be written as a normal sequential process that assumes it has a processor and never deals with interrupts, because level 0 already hid them.
- If merged: The memory-management code would itself have to handle interrupts and processor switching.
Answer source: written by Claude, no key
Weak / low priority: yes: research-paper question; the end-sem topic list names no research papers

### PYQ-20
Unit: 1 Foundations
Topic: System Structures
Type: written
Asked in: OSN Quiz 3 (set 1) 2020, Q6 (4 marks); OSN Quiz 3 (set 2) 2020, Q4 (4 marks)
Times asked: 2
Reworded versions: none
In syllabus: yes
Question: Consider the following levels in a hypothetical OS. Take any two operations and discuss the corresponding differences at each level. Level 11, Devices (access to external devices): objects are printers, displays, and key boards; operations are create, destroy, open, close, read, write. Level 10, File system: objects are files; operations are create, destroy, open, close, read, write.
Answer: **open.** At level 10, open finds a named file through the directory, checks access rights, and sets up a descriptor with the current offset; the file is an abstract variable-length entity built from fixed-size blocks provided by the storage levels below. At level 11, open attaches the process to a physical external device: it checks availability and initialises the device through its driver.

**read.** At level 10, read returns bytes from the file at the current offset, and the file system maps them to disk blocks. At level 11, read obtains data from the device through its standard interface, for example characters from a keyboard as a stream, with no notion of stored blocks.

The operation names are the same at both levels while the meaning differs. That uniform interface is what lets UNIX treat devices as files.
Marking points:
- open: At level 10, open finds a named file through the directory, checks access rights, and sets up a descriptor with the current offset; the file is an abstract variable-length entity built from fixed-size blocks provided …
- read: At level 10, read returns bytes from the file at the current offset, and the file system maps them to disk blocks.
- At level 11, open attaches the process to a physical external device: it checks availability and initialises the device through its driver.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-21
Unit: 1 Foundations
Topic: System Structures
Type: written
Asked in: AOS Mid-sem 2025, Q2(ii) (2 marks)
Times asked: 1
Reworded versions: none
In syllabus: no: research-paper question; the end-sem topic list names no research papers
Question: Regarding the development of the Multikernel OS, explain the motivation: messages cost less than shared memory.
Answer: In a multicore machine, shared memory is not free: it is built on **cache coherence**.

- When a core updates shared data, the cache line holding it must be invalidated in every other core and moved to the writer. Each such transfer takes hundreds of cycles, and the writer stalls while it waits.
- The cost grows with the number of cores that share the data, and it is hidden from the programmer, so OS data structures shared by all cores become a bottleneck as core counts rise.
- **Message passing** makes communication explicit. A core sends a small, cache-line-sized message to the core that owns the data, which updates it locally. Messages can be pipelined and sent asynchronously, so the sender keeps working instead of stalling.
- The Multikernel paper measured this: updating shared data through coherent shared memory became slower as more cores took part, while sending the update as messages to one owning core cost less and scaled better.

So the Multikernel treats the machine as a distributed system: OS state is replicated per core and kept consistent by messages instead of being shared. This also suits hardware that is increasingly heterogeneous and may not keep caches coherent at all.
Marking points:
- Shared memory relies on cache coherence.
- Updates move cache lines between cores; cost grows with cores and stalls the writer.
- Messages are explicit, small, pipelined and asynchronous.
- The paper measured messages beating shared-memory updates as cores grow.
- Hence replicated per-core state kept consistent by messages.
Answer source: written by Claude, no key
Weak / low priority: yes: research-paper question; the end-sem topic list names no research papers

### PYQ-22
Unit: 1 Foundations
Topic: System Structures
Type: written
Asked in: AOS Mid-sem 2025, Q5 (5 marks)
Times asked: 1
Reworded versions: none
In syllabus: no: research-paper question; the end-sem topic list names no research papers
Question: The Corey multicore OS is guided by the observation: "Applications should control sharing of operating system data structures." Justify the observation.
Answer: Kernel data structures that are shared by all cores (file-descriptor tables, address-space mappings, the page cache) must be protected by locks, and their cache lines move between cores on every update.

- When many cores use such a structure, lock contention and cache misses grow with the core count, so applications stop scaling even when they never needed to share that data.
- The kernel cannot tell which data an application really shares, so it must assume everything may be shared and pay these costs everywhere.
- Only the application knows which data is private to one core and which is truly shared.

So Corey lets the application decide. **Address ranges** let it mark parts of the address space as private to one core (no shared page-table locks) or shared. **Shares** let it control which cores can see a kernel object such as a file descriptor, so lookups need no global lock. **Kernel cores** dedicate a core to a kernel task such as network processing, so that state stays in one core's cache. By keeping data private unless the application asks for sharing, the kernel avoids needless contention and the application scales with the number of cores.
Marking points:
- Globally shared kernel structures need locks and bounce cache lines.
- Contention and misses grow with cores even for data that need not be shared.
- Kernel cannot know what is shared; the application does.
- Corey abstractions: address ranges, shares, kernel cores.
- Result: private by default, so better scalability.
Answer source: written by Claude, no key
Weak / low priority: yes: research-paper question; the end-sem topic list names no research papers

### PRED-10
Unit: 1 Foundations
Topic: System Structures
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-14, PYQ-15
In syllabus: yes
Question: A system call needs more information than its number. Give the three ways parameters are passed to the OS, and say why Linux uses a block in memory.
Answer: (1) **Registers**: simplest and fastest, but there may be more parameters than registers. (2) A **block (table) in memory**, whose address is passed in a register. (3) Pushed onto the **stack** by the program and popped by the OS.

Linux and Solaris use the block (when registers are not enough) because block and stack methods do not limit the number or length of parameters, and a single register carries the whole set. The kernel must then validate that the block lies inside the caller's address space before reading it (protection, section 6).
Marking points:
- (1) Registers: simplest and fastest, but there may be more parameters than registers.
- (2) A block (table) in memory, whose address is passed in a register.
- (3) Pushed onto the stack by the program and popped by the OS.
- Linux and Solaris use the block (when registers are not enough) because block and stack methods do not limit the number or length of parameters, and a single register carries the whole set.
- The kernel must then validate that the block lies inside the caller's address space before reading it (protection, section 6).
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-11
Unit: 1 Foundations
Topic: System Structures
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-16, PYQ-17, PYQ-18, PYQ-19
In syllabus: yes
Question: A microkernel is described as more reliable and secure than a monolithic kernel, yet slower. Justify both claims.
Answer: **More reliable and secure.** Only essential mechanisms (basic scheduling, IPC, low-level memory) run in kernel mode, and services such as file systems and drivers run as user-space processes. A failing service crashes only itself and can be restarted, and far less code runs with full privilege. It is also easier to extend and to port.

**Slower.** Services talk by message passing through the kernel. A request that would be a function call inside a monolithic kernel becomes several messages and user–kernel mode switches, each with copying and context-switch overhead.
Marking points:
- More reliable and secure: Only essential mechanisms (basic scheduling, IPC, low-level memory) run in kernel mode, and services such as file systems and drivers run as user-space processes.
- Slower: Services talk by message passing through the kernel.
- Only essential mechanisms (basic scheduling, IPC, low-level memory) run in kernel mode, and services such as file systems and drivers run as user-space processes.
- A failing service crashes only itself and can be restarted, and far less code runs with full privilege.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-12
Unit: 1 Foundations
Topic: System Structures
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-16, PYQ-17, PYQ-18, PYQ-19
In syllabus: yes
Question: Why is a virtual machine called the logical conclusion of the layered approach? What happens when a guest kernel executes a privileged instruction?
Answer: **Logical conclusion.** In a layered system, each layer treats everything below it as the machine. A virtual machine takes this to the limit: it treats the hardware and the kernel together as hardware and offers an interface identical to the bare machine, so each guest OS runs as if it owned the computer. The illusion is built with CPU scheduling and memory management, and disks split into minidisks.

**Privileged instruction.** The guest kernel actually runs in user mode (a virtual kernel mode). Its privileged instruction therefore traps to the virtual machine monitor, which checks it and simulates its effect on that guest's virtual state (trap and emulate). This costs performance.

**Paravirtualization.** The guest is presented with an interface similar to, but not identical to, the hardware. The guest OS is modified to call the monitor directly instead of relying on traps, which removes much of the emulation overhead. This is the approach Xen takes.
Marking points:
- Logical conclusion: In a layered system, each layer treats everything below it as the machine.
- Privileged instruction: The guest kernel actually runs in user mode (a virtual kernel mode).
- Paravirtualization: The guest is presented with an interface similar to, but not identical to, the hardware.
Answer source: written by Claude, no key
Weak / low priority: yes: covered in full in Block 15; learn it there.
