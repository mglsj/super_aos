# Other

## Other

### PYQ-134
Unit: Other
Topic: Other (security, which is not one of the listed topics)
Type: true/false
Asked in: OSN Quiz 7 2020, Q2 (3 marks)
Times asked: 1
Reworded versions: none
In syllabus: no: security is not in the end-sem topic list
Question: Identify whether the following statement is TRUE or FALSE. If the statement is FALSE, correct it and justify the corrected sentence. If the statement is TRUE, justify it. Restrict the justification to a few (less than five) sentences. "In UNIX, system administrator (root) can know the passwords of users".
Answer: **FALSE.**

Corrected: "In UNIX, the system administrator (root) cannot know the passwords of users; root can only reset them."

Justification: UNIX never stores passwords in plain text. It stores a one-way hash of each password (with a salt) in /etc/passwd or, in modern systems, the root-only file /etc/shadow. At login, the typed password is hashed the same way and compared with the stored hash. A one-way function cannot be inverted, so even root, who can read the hashes, cannot recover a password from them. Root can only set a new password.
Marking points:
- FALSE, with the corrected sentence.
- Passwords are stored as one-way (salted) hashes.
- Login hashes the typed password and compares.
- Root can read hashes but cannot invert them; root can only reset a password.
Answer source: written by Claude, no key
Weak / low priority: yes: security is not in the end-sem topic list

### PYQ-135
Unit: Other
Topic: Other (security (program threats), which is not one of the listed topics)
Type: written
Asked in: OSN End-sem 2022, Q2.3 (3 marks)
Times asked: 1
Reworded versions: none
In syllabus: no: security is not in the end-sem topic list
Question: Discuss the following program threats: trap door, virus and denial of service.
Answer:
- **Trap door:** a secret entry point built into a program, designed to give someone access to a system without the usual security measures. This can include Trojan horses or trap doors included in malicious updates.
- **Virus:** a maliciously written computer program designed to alter the way a computer system behaves. Viruses typically self-replicate, spread themselves to other computer systems and execute without the user's knowledge.
- **Denial of service:** an attack on a server where an attacker aims to overload the server by maliciously sending a large number of bogus requests, taking up resources. This aims to disrupt the service provided to other legitimate users. Worms or other agents might do this too.
Marking points:
- Trap door: hidden entry that bypasses normal security.
- Virus: self-replicating code that alters behaviour and spreads.
- Denial of service: overloads a server with bogus requests so legitimate users are denied.
Answer source: professor's key
Weak / low priority: yes: security is not in the end-sem topic list

### PRED-161
Unit: Other
Topic: Other (it connects topics from several units, as end-sem syllabus item 5 allows)
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Blocks 1, 6, 9, 13
In syllabus: yes
Question: Explain the four techniques for coping with system complexity — modularity, abstraction, layering and hierarchy — and illustrate each with one example from operating systems and one from computer networks.
Answer: **Why they are needed.** A large system has too many parts and interactions for one person to reason about. Each technique limits how much you must understand at once.

| Technique | What it does | OS example | Network example |
| --- | --- | --- | --- |
| **Modularity** | Split the system into components that interact only through defined interfaces, so each can be designed, tested and replaced separately | Loadable kernel modules; the servers of a microkernel (Block 1) | Each protocol is a separate module: replace Ethernet by WiFi and IP does not change (Block 6) |
| **Abstraction** | Hide how a component works behind a simpler model of what it does | A process is an abstract CPU, a file an abstract disk, an address space an abstract memory (Blocks 2, 9, 12) | A socket is an abstract reliable byte stream over an unreliable network (Block 8) |
| **Layering** | Stack modules so each uses only the one below and offers a new abstraction to the one above | Dijkstra's THE system, levels 0–5 (Block 1) | OSI's seven layers, TCP/IP's four; a change at layer k affects only k+1 (Block 6) |
| **Hierarchy** | Group modules into larger units, recursively, so the number of interactions at each level stays small | Multi-level page tables; the inode's multi-level index (Blocks 9, 12) | Hierarchical routing; the DNS name tree (Block 7) |

**Core sentence:** modularity limits interactions, abstraction limits what you must know about each part, layering limits *which* parts may interact, and hierarchy limits *how many* interact at each level; the price is always some performance (an extra interface, an extra level of lookup, a longer route).
Marking points:
- modularity limits interactions, abstraction limits what you must know about each part, layering limits which parts may interact, and hierarchy limits how many interact at each level; the price is always some performance (an extra interface, an extra level of lookup, a longer route).
- Why they are needed: A large system has too many parts and interactions for one person to reason about.
- Modularity: Split the system into components that interact only through defined interfaces, so each can be designed, tested and replaced separately
- Abstraction: Hide how a component works behind a simpler model of what it does
- Layering: Stack modules so each uses only the one below and offers a new abstraction to the one above
- Hierarchy: Group modules into larger units, recursively, so the number of interactions at each level stays small
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-162
Unit: Other
Topic: Other (it connects topics from several units, as end-sem syllabus item 5 allows)
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Blocks 6, 7, 9, 11, 13
In syllabus: yes
Question: Saltzer calls it incommensurate scaling when parts of a system do not scale at the same rate. Give four examples from the course where a design that worked at small scale broke at larger scale, and say how each was fixed.
Answer:
| Design | What grew | What broke | Fix |
| --- | --- | --- | --- |
| Single-level page table (Block 9) | Address space: 32 → 64 bits | The table outgrew memory (2^52 entries) | Multi-level or inverted page tables; the TLB hides the extra lookups |
| Flat routing (Block 7) | Number of routers | Tables, CPU time and update bandwidth grow with the network | Hierarchical routing: one entry per region, at the price of longer paths |
| Stop-and-wait (Block 6) | Bandwidth × delay of the link | The sender idles for almost the whole round trip | Sliding windows, w ≥ 2BD + 1; larger still at the transport layer (Block 8) |
| One disk (Block 11) | Number of disks | The chance that *some* disk fails grows with the count (MTTF of the array = MTTF of a disk / N) | RAID: parity or mirroring so a failure is survived |
| One file server (Block 13) | Data to petabytes, machines to thousands | Neither one disk nor one machine can hold or serve it; failures become routine | HDFS: blocks spread over DataNodes, replicated, one NameNode for metadata only |
| Shared kernel data on multicore (midsem papers) | Cores per chip | Locks and cache-line bouncing on shared structures stop the speedup | Corey: per-core data unless sharing is asked for; Multikernel: replicate state, pass messages |

**Core sentence:** growth in one dimension (size, speed, count) silently changes which part is the bottleneck, and the fix is usually hierarchy, parallelism or redundancy — the same three answers over and over.
Marking points:
- growth in one dimension (size, speed, count) silently changes which part is the bottleneck, and the fix is usually hierarchy, parallelism or redundancy — the same three answers over and over.
- Single-level page table (Block 9): Address space: 32 → 64 bits
- Flat routing (Block 7): Number of routers
- Stop-and-wait (Block 6): Bandwidth × delay of the link
- One disk (Block 11): Number of disks
- One file server (Block 13): Data to petabytes, machines to thousands
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-163
Unit: Other
Topic: Other (it connects topics from several units, as end-sem syllabus item 5 allows)
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Blocks 3, 9, 10, 12, 8
In syllabus: yes
Question: An operating system creates illusions. For the CPU, memory, disk and network, name the illusion, the mechanism that creates it, and the condition under which the illusion breaks down. What do the breakdowns have in common?
Answer: The table in the figure is the answer's skeleton: CPU → a CPU per process by time-sharing (scheduler, timer interrupt); memory → a large private address space (paging, TLB, demand paging); disk → named files (directories, inodes, buffer cache); network → a reliable byte stream (TCP's acknowledgements, windows and timers).

**The breakdowns.**

- **CPU** : with too many ready processes each gets a thin slice, and with a small quantum the time goes into context switches rather than work.
- **Memory** : when the processes' working sets no longer fit, every process page-faults constantly — *thrashing* — and CPU utilization collapses while the paging disk is saturated.
- **Disk** : a crash in the middle of a multi-block update leaves the "file" inconsistent; the illusion of an atomic update is restored only by journaling or fsck.
- **Network** : when offered load exceeds capacity, queues overflow, retransmissions add more load, and goodput falls — *congestion collapse* .

**What they share:** the illusion is maintained by multiplexing a real resource, and it breaks when total demand exceeds the real resource. Beyond that point the overhead of multiplexing (context switches, page faults, retransmissions) grows faster than useful work. The cure is always the same: **reduce the load**. The medium-term scheduler swaps processes out; the working-set model admits only what fits; TCP halves its window; admission control refuses new circuits.
Marking points:
- CPU : with too many ready processes each gets a thin slice, and with a small quantum the time goes into context switches rather than work.
- Memory : when the processes' working sets no longer fit, every process page-faults constantly — thrashing — and CPU utilization collapses while the paging disk is saturated.
- Disk : a crash in the middle of a multi-block update leaves the "file" inconsistent; the illusion of an atomic update is restored only by journaling or fsck.
- Network : when offered load exceeds capacity, queues overflow, retransmissions add more load, and goodput falls — congestion collapse .
- The breakdowns.
- What they share: the illusion is maintained by multiplexing a real resource, and it breaks when total demand exceeds the real resource.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-164
Unit: Other
Topic: Other (it connects topics from several units, as end-sem syllabus item 5 allows)
Type: true/false
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Blocks 3, 10, 7, 8
In syllabus: yes
Question: "Increasing the degree of multiprogramming always increases CPU utilization." True or false? Correct it and justify; then name the networking phenomenon with the same shape.
Answer: **FALSE.** Corrected: increasing the degree of multiprogramming increases CPU utilization only up to a point; beyond it, utilization drops sharply because the system **thrashes**.

**Justification:** more processes give the CPU more chances to find a ready process while others wait for I/O, so utilization rises at first. But the processes share a fixed number of frames. Once the sum of their working sets exceeds memory, they page-fault continuously, all of them queue at the paging disk, and the CPU sits idle. A naive scheduler then sees low utilization and admits even *more* processes, making it worse (Block 10).

**The same shape in networking:** congestion collapse (Blocks 7–8). Goodput rises with offered load until capacity, then falls, because dropped packets are retransmitted and add load. In both cases the fix is to reduce the load rather than add more: the medium-term scheduler suspends processes (Block 3), TCP's AIMD halves the window (Block 8), and admission control refuses new work (Block 7).
Marking points:
- States FALSE.
- Corrected: increasing the degree of multiprogramming increases CPU utilization only up to a point; beyond it, utilization drops sharply because the system thrashes.
- more processes give the CPU more chances to find a ready process while others wait for I/O, so utilization rises at first.
- The same shape in networking: congestion collapse (Blocks 7–8).
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-165
Unit: Other
Topic: Other (it connects topics from several units, as end-sem syllabus item 5 allows)
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Blocks 3, 4, 5, 7, 11
In syllabus: yes
Question: Starvation appears in CPU scheduling, disk scheduling, synchronization, deadlock handling and networking. Give the cause in each, the standard fix, and the general principle behind all the fixes.
Answer:
| Where | Who starves, and why | Fix |
| --- | --- | --- |
| Priority / SJF scheduling (Block 3) | A low-priority or long process, while higher-priority or shorter ones keep arriving | Aging: priority rises with waiting time |
| SSTF disk scheduling (Block 11) | Requests for far cylinders, while near ones keep arriving | SCAN / C-SCAN: the head sweeps, so every cylinder is visited each pass |
| Readers–writers, spinlocks (Block 4) | Writers, if readers keep arriving; a thread that keeps losing test-and-set | Bounded waiting: a writer-preference rule or a FIFO queue; ticket locks |
| Deadlock prevention and recovery (Block 5) | A process preempted or chosen as victim every time | Count the rollbacks or preemptions in the cost, so the same victim is not picked forever |
| FIFO packet scheduling (Block 7) | Well-behaved flows, crowded out by an aggressive one | Fair queueing / WFQ: one queue per flow, served round robin by bytes |
| Bandwidth sharing (Block 8) | A flow that backs off while others do not | AIMD converges to a max-min fair share |

**Principle:** starvation happens when a policy chooses by a property of the request (priority, length, position, aggressiveness) that a waiting request can never improve. Every fix either makes *waiting itself* count (aging, rollback counts) or serves in an order that guarantees a turn (FIFO, round robin, sweep), which is exactly the **bounded waiting** requirement of the critical-section problem.
Marking points:
- Principle: starvation happens when a policy chooses by a property of the request (priority, length, position, aggressiveness) that a waiting request can never improve.
- Priority / SJF scheduling (Block 3): A low-priority or long process, while higher-priority or shorter ones keep arriving
- SSTF disk scheduling (Block 11): Requests for far cylinders, while near ones keep arriving
- Readers–writers, spinlocks (Block 4): Writers, if readers keep arriving; a thread that keeps losing test-and-set
- Deadlock prevention and recovery (Block 5): A process preempted or chosen as victim every time
- FIFO packet scheduling (Block 7): Well-behaved flows, crowded out by an aggressive one
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-166
Unit: Other
Topic: Other (it connects topics from several units, as end-sem syllabus item 5 allows)
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Blocks 3, 7, 11
In syllabus: yes
Question: SJF minimizes average waiting time in CPU scheduling. Which disk-scheduling and packet-scheduling policies follow the same idea, and which follow round robin? What does each inherit from its CPU counterpart?
Answer: **The greedy family.** SJF serves the job with the shortest next burst, so it minimizes average waiting time but can starve long jobs and needs a prediction of the burst (exponential averaging). **SSTF** is SJF for the disk: it serves the request with the shortest seek from the current head position. It inherits both traits — low average seek time and starvation of far requests — and it is not optimal either, because a greedy choice now can force long seeks later.

**The round-robin family.** RR gives each process a quantum in turn: fair, good response time, and more context switches as the quantum shrinks. **Fair queueing** is RR across flows at a router. It inherits the fairness and also RR's flaw with unequal units: per-packet RR favours flows with large packets, just as RR with unequal quanta favours some processes. So it is done *byte by byte*, using virtual finish times. **WFQ** is the weighted version, the router's counterpart to proportional-share or priority-weighted RR.

**FCFS ↔ FIFO.** Both are simple and fair in arrival order. Both suffer a convoy effect: short jobs, or short packets of an interactive flow, wait behind long ones.

**Core sentence:** wherever there is a queue, "shortest first" buys average performance with starvation, and "round robin" buys fairness with overhead — the trade-off is chosen again in every block.
Marking points:
- wherever there is a queue, "shortest first" buys average performance with starvation, and "round robin" buys fairness with overhead — the trade-off is chosen again in every block.
- The greedy family: SJF serves the job with the shortest next burst, so it minimizes average waiting time but can starve long jobs and needs a prediction of the burst (exponential averaging).
- The round-robin family: RR gives each process a quantum in turn: fair, good response time, and more context switches as the quantum shrinks.
- FCFS ↔ FIFO: Both are simple and fair in arrival order.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-167
Unit: Other
Topic: Other (it connects topics from several units, as end-sem syllabus item 5 allows)
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Blocks 2, 3, 8, 10, 11, 13
In syllabus: yes
Question: A client process reads a block of an HDFS file stored on another machine. Trace the read, and at each step say whether the client (or the DataNode) runs, makes a mode switch, or blocks — and in which queue, woken by what.
Answer:
1. **Find the block.** The HDFS client library runs in user mode. It sends an RPC to the **NameNode** for the block's locations (Block 13). If the name is not yet resolved, DNS comes first and ARP finds the next hop's MAC address (Block 7). connect() does the three-way handshake, and the client *blocks* until the SYN+ACK arrives (Block 8). send() writes the request: a mode switch, plus a block only if the send buffer is full. recv() *blocks* in the socket's wait queue until the reply arrives. The network card's interrupt runs TCP, which wakes the client, and the scheduler later puts it back on the CPU from the ready queue (Block 3).
2. **Read from the DataNode.** The client connects to the closest DataNode holding a replica. The DataNode's thread reads the block file from its local file system. On a buffer-cache miss it *blocks* in the disk queue, where the disk scheduler (SCAN and its relatives) orders requests; a DMA completion interrupt wakes it (Blocks 11–12).
3. **Stream the data.** The DataNode sends packets with checksums. If the client's receive window is closed, the DataNode's send() *blocks* ; this is flow control acting as the "producer waits when the buffer is full" rule (Blocks 4 and 8). The client's recv() wakes on each arrival and verifies the checksums (Block 13).
4. **Copy into the user buffer.** If a page of the buffer has never been touched, or has been evicted, the copy page-faults. The client *blocks* until the page is in memory (Block 10).
5. **Return.** A mode switch back to user mode. Any number of context switches may have happened along the way; none was caused by the system call itself.

**Core sentence:** a system call costs only a mode switch, and the process blocks — causing a context switch — exactly where it must wait for a slower device or another process: page faults, disk queues, socket buffers and locks, each woken by an interrupt or a signal.
Marking points:
- a system call costs only a mode switch, and the process blocks — causing a context switch — exactly where it must wait for a slower device or another process: page faults, disk queues, socket buffers and locks, each woken by an interrupt or a signal.
- Find the block.
- Read from the DataNode.
- Stream the data.
- Copy into the user buffer.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-168
Unit: Other
Topic: Other (it connects topics from several units, as end-sem syllabus item 5 allows)
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Blocks 1, 4, 6
In syllabus: yes
Question: Busy waiting appears as spinlocks in synchronization, as polling (Dijkstra’s probes) in I/O, and as continuous carrier sensing in 1-persistent CSMA. In each case, when is spinning the right choice and when should the waiter sleep instead?
Answer:
| Where | Spin | Sleep instead | Spinning is right when |
| --- | --- | --- | --- |
| Locks (Block 4) | Spinlock | Semaphore: block and be woken | On a multiprocessor, with critical sections shorter than two context switches. Never on one CPU, where the holder cannot run while you spin. Solaris's adaptive mutex spins only while the holder is running. |
| I/O (Block 1) | Polling (probes) | Interrupts | The device answers almost at once, or so often that interrupt overhead dominates. Dijkstra's problem: polling often wastes the CPU, and polling rarely makes the response slow. |
| Shared channel (Block 6) | 1-persistent CSMA: sense continuously, send the moment it is idle | Nonpersistent: wait a random time, then sense again | Load is light, so you are probably the only waiter. Under heavy load every spinner jumps at once and they collide. |

**Principle:** spin when the expected wait is shorter than the cost of sleeping and waking, and when nobody else needs the resource you burn while spinning; otherwise sleep. With many waiters, spinning turns into a stampede, and the cure is randomness or a queue — backoff in Ethernet, FIFO queues in locks.
Marking points:
- Principle: spin when the expected wait is shorter than the cost of sleeping and waking, and when nobody else needs the resource you burn while spinning; otherwise sleep.
- Locks (Block 4): Spinlock
- I/O (Block 1): Polling (probes)
- Shared channel (Block 6): 1-persistent CSMA: sense continuously, send the moment it is idle
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-169
Unit: Other
Topic: Other (it connects topics from several units, as end-sem syllabus item 5 allows)
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Blocks 7, 9, 12, 13
In syllabus: yes
Question: Name five places in the course where a name is translated into a location. For each, give the table, the cache in front of it, and what happens on a miss. Why do all these caches work?
Answer:
| Translation | Table | Cache | On a miss |
| --- | --- | --- | --- |
| Virtual → physical address (Block 9) | Page table (multi-level) | TLB | Walk the page table in memory. If the page is not resident, a page fault reads it from disk (Block 10). |
| Path → disk blocks (Block 12) | Directory entries, then the inode's index | Name cache and buffer cache | One disk read per path component and per index level |
| Host name → IP (Block 7) | DNS, a distributed hierarchy | Resolver cache with time-to-live | Query up the hierarchy: root, top-level domain, authoritative server |
| IP → MAC (Block 7) | ARP | ARP cache with timeouts | Broadcast an ARP request on the LAN; the owner replies |
| HDFS file → DataNodes (Block 13) | NameNode namespace and block map, held in RAM | The client keeps the block locations it was given | An RPC to the NameNode |

**Why they work:** locality of reference. A program touches the same pages, files and hosts again and again over short periods. The same reason makes the TLB hit rate above 99%, and lets HDFS move computation to the data. Every cache also needs a way to become correct again when the truth changes. That means TLB shootdown on a page-table change, time-to-live in DNS, timeouts in ARP, and the NameNode as the single authority in HDFS.
Marking points:
- Why they work: locality of reference.
- Virtual → physical address (Block 9): Page table (multi-level)
- Path → disk blocks (Block 12): Directory entries, then the inode's index
- Host name → IP (Block 7): DNS, a distributed hierarchy
- IP → MAC (Block 7): ARP
- HDFS file → DataNodes (Block 13): NameNode namespace and block map, held in RAM
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-170
Unit: Other
Topic: Other (it connects topics from several units, as end-sem syllabus item 5 allows)
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Blocks 7, 9, 12
In syllabus: yes
Question: Multi-level page tables, the inode’s multi-level index, hierarchical routing and the DNS name tree all replace one big table with a hierarchy. What does the hierarchy gain, and what does it cost, in each case?
Answer:
| Hierarchy | Gains | Costs |
| --- | --- | --- |
| Multi-level page table (Block 9) | Only the parts of the address space in use need tables; a sparse 64-bit space becomes affordable | One memory access per level on a TLB miss |
| Inode index: direct, single, double, triple indirect (Block 12) | Small files reach their data in one step; huge files remain addressable from a small inode | Extra disk reads for blocks deep in a large file |
| Hierarchical routing (Block 7) | One table entry per region instead of per router: less memory, CPU and update traffic | Paths can be longer than the true shortest path (End 2022 key) |
| DNS (Block 7) | No single server holds every name; each zone is managed by its owner | Several queries for a cold lookup, which caching hides |

**Core sentence:** a hierarchy makes the size of each table depend on the fan-out at one level rather than on the whole system, which is Saltzer's "hierarchy" technique. The price is always one more step of indirection, so it is always paired with a cache (TLB, buffer cache, DNS cache).
Marking points:
- a hierarchy makes the size of each table depend on the fan-out at one level rather than on the whole system, which is Saltzer's "hierarchy" technique.
- Multi-level page table (Block 9): Only the parts of the address space in use need tables; a sparse 64-bit space becomes affordable
- Inode index: direct, single, double, triple indirect (Block 12): Small files reach their data in one step; huge files remain addressable from a small inode
- Hierarchical routing (Block 7): One table entry per region instead of per router: less memory, CPU and update traffic
- DNS (Block 7): No single server holds every name; each zone is managed by its owner
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-171
Unit: Other
Topic: Other (it connects topics from several units, as end-sem syllabus item 5 allows)
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Blocks 6, 8, 13
In syllabus: yes
Question: The data link layer has CRCs and retransmission, TCP has checksums and retransmission, and HDFS clients verify checksums again. Is this redundancy wasteful? Justify using the end-to-end argument.
Answer: **No, it is not wasteful. The layers do different jobs.**

**The end-to-end argument** (Saltzer, Reed and Clark): a function such as reliable delivery can be completely and correctly implemented only with the knowledge at the end points of the communication. A check inside the network cannot cover everything between the two ends.

- A link-layer CRC protects bits on *one hop* . Data can still be corrupted inside a router's memory or by a software bug between hops, after one CRC was checked and before the next was computed. The CRC never sees it.
- TCP's checksum covers the whole path between two *transport endpoints* . It does not cover the data after it is written to a disk, or while it sits on a DataNode for months.
- HDFS clients compute checksums when the data is written and verify them when it is read. That is the true end-to-end check for *stored* data. It catches a bad disk, a bad network card or a bad memory anywhere in between, and recovers by reading another replica (Block 13).

**So what are the lower-level checks for?** Performance, not correctness. Recovering on one hop is faster and cheaper than an end-to-end retransmission across the network. On wireless links it is essential: link-level ARQ hides the losses so that TCP does not misread them as congestion and slow down (Block 8). The end-to-end check guarantees correctness, and the per-hop checks make the common case fast.
Marking points:
- A link-layer CRC protects bits on one hop .
- TCP's checksum covers the whole path between two transport endpoints .
- HDFS clients compute checksums when the data is written and verify them when it is read.
- No, it is not wasteful.
- The end-to-end argument (Saltzer, Reed and Clark): a function such as reliable delivery can be completely and correctly implemented only with the knowledge at the end points of the communication.
- So what are the lower-level checks for?
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-172
Unit: Other
Topic: Other (it connects topics from several units, as end-sem syllabus item 5 allows)
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Blocks 5, 8, 11, 13
In syllabus: yes
Question: Compare RAID 5, HDFS three-way replication, TCP retransmission and MapReduce re-execution as ways of surviving failure. For each, say what it costs, what failure it survives, and what it assumes.
Answer:
| Mechanism | Cost | Survives | Assumes |
| --- | --- | --- | --- |
| RAID 5 (Block 11) | Space: one disk's worth of parity in N+1. Time: four I/Os per small write; a slow rebuild | Any one disk failure in the array | A second disk does not fail during the rebuild; the failure is reported, so its position is known |
| HDFS 3 replicas (Block 13) | Space: 200% extra; write bandwidth through the pipeline | Two node failures, or a whole rack (one replica is off-rack) | Failures are detected by heartbeats, and the NameNode re-replicates before the others fail. Bonus: more replicas means more readers and more data locality |
| TCP retransmission (Block 8) | Time: a timeout or three duplicate ACKs; buffer space to keep unacknowledged data | Lost, corrupted or duplicated segments | The sender still has the data; sequence numbers do not wrap within the packet lifetime |
| MapReduce re-execution (Block 13) | Time: the task runs again. Completed map output is lost with its machine | Worker crashes and stragglers (backup tasks) | Tasks are deterministic and side-effect free, and their input survives in HDFS |

**Core sentence:** storing redundancy (RAID, replicas) spends space to recover quickly and to protect data that cannot be recreated. Redoing work (retransmission, re-execution, rollback in deadlock recovery) spends time, and works only if the input is still safe somewhere. Large systems combine the two: HDFS stores, so MapReduce can redo.
Marking points:
- storing redundancy (RAID, replicas) spends space to recover quickly and to protect data that cannot be recreated.
- RAID 5 (Block 11): Space: one disk's worth of parity in N+1. Time: four I/Os per small write; a slow rebuild
- HDFS 3 replicas (Block 13): Space: 200% extra; write bandwidth through the pipeline
- TCP retransmission (Block 8): Time: a timeout or three duplicate ACKs; buffer space to keep unacknowledged data
- MapReduce re-execution (Block 13): Time: the task runs again. Completed map output is lost with its machine
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-173
Unit: Other
Topic: Other (it connects topics from several units, as end-sem syllabus item 5 allows)
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Blocks 2, 13, 14 and the midsem papers
In syllabus: yes
Question: Shared memory and message passing were introduced as the two IPC models within one machine. Discuss how the choice between them changes on a many-core chip (Corey, the Multikernel) and in a cluster (HPC, MapReduce).
Answer: **One machine (Block 2).** Shared memory is the fastest option. After the region is set up, data moves at memory speed with no kernel involvement, but the processes must synchronize themselves (Block 4). Message passing goes through the kernel on every message, so it is slower, but it is simpler to get right, needs no shared address space, and works unchanged across machines.

**A many-core chip.** Sharing is no longer free. Every write to shared data invalidates the cache line in every other core, and a heavily shared kernel structure becomes a serial bottleneck. **Corey** keeps data private to a core unless the application asks for sharing (address ranges, shares, kernel cores). The **Multikernel** goes further. It treats the machine as a distributed system, replicates OS state per core and keeps the replicas consistent by messages, arguing that messages already cost less than cache-coherent shared memory and that this gap grows with the core count.

**A cluster (Blocks 13–14).** There is no shared memory at all, so everything is a message: RPC, MPI in HPC, heartbeats in HDFS. MapReduce restricts communication to one structured exchange, the shuffle, and HDFS restricts sharing to one writer per file, so thousands of machines need no fine-grained synchronization.

**Core sentence:** the further apart the cooperating parts are, the more sharing costs (coherence traffic, locks, Amdahl's serial fraction), so systems move from shared memory toward explicit messages as they grow — the Multikernel is the point where that happens inside a single chip.
Marking points:
- the further apart the cooperating parts are, the more sharing costs (coherence traffic, locks, Amdahl's serial fraction), so systems move from shared memory toward explicit messages as they grow — the Multikernel is the point where that happens inside a single chip.
- One machine (Block 2): Shared memory is the fastest option.
- A many-core chip: Sharing is no longer free.
- A cluster (Blocks 13–14): There is no shared memory at all, so everything is a message: RPC, MPI in HPC, heartbeats in HDFS.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-174
Unit: Other
Topic: Other (it connects topics from several units, as end-sem syllabus item 5 allows)
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to all blocks
In syllabus: yes
Question: A user types a query into a search page and presses Enter. The results come from an index that MapReduce built over pages stored in HDFS, served by VMs in a cloud. Choose six moments in this request and, for each, name the mechanism and the block of the course that explains it.
Answer:
1. **The key press** raises an interrupt; the handler runs in kernel mode and wakes the browser, which the CPU scheduler dispatches — an I/O-bound process favoured for responsiveness (Blocks 1–3).
2. **The browser's threads** handle the network request and the user interface separately, synchronizing on shared data (Blocks 2, 4).
3. **Name to address** : DNS resolves the host; ARP finds the gateway's MAC; the packet is routed hop by hop by tables built with distance-vector or link-state routing (Block 7).
4. **Connection** : TCP's three-way handshake with fresh sequence numbers; then windows for flow control and AIMD for congestion control (Block 8). Each frame on each hop is checked by a CRC, and Ethernet switches forward it by learned MAC addresses (Block 6).
5. **At the data centre** : the web server runs in a VM; the hypervisor multiplexes it with others and may have live-migrated it to balance load (Blocks 14–15).
6. **The lookup** : the index was built offline by MapReduce — map tasks scheduled near their HDFS blocks, a shuffle, reduce tasks writing the index back to HDFS with three replicas (Block 13).
7. **Reading the index** : virtual memory and the page cache keep hot index pages in RAM (Blocks 9–10); a miss goes to the file system and the disk scheduler, possibly on a RAID array (Blocks 11–12).
8. **Back to the user** : the reply segments are reassembled in order by TCP, the browser's recv() wakes, and the result is drawn.

**How to write it in the exam:** pick six moments, give each a heading, name the mechanism in one sentence and the problem it solves in a second. The examiner is checking that you can place each mechanism at the right layer, not that you remember every step.
Marking points:
- The key press raises an interrupt; the handler runs in kernel mode and wakes the browser, which the CPU scheduler dispatches — an I/O-bound process favoured for responsiveness (Blocks 1–3).
- The browser's threads handle the network request and the user interface separately, synchronizing on shared data (Blocks 2, 4).
- Name to address : DNS resolves the host; ARP finds the gateway's MAC; the packet is routed hop by hop by tables built with distance-vector or link-state routing (Block 7).
- Connection : TCP's three-way handshake with fresh sequence numbers; then windows for flow control and AIMD for congestion control (Block 8).
- At the data centre : the web server runs in a VM; the hypervisor multiplexes it with others and may have live-migrated it to balance load (Blocks 14–15).
- The lookup : the index was built offline by MapReduce — map tasks scheduled near their HDFS blocks, a shuffle, reduce tasks writing the index back to HDFS with three …
Answer source: written by Claude, no key
Weak / low priority: no
