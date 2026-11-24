# Unit 5 Storage and Distributed Systems

## Secondary Storage and RAID

### PYQ-116
Unit: 5 Storage and Distributed Systems
Topic: Secondary Storage and RAID
Type: written
Asked in: OSN Quiz 2 2022, A5 (2 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Explain the merits and demerits of RAID level 3.
Answer: **What it is (key):** RAID 3 improves throughput with a bit-level parity organization. Bit-level data striping is used to improve throughput: the bits of each byte are split across multiple disks; with an array of 8 disks, bit i of every byte is written to disk i. One bit is used for error correction: data is striped among the disks and the parity bit is stored on another disk.

**Merits (key):** the array of eight disks can be treated as a single disk that is eight times the normal size and has eight times the access rate. Every disk participates in a read, so each access reads eight times as much data.

**Demerits (key):** it is not possible to process several requests in parallel, as every request has to access all the disks.

Two supporting points from the slides, if there is space: compared with RAID 1, only one parity disk is needed, which reduces the storage overhead, while the transfer rate is the same; and RAID 3's performance problem is the cost of computing and writing the parity.
Marking points:
- What it is (key): RAID 3 improves throughput with a bit-level parity organization.
- Merits (key): the array of eight disks can be treated as a single disk that is eight times the normal size and has eight times the access rate.
- Demerits (key): it is not possible to process several requests in parallel, as every request has to access all the disks.
Answer source: professor's key
Weak / low priority: no

### PYQ-117
Unit: 5 Storage and Distributed Systems
Topic: Secondary Storage and RAID
Type: written
Asked in: OSN Quiz 7 2020, Q4 (6 marks); AOS End-sem 2025, Q8 (5 marks)
Times asked: 2
Reworded versions: "How RAID 4 is better than RAID 3? Also, compare RAID 4 and RAID 5." (OSN Quiz 7 2020)
In syllabus: yes
Question: Explain the concept of "RAID Level 4". What is the issue with "RAID Level 4"? How does RAID Level 5 overcome the issues with RAID Level 4?
Answer: **RAID 4 over RAID 3.** Both keep one parity disk, so they have the same storage overhead. The difference is the striping unit. RAID 3 stripes bits, so every request, however small, involves every disk, and the array serves one request at a time. RAID 4 stripes **blocks**, so a block read accesses only one disk. The data transfer rate for each individual access is slower than RAID 3's, but **multiple read requests can be carried out in parallel** on different disks, giving much higher throughput for many small independent reads. Large reads still span all disks and get the full transfer rate. If a disk fails, the parity block and the other blocks of the stripe recover it, as in RAID 3.

|  | RAID 4 | RAID 5 |
| --- | --- | --- |
| Parity placement | All parity blocks on one dedicated disk | Parity distributed among all N + 1 disks; for each stripe one disk stores parity, the others data |
| Small writes | Every write results in two writes, the block and its parity, and **every** parity write goes to the same disk, so the parity disk is a bottleneck and writes are serialized on it | Parity writes for different stripes go to different disks, so independent small writes can proceed in parallel |
| Reads | Only N disks hold data; the parity disk is idle for reads | All N + 1 disks hold data, so reads are spread over one more disk |
| Wear and load | The parity disk is the busiest and wears fastest | Load is evenly spread |
| Overhead and fault tolerance | The same: one disk's worth of parity; survives any single disk failure |  |

**Core sentence:** RAID 4 beats RAID 3 by striping blocks instead of bits, which lets independent requests run in parallel; RAID 5 beats RAID 4 by spreading the parity, which removes the single parity-disk bottleneck on writes.
Marking points:
- RAID 4 beats RAID 3 by striping blocks instead of bits, which lets independent requests run in parallel; RAID 5 beats RAID 4 by spreading the parity, which removes the single parity-disk bottleneck on writes.
- RAID 4 over RAID 3: Both keep one parity disk, so they have the same storage overhead.
- Parity placement: All parity blocks on one dedicated disk
- Small writes: Every write results in two writes, the block and its parity, and every parity write goes to the same disk, so the parity disk is a bottleneck and writes are serialized on it
- Reads: Only N disks hold data; the parity disk is idle for reads
- Wear and load: The parity disk is the busiest and wears fastest
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-118
Unit: 5 Storage and Distributed Systems
Topic: Secondary Storage and RAID
Type: written
Asked in: OSN End-sem (question list) 2021, Q3 (not given)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: How "RAID Level 3" and "RAID Level 4" improve reliability and disk throughput? What are the advantages of each option?
Answer: **Reliability, both levels:** one disk holds parity for the others. Disk controllers can detect whether a sector has been read correctly, so when one disk fails, its contents are recovered by computing the parity (XOR) of the corresponding bits or blocks on the remaining disks. Any single disk failure is survived, at the cost of only one extra disk, against 100% for mirroring.

**Throughput, RAID 3:** bit-level striping; each byte is spread over all data disks, so each access reads N times as much data, and the array acts as one disk N times as fast for large transfers.

**Throughput, RAID 4:** block-level striping; a small read touches only one disk, so several independent reads proceed in parallel, while large reads still use all disks.

|  | Advantage | Weak point |
| --- | --- | --- |
| RAID 3 | High transfer rate for large sequential accesses; cheap redundancy (one parity disk) | Only one request at a time, since every request uses every disk; parity computation on every write |
| RAID 4 | High throughput for many small reads; the same cheap redundancy | Each small write needs a parity update on the single parity disk, which becomes the bottleneck (fixed by RAID 5) |

No official key exists for this paper; this is my own answer.
Marking points:
- Reliability, both levels: one disk holds parity for the others.
- Throughput, RAID 3: bit-level striping; each byte is spread over all data disks, so each access reads N times as much data, and the array acts as one disk N times as fast for large transfers.
- Throughput, RAID 4: block-level striping; a small read touches only one disk, so several independent reads proceed in parallel, while large reads still use all disks.
Answer source: written by Claude, no key
Weak / low priority: yes: its answer is the two RAID questions above put together; learn those and write this from them.

### PYQ-119
Unit: 5 Storage and Distributed Systems
Topic: Secondary Storage and RAID
Type: written
Asked in: OSN Quiz 7 2020, Q5 (6 marks)
Times asked: 1
Reworded versions: none
In syllabus: no: multimedia systems are not in the end-sem topic list
Question: Define the word "quality of service". Discuss what techniques could be used to meet quality-of-service requirements for multimedia applications for the following components of a system: (a) Process scheduler (b) Disk scheduler (c) Memory manager
Answer: **Quality of service (QoS)** is the guarantee the system gives that an application's data will be delivered and processed within stated timing and rate requirements. For continuous media such as video, data must arrive at a steady rate and each frame by its deadline, so late data is as bad as lost data.

**(a) Process scheduler:** use real-time, priority-based preemptive scheduling. Give multimedia processes fixed high priorities that the scheduler does not lower (static priority), use deadline-driven scheduling such as earliest deadline first (EDF) or rate-monotonic scheduling for periodic tasks, and use admission control: admit a new real-time process only if its deadlines can still be guaranteed.

**(b) Disk scheduler:** pure seek-optimizing algorithms (SSTF, SCAN) ignore deadlines, and pure EDF ignores seek distance. Use **EDF** ordering, or **SCAN-EDF**: serve requests in deadline order, and among requests with the same or close deadlines use SCAN order to reduce seeks. The Linux deadline scheduler (age limit per request) is the same idea.

**(c) Memory manager:** avoid page faults during playback, whose 25 ms cost would break the timing. Lock (pin) the pages of real-time processes and their buffers in memory, reserve the frames a stream needs at admission time, and prepage its working set.

No official key exists; this answer follows the textbook's multimedia chapter.
Marking points:
- Quality of service (QoS) is the guarantee the system gives that an application's data will be delivered and processed within stated timing and rate requirements.
- (a) Process scheduler: use real-time, priority-based preemptive scheduling.
- (b) Disk scheduler: pure seek-optimizing algorithms (SSTF, SCAN) ignore deadlines, and pure EDF ignores seek distance.
- (c) Memory manager: avoid page faults during playback, whose 25 ms cost would break the timing.
Answer source: written by Claude, no key
Weak / low priority: yes: multimedia systems is not in this end-sem's list; only the disk-scheduling part is in syllabus. Learn the disk part.

### PRED-97
Unit: 5 Storage and Distributed Systems
Topic: Secondary Storage and RAID
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025)
In syllabus: yes
Question: A disk spins at 10,000 RPM, has an average seek time of 6 ms, a transfer rate of 2 Gb/s and a controller overhead of 0.2 ms. Find (a) the average rotational latency, (b) the average I/O time for one 8 KB block, and (c) the fraction of that time spent actually transferring data.
Answer: **(a)** One rotation = 60 / 10,000 s = 6 ms. Average latency = ½ × 6 = **3 ms**.

**(b)** Transfer time = 8 KB / 2 Gb/s = 64 Kb / (2 × 1024 × 1024 Kb/s) = 64 / 2,097,152 s ≈ 0.0305 ms.

Average I/O time = seek + latency + transfer + overhead = 6 + 3 + 0.0305 + 0.2 = **9.23 ms**.

**(c)** 0.0305 / 9.23 ≈ **0.33%**. Over 99% of the time is positioning and overhead.

**Core sentence:** for small random transfers the disk is limited by positioning time, not by transfer rate, so reducing seeks (scheduling) and reading more per seek (larger blocks, clustering, read-ahead) matter far more than a faster interface.

**Unit trap.** Gb is gigabits and KB is kilobytes: multiply the bytes by 8. The slide uses binary units (1 Gb = 1024 × 1024 Kb); with decimal units the transfer time is 0.0328 ms instead, which changes nothing that matters.
Marking points:
- Final answer: (c) 0.0305 / 9.23 ≈ 0.33%.
- for small random transfers the disk is limited by positioning time, not by transfer rate, so reducing seeks (scheduling) and reading more per seek (larger blocks, clustering, read-ahead) matter far more than a faster interface.
- (a) One rotation = 60 / 10,000 s = 6 ms.
- (b) Transfer time = 8 KB / 2 Gb/s = 64 Kb / (2 × 1024 × 1024 Kb/s) = 64 / 2,097,152 s ≈ 0.0305 ms.
- (c) 0.0305 / 9.23 ≈ 0.33%.
- Unit trap: Gb is gigabits and KB is kilobytes: multiply the bytes by 8.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-98
Unit: 5 Storage and Distributed Systems
Topic: Secondary Storage and RAID
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Justify the observation: "Seek-optimizing disk-scheduling algorithms such as SSTF and SCAN bring no benefit on NVM devices, yet the NVM controller still has to do significant scheduling work."
Answer: **No benefit from seek ordering.** SSTF and SCAN reduce total head movement, because on an HDD seek time is proportional to seek distance. An NVM device has no moving parts, so there is no seek time and no rotational latency; access time is the same for any block address. Reordering requests by address therefore saves nothing, and NVM devices generally use simple FCFS (with merging of adjacent requests).

**The work it does instead.** NAND flash cannot be overwritten in place: pages are written, but must be erased first, and erasure is done in larger blocks. So the controller must maintain the **flash translation layer** (mapping each logical block to the physical page holding its valid copy), run **garbage collection** (copy valid pages out of a block so it can be erased, using overprovisioned space), and do **wear leveling** (spread writes because each block survives only about 100,000 erases). Reads are fast and uniform, but writes vary in cost depending on how much garbage collection is pending.

**Core sentence:** on an HDD the scheduler fights distance; on an SSD the controller fights erasure and wear.
Marking points:
- on an HDD the scheduler fights distance; on an SSD the controller fights erasure and wear.
- No benefit from seek ordering: SSTF and SCAN reduce total head movement, because on an HDD seek time is proportional to seek distance.
- The work it does instead: NAND flash cannot be overwritten in place: pages are written, but must be erased first, and erasure is done in larger blocks.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-99
Unit: 5 Storage and Distributed Systems
Topic: Secondary Storage and RAID
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025)
In syllabus: yes
Question: A disk has 5,000 cylinders, numbered 0 to 4,999. The head is at cylinder 143 and the previous request was at 125. The queue, in FIFO order, is 86, 1470, 913, 1774, 948, 1509, 1022, 1750, 130. Starting from the current position, find the total head movement for FCFS, SSTF, SCAN, LOOK, C-SCAN and C-LOOK.
Answer: The previous request was at 125 and the head is at 143, so the arm is **moving upward** (toward 4,999).

| Algorithm | Service order | Working | Total |
| --- | --- | --- | --- |
| FCFS | 86, 1470, 913, 1774, 948, 1509, 1022, 1750, 130 | 57 + 1384 + 557 + 861 + 826 + 561 + 487 + 728 + 1620 | **7081** |
| SSTF | 130, 86, 913, 948, 1022, 1470, 1509, 1750, 1774 | 13 + 44 + 827 + 35 + 74 + 448 + 39 + 241 + 24 | **1745** |
| SCAN | 913, 948, 1022, 1470, 1509, 1750, 1774, [4999], 130, 86 | (4999 − 143) + (4999 − 86) = 4856 + 4913 | **9769** |
| LOOK | 913 … 1774, 130, 86 | (1774 − 143) + (1774 − 86) = 1631 + 1688 | **3319** |
| C-SCAN | 913 … 1774, [4999, 0], 86, 130 | (4999 − 143) + 4999 + 130 = 4856 + 4999 + 130 | **9985** |
| C-LOOK | 913 … 1774, 86, 130 | (1774 − 143) + (1774 − 86) + (130 − 86) = 1631 + 1688 + 44 | **3363** |

**Observation to write:** SSTF gives the least movement on this queue, but it serves 130 and 86 first only because they happen to be near the head; a stream of requests near 143 could starve the requests near 1,700. SCAN and C-SCAN are expensive here because the queue is far from the end of the disk, which is exactly the waste LOOK and C-LOOK remove.

**Two traps.** (1) The direction comes from the *previous* request: 125 → 143 means upward. Ignoring it changes every sweep answer. (2) C-SCAN and C-LOOK here count the return movement; state that.
Marking points:
- Observation to write: SSTF gives the least movement on this queue, but it serves 130 and 86 first only because they happen to be near the head; a stream of requests near 143 could starve the requests near …
- Two traps: (1) The direction comes from the previous request: 125 → 143 means upward.
- FCFS: 86, 1470, 913, 1774, 948, 1509, 1022, 1750, 130
- SSTF: 130, 86, 913, 948, 1022, 1470, 1509, 1750, 1774
- SCAN: 913, 948, 1022, 1470, 1509, 1750, 1774, [4999], 130, 86
- LOOK: 913 … 1774, 130, 86
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-100
Unit: 5 Storage and Distributed Systems
Topic: Secondary Storage and RAID
Type: true/false
Based on: imitates the professor's TRUE/FALSE correct-and-justify items (OSN End 2022 Q1, AOS End 2025 Q1)
In syllabus: yes
Question: TRUE or FALSE, correct if false and justify: "SSTF always gives the minimum total head movement and is therefore the optimal disk-scheduling algorithm."
Answer: **FALSE.** Corrected: SSTF often gives a low total head movement, but it is not guaranteed to be minimal, and it may cause starvation.

**Justification:** SSTF is greedy: it always takes the nearest request without looking ahead. On the slide's queue it gives 236 cylinders (53 → 65 → 67 → 37 → 14 → 98 → …), but serving 37 and 14 first (53 → 37 → 14 → 65 → 67 → 98 → 122 → 124 → 183) gives 208. And like SJF, which it resembles, SSTF can starve a request far from the head if new requests keep arriving close to it, so it is not acceptable as is for a heavily loaded disk.
Marking points:
- States FALSE.
- Corrected: SSTF often gives a low total head movement, but it is not guaranteed to be minimal, and it may cause starvation.
- SSTF is greedy: it always takes the nearest request without looking ahead.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-101
Unit: 5 Storage and Distributed Systems
Topic: Secondary Storage and RAID
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Justify the observation: "SCAN does not give a uniform wait time, and C-SCAN corrects this."
Answer: Assume requests arrive uniformly across the cylinders. When SCAN reaches one end and reverses, the requests just in front of it on the return trip are in the region it *has just served*, so few requests are waiting there. The heaviest density of waiting requests is at the *other* end of the disk, and those requests have waited longest; they wait even longer while the head serves the sparse region on its way back. A request near the middle is passed twice per cycle, a request near an end only once, so the waiting time depends on the cylinder.

**C-SCAN** serves in one direction only. On reaching the end, the head returns immediately to the beginning without servicing anything and starts again. The cylinders are treated as a circular list, so every cylinder is visited exactly once per cycle, at the same interval, and the wait time is more uniform. The cost is the empty return sweep.

**Core sentence:** SCAN serves the middle of the disk twice per cycle and the ends once; C-SCAN serves every cylinder once per cycle.
Marking points:
- SCAN serves the middle of the disk twice per cycle and the ends once; C-SCAN serves every cylinder once per cycle.
- C-SCAN serves in one direction only.
- Assume requests arrive uniformly across the cylinders.
- When SCAN reaches one end and reverses, the requests just in front of it on the return trip are in the region it has just served, so few requests are waiting there.
- The heaviest density of waiting requests is at the other end of the disk, and those requests have waited longest; they wait even longer while the head serves the sparse region on its way back.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-102
Unit: 5 Storage and Distributed Systems
Topic: Secondary Storage and RAID
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to CPU scheduling
In syllabus: yes
Question: For each disk-scheduling algorithm (FCFS, SSTF, SCAN or C-SCAN, and the Linux deadline scheduler), name the CPU-scheduling idea it corresponds to and explain what problem the two share.
Answer:
| Disk | CPU analogue | Shared property |
| --- | --- | --- |
| FCFS | FCFS | Fair and simple, but a long request (a far seek, a long CPU burst) delays everything behind it; poor throughput |
| SSTF | SJF / shortest remaining time first | Serve the cheapest job next, which minimizes total cost but **may cause starvation** of expensive jobs (the slide calls SSTF "a form of SJF scheduling") |
| SCAN, C-SCAN | Round robin | A fixed sweep or rotation guarantees every request is reached within one cycle; C-SCAN, like RR, aims at uniform waiting |
| Deadline scheduler (age limit of 500 ms) | Aging in priority scheduling | Any request that has waited too long is promoted, which bounds waiting time and prevents starvation |

**Core sentence:** both schedulers trade total efficiency against fairness for a shared resource, so they reinvent the same algorithms: greedy cheapest-first minimizes cost and risks starvation, and a time bound (aging, deadlines) is the standard repair.
Marking points:
- both schedulers trade total efficiency against fairness for a shared resource, so they reinvent the same algorithms: greedy cheapest-first minimizes cost and risks starvation, and a time bound (aging, deadlines) is the standard repair.
- SSTF: SJF / shortest remaining time first
- SCAN, C-SCAN: Round robin
- Deadline scheduler (age limit of 500 ms): Aging in priority scheduling
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-103
Unit: 5 Storage and Distributed Systems
Topic: Secondary Storage and RAID
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: The Linux deadline scheduler keeps separate read and write queues and gives reads priority. Justify this design, and explain how it avoids starvation.
Answer: **Reads first:** processes are more likely to block on a read than on a write. A process that issues a read cannot continue until the data arrives, so read latency is directly visible as waiting time. A write is usually absorbed by the buffer cache and completed later (delayed write), so the process continues and the write's latency is hidden.

**No starvation:** each request type has two queues, one sorted by LBA (served in batches, essentially C-SCAN, for efficiency) and one in FCFS order (which shows each request's age). After every batch the scheduler checks whether the FCFS queue holds a request older than the configured age, 500 ms by default; if so, the LBA queue containing that request is chosen for the next batch. Every request is therefore served within a bounded time, the same idea as aging in CPU scheduling.
Marking points:
- Reads first: processes are more likely to block on a read than on a write.
- No starvation: each request type has two queues, one sorted by LBA (served in batches, essentially C-SCAN, for efficiency) and one in FCFS order (which shows each request's age).
- A process that issues a read cannot continue until the data arrives, so read latency is directly visible as waiting time.
- A write is usually absorbed by the buffer cache and completed later (delayed write), so the process continues and the write's latency is hidden.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-104
Unit: 5 Storage and Distributed Systems
Topic: Secondary Storage and RAID
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to virtual memory
In syllabus: yes
Question: Block 10 showed that the page-fault service time decides the effective access time. Using that, compare placing swap space in a raw partition with placing it in a file inside a normal file system, and justify why multiple swap devices help.
Answer:
|  | Raw partition | File in a file system |
| --- | --- | --- |
| Access path | A dedicated swap-space manager allocates blocks directly; no directory lookup or file-system metadata | Every swap I/O goes through the file system: directory structure, allocation tables, possibly extra disk reads for metadata |
| Layout | Allocated for speed (contiguous, near the middle of the disk), not for space efficiency | The file may be fragmented across the disk, adding seeks |
| Flexibility | Fixed size; changing it means repartitioning | Easy to add or grow (the slide's "for convenience of adding") |

**Why it matters:** EAT = (1 − p) × memory time + p × fault service time, and the service time is almost all disk time. Every extra seek on the swap path multiplies directly into the effective memory access time, so the raw partition is preferred for performance.

**Multiple swap devices:** paging traffic is then spread over several disks whose arms move independently, so faults from different processes are served in parallel and the queue on each paging device is shorter. That directly cuts fault service time, and it delays the point at which a growing paging-device queue empties the ready queue (the thrashing loop of Block 10).
Marking points:
- Why it matters: EAT = (1 − p) × memory time + p × fault service time, and the service time is almost all disk time.
- Multiple swap devices: paging traffic is then spread over several disks whose arms move independently, so faults from different processes are served in parallel and the queue on each paging device is shorter.
- Access path: A dedicated swap-space manager allocates blocks directly; no directory lookup or file-system metadata
- Layout: Allocated for speed (contiguous, near the middle of the disk), not for space efficiency
- Flexibility: Fixed size; changing it means repartitioning
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-105
Unit: 5 Storage and Distributed Systems
Topic: Secondary Storage and RAID
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Compare network-attached storage (NAS) with a storage area network (SAN). Why would an organization run a separate storage network at all?
Answer:
|  | NAS | SAN |
| --- | --- | --- |
| Network | Shares the ordinary LAN/WAN (TCP or UDP over IP) | A private fabric of Fibre Channel switches or InfiniBand |
| Interface | File level: remote file systems via NFS or CIFS, implemented with RPCs | Block level: LUNs (virtual disks) that hosts format and use like local disks |
| Access control | File-system permissions on the NAS | LUN masking decides which LUNs each host may see |
| Cost of storage I/O | Consumes data-network bandwidth and adds latency | Does not touch the data network |

**Why a separate network:** storage traffic is heavy and latency-sensitive. On a shared LAN it competes with ordinary communication and slows both. A SAN isolates it, and it is flexible: storage can be added, and allocated to any host, without touching the servers. The counter-trend is iSCSI and FCoE, which carry block storage over IP or Ethernet to avoid the cost of a second network.
Marking points:
- Why a separate network: storage traffic is heavy and latency-sensitive.
- Network: Shares the ordinary LAN/WAN (TCP or UDP over IP)
- Interface: File level: remote file systems via NFS or CIFS, implemented with RPCs
- Access control: File-system permissions on the NAS
- Cost of storage I/O: Consumes data-network bandwidth and adds latency
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-106
Unit: 5 Storage and Distributed Systems
Topic: Secondary Storage and RAID
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-116, PYQ-117, PYQ-118
In syllabus: yes
Question: Both RAID 0+1 and RAID 1+0 combine striping and mirroring. Explain the difference, and justify the slide's claim that "RAID 1+0 fault tolerance is more".
Answer: **RAID 0+1** first stripes the data over a set of disks, then mirrors the whole stripe set: two striped arrays that are copies of each other. **RAID 1+0** first mirrors disks in pairs, then stripes the data across the pairs.

**Single failure.** In 0+1, one failed disk makes its entire stripe set unusable, so the whole array now depends on every disk of the other stripe. In 1+0, a failed disk affects only its own pair; all other pairs keep their redundancy.

**Second failure.** With 8 disks, after one failure: 0+1 loses data if any of the 4 disks in the surviving stripe fails; 1+0 loses data only if the one specific partner of the failed disk fails. So 1+0 survives far more two-disk failure patterns.

**Rebuild.** 1+0 rebuilds by copying one disk from its partner; 0+1 must rebuild a whole stripe set.

**Core sentence:** same disks, same capacity and similar speed, but 1+0 confines a failure to one mirrored pair, so it tolerates more failures and recovers faster.
Marking points:
- same disks, same capacity and similar speed, but 1+0 confines a failure to one mirrored pair, so it tolerates more failures and recovers faster.
- RAID 0+1 first stripes the data over a set of disks, then mirrors the whole stripe set: two striped arrays that are copies of each other.
- Single failure: In 0+1, one failed disk makes its entire stripe set unusable, so the whole array now depends on every disk of the other stripe.
- Second failure: With 8 disks, after one failure: 0+1 loses data if any of the 4 disks in the surviving stripe fails; 1+0 loses data only if the one specific partner of the failed disk fails.
- Rebuild: 1+0 rebuilds by copying one disk from its partner; 0+1 must rebuild a whole stripe set.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-107
Unit: 5 Storage and Distributed Systems
Topic: Secondary Storage and RAID
Type: true/false
Based on: imitates the professor's TRUE/FALSE correct-and-justify items (OSN End 2022 Q1, AOS End 2025 Q1); same section as PYQ-119
In syllabus: yes
Question: TRUE or FALSE, correct if false and justify: "A RAID 5 array protects stored data against corruption."
Answer: **FALSE.** Corrected: RAID protects against disk *failures*; RAID alone does not prevent or detect data corruption or other errors.

**Justification:** RAID's redundancy is used only when the controller knows that a disk or sector has failed; it then rebuilds the missing data from parity. If a bug, a bad write or a bit flip stores wrong data and the disk reports success, the parity is simply updated to match the wrong data, and every read returns it. Detecting corruption needs a checksum of the data stored separately from it, as ZFS does: it keeps checksums of all data and metadata with the pointers to them, and so can detect and correct corruption.
Marking points:
- States FALSE.
- Corrected: RAID protects against disk failures; RAID alone does not prevent or detect data corruption or other errors.
- RAID's redundancy is used only when the controller knows that a disk or sector has failed; it then rebuilds the missing data from parity.
Answer source: written by Claude, no key
Weak / low priority: no

## File Systems

### PYQ-120
Unit: 5 Storage and Distributed Systems
Topic: File Systems
Type: written
Asked in: OSN Quiz 3 (set 2) 2020, Q1 (4 marks)
Times asked: 1
Reworded versions: none
In syllabus: no: research-paper question; the end-sem topic list names no research papers
Question: In the UNIX system, directory is also treated as a file and there is a minimal difference between file and directory. What is the advantage of keeping minimal difference.
Answer: A UNIX directory has its own inode and keeps its contents, a list of (name, i-number) pairs, in ordinary data blocks. The only real difference is that unprivileged programs may not write it directly; the system writes it through calls such as creat, link and unlink.

- **One mechanism instead of two.** Directories reuse the same inodes, allocation, free-space and block-addressing code as files, so there is no second storage mechanism to implement or debug.
- **The same access path.** Path lookup is "read an inode, read its data" repeated per component; a program with read permission can read a directory with ordinary reads, so tools like ls need no special interface.
- **The same protection, timestamps and link counts** , with nothing new to design.
- **Directories grow like files:** a large directory simply gets more data blocks.
- **Simpler consistency checking, backup and restore** , because everything on disk is uniform.

**Core sentence:** treating a directory as a file lets one set of mechanisms serve both, while the single restriction (no direct writes by users) keeps the directory tree consistent.

No official key exists; this is my answer, following the UNIX paper.
Marking points:
- treating a directory as a file lets one set of mechanisms serve both, while the single restriction (no direct writes by users) keeps the directory tree consistent.
- One mechanism instead of two.
- The same access path.
- The same protection, timestamps and link counts , with nothing new to design.
- Directories grow like files: a large directory simply gets more data blocks.
- Simpler consistency checking, backup and restore , because everything on disk is uniform.
Answer source: written by Claude, no key
Weak / low priority: yes: research-paper question; the end-sem topic list names no research papers

### PYQ-121
Unit: 5 Storage and Distributed Systems
Topic: File Systems
Type: written
Asked in: OSN Mid-sem 2022, Q2 (5 marks)
Times asked: 1
Reworded versions: none
In syllabus: no: research-paper question; the end-sem topic list names no research papers
Question: In UNIX, I/O devices are treated as files. Discuss the advantages. (Note: This question is from research paper)
Answer: Each I/O device supported by UNIX is associated with at least one such file (a **special file** in /dev). Special files are read and written just like ordinary disk files, but requests to read or write result in activation of the associated device.

**The advantage is threefold:**

1. File and device I/O are as similar as possible.
2. File and device names have the same syntax and meaning, so a program expecting a file name as a parameter can be passed a device name.
3. Special files are subject to the same protection mechanism as regular files.
Marking points:
- Devices appear as special files in the file system.
- Reading or writing a special file activates the device.
- Same I/O calls for files and devices.
- Same naming: a device name can be passed where a file name is expected.
- Same protection mechanism.
Answer source: professor's key
Weak / low priority: yes: research-paper question; the end-sem topic list names no research papers

### PYQ-122
Unit: 5 Storage and Distributed Systems
Topic: File Systems
Type: written
Asked in: OSN Quiz 7 2020, Q3 (6 marks); OSN End-sem 2022, Q1.6 (1 mark)
Times asked: 2
Reworded versions: "Identify whether the following statement is TRUE or FALSE. If the statement is FALSE, correct it and justify the corrected sentence. If the statement is TRUE, justify it. Restrict the justification to a few (less than five) sentences. "From the system side, it is easy to provide Session Semantics feature as compared to UNIX semantics feature."" (OSN End-sem 2022)
In syllabus: yes
Question: Briefly explain the following consistency semantics with positive and negative points. (i) UNIX semantics (ii) session semantics.
Answer: **(a)(i) UNIX semantics.** Writes to an open file by one user are visible immediately to other users who have the same file open. One mode of sharing even lets users share the current location pointer, so an advance by one user affects all sharing users. The file has a single image that interleaves all accesses, regardless of their origin.  
*Positive:* simple and intuitive; every reader sees the latest data, which is what users of one machine expect.  
*Negative:* the single image is accessed as an exclusive resource, so contention causes delays; in a distributed system every write must be propagated and caches invalidated immediately, which is expensive.

**(a)(ii) Session semantics** (used by the Andrew File System). Writes to an open file by a user are not visible immediately to other users who have the same file open. Once the file is closed, its changes are visible only in sessions starting later; already-open instances do not reflect them. A file may be associated temporarily with several, possibly different, images at the same time.  
*Positive:* multiple users can perform both reads and writes concurrently on their own images without delay; clients can cache whole files, so performance and scalability are good.  
*Negative:* readers may see stale data; when two users write the same file, the last close wins and the other's changes are silently lost.

**(b) FALSE.** Corrected: from the system side it is **difficult** to provide session semantics compared with UNIX semantics.

**Justification (key):** providing session semantics requires the maintenance of several images of the file and the implementation of protocols for access by subsequent processes in a consistent manner.
Marking points:
- (a)(i) UNIX semantics: Writes to an open file by one user are visible immediately to other users who have the same file open.
- (a)(ii) Session semantics (used by the Andrew File System).
- (b) FALSE: Corrected: from the system side it is difficult to provide session semantics compared with UNIX semantics.
- Justification (key): providing session semantics requires the maintenance of several images of the file and the implementation of protocols for access by subsequent processes in a consistent manner.
Answer source: professor's key
Weak / low priority: no

### PYQ-123
Unit: 5 Storage and Distributed Systems
Topic: File Systems
Type: written
Asked in: OSN End-sem (question list) 2021, Q4 (not given); OSN End-sem 2022, Q8 (5 marks)
Times asked: 2
Reworded versions: none
In syllabus: yes (protection and access control are part of the textbook file-system interface chapter)
Question: Consider three sets of users: professor, TA and student. There exists a folder *marks* to which only the professor can write and from which students and TAs can only read. There exists another folder called *course material* which can be written to by the professor and TA, and from which students can only read. Use an access control matrix to determine a security policy for these criteria.
Answer: **Setting up (key):** we use an access control matrix. The domains are Professors, TA and Student. There are two objects, Folder 1 (marks) and Folder 2 (course material). The operations are write and read.

| Object / Domain | Folder 1 (marks) | Folder 2 (course material) |
| --- | --- | --- |
| Professors | Write, Read | Write, Read |
| TA | Read | Write, Read |
| Student | Read | Read |

**Security policy (key):** when a user requests access to a particular file, the operating system checks the access list associated with that file. If that user is listed for the requested access, the access is allowed. Otherwise, a protection violation occurs, and the user job is denied access to the file.

One line to add for full marks: in practice each column is stored with its folder as an access list (Folder 1: Professor {R, W}, TA {R}, Student {R}), and in UNIX terms the folders would be owned by the professor with TAs in a group that has write permission on Folder 2 only.
Marking points:
- Setting up (key): we use an access control matrix.
- Security policy (key): when a user requests access to a particular file, the operating system checks the access list associated with that file.
- Professors: Write, Read
- Student: Read
Answer source: professor's key
Weak / low priority: no

### PYQ-124
Unit: 5 Storage and Distributed Systems
Topic: File Systems
Type: written
Asked in: OSN Quiz 3 (set 1) 2020, Q5 (4 marks)
Times asked: 1
Reworded versions: none
In syllabus: no: research-paper question; the end-sem topic list names no research papers
Question: Discuss the difference between block I/O system and character I/O system in UNIX.
Answer:
|  | Block I/O system | Character I/O system |
| --- | --- | --- |
| Devices | Disks, tapes: devices addressed as randomly addressable 512-byte blocks | Terminals, printers, communication lines: anything that is not a block device, including byte streams |
| Interface | Through the file system; requests are for whole blocks | Directly, character by character |
| Buffering | A pool of buffers (the **buffer cache**) with a cache of recently used blocks; reads check the cache first, writes are delayed (written later) | Small character queues (lists), no general block cache |
| Effect | Hides device characteristics; many reads served from memory; I/O can be reordered | Simple, low latency for interactive devices |

**Core sentence:** UNIX treats storage devices as arrays of blocks behind a shared buffer cache, and everything else as character streams; both appear to programs as special files in /dev.
Marking points:
- UNIX treats storage devices as arrays of blocks behind a shared buffer cache, and everything else as character streams; both appear to programs as special files in /dev.
- Devices: Disks, tapes: devices addressed as randomly addressable 512-byte blocks
- Interface: Through the file system; requests are for whole blocks
- Buffering: A pool of buffers (the buffer cache) with a cache of recently used blocks; reads check the cache first, writes are delayed (written later)
- Effect: Hides device characteristics; many reads served from memory; I/O can be reordered
Answer source: written by Claude, no key
Weak / low priority: yes: a UNIX-paper question from the midsem portion; the end-sem list names no papers. Keep it for the buffer-cache idea, which section 9 needs.

### PYQ-125
Unit: 5 Storage and Distributed Systems
Topic: File Systems
Type: written
Asked in: OSN End-sem (question list) 2021, Q5 (not given)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: What file allocation method (contiguous, linked or indexed) would you choose to maximize efficiency when files are (a) small and mostly read sequentially, (b) large and mostly read sequentially, (c) large and accessed randomly? (The question text in the source is cut off after "maximize efficiency in…"; it is completed here with the textbook version of the exercise.)
Answer: **(a) Small, sequential: contiguous.** A small file's size is known or bounded when it is created, so it can be placed contiguously; it is then read with minimal head movement and no pointer overhead, and the external fragmentation it causes is small.

**(b) Large, sequential: linked** (or FAT). The file can grow block by block with no need to declare its size in advance and no external fragmentation, and sequential access follows the chain naturally, one pointer per block. Linked allocation's weakness, slow direct access, does not matter here.

**(c) Large, random: indexed** (multilevel or the UNIX combined scheme). Any block i is found with one index lookup (a few for multilevel) instead of following i pointers, and there is no external fragmentation. The index block's overhead is negligible relative to a large file.

**Core sentence:** choose by access pattern and size: contiguous makes both access types fastest but cannot grow, linked grows freely but is sequential-only, and indexed gives direct access at the cost of an index block.

No official key exists; this is my own answer.
Marking points:
- choose by access pattern and size: contiguous makes both access types fastest but cannot grow, linked grows freely but is sequential-only, and indexed gives direct access at the cost of an index block.
- (a) Small, sequential: contiguous: A small file's size is known or bounded when it is created, so it can be placed contiguously; it is then read with minimal head movement and no pointer overhead, and the external fragmentation it …
- (b) Large, sequential: linked (or FAT).
- (c) Large, random: indexed (multilevel or the UNIX combined scheme).
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-126
Unit: 5 Storage and Distributed Systems
Topic: File Systems
Type: written
Asked in: OSN Quiz 3 (set 2) 2020, Q3 (4 marks)
Times asked: 1
Reworded versions: none
In syllabus: no: research-paper question; the end-sem topic list names no research papers
Question: What are the advantages and the problems of deferred block I/O system in UNIX.
Answer: **What it is:** block I/O goes through a cache of buffers. A read is satisfied from the cache when possible; a write only copies the data into a buffer and marks it, and the physical write is **deferred** until the buffer is needed or the system flushes it.

**Advantages:**

- Many reads and writes cause no physical I/O at all; a block written several times is written to disk once.
- The process continues immediately after a write instead of waiting for the disk.
- The system can reorder deferred writes to reduce head movement.
- Block devices look like uniform, randomly addressable arrays of 512-byte blocks, and the same mechanism serves every file system.

**Problems:**

- **Data loss on a crash:** data the program believes is written may still be in memory.
- **Inconsistency:** because writes are reordered, metadata on disk may be partly updated after a crash (the reason for fsck and, later, journaling).
- **Error reporting:** a write error is discovered after the system call has already returned success, so it cannot be reported to the right program.
- The physical order of I/O differs from the logical order, which matters to programs (databases) that need ordering; they need synchronous writes or raw devices.
Marking points:
- Many reads and writes cause no physical I/O at all; a block written several times is written to disk once.
- The process continues immediately after a write instead of waiting for the disk.
- The system can reorder deferred writes to reduce head movement.
- Block devices look like uniform, randomly addressable arrays of 512-byte blocks, and the same mechanism serves every file system.
- Data loss on a crash: data the program believes is written may still be in memory.
- Inconsistency: because writes are reordered, metadata on disk may be partly updated after a crash (the reason for fsck and, later, journaling).
Answer source: written by Claude, no key
Weak / low priority: yes: a UNIX-paper question; the paper is not in the end-sem list, but the delayed-write trade-off it tests is in this section.

### PYQ-127
Unit: 5 Storage and Distributed Systems
Topic: File Systems
Type: written
Asked in: OSN Quiz 2 2022, A4 (2 marks); AOS Quiz 2 2026, Q8 (2 marks); AOS End-sem 2025, Q1.9 (1 mark)
Times asked: 3
Reworded versions: "Explain why a Read operation to a file results into several block level write operations on DISK." (OSN Quiz 2 2022); "TRUE or FALSE. If FALSE, correct it and justify the corrected sentence; if TRUE, justify it. Fewer than five sentences. "Reading a file leads to writing of disk blocks."" (AOS End-sem 2025)
In syllabus: yes
Question: In a simple file system, explain how a file read operation results in a DISK write operation.
Answer: **Key:** for each file, a structure called an **inode** is created. The inode contains several fields, including the time the file was accessed. Whenever a file read occurs, the "time the file was accessed" field has to be updated, so the block holding the inode has to be written, which leads to a disk write operation. Hence a read also involves a disk write.

The 2022 version of the key frames it the same way: the file system tracks information about files in inodes; to read a block it first consults the inode, then reads the block, and then updates the inode's last-accessed-time field with a write. With a multi-block read the pattern repeats: inode read, data read, inode write, per block.

One line to add if marks allow: the write is usually deferred through the buffer cache, so several access-time updates to the same inode become one physical write, and systems offer a mount option (noatime) that suppresses the update precisely because it turns read-only workloads into write workloads.
Marking points:
- for each file, a structure called an inode is created.
- The inode contains several fields, including the time the file was accessed.
- Whenever a file read occurs, the "time the file was accessed" field has to be updated, so the block holding the inode has to be written, which leads to a disk write operation.
- Hence a read also involves a disk write.
Answer source: professor's key
Weak / low priority: no

### PRED-108
Unit: 5 Storage and Distributed Systems
Topic: File Systems
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-120
In syllabus: yes
Question: In an acyclic-graph directory a file can have several names. Explain the issues that arise when one name is deleted, and how hard links and symbolic links each handle them.
Answer: **The issue.** If deleting a name immediately freed the file's space, the other names would point to freed blocks that might be reallocated to another file, which is a dangling reference and a protection hole. If deleting a name never freed the space, the file would never disappear.

|  | Hard link | Symbolic link |
| --- | --- | --- |
| What the name holds | The i-number itself; all names are equal | A path name of the target, stored in a small file of its own |
| On deleting a name | The inode's **link count** is decremented; data is freed only when it reaches 0 | Deleting the target leaves the link **dangling**; it fails when used. Deleting the link does not affect the file |
| Limits | Same file system only; usually not allowed for directories (to prevent cycles) | Can cross file systems and point to directories |

**Core sentence:** sharing in a directory graph turns deletion into a reference-counting problem; hard links count references, symbolic links accept dangling ones.
Marking points:
- sharing in a directory graph turns deletion into a reference-counting problem; hard links count references, symbolic links accept dangling ones.
- The issue: If deleting a name immediately freed the file's space, the other names would point to freed blocks that might be reallocated to another file, which is a dangling reference and a protection hole.
- What the name holds: The i-number itself; all names are equal
- On deleting a name: The inode's link count is decremented; data is freed only when it reaches 0
- Limits: Same file system only; usually not allowed for directories (to prevent cycles)
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-109
Unit: 5 Storage and Distributed Systems
Topic: File Systems
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025); same section as PYQ-125
In syllabus: yes
Question: A file of 100 blocks has its FCB in memory, and no other blocks are cached. How many disk reads are needed to read block 50 (counting from 1) under contiguous, linked and single-level indexed allocation? What changes with a FAT that is cached in memory?
Answer:
| Method | Reads | Why |
| --- | --- | --- |
| Contiguous | **1** | Address = start + 49, computed directly |
| Linked | **50** | The pointer to block k is inside block k − 1, so blocks 1 to 49 must be read to find block 50, then block 50 itself |
| Indexed | **2** | Read the index block, then block 50 (1 if the index block is already in memory) |
| Linked with cached FAT | **1** | The chain is followed in the in-memory table; only block 50 is read from disk |

**Core sentence:** a FAT keeps linked allocation's freedom from fragmentation while removing its one big cost, slow direct access, provided the table is cached.
Marking points:
- a FAT keeps linked allocation's freedom from fragmentation while removing its one big cost, slow direct access, provided the table is cached.
- Contiguous: 1
- Linked with cached FAT: 1
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-110
Unit: 5 Storage and Distributed Systems
Topic: File Systems
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to memory management; same section as PYQ-125
In syllabus: yes
Question: Show that the UNIX inode's multi-level index and a multi-level page table solve the same problem in the same way. Compare their costs.
Answer:
|  | Multi-level page table (Block 9) | Inode multi-level index |
| --- | --- | --- |
| Maps | Page number → frame | Logical block number → disk block |
| Problem | A flat table for a sparse 32- or 64-bit address space is huge (4 MB per process on 32 bits) | A flat index for the largest possible file would waste an enormous block in every small file |
| Solution | Page the page table: levels allocated only for used regions | Index the index: indirect blocks allocated only as a file grows |
| Fan-out per level | Page size / entry size (4096 / 4 = 1024) | Block size / pointer size (4096 / 4 = 1024) |
| Cost per level | One more memory access on a TLB miss | One more disk read on a cache miss |
| Hiding the cost | The TLB | The buffer cache, which keeps indirect blocks |

**Core sentence:** both are radix trees with a fan-out of entries per block; they pay for size only where it is used and pay for depth only on a cache miss. The UNIX inode improves on a pure multi-level table by keeping 12 direct pointers, so most files, which are small, need no indirection at all.
Marking points:
- both are radix trees with a fan-out of entries per block; they pay for size only where it is used and pay for depth only on a cache miss.
- Maps: Page number → frame
- Problem: A flat table for a sparse 32- or 64-bit address space is huge (4 MB per process on 32 bits)
- Solution: Page the page table: levels allocated only for used regions
- Fan-out per level: Page size / entry size (4096 / 4 = 1024)
- Cost per level: One more memory access on a TLB miss
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-111
Unit: 5 Storage and Distributed Systems
Topic: File Systems
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025)
In syllabus: yes
Question: A 1 TB disk uses 4 KB blocks. How large is its free-space bit vector? Is it practical to keep in memory? What if the blocks were clustered in groups of four?
Answer: Number of blocks = 2^40 / 2^12 = 2^28. One bit per block: 2^28 bits = 2^25 bytes = **32 MB**.

That is large to keep resident for a single disk, which is the bitmap's known weakness: it is efficient only when it is in memory.

With clusters of 4 blocks, one bit covers 16 KB: 2^26 bits = **8 MB**. Clustering trades a smaller bitmap for more internal fragmentation (a small file now takes at least a 16 KB cluster).
Marking points:
- Final answer: With clusters of 4 blocks, one bit covers 16 KB: 2^26 bits = 8 MB.
- Number of blocks = 2^40 / 2^12 = 2^28.
- One bit per block: 2^28 bits = 2^25 bytes = 32 MB.
- That is large to keep resident for a single disk, which is the bitmap's known weakness: it is efficient only when it is in memory.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-112
Unit: 5 Storage and Distributed Systems
Topic: File Systems
Type: true/false
Based on: imitates the professor's TRUE/FALSE correct-and-justify items (OSN End 2022 Q1, AOS End 2025 Q1); same section as PYQ-126
In syllabus: yes
Question: TRUE or FALSE, correct if false and justify: "A journaling file system writes metadata only once, which is why it is both faster and more reliable than a file system that relies on fsck."
Answer: **FALSE.** Corrected: a journaling file system writes each metadata change twice (first to the log, then to its home location); it is more reliable and recovers much faster, but it does not save writes.

**Justification:** each update is first recorded as a transaction in a sequential log and committed; only then are the actual structures updated. After a crash, committed transactions are replayed and incomplete ones discarded, so recovery depends on the log's length (seconds) instead of the file system's size (fsck's full scan). The double write costs little because log writes are sequential, which avoids seeks (Block 11), and the home-location writes can be batched.
Marking points:
- States FALSE.
- Corrected: a journaling file system writes each metadata change twice (first to the log, then to its home location); it is more reliable and recovers much faster, but it does not save writes.
- each update is first recorded as a transaction in a sequential log and committed; only then are the actual structures updated.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-113
Unit: 5 Storage and Distributed Systems
Topic: File Systems
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025)
In syllabus: yes
Question: On the vsfs disk (4 KB blocks, 256-byte inodes, inode table starting at 12 KB, 512-byte sectors), which block of the inode table and which disk sector hold inode 50? At what byte offset inside that block does it start?
Answer: Byte offset into the inode region = 50 × 256 = 12,800.

blk = 12,800 ÷ 4096 = **3** (integer division): the fourth block of the inode table, i.e. disk block 3 + 3 = **block 6**.

sector = (3 × 4096 + 12,288) ÷ 512 = (12,288 + 12,288) ÷ 512 = **48**.

Offset inside that block = 12,800 − 3 × 4096 = 12,800 − 12,288 = **512 bytes**, so inode 50 is the third inode in its block (the block holds inodes 48 to 63).

**Sector trap.** The slide's formula gives sector 48, the first sector of the block that contains the inode (the file system reads the whole block). The inode itself starts 512 bytes into that block, so its bytes are in sector 48 + 512 ÷ 512 = **49**. Say which one you are giving.
Marking points:
- Final answer: The inode itself starts 512 bytes into that block, so its bytes are in sector 48 + 512 ÷ 512 = 49.
- Sector trap: The slide's formula gives sector 48, the first sector of the block that contains the inode (the file system reads the whole block).
- Byte offset into the inode region = 50 × 256 = 12,800.
- blk = 12,800 ÷ 4096 = 3 (integer division): the fourth block of the inode table, i.e.
- sector = (3 × 4096 + 12,288) ÷ 512 = (12,288 + 12,288) ÷ 512 = 48.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-114
Unit: 5 Storage and Distributed Systems
Topic: File Systems
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025); same section as PYQ-127
In syllabus: yes
Question: In vsfs with no caching, the file /foo/bar is already open. (a) How many disk reads and writes does one write() that appends a new block cost, and which structures are touched? (b) How many does creat("/foo/new") cost, assuming /foo's directory block has room for the new entry?
Answer: **(a) Append one block: 5 I/Os (2 reads, 3 writes).** Read the data bitmap and write it (to find and allocate a free block); read the inode and write it (to record the new block's address and the new size); write the data block itself.

**(b) creat("/foo/new"):**

| Step | Reads | Writes |
| --- | --- | --- |
| Path lookup: root inode, root data, foo inode, foo data (to check the name is not present) | 4 | 0 |
| Inode bitmap: find a free inode and mark it allocated | 1 | 1 |
| Write foo's data block with the new (name, i-number) entry | 0 | 1 |
| Initialize the new inode (read its block, write it) | 1 | 1 |
| Update foo's inode (size, modification time) | 1 | 1 |
| **Total** | **7** | **4** |

**Core sentence:** reads touch only inodes and data; anything that allocates also touches a bitmap, and every metadata change is a read-modify-write of a whole block, which is why buffering writes matters so much.

**Counting convention.** Some versions count foo's inode read once for both lookup and update (giving 6 reads), or omit reading the new inode's block before writing it. State your assumptions; the structure of the answer is what earns the marks.
Marking points:
- reads touch only inodes and data; anything that allocates also touches a bitmap, and every metadata change is a read-modify-write of a whole block, which is why buffering writes matters so much.
- (a) Append one block: 5 I/Os (2 reads, 3 writes).
- Counting convention: Some versions count foo's inode read once for both lookup and update (giving 6 reads), or omit reading the new inode's block before writing it.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-115
Unit: 5 Storage and Distributed Systems
Topic: File Systems
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to HDFS; same section as PYQ-127
In syllabus: yes
Question: In vsfs the superblock, inodes and data blocks share one disk, and a single machine owns them all. Explain why that arrangement breaks when the data no longer fits on one machine, and how HDFS reorganizes it. Which consistency semantics does HDFS then offer?
Answer: **Why it breaks.** With petabytes of data spread over thousands of machines, every path lookup in vsfs style would need inode and directory reads from whichever machine held them, and every machine would need to coordinate allocation (the bitmaps) with every other. Metadata operations, which are small and frequent, would be scattered and slow, and consistency of the namespace would require distributed locking.

**HDFS's reorganization.** It separates metadata from data entirely. One server, the **NameNode**, keeps the whole namespace (the equivalent of directories and inodes, plus the map from each block to the DataNodes that hold it) in RAM. The data, in large blocks (128 MB), is stored on many **DataNodes**, each block replicated three times. A client asks the NameNode once for the block locations and then reads and writes the DataNodes directly, so the NameNode is never on the data path.

**Semantics.** HDFS uses a single-writer, multiple-reader model enforced with a lease. Data written to a file is not guaranteed to be visible to a new reader until the file is closed (unless the writer calls hflush), which is **session-like semantics** (section 3): cheap to provide at scale because no write is propagated to readers immediately.

**Core sentence:** vsfs's inode and HDFS's NameNode answer the same question, where the blocks of a file are; HDFS moves the answer to a dedicated server so the data can be spread across a cluster.
Marking points:
- vsfs's inode and HDFS's NameNode answer the same question, where the blocks of a file are; HDFS moves the answer to a dedicated server so the data can be spread across a cluster.
- Why it breaks: With petabytes of data spread over thousands of machines, every path lookup in vsfs style would need inode and directory reads from whichever machine held them, and every machine would need to coordinate allocation (the …
- HDFS's reorganization: It separates metadata from data entirely.
- Semantics: HDFS uses a single-writer, multiple-reader model enforced with a lease.
Answer source: written by Claude, no key
Weak / low priority: no

## Hadoop Distributed File System

### PYQ-128
Unit: 5 Storage and Distributed Systems
Topic: Hadoop Distributed File System
Type: written
Asked in: AOS End-sem 2025, Q2.4 (3 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: In HDFS, explain the concept of checkpoint node and backup node.
Answer: **Background:** the NameNode keeps the namespace in RAM and persists it as a **checkpoint** (the image at some time) plus a **journal** (a write-ahead log of every change since). The journal grows with every change, which makes restarts slow (the whole journal must be replayed) and raises the risk of losing or corrupting it.

**CheckpointNode:** a NameNode run in a different role, usually on a different host (it needs the same memory as the NameNode). Periodically it downloads the current checkpoint and journal from the NameNode, merges them locally into a **new checkpoint**, and returns it to the NameNode, which can then truncate its journal (start an empty one). This protects the metadata and keeps restart time short.

**BackupNode:** also creates periodic checkpoints, but in addition keeps an **in-memory, up-to-date image of the namespace** that is always synchronized with the NameNode. It accepts the stream of journal transactions from the active NameNode, saves them to its own storage, and applies them to its in-memory image; the NameNode treats it as a journal store. Because its image is already current, it can create a checkpoint without downloading anything, which is more efficient, and if the NameNode fails, the BackupNode holds the latest namespace state. It can be seen as a read-only NameNode: it has all the metadata except block locations.

**Core sentence:** the CheckpointNode periodically merges checkpoint + journal into a new checkpoint; the BackupNode does that and also keeps a live, synchronized copy of the namespace in memory.
Marking points:
- the CheckpointNode periodically merges checkpoint + journal into a new checkpoint; the BackupNode does that and also keeps a live, synchronized copy of the namespace in memory.
- Background: the NameNode keeps the namespace in RAM and persists it as a checkpoint (the image at some time) plus a journal (a write-ahead log of every change since).
- CheckpointNode: a NameNode run in a different role, usually on a different host (it needs the same memory as the NameNode).
- BackupNode: also creates periodic checkpoints, but in addition keeps an in-memory, up-to-date image of the namespace that is always synchronized with the NameNode.
Answer source: written by Claude, no key
Weak / low priority: no

### PYQ-129
Unit: 5 Storage and Distributed Systems
Topic: Hadoop Distributed File System
Type: written
Asked in: AOS Quiz 2 2026, Q7 (2 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Explain how HDFS detects the failure of a node.
Answer: **Key:** during normal operation, DataNodes send **heartbeats** to the NameNode to confirm that the DataNode is operating and the block replicas it hosts are available. The default heartbeat interval is **three seconds**. If the NameNode does not receive a heartbeat from a DataNode in **ten minutes**, the NameNode considers the DataNode to be out of service and the block replicas hosted by that DataNode to be unavailable. The NameNode then schedules creation of new replicas of those blocks on other DataNodes.

Two supporting points if there is room: corrupt (rather than missing) replicas are detected separately by checksums, by readers and by each DataNode's block scanner; and block reports every hour tell the NameNode exactly which replicas each live node still holds.
Marking points:
- during normal operation, DataNodes send heartbeats to the NameNode to confirm that the DataNode is operating and the block replicas it hosts are available.
- The default heartbeat interval is three seconds.
- If the NameNode does not receive a heartbeat from a DataNode in ten minutes, the NameNode considers the DataNode to be out of service and the block replicas hosted by that DataNode to be unavailable.
- The NameNode then schedules creation of new replicas of those blocks on other DataNodes.
Answer source: professor's key
Weak / low priority: no

### PYQ-130
Unit: 5 Storage and Distributed Systems
Topic: Hadoop Distributed File System
Type: written
Asked in: AOS Quiz 2 2026, Q9 (2 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Explain the terms reliability and availability. Discuss how HDFS improves both.
Answer: **Reliability (key):** the probability that a system or component performs its required functions without failure over a specified period under defined conditions. It is about how often failures happen, and is measured by metrics such as MTBF (mean time between failures) or failure rates.

**Availability (key):** the percentage of time a system is operational and ready for use when needed (uptime). It is calculated as uptime divided by total elapsed time, i.e. **MTBF / (MTBF + MTTR)**, where MTTR is the mean time to repair.

**How HDFS improves them (key):** through data replication, rack awareness, continuous health monitoring and block integrity checks.

- **Replication:** each block (typically 128 MB) is stored on multiple DataNodes, three by default, so if a node or disk fails the data is still available from other replicas.
- **Rack-aware placement:** one replica on the local (or a random) node, the second on a different rack, the third on a different node in that remote rack, so even a whole rack outage loses no data.
- **Heartbeats and block reports:** a DataNode that stops sending heartbeats is detected and its blocks are automatically re-replicated on healthy nodes, which keeps MTTR short.
- **Checksums:** clients and DataNodes verify blocks; a corrupt block is read from another replica and repaired.
- **NameNode high availability:** an active and a standby NameNode (synchronized through shared metadata storage) remove the single point of failure at the master.

Replication mainly raises reliability (data survives failures); fast detection and automatic re-replication raise availability (data is reachable most of the time).

**Two sources, two formulas.** The key writes MTBF / (MTBF + MTTR); the distributed-systems chapter (Block 14) writes MTTF / (MTTF + MTTR). For a repairable system they are used interchangeably. The key also mentions erasure coding and NameNode HA, which are in later Hadoop versions, not in the 2010 paper the course uses (the paper has a single NameNode, protected by checkpoints and a BackupNode).
Marking points:
- Replication: each block (typically 128 MB) is stored on multiple DataNodes, three by default, so if a node or disk fails the data is still available from other replicas.
- Rack-aware placement: one replica on the local (or a random) node, the second on a different rack, the third on a different node in that remote rack, so even …
- Heartbeats and block reports: a DataNode that stops sending heartbeats is detected and its blocks are automatically re-replicated on healthy nodes, which keeps MTTR short.
- Checksums: clients and DataNodes verify blocks; a corrupt block is read from another replica and repaired.
- NameNode high availability: an active and a standby NameNode (synchronized through shared metadata storage) remove the single point of failure at the master.
- Reliability (key): the probability that a system or component performs its required functions without failure over a specified period under defined conditions.
Answer source: professor's key
Weak / low priority: no

### PRED-116
Unit: 5 Storage and Distributed Systems
Topic: Hadoop Distributed File System
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: A typical UNIX file system uses 4 KB blocks; HDFS uses blocks of 64 to 128 MB. Justify this choice, and state one cost of it.
Answer: **Seek time is amortized.** A disk access costs a seek and rotation (about 10 ms) before data flows at the transfer rate (about 100 MB/s on the slide). Reading a 4 KB block spends almost all its time positioning. Reading a 128 MB block spends 10 ms positioning and about 1.28 s transferring, so the disk runs at nearly its full transfer rate. HDFS targets batch jobs that read huge files sequentially, which is exactly this case.

**Metadata stays small.** The NameNode keeps the whole namespace and the block map in RAM. A 1 PB data set in 128 MB blocks is about 8 million blocks; in 4 KB blocks it would be about 270 billion, which no single server could hold in memory.

**Fewer, larger tasks to schedule.** MapReduce typically gives one block to one map task.

**Cost:** a small file still takes a whole block entry and its own NameNode metadata (though the disk space used on a DataNode is only the file's actual size), so HDFS handles millions of small files poorly; and a block is the unit of replication and of parallelism, so a file smaller than a block gets no parallel read.
Marking points:
- Seek time is amortized: A disk access costs a seek and rotation (about 10 ms) before data flows at the transfer rate (about 100 MB/s on the slide).
- Metadata stays small: The NameNode keeps the whole namespace and the block map in RAM.
- Fewer, larger tasks to schedule: MapReduce typically gives one block to one map task.
- Cost: a small file still takes a whole block entry and its own NameNode metadata (though the disk space used on a DataNode is only the file's actual size), so HDFS handles millions of small files …
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-117
Unit: 5 Storage and Distributed Systems
Topic: Hadoop Distributed File System
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-128
In syllabus: yes
Question: The NameNode persists the namespace (inodes and the list of blocks of each file) in its checkpoint and journal, but not the locations of block replicas. Justify this design, and explain how the NameNode learns the locations after a restart.
Answer: **Why not persist them:** replica locations change constantly and the NameNode is not the authority on them. A DataNode can fail, a disk can lose replicas, the balancer moves replicas, re-replication creates new ones, and a node can be decommissioned. Any saved map would be stale at restart and could direct clients to replicas that no longer exist. Persisting them would also add a journal write for every replica change.

**How they are learned:** each DataNode is the authority for what it actually holds. On startup each DataNode performs a handshake with the NameNode and then sends a **block report** (block id, generation stamp and length of every replica it hosts), and block reports are repeated every hour. The NameNode rebuilds the block-to-DataNode map from these reports.

**Core sentence:** persist what only the NameNode knows (the namespace), and ask the DataNodes for what only they know (where the replicas really are).
Marking points:
- persist what only the NameNode knows (the namespace), and ask the DataNodes for what only they know (where the replicas really are).
- Why not persist them: replica locations change constantly and the NameNode is not the authority on them.
- How they are learned: each DataNode is the authority for what it actually holds.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-118
Unit: 5 Storage and Distributed Systems
Topic: Hadoop Distributed File System
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-129
In syllabus: yes
Question: Justify the observation: "The NameNode does not directly call DataNodes; it uses replies to heartbeats to send instructions."
Answer: A single NameNode serves thousands of DataNodes. If it initiated connections to them, it would need to track each node's state, open and time out connections to dead nodes, and could block waiting on a slow node, which would make the one critical server the bottleneck and expose it to every failure in the cluster. With heartbeats, every DataNode contacts the NameNode every 3 seconds anyway, so commands (replicate blocks, remove replicas, re-register or shut down, send a block report) can be piggybacked on the replies at no extra cost. A dead node never asks, so it is never given work, and its silence is itself the failure signal.

**Core sentence:** heartbeats turn one channel into three things at once: liveness detection, load reporting and command delivery, while keeping the NameNode passive and scalable.
Marking points:
- heartbeats turn one channel into three things at once: liveness detection, load reporting and command delivery, while keeping the NameNode passive and scalable.
- A single NameNode serves thousands of DataNodes.
- If it initiated connections to them, it would need to track each node's state, open and time out connections to dead nodes, and could block waiting on a slow node, which would make the one critical server the bottleneck …
- With heartbeats, every DataNode contacts the NameNode every 3 seconds anyway, so commands (replicate blocks, remove replicas, re-register or shut down, send a block report) can be piggybacked on the replies at no extra cost.
- A dead node never asks, so it is never given work, and its silence is itself the failure signal.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-119
Unit: 5 Storage and Distributed Systems
Topic: Hadoop Distributed File System
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Explain how a client writes a block to HDFS with a replication factor of three. After the client has written data but before it closes the file, will a new reader see that data? Relate your answer to the consistency semantics of Block 12.
Answer: **Write path.** The client holds the file's lease (single writer). When a new block is needed it asks the NameNode, which allocates a unique block ID and chooses three DataNodes (by the placement policy: the writer's node, then two nodes on another rack). The DataNodes form a pipeline ordered to minimize network distance. The client buffers the application's bytes and, when a packet buffer (typically 64 KB) fills, pushes the packet to the first DataNode, which stores it and forwards it to the second, which forwards to the third. Acknowledgements travel back along the pipeline. The client sends further packets without waiting for earlier acknowledgements. The remaining blocks follow the same way.

**Visibility.** No: after data is written, HDFS gives no guarantee that it is visible to a new reader until the file is closed. If the application needs visibility earlier, it must explicitly call **hflush**, which pushes the current packet through the pipeline and waits for acknowledgements from all DataNodes.

**Link:** this is session-like semantics. Writes become visible at close, which is cheap to provide across many machines because nothing has to be propagated to readers on each write. UNIX semantics (every write visible immediately) would require coordinating every reader on every write.
Marking points:
- Write path: The client holds the file's lease (single writer).
- Visibility: No: after data is written, HDFS gives no guarantee that it is visible to a new reader until the file is closed.
- Link: this is session-like semantics.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-120
Unit: 5 Storage and Distributed Systems
Topic: Hadoop Distributed File System
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-130
In syllabus: yes
Question: Justify HDFS's default placement of a block's replicas: first on the writer's node, second and third on two different nodes of one other rack. Why not all three on different racks, or the first two on the same rack?
Answer: **Against a rack failure:** with replicas on two racks, the loss of a whole rack (a switch or power failure) still leaves at least one copy.

**Write cost:** the first replica is local, and the pipeline crosses the core switch only once (rack A to rack B); the third copy travels inside rack B, where bandwidth is higher. Three different racks would cross the core switch twice per block.

**Why not the first two on the same rack:** the paper's argument: if the first two replicas were on the writer's rack, two-thirds of every file's replicas would sit on that one rack. Placing the second and third on a different rack spreads a file's replicas across the cluster, which balances load and gives readers more nearby choices (more aggregate read bandwidth).

**Core sentence:** two racks are enough to survive a rack failure, and putting two of the three copies on the remote rack keeps cross-rack traffic to one transfer while spreading each file's data.
Marking points:
- two racks are enough to survive a rack failure, and putting two of the three copies on the remote rack keeps cross-rack traffic to one transfer while spreading each file's data.
- Against a rack failure: with replicas on two racks, the loss of a whole rack (a switch or power failure) still leaves at least one copy.
- Write cost: the first replica is local, and the pipeline crosses the core switch only once (rack A to rack B); the third copy travels inside rack B, where bandwidth is higher.
- Why not the first two on the same rack: the paper's argument: if the first two replicas were on the writer's rack, two-thirds of every file's replicas would sit on that one rack.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-121
Unit: 5 Storage and Distributed Systems
Topic: Hadoop Distributed File System
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to RAID; same section as PYQ-130
In syllabus: yes
Question: Compare HDFS block replication with RAID 1 and RAID 5 (Block 11). What do they have in common, and why does HDFS choose replication across machines over parity across disks?
Answer:
|  | RAID 1 / RAID 5 | HDFS replication |
| --- | --- | --- |
| Unit of failure covered | A disk | A disk, a whole machine, or a whole rack |
| Redundancy | Mirror (100%) or parity (one disk's worth) | Three full copies (200% overhead) |
| Parallel reads | Striping / either mirror | Any of three replicas, chosen by distance; MapReduce runs tasks next to a replica |
| Detecting corruption | Not done by RAID alone | Checksums on every block, block scanner |
| Repair | Rebuild onto a spare disk | Re-replicate onto any healthy node, automatically |

**Common ground:** both use redundancy for reliability and parallelism for throughput, the two goals RAID was defined by.

**Why replication:** on commodity machines, failures of whole nodes are routine, and parity cannot help when the machine holding the parity calculation is the one that failed. Full copies also give MapReduce several locations to run each task near its data, and recovery is a simple copy instead of reading the whole stripe from other machines over the network. The price is storage (3×), accepted because commodity disks are cheap; that is why later Hadoop versions add erasure coding for cold data.
Marking points:
- Common ground: both use redundancy for reliability and parallelism for throughput, the two goals RAID was defined by.
- Why replication: on commodity machines, failures of whole nodes are routine, and parity cannot help when the machine holding the parity calculation is the one that failed.
- Unit of failure covered: A disk
- Redundancy: Mirror (100%) or parity (one disk's worth)
- Parallel reads: Striping / either mirror
- Detecting corruption: Not done by RAID alone
Answer source: written by Claude, no key
Weak / low priority: no

## MapReduce

### PYQ-131
Unit: 5 Storage and Distributed Systems
Topic: MapReduce
Type: written
Asked in: AOS End-sem 2025, Q2.5 (3 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: "One of the common causes that lengthens the total time taken for a MapReduce operation is a 'straggler': a machine that takes an unusually long time to complete one of the last few map or reduce tasks in the computation." Explain how MapReduce handles the issue of stragglers.
Answer: **The issue: stragglers.** A job finishes only when its last task finishes. With thousands of commodity machines, a few are always unusually slow (competing jobs, a bad disk doing many correctable reads, misconfiguration such as disabled caches). Without backups, the whole job waits for the slowest of them, so the long tail of a few tasks dominates completion time.

**Evidence:** in the 1 TB sort, the normal run took 891 seconds. With backup tasks disabled, all but 5 reduce tasks were complete after 960 seconds, but those 5 took another 300 seconds: 1,283 seconds in total, an increase of **44%**.

**Remedy and cost:** near the end of a phase the master launches backup copies of the remaining in-progress tasks, and whichever copy finishes first wins. It is tuned to use only a few percent more resources. It is safe because task outputs are committed atomically and duplicate completions are ignored.
Marking points:
- The issue: stragglers: A job finishes only when its last task finishes.
- Evidence: in the 1 TB sort, the normal run took 891 seconds.
- Remedy and cost: near the end of a phase the master launches backup copies of the remaining in-progress tasks, and whichever copy finishes first wins.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-122
Unit: 5 Storage and Distributed Systems
Topic: MapReduce
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Web-server logs contain one line per request, holding the requested URL. Write Map and Reduce functions that output, for each URL, the total number of times it was requested. Which part of the work is done by the library, not by your code?
Answer:
```
map(key = log file name + offset, value = log line):
    url = extract_url(value)
    emit(url, 1)

reduce(key = url, values = list of counts):
    total = 0
    for v in values: total = total + v
    emit(url, total)
```

**Done by the library:** splitting the logs into M pieces and running map tasks in parallel near the data; partitioning the intermediate pairs into R regions (hash(url) mod R); moving each region to its reduce worker; **sorting and grouping** all values of the same URL together; running reduces in parallel; re-executing tasks of failed machines.

**Improvement worth a line:** since addition is associative and commutative, the same reduce code can be used as a **combiner** on each map machine, so a popular URL sends one partial count per map task over the network instead of thousands of (url, 1) pairs.
Marking points:
- Done by the library: splitting the logs into M pieces and running map tasks in parallel near the data; partitioning the intermediate pairs into R regions (hash(url) mod R); moving each region to its reduce worker; sorting and grouping …
- Improvement worth a line: since addition is associative and commutative, the same reduce code can be used as a combiner on each map machine, so a popular URL sends one partial count per map task over the network instead …
- reduce(key = url, values = list of counts):
    total = 0
    for v in values: total = total + v
    emit(url, total)
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-123
Unit: 5 Storage and Distributed Systems
Topic: MapReduce
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Google often ran MapReduce with M = 200,000 map tasks and R = 5,000 reduce tasks on 2,000 machines. Justify making the number of tasks much larger than the number of machines. What limits how large M and R can be?
Answer: **Why many small tasks** (the slide's "fine granularity tasks: map tasks ≫ machines"):

- **Dynamic load balancing:** a fast machine simply takes more tasks, so no machine is left idle while another finishes one huge task.
- **Fast recovery:** when a worker fails, its many small tasks are spread over all other machines, so the lost work is redone in parallel and quickly.
- **Pipelining:** shuffling the output of finished map tasks can overlap with the execution of later map tasks.

**Limits:** the master makes O(M + R) scheduling decisions and keeps O(M × R) state: here 200,000 × 5,000 = 10^9 task pairs, about 1 GB at one byte each. And R is constrained by users, because each reduce task produces a separate output file. In practice M is chosen so each task handles 16 to 64 MB of input (which also makes the locality optimization work), and R is a small multiple of the number of machines.
Marking points:
- Dynamic load balancing: a fast machine simply takes more tasks, so no machine is left idle while another finishes one huge task.
- Fast recovery: when a worker fails, its many small tasks are spread over all other machines, so the lost work is redone in parallel and quickly.
- Pipelining: shuffling the output of finished map tasks can overlap with the execution of later map tasks.
- Why many small tasks (the slide's "fine granularity tasks: map tasks ≫ machines"):
- Limits: the master makes O(M + R) scheduling decisions and keeps O(M × R) state: here 200,000 × 5,000 = 10^9 task pairs, about 1 GB at one byte each.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-124
Unit: 5 Storage and Distributed Systems
Topic: MapReduce
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: The MapReduce slide asks "Re-execute completed + in-progress map tasks. Why????" Answer it, and explain why completed reduce tasks are not re-executed.
Answer: **Core sentence:** completed map tasks are re-executed because their output is stored on the local disk of the failed machine and is therefore inaccessible; completed reduce tasks are not, because their output is stored in the global file system.

**Detail:** a map task's result is not "done" until every reduce task has read its region of it, and those regions sit on the map worker's local disk (written there deliberately, to avoid sending intermediate data through the replicated file system). If that machine fails before every reducer has fetched its region, the data is lost, so the map task must run again elsewhere; reducers that have not read from the old worker are told to read from the new one. A reduce task writes its output into GFS, which replicates it across machines, so once completed it survives the loss of the worker.

The design accepts re-doing some work in exchange for never writing intermediate data to the replicated file system, which would triple the network traffic of every job.
Marking points:
- completed map tasks are re-executed because their output is stored on the local disk of the failed machine and is therefore inaccessible; completed reduce tasks are not, because their output is stored in the global file system.
- Detail: a map task's result is not "done" until every reduce task has read its region of it, and those regions sit on the map worker's local disk (written there deliberately, to avoid sending intermediate data …
- If that machine fails before every reducer has fetched its region, the data is lost, so the map task must run again elsewhere; reducers that have not read from the old worker are told to read from the new one.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-125
Unit: 5 Storage and Distributed Systems
Topic: MapReduce
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to networking and HDFS
In syllabus: yes
Question: Both the HDFS NameNode and the MapReduce master rely on periodic messages to detect failures. Compare the two mechanisms and what each does on a failure. Why can neither distinguish a crashed machine from an unreachable one, and why does that not matter here?
Answer:
|  | HDFS | MapReduce |
| --- | --- | --- |
| Who initiates | DataNodes send heartbeats every 3 s to the NameNode | The master pings every worker periodically |
| Declared failed after | 10 minutes without a heartbeat | No response within a set time |
| Recovery | Re-replicate the node's blocks on other DataNodes | Reset its map tasks (completed and in-progress) and in-progress reduce tasks to idle; reschedule |

**The indistinguishability:** a missing reply looks the same whether the machine crashed, is overloaded, or is cut off by the network (as in the paper's 80-machine network maintenance). A timeout is only a guess.

**Why it does not matter:** both recoveries are **idempotent and safe if the node was alive after all**. An extra HDFS replica is simply removed later as over-replication. A duplicate map completion is ignored by the master, and reduce outputs are committed by atomic rename, so a slow worker finishing late changes nothing. This is the same reasoning as TCP retransmission with sequence numbers: when you cannot know whether something was lost, design the protocol so that doing it twice is harmless.
Marking points:
- The indistinguishability: a missing reply looks the same whether the machine crashed, is overloaded, or is cut off by the network (as in the paper's 80-machine network maintenance).
- Why it does not matter: both recoveries are idempotent and safe if the node was alive after all.
- Who initiates: DataNodes send heartbeats every 3 s to the NameNode
- Declared failed after: 10 minutes without a heartbeat
- Recovery: Re-replicate the node's blocks on other DataNodes
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-126
Unit: 5 Storage and Distributed Systems
Topic: MapReduce
Type: true/false
Based on: imitates the professor's TRUE/FALSE correct-and-justify items (OSN End 2022 Q1, AOS End 2025 Q1); same section as PYQ-131
In syllabus: yes
Question: TRUE or FALSE, correct if false and justify: "A combiner can be used with any Reduce function, and it changes the final output of the job."
Answer: **FALSE.** Corrected: a combiner can be used only when the Reduce function is commutative and associative, and it must not change the final output; it only reduces the data sent over the network.

**Justification:** the combiner runs on each map machine and partially merges that machine's intermediate values for a key, writing the result to an intermediate file that a reduce task later reads. Reduce then merges these partial results. For a sum (word count) this gives the same total. For a function such as an average, partial averages of unequal groups cannot be averaged again, so the same code cannot serve as a combiner without changing it (for example, to emit (sum, count) pairs).
Marking points:
- States FALSE.
- Corrected: a combiner can be used only when the Reduce function is commutative and associative, and it must not change the final output; it only reduces the data sent over the network.
- the combiner runs on each map machine and partially merges that machine's intermediate values for a key, writing the result to an intermediate file that a reduce task later reads.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-127
Unit: 5 Storage and Distributed Systems
Topic: MapReduce
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to memory, disks and file systems; same section as PYQ-131
In syllabus: yes
Question: "Move the computation to the data, not the data to the computation." Show how the MapReduce locality optimization applies the same principle as caching and virtual memory (Blocks 9 and 10) and as large disk blocks (Block 11), and explain what HDFS must provide for it to work.
Answer: **The common principle:** keep the expensive transfer off the critical path by working where the data already is.

- **Blocks 9 and 10:** the TLB, the buffer cache and demand paging exploit locality of reference: data recently used is kept close to the CPU, because fetching it from memory or disk costs 100 to 100,000 times more.
- **Block 11:** large disk blocks and read-ahead pay one seek for a long sequential transfer, because positioning dominates the cost of small reads. HDFS's 64 to 128 MB blocks follow the same rule.
- **Block 13:** in a cluster the scarce resource is network (switch) bandwidth. Shipping a few KB of map code to the machine holding a 64 MB block is far cheaper than shipping the block. The measured effect: 31 GB/s aggregate read rate with locality, against about 10 GB/s limited by rack switches without it.

**What HDFS must provide:** an API that **exposes the locations of a file's block replicas** (conventional file systems hide them), plus replication (three replicas give the scheduler three machines to choose from) and rack awareness (a second-best choice on the same switch).
Marking points:
- Blocks 9 and 10: the TLB, the buffer cache and demand paging exploit locality of reference: data recently used is kept close to the CPU, because fetching it from memory …
- Block 11: large disk blocks and read-ahead pay one seek for a long sequential transfer, because positioning dominates the cost of small reads.
- Block 13: in a cluster the scarce resource is network (switch) bandwidth.
- The common principle: keep the expensive transfer off the critical path by working where the data already is.
- What HDFS must provide: an API that exposes the locations of a file's block replicas (conventional file systems hide them), plus replication (three replicas give the scheduler three machines to choose from) and rack awareness (a second-best choice on …
Answer source: written by Claude, no key
Weak / low priority: no

## Cloud and Distributed Computing

### PYQ-132
Unit: 5 Storage and Distributed Systems
Topic: Cloud and Distributed Computing
Type: written
Asked in: AOS End-sem 2025, Q6 (5 marks)
Times asked: 1
Reworded versions: none
In syllabus: yes
Question: Briefly explain the following operations of the virtual machine approach: (i) multiplexing (ii) suspension (iii) provision and (iv) live migration. On a cloud platform, discuss how these operations will significantly enhance the utilization of server resources.
Answer: **Operations:** (a) **multiplexing**: several VMs share one physical machine through the VMM; (b) **suspension**: a VM's state is saved to stable storage; (c) **provisioning / resume**: a suspended VM is resumed on a new hardware platform; (d) **live migration**: a running VM is moved from one host to another.

**Utilization:** a typical dedicated server runs one service and is idle most of the time. Multiplexing consolidates many such services onto one machine, each in its own isolated VM (with its own OS if needed), so the hardware's idle time is filled. This eliminates server sprawl; VMware claimed 5–15% rising to 60–80%.

**Also enabled:** provisioning a VM onto any available hardware (the basis of IaaS clouds), flexibility in porting distributed applications, maintenance without downtime (migrate the VMs off a host first), and load balancing by migrating VMs away from busy hosts.
Marking points:
- Operations: (a) multiplexing: several VMs share one physical machine through the VMM; (b) suspension: a VM's state is saved to stable storage; (c) provisioning / resume: a suspended VM is resumed on a new hardware platform …
- Utilization: a typical dedicated server runs one service and is idle most of the time.
- Also enabled: provisioning a VM onto any available hardware (the basis of IaaS clouds), flexibility in porting distributed applications, maintenance without downtime (migrate the VMs off a host first), and load balancing by migrating VMs away from …
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-128
Unit: 5 Storage and Distributed Systems
Topic: Cloud and Distributed Computing
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Distinguish high-performance computing (HPC) from high-throughput computing (HTC). Why does the chapter say that HPC performance "is no longer optimal" for measuring the systems that serve Internet users? Give one example system of each.
Answer: **HPC** emphasizes the raw speed of a single, large computation. It is measured in floating-point operations per second (Gflops in the early 1990s to Pflops by 2010; the Top 500 list ranks machines by Linpack). It is driven by scientific, engineering and manufacturing applications. Example: a supercomputer or an HPC cluster such as IIIT's Ada cluster running a weather simulation.

**HTC** pays attention to high-flux computing: the number of tasks completed per unit time. Its main application is Internet search and web services used by millions of users simultaneously. Beyond batch speed it must address cost, energy savings, security and reliability in data centers. Example: a cloud data center serving search queries, or a MapReduce/HDFS cluster.

**Why HPC speed is no longer the measure:** supercomputer users are less than 10% of all computer users; the majority conduct searches and market-driven tasks on servers. Serving billions of concurrent users requires many independent requests to be completed per second, which is throughput, not the speed of one computation. So clouds demand HTC systems.
Marking points:
- HPC emphasizes the raw speed of a single, large computation.
- HTC pays attention to high-flux computing: the number of tasks completed per unit time.
- Why HPC speed is no longer the measure: supercomputer users are less than 10% of all computer users; the majority conduct searches and market-driven tasks on servers.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-129
Unit: 5 Storage and Distributed Systems
Topic: Cloud and Distributed Computing
Type: true/false
Based on: imitates the professor's TRUE/FALSE correct-and-justify items (OSN End 2022 Q1, AOS End 2025 Q1)
In syllabus: yes
Question: TRUE or FALSE, correct if false and justify: (a) "In parallel computing, processors always share a single centralized memory." (b) "A cloud is necessarily a distributed system." (c) "Information in a distributed system is exchanged only by message passing."
Answer: **(a) FALSE.** In parallel computing, processors are either tightly coupled with centralized shared memory *or* loosely coupled with distributed memory; communication is through shared memory or message passing.

**(b) FALSE.** An Internet cloud of resources can be either a centralized or a distributed computing system. It applies parallel or distributed computing, or both, and can be built with physical or virtualized resources over centralized or distributed data centers.

**(c) TRUE.** A distributed system consists of multiple autonomous computers, each with its own private memory, communicating through a computer network; there is no shared memory, so information exchange is by message passing.
Marking points:
- States FALSE.
- (a) FALSE: In parallel computing, processors are either tightly coupled with centralized shared memory or loosely coupled with distributed memory; communication is through shared memory or message passing.
- (b) FALSE: An Internet cloud of resources can be either a centralized or a distributed computing system.
- (c) TRUE: A distributed system consists of multiple autonomous computers, each with its own private memory, communicating through a computer network; there is no shared memory, so information exchange is by message passing.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-130
Unit: 5 Storage and Distributed Systems
Topic: Cloud and Distributed Computing
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: List the degrees of parallelism the chapter identifies, from finest to coarsest. Why has task-level parallelism been less successful than ILP and DLP, and which granularity does distributed computing exploit?
Answer: **Finest to coarsest:** bit-level (BLP: word size grew from 4 to 64 bits), instruction-level (ILP: pipelining, superscalar, VLIW, multithreading), data-level (DLP: SIMD and vector instructions), task-level (TLP: multicore chip multiprocessors) and job-level (JLP).

**Why TLP lags:** BLP, ILP and DLP are extracted largely by hardware and compilers (branch prediction, dynamic scheduling, speculation, vectorizing compilers), so programs gain without being rewritten. TLP needs the programmer to split work into threads and synchronize them, and compilers cannot do this well, so the difficulty of programming and compiling for multicore chips limits it.

**Distributed computing** moves the grain up to job-level parallelism: whole jobs or tasks run on different machines, as in MapReduce tasks or HTC request serving.

This links to Block 2 (threads): user threads still need the many-to-one, one-to-one or many-to-many mapping and synchronization of Block 4 before they turn into real TLP.
Marking points:
- Finest to coarsest: bit-level (BLP: word size grew from 4 to 64 bits), instruction-level (ILP: pipelining, superscalar, VLIW, multithreading), data-level (DLP: SIMD and vector instructions), task-level (TLP: multicore chip multiprocessors) and job-level (JLP).
- Why TLP lags: BLP, ILP and DLP are extracted largely by hardware and compilers (branch prediction, dynamic scheduling, speculation, vectorizing compilers), so programs gain without being rewritten.
- Distributed computing moves the grain up to job-level parallelism: whole jobs or tasks run on different machines, as in MapReduce tasks or HTC request serving.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-131
Unit: 5 Storage and Distributed Systems
Topic: Cloud and Distributed Computing
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: In an HPC cluster, users log in only to the master (login) node, access to compute nodes is controlled by a scheduler, and compute nodes run a bare-minimum OS. Justify each of these design choices.
Answer: **Login only to the master node:** it separates management from computation. The master handles logins, compilation, job submission and housekeeping, so interactive work never steals cycles or memory from running jobs.

**Scheduler-controlled access** (Slurm, PBS, Torque, Moab): the scheduler allocates nodes, cores, memory and GPUs to jobs according to policy, queues jobs in batch, and balances load. Without it, users would contend for the same nodes, oversubscribe them, and a parallel job (which needs all its nodes at once) could not be guaranteed its resources.

**Bare-minimum OS** (unneeded daemons off, unneeded packages not installed): every background process takes CPU time, memory and causes jitter; in a tightly coupled parallel job, one slow node delays all others at each synchronization point. A minimal OS also reduces the attack surface and the maintenance across hundreds of identical nodes.

The same idea appears in Block 13: MapReduce's master does all scheduling and the workers only compute; and in Block 1, the separation of mechanism (nodes) from policy (scheduler).
Marking points:
- Login only to the master node: it separates management from computation.
- Scheduler-controlled access (Slurm, PBS, Torque, Moab): the scheduler allocates nodes, cores, memory and GPUs to jobs according to policy, queues jobs in batch, and balances load.
- Bare-minimum OS (unneeded daemons off, unneeded packages not installed): every background process takes CPU time, memory and causes jitter; in a tightly coupled parallel job, one slow node delays all others at each synchronization point.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-132
Unit: 5 Storage and Distributed Systems
Topic: Cloud and Distributed Computing
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Why are HPC systems rated in FLOPS rather than MIPS? Compare a CPU and a GPU, and explain why a warp's 32 threads execute the same instruction.
Answer: **FLOPS vs MIPS:** FLOPS counts floating-point operations per second; MIPS counts general instructions per second. HPC work (simulation, linear algebra, molecular dynamics) is dominated by floating-point arithmetic, often in double precision, so the FPU's throughput is what limits it; an instruction count would weigh a cheap integer add the same as a floating-point multiply.

**CPU vs GPU:** a CPU has few cores optimized for single-thread performance (large caches, branch prediction, out-of-order execution) and handles general, control-heavy tasks. A GPU has thousands of simple cores organized into streaming multiprocessors, many more ALUs, and is optimized for throughput on data-parallel work. The CPU offloads the floating-point kernel to the GPU.

**Warps:** the GPU follows SIMD: one instruction is fetched and decoded once and applied to 32 threads' different data. That saves control hardware per ALU, which is why so many ALUs fit on the chip, and keeps every core in the SM busy on regular computations such as matrix operations.
Marking points:
- FLOPS vs MIPS: FLOPS counts floating-point operations per second; MIPS counts general instructions per second.
- CPU vs GPU: a CPU has few cores optimized for single-thread performance (large caches, branch prediction, out-of-order execution) and handles general, control-heavy tasks.
- Warps: the GPU follows SIMD: one instruction is fetched and decoded once and applied to 32 threads' different data.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-133
Unit: 5 Storage and Distributed Systems
Topic: Cloud and Distributed Computing
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025)
In syllabus: yes
Question: A processor has four cores A, B, C, D. A and D have the same speed; B is twice as fast as A, C three times as fast. Squaring one array element takes 1 time unit on A or D. A program squares 256 elements, divided as A: 32, B: 128, C: 64, D: 32. (a) What is the total execution time? (b) What is the processor utilization? (c) How should the work be divided instead? (Chapter 1, problem 1.5.)
Answer: **(a)** Time per element: A and D 1 unit, B 1/2 unit, C 1/3 unit.

| Core | Elements | Busy time |
| --- | --- | --- |
| A | 32 | 32 |
| B | 128 | 128 × 1/2 = **64** |
| C | 64 | 64 × 1/3 = 21.33 |
| D | 32 | 32 |

The job ends when the slowest core finishes: **64 time units** (core B).

**(b)** Utilization = total busy time / (number of cores × execution time) = (32 + 64 + 21.33 + 32) / (4 × 64) = 149.33 / 256 = **58.3%**.

**(c)** Divide in proportion to speed (1 : 2 : 3 : 1, total 7): about 256/7 ≈ 36.6 units of work per speed unit, i.e. A 37, B 73, C 110, D 36 elements. Then the times are 37, 36.5, 36.7 and 36 units: the job finishes in about **37 units**, utilization about 99%.

The lesson is load balancing: a parallel job is as slow as its most loaded processor. MapReduce (Block 13) solves the same problem dynamically by using many more tasks than machines, so faster machines simply take more tasks.
Marking points:
- Final answer: Then the times are 37, 36.5, 36.7 and 36 units: the job finishes in about 37 units, utilization about 99%.
- (a) Time per element: A and D 1 unit, B 1/2 unit, C 1/3 unit.
- (b) Utilization = total busy time / (number of cores × execution time) = (32 + 64 + 21.33 + 32) / (4 × 64) = 149.33 / 256 = 58.3%.
- (c) Divide in proportion to speed (1 : 2 : 3 : 1, total 7): about 256/7 ≈ 36.6 units of work per speed unit, i.e.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-134
Unit: 5 Storage and Distributed Systems
Topic: Cloud and Distributed Computing
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: What is a single-system image? Why do most clusters have multiple system images, and what is done instead of a full SSI?
Answer: **SSI:** an illusion, created by software or hardware, that presents a collection of resources as one integrated, powerful resource, so the cluster appears to the user as a single machine (sharing of CPUs, memory and I/O across all nodes).

**Why most clusters lack it:** clusters are built from loosely coupled, autonomous nodes, each with its own OS managing its own resources, so each node is a separate system image. A cluster-wide OS that shares all resources coherently does not exist yet, and many SSI features (such as coherent shared memory across nodes) are expensive or difficult to achieve.

**Instead:** middleware or OS extensions at user level provide SSI at selected functional levels: a single job-management system, a single file-system name space, distributed shared memory, a single entry point. Without such middleware, the nodes cannot cooperate effectively.

Connection: HDFS (Block 13) gives an SSI for storage only: one namespace across thousands of DataNodes, while computation is not merged.
Marking points:
- SSI: an illusion, created by software or hardware, that presents a collection of resources as one integrated, powerful resource, so the cluster appears to the user as a single machine (sharing of CPUs, memory and I/O …
- Why most clusters lack it: clusters are built from loosely coupled, autonomous nodes, each with its own OS managing its own resources, so each node is a separate system image.
- Instead: middleware or OS extensions at user level provide SSI at selected functional levels: a single job-management system, a single file-system name space, distributed shared memory, a single entry point.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-135
Unit: 5 Storage and Distributed Systems
Topic: Cloud and Distributed Computing
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Compare computer clusters, P2P networks, computational grids and clouds in terms of network connectivity, control and resource management, typical applications, and give one example of each.
Answer:
|  | Connectivity | Control, resources | Applications | Example |
| --- | --- | --- | --- | --- |
| **Cluster** | Compute nodes on SAN, LAN or WAN, hierarchically; close range | Homogeneous nodes, distributed control, UNIX/Linux; one owner | HPC, search engines, web services | Google search engine cluster, Cray XT4 |
| **P2P** | Client machines logically connected by an overlay over the Internet; no dedicated network | Autonomous peers, join and leave freely, self-organizing, no central control | File sharing, content delivery, social networking | BitTorrent, Skype |
| **Grid** | Heterogeneous clusters across selected sites linked by high-speed WAN links | Centralized control, server-oriented, authenticated security; resources owned by several organizations | Distributed supercomputing, global problem solving | TeraGrid, EGEE |
| **Cloud** | Virtualized clusters of servers in data centers, reached over the Internet via SLAs | Dynamic provisioning of servers, storage, networks; pay per use | Web search, utility and outsourced computing | AWS, Google App Engine, Azure |

Clusters are the foundation (417 of the 2009 Top 500 were clusters); grids are clusters of clusters across organizations; P2P removes the server entirely; clouds add virtualization and a business model.

Availability ordering from the chapter (section 10): grids, clusters and clouds have decreasing availability as size grows, and P2P has the lowest, because many peers can leave or fail at once.
Marking points:
- Cluster: Compute nodes on SAN, LAN or WAN, hierarchically; close range
- P2P: Client machines logically connected by an overlay over the Internet; no dedicated network
- Grid: Heterogeneous clusters across selected sites linked by high-speed WAN links
- Cloud: Virtualized clusters of servers in data centers, reached over the Internet via SLAs
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-136
Unit: 5 Storage and Distributed Systems
Topic: Cloud and Distributed Computing
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: What is an overlay network in a P2P system? Compare unstructured and structured overlays, and explain the cost of searching in an unstructured one.
Answer: **Overlay:** a virtual network at the logical level, formed by mapping each participating machine to a peer ID. Peers joining add their ID as an overlay node; peers leaving are removed automatically. Its links are virtual: one overlay link may cross many physical hops of the IP network.

**Unstructured:** a random graph with no fixed routes. A query is often **flooded** to all nodes, which causes heavy network traffic and nondeterministic results (a file may exist yet not be found within the flood's reach). **Structured:** follows a fixed topology with rules for inserting and removing peer IDs, so routing algorithms can use the structure to find an item deterministically and efficiently.

Flooding is the same technique as flooding in routing (Block 7): it needs no knowledge of the topology but generates a huge number of duplicate packets, which is why it must be bounded (a hop count) in practice.
Marking points:
- Overlay: a virtual network at the logical level, formed by mapping each participating machine to a peer ID.
- Unstructured: a random graph with no fixed routes.
- Peers joining add their ID as an overlay node; peers leaving are removed automatically.
- Its links are virtual: one overlay link may cross many physical hops of the IP network.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-137
Unit: 5 Storage and Distributed Systems
Topic: Cloud and Distributed Computing
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Characterize the IaaS, PaaS and SaaS cloud service models. For each, state what the user controls and what the provider controls, and give one example.
Answer: **IaaS (Infrastructure as a Service):** puts together the infrastructure users demand: servers, storage, networks and the data-center fabric. The user deploys and runs multiple VMs with guest OSes and their applications, and decides when to request and release resources, but does not manage or control the underlying infrastructure. Example: Amazon EC2 (compute) and S3 (storage).

**PaaS (Platform as a Service):** lets the user deploy user-built applications onto a virtualized cloud platform. It includes middleware, databases, development tools and runtime support (Web 2.0, Java); the provider supplies the API and tools (Java, Python, .NET). The user is freed from managing the infrastructure. Example: Google App Engine, Microsoft Azure.

**SaaS (Software as a Service):** browser-initiated application software for thousands of paying customers: CRM, ERP, HR and collaborative applications. Customers make no upfront investment in servers or licences; the provider's cost is low compared with conventional hosting. Example: Salesforce CRM, Google Gmail or Docs.

From IaaS to SaaS, the provider manages more layers and takes on more responsibility (including security); the user gives up control in exchange for simplicity.
Marking points:
- IaaS (Infrastructure as a Service): puts together the infrastructure users demand: servers, storage, networks and the data-center fabric.
- PaaS (Platform as a Service): lets the user deploy user-built applications onto a virtualized cloud platform.
- SaaS (Software as a Service): browser-initiated application software for thousands of paying customers: CRM, ERP, HR and collaborative applications.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-138
Unit: 5 Storage and Distributed Systems
Topic: Cloud and Distributed Computing
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Describe the three approaches to building an operating environment for distributed systems, with an example of each and the degree of transparency each gives. Why are truly distributed OSes rare?
Answer: **1. Network OS** over a network of heterogeneous computers: each machine keeps its own OS, and the network OS adds remote access, essentially a distributed file system. Low transparency: users still see individual machines.

**2. Middleware** for resource sharing: a software layer above the nodes' OSes that provides common services (RPC, naming, security). Example: **DCE**. Moderate transparency.

**3. Truly distributed OS:** one OS that manages all nodes' resources coherently and presents the network as a single machine. Examples: **Amoeba**; **MOSIX2** (a partial SSI on Linux, with process migration). Highest transparency.

**Why rare:** nodes are autonomous and heterogeneous, so a single OS must replace or wrap many different OSes; complete coherent sharing (especially of memory) is expensive over a network; and such a system tends to be closed, while users want to keep their existing OS and applications. Hence middleware is the common practical choice.
Marking points:
- Network OS over a network of heterogeneous computers: each machine keeps its own OS, and the network OS adds remote access, essentially a distributed file system.
- Middleware for resource sharing: a software layer above the nodes' OSes that provides common services (RPC, naming, security).
- 3. Truly distributed OS: one OS that manages all nodes' resources coherently and presents the network as a single machine.
- Why rare: nodes are autonomous and heterogeneous, so a single OS must replace or wrap many different OSes; complete coherent sharing (especially of memory) is expensive over a network; and such a system tends to be closed …
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-139
Unit: 5 Storage and Distributed Systems
Topic: Cloud and Distributed Computing
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025)
In syllabus: yes
Question: A program spends 25% of its time in code that cannot be parallelized. (a) Using Amdahl's law, find the speedup and efficiency on 4, 16 and 256 processors. (b) What is the maximum possible speedup? (c) If instead the problem size is scaled with the number of processors, find the speedup and efficiency on 256 processors. (d) Explain why the two answers differ so much.
Answer: **(a)** α = 0.25. S = 1 / [α + (1 − α)/n], E = S/n.

| n | α + (1 − α)/n | Speedup S | Efficiency E |
| --- | --- | --- | --- |
| 4 | 0.25 + 0.1875 = 0.4375 | **2.29** | 57.1% |
| 16 | 0.25 + 0.046875 = 0.296875 | **3.37** | 21.1% |
| 256 | 0.25 + 0.00293 = 0.25293 | **3.95** | **1.5%** |

**(b)** As n → ∞, S → 1/α = **4**, whatever the number of processors.

**(c)** Gustafson: S′ = α + (1 − α)n = 0.25 + 0.75 × 256 = **192.25**; E′ = S′/n = 0.25/256 + 0.75 = **0.751 (75.1%)**.

**(d)** Amdahl fixes the **workload**: as n grows, the parallel part's time shrinks toward zero but the sequential part stays, so it dominates and most processors idle. Gustafson fixes the **execution time**: the parallel part of the work grows with n, so the sequential part becomes a smaller and smaller fraction of the total, and every processor stays busy. Use Amdahl for a fixed problem (e.g. one query, as fast as possible); use Gustafson when a bigger machine is used to solve a bigger problem (e.g. a finer weather grid in the same time).
Marking points:
- Final answer: (d) Amdahl fixes the workload: as n grows, the parallel part's time shrinks toward zero but the sequential part stays, so it dominates and most processors idle.
- (a) α = 0.25.
- (b) As n → ∞, S → 1/α = 4, whatever the number of processors.
- (c) Gustafson: S′ = α + (1 − α)n = 0.25 + 0.75 × 256 = 192.25; E′ = S′/n = 0.25/256 + 0.75 = 0.751 (75.1%).
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-140
Unit: 5 Storage and Distributed Systems
Topic: Cloud and Distributed Computing
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Blocks 4 and 13
In syllabus: yes
Question: Identify the "sequential fraction α" in (i) a multithreaded program whose threads update a shared counter under a mutex (Block 4) and (ii) a MapReduce job (Block 13). For each, say what the system does to reduce α.
Answer: **(i) Mutex-protected counter:** the critical section can be executed by only one thread at a time, so it is serialized: its share of the run time is α. Adding threads cannot shorten it, and contention can make it worse (spinning, context switches). Remedies: keep critical sections short, use per-thread counters combined at the end (a combiner, in effect), use atomic instructions or finer-grained locks. The same reasoning motivates Corey and the multikernel (Block 1): shared kernel data structures are a sequential bottleneck on many cores.

**(ii) MapReduce:** the sequential parts are the master's work (splitting the input, O(M + R) scheduling decisions), the barrier between map and reduce (no reduce can start until all maps finish) and the **stragglers**: the job time is set by the last task. Remedies: **backup tasks** (the 1 TB sort took 891 s instead of 1,283 s), many small tasks for load balancing, **combiners** to shrink the shuffle, and pipelining the shuffle with map execution.

Amdahl's message is general: whatever part of a job cannot be spread over the machines limits the speedup to 1/α, so engineers attack the serialized part, not the parallel part.
Marking points:
- (i) Mutex-protected counter: the critical section can be executed by only one thread at a time, so it is serialized: its share of the run time is α.
- (ii) MapReduce: the sequential parts are the master's work (splitting the input, O(M + R) scheduling decisions), the barrier between map and reduce (no reduce can start until all maps finish) and the stragglers: the job time …
- Adding threads cannot shorten it, and contention can make it worse (spinning, context switches).
- Remedies: keep critical sections short, use per-thread counters combined at the end (a combiner, in effect), use atomic instructions or finer-grained locks.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-141
Unit: 5 Storage and Distributed Systems
Topic: Cloud and Distributed Computing
Type: true/false
Based on: imitates the professor's TRUE/FALSE correct-and-justify items (OSN End 2022 Q1, AOS End 2025 Q1)
In syllabus: yes
Question: TRUE or FALSE, correct if false and justify: "Ideal scale-up means that doubling both the hardware and the data size halves the response time."
Answer: **FALSE.** Corrected: ideal scale-up means that if resources are increased in proportion to the data size, the time stays **constant**. Halving the time when only the hardware is doubled (for the same data) is ideal **speed-up**.

**Justification:** doubling the data doubles the work; doubling the hardware doubles the capacity; the two cancel, so time is unchanged. Speed-up corresponds to Amdahl's fixed-workload view; scale-up to Gustafson's scaled-workload view.
Marking points:
- States FALSE.
- Corrected: ideal scale-up means that if resources are increased in proportion to the data size, the time stays constant.
- doubling the data doubles the work; doubling the hardware doubles the capacity; the two cancel, so time is unchanged.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-142
Unit: 5 Storage and Distributed Systems
Topic: Cloud and Distributed Computing
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025)
In syllabus: yes
Question: (a) A server has MTTF = 1,000 hours and MTTR = 10 hours. Find its availability. What is the availability if MTTR is cut to 1 hour? (b) A service needs all of 100 such servers (at 99.9% each) to be up. What is the service's availability? (c) Use (b) to explain why availability decreases with system size, and how clusters and HDFS avoid it.
Answer: **(a)** A = MTTF / (MTTF + MTTR) = 1000 / 1010 = **99.01%**. With MTTR = 1 h: 1000 / 1001 = **99.90%**. Cutting repair time is as effective as making failures rarer.

**(b)** If every server is a single point of failure, all must be up: A = 0.999^100 ≈ **0.905 (90.5%)**.

**(c)** More components means a higher chance that some component is down at any moment, and failures are harder to isolate; if each is a single point of failure, availability multiplies down as in (b). Clusters avoid this with redundancy and failover (no single point of failure), so the service needs only one of several copies to be up. HDFS does the same: three replicas per block, heartbeats and automatic re-replication keep MTTR short, so the loss of a node or even a rack does not make data unavailable.

MTTF here and MTBF in the Quiz 2 key (Block 13, q2) play the same role in the formula; for a repairable system MTBF = MTTF + MTTR, and the chapter uses MTTF.
Marking points:
- Final answer: (c) More components means a higher chance that some component is down at any moment, and failures are harder to isolate; if each is a single point of failure, availability multiplies down as in (b).
- (a) A = MTTF / (MTTF + MTTR) = 1000 / 1010 = 99.01%.
- (b) If every server is a single point of failure, all must be up: A = 0.999^100 ≈ 0.905 (90.5%).
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-143
Unit: 5 Storage and Distributed Systems
Topic: Cloud and Distributed Computing
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025)
In syllabus: yes
Question: Using E = Ceff f v^2 t, explain what DVFS does. A task that needs a fixed number of cycles runs at 1.0 V; during its slack time, the voltage can be lowered to 0.7 V (which, with vt = 0.3 V, cuts the frequency to about 47%). By how much does the task's energy fall, and what is the cost?
Answer: **What DVFS does:** it dynamically lowers a CPU's voltage and frequency when the task has slack (it would otherwise finish early and idle), so the task runs slower but still meets its deadline, using less energy.

**Energy:** the number of cycles N = f × t is fixed by the task, so E = Ceff · (f t) · v^2 = Ceff · N · v^2. Energy depends on v^2, not on f. Ratio = (0.7 / 1.0)^2 = **0.49**: the task uses about **half the energy (51% saved)**.

**Check of the frequency:** f ∝ (v − vt)^2/v: at 1.0 V, 0.7^2 / 1.0 = 0.49; at 0.7 V, 0.4^2 / 0.7 = 0.229; ratio 0.229 / 0.49 ≈ 0.47.

**Cost:** the execution time grows by 1/0.47 ≈ 2.1 times. That is acceptable only when it fits in the slack; otherwise performance suffers. Lowering frequency alone (same voltage) would save no energy for the task, since f t is constant; it is the voltage reduction that frequency scaling makes possible that saves energy.
Marking points:
- Final answer: Ratio = (0.7 / 1.0)^2 = 0.49: the task uses about half the energy (51% saved).
- What DVFS does: it dynamically lowers a CPU's voltage and frequency when the task has slack (it would otherwise finish early and idle), so the task runs slower but still meets its deadline, using less energy.
- Energy: the number of cycles N = f × t is fixed by the task, so E = Ceff · (f t) · v^2 = Ceff · N · v^2.
- Check of the frequency: f ∝ (v − vt)^2/v: at 1.0 V, 0.7^2 / 1.0 = 0.49; at 0.7 V, 0.4^2 / 0.7 = 0.229; ratio 0.229 / 0.49 ≈ 0.47.
- Cost: the execution time grows by 1/0.47 ≈ 2.1 times.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-144
Unit: 5 Storage and Distributed Systems
Topic: Cloud and Distributed Computing
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Block 13
In syllabus: yes
Question: Using this chapter's vocabulary, classify a Hadoop (HDFS + MapReduce) installation: is it HPC or HTC, which system model is it, what kind of single-system image does it provide, and which of the chapter's performance and availability ideas does its design reflect?
Answer: **HTC, not HPC:** it maximizes the amount of data processed and jobs completed per unit time, with batch throughput, cost (commodity hardware) and reliability as goals, rather than the floating-point speed of one tightly coupled computation.

**System model:** a **cluster** (homogeneous Linux nodes on a hierarchical LAN of racks and core switches, under one owner, with a master–worker structure: NameNode and MapReduce master). Run on a provider's VMs it becomes part of a **cloud** (IaaS, or PaaS when offered as a managed service).

**SSI:** partial: one file-system namespace over all DataNodes (storage SSI) and one job-submission point; the nodes keep separate OSes and memories (multiple system images underneath).

**Performance:** data parallelism at job/task level (JLP); Gustafson's view (bigger clusters for bigger data); Amdahl's sequential parts attacked by backup tasks and combiners; locality to save scarce network bandwidth. **Availability:** no single point of failure for data (three replicas across racks, re-replication), short MTTR via heartbeats; the NameNode remains a single point of failure, addressed by checkpoints, a BackupNode, and later HA NameNodes.
Marking points:
- HTC, not HPC: it maximizes the amount of data processed and jobs completed per unit time, with batch throughput, cost (commodity hardware) and reliability as goals, rather than the floating-point speed of one tightly coupled computation.
- System model: a cluster (homogeneous Linux nodes on a hierarchical LAN of racks and core switches, under one owner, with a master–worker structure: NameNode and MapReduce master).
- SSI: partial: one file-system namespace over all DataNodes (storage SSI) and one job-submission point; the nodes keep separate OSes and memories (multiple system images underneath).
- Performance: data parallelism at job/task level (JLP); Gustafson's view (bigger clusters for bigger data); Amdahl's sequential parts attacked by backup tasks and combiners; locality to save scarce network bandwidth.
Answer source: written by Claude, no key
Weak / low priority: no

## Virtual Machines

### PYQ-133
Unit: 5 Storage and Distributed Systems
Topic: Virtual Machines
Type: written
Asked in: OSN Quiz 1 2022, Q9 (2 marks); AOS Quiz 1 2025, Q9 (2 marks); AOS Mid-sem 2025, Q2(i) (3 marks)
Times asked: 3
Reworded versions: "Explain the privilege levels in Xen. Give one or two example operations in each privilege level." (AOS Mid-sem 2025)
In syllabus: yes
Question: Normally, OS has two privilege levels: user mode and system mode. The virtual machine OS like Xen has four privilege levels. Discuss the reasons.
Answer: **Key:** normally two modes are implemented to protect the OS from unintended or intended misuse by user programs. In a virtual machine we need four modes because we have to implement **two layers of protection**: first, protect the **guest OS from the user programs** of that guest OS; second, protect the **virtual machine OS (the hypervisor) from the multiple guest operating systems** and their application programs.

**Key's detailed version:** the VMM is itself an OS on the hardware, and each guest OS is like an application of it, so an application passes through four modes: (i) **guest user mode**: the application runs in the guest's user mode; (ii) **guest OS mode**: the application executes a system call of the guest OS; (iii) **VM user mode**: the guest OS runs as a user of the VMM; (iv) **VM system mode**: the guest OS makes a call into the VMM (a hypercall) to run the application.

**From the paper (to add one line of precision):** x86 provides four privilege levels in hardware, rings 0 to 3. Xen runs in ring 0, the guest OS is modified to run in **ring 1**, and applications run in ring 3. Ring 1 stops the guest OS from executing privileged instructions, while keeping it isolated from its applications in ring 3. On a CPU with only two levels, the guest OS would have to share user mode with its applications and protect itself with separate address spaces.

| Ring | Who | Example operations (for the mid-sem version) |
| --- | --- | --- |
| 0 | Xen | Validating and applying a guest's batched page-table updates; reading CR2 and forwarding a page fault; scheduling domains on the CPU; installing validated exception handlers |
| 1 | Guest OS | Scheduling its own processes; handling its applications' system calls through the fast handler; building page tables and requesting updates by hypercall; running Xen-aware device drivers over I/O rings |
| 2 | Unused | (no well-known OS has used it since OS/2) |
| 3 | Applications | Ordinary user code; issuing system calls (open, read) to the guest OS |
Marking points:
- normally two modes are implemented to protect the OS from unintended or intended misuse by user programs.
- the VMM is itself an OS on the hardware, and each guest OS is like an application of it, so an application passes through four modes: (i) guest user mode: the application runs in the guest's user mode; (ii) guest OS mode: the application executes a system call …
- From the paper (to add one line of precision): x86 provides four privilege levels in hardware, rings 0 to 3.
Answer source: professor's key
Weak / low priority: no

### PRED-145
Unit: 5 Storage and Distributed Systems
Topic: Virtual Machines
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: State the three properties the formal definition of virtualization requires of a VMM. For trap-and-emulate, explain which feature of the hardware each property depends on.
Answer: **Fidelity:** programs see an environment essentially identical to the original machine. Depends on every instruction that behaves differently in user and kernel mode **trapping** when executed by the guest kernel (in real user mode), so the VMM can emulate its kernel-mode behaviour. x86's popf violates this, since it silently does something different instead of trapping.

**Performance:** only minor slowdowns. Depends on most instructions (all non-privileged ones) running **directly on the CPU**; only privileged ones trap. That is why guest user code runs at native speed.

**Safety (resource control):** the VMM is in complete control of system resources. Depends on **dual-mode operation and memory protection**: the guest runs only in user mode, so it cannot execute privileged instructions or touch memory the VMM has not mapped for it.
Marking points:
- Fidelity: programs see an environment essentially identical to the original machine.
- Performance: only minor slowdowns.
- Safety (resource control): the VMM is in complete control of system resources.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-146
Unit: 5 Storage and Distributed Systems
Topic: Virtual Machines
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Explain trap-and-emulate on a dual-mode CPU. Why does a guest's user code run at native speed while its kernel code runs slower? What makes the problem worse?
Answer: **Setup:** the guest's user code runs in user mode; the guest kernel cannot be allowed real kernel mode, so the VMM creates two virtual modes, virtual user and virtual kernel, **both running in real user mode**. The VMM keeps a VCPU recording which virtual mode the guest is in.

**Mechanism:** when the guest kernel (in virtual kernel mode) attempts a privileged instruction, the CPU, being in real user mode, raises an error: a **trap**. The VMM gains control, analyzes the trap, **executes the operation as the guest attempted it** (on the guest's virtual state: its VCPU, its virtual devices), and returns control to the guest in user mode. A system call in the guest similarly traps to the VMM, which switches the guest to virtual kernel mode and transfers control to the guest kernel's handler.

**Speed:** user code contains no privileged instructions, so it executes directly on the CPU with no VMM involvement. Kernel code executes privileged instructions frequently, and each costs a trap, a VMM analysis and a return, which is far slower than executing the instruction.

**Worse:** with multiple guests each needing trap-and-emulate, the VMM spends more of the CPU emulating. Hence CPUs added hardware support (more modes) to improve virtualization performance.
Marking points:
- Setup: the guest's user code runs in user mode; the guest kernel cannot be allowed real kernel mode, so the VMM creates two virtual modes, virtual user and virtual kernel, both running in real user mode.
- Mechanism: when the guest kernel (in virtual kernel mode) attempts a privileged instruction, the CPU, being in real user mode, raises an error: a trap.
- Speed: user code contains no privileged instructions, so it executes directly on the CPU with no VMM involvement.
- Worse: with multiple guests each needing trap-and-emulate, the VMM spends more of the CPU emulating.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-147
Unit: 5 Storage and Distributed Systems
Topic: Virtual Machines
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025)
In syllabus: yes
Question: (a) Why could early x86 CPUs not be virtualized by trap-and-emulate alone? Use popf. (b) How does binary translation fix it, and why does VMware cache translations? (c) Booting Windows XP as a guest caused 950,000 translations at 3 µs each, a 5% slowdown. How long would the boot take natively?
Answer: **(a)** Trap-and-emulate needs every sensitive instruction to trap in user mode. popf loads the flags register from the stack: in kernel mode it replaces all flags (including the interrupt-enable flag), in user mode only some, and **no trap is generated**. So a guest kernel running in real user mode that executes popf to re-enable interrupts silently fails, and the VMM never learns of it: fidelity is broken. Such "special instructions" made x86 trap-and-emulate considered impossible until 1998.

**(b)** When the guest VCPU is in virtual kernel mode, the VMM reads a few instructions ahead of the program counter; non-special instructions run natively, special instructions are translated into new instructions with the equivalent effect on the VCPU (for example, setting the flags in the VCPU). User-mode guest code runs natively. Translating on every execution would be very slow, so translations are cached: translate once, then reuse the cached version whenever that code runs again.

**(c)** Overhead = 950,000 × 3 µs = 2.85 s ≈ **3 s**. If that is 5% of native time, native boot ≈ 3 / 0.05 = **60 seconds** (and the virtualized boot ≈ 63 s).

Since VT-x (2005) and AMD-V (2006), hardware makes the special instructions trap in guest mode, removing the need for binary translation.
Marking points:
- Final answer: If that is 5% of native time, native boot ≈ 3 / 0.05 = 60 seconds (and the virtualized boot ≈ 63 s).
- (a) Trap-and-emulate needs every sensitive instruction to trap in user mode.
- (b) When the guest VCPU is in virtual kernel mode, the VMM reads a few instructions ahead of the program counter; non-special instructions run natively, special instructions are translated into new instructions with the equivalent …
- (c) Overhead = 950,000 × 3 µs = 2.85 s ≈ 3 s.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-148
Unit: 5 Storage and Distributed Systems
Topic: Virtual Machines
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Compare type 0, type 1 and type 2 hypervisors: where the VMM runs, how resources are given to guests, performance, and one example of each. Where would you use each?
Answer:
|  | Type 0 | Type 1 | Type 2 |
| --- | --- | --- | --- |
| VMM runs in | Firmware (a hardware feature) | Kernel mode, directly on hardware; a special-purpose OS (or a general OS with VMM functions) | User space, as an application on a host OS |
| Resources | Dedicated hardware per guest (partitions) | Dedicated or shared, overcommitted | Shared through the host OS |
| Performance | Near native; I/O sharing is hard | High; uses hardware features; has its own drivers | Lower: cannot use some hardware features; host OS in the path |
| Example | IBM LPARs, Oracle LDOMs | VMware ESX, Citrix XenServer; KVM, Hyper-V | VMware Workstation, VirtualBox, Parallels |
| Use | Mainframe/large server partitioning; nesting VMMs | Data centers and clouds: consolidation, migration, snapshots | Desktops, developers, students: no change to the host OS |
Marking points:
- VMM runs in: Firmware (a hardware feature)
- Resources: Dedicated hardware per guest (partitions)
- Performance: Near native; I/O sharing is hard
- Example: IBM LPARs, Oracle LDOMs
- Use: Mainframe/large server partitioning; nesting VMMs
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-149
Unit: 5 Storage and Distributed Systems
Topic: Virtual Machines
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: (a) How does application containment (Solaris zones, BSD jails) differ from a virtual machine? Give one advantage and one limitation. (b) Why is emulation not virtualization, and why is it slow?
Answer: **(a)** In containment there is **only one kernel**, the host OS. It creates a virtual layer between the OS and applications: each zone sees its own applications, network stack, addresses and ports, user accounts, and a share of CPU and memory, with the impression that its processes are the only ones on the system. A VM instead runs a complete guest kernel on virtual hardware. **Advantage:** much lighter: no guest kernel to boot or store, no trap-and-emulate overhead, fast start and stop. **Limitation:** applications must be compiled for the host OS; you cannot run a different OS, and a kernel bug affects every zone.

**(b)** Virtualization requires the guest to be compiled for the same CPU as the host and runs most instructions directly. Emulation runs code for a **different** CPU architecture, so **every** guest instruction must be translated to native instructions: none runs directly, which is why it is about an order of magnitude slower than native code.
Marking points:
- (a) In containment there is only one kernel, the host OS.
- (b) Virtualization requires the guest to be compiled for the same CPU as the host and runs most instructions directly.
- It creates a virtual layer between the OS and applications: each zone sees its own applications, network stack, addresses and ports, user accounts, and a share of CPU and memory, with the impression that its processes are the only ones …
- A VM instead runs a complete guest kernel on virtual hardware.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-150
Unit: 5 Storage and Distributed Systems
Topic: Virtual Machines
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Distinguish full virtualization from paravirtualization. Why did Xen choose paravirtualization for x86, what does it cost, and why is it "less needed" today?
Answer: **Full virtualization:** the VMM exposes virtual hardware functionally identical to the real machine, so an unmodified OS runs (VMware). **Paravirtualization:** the VMM exposes an interface similar but not identical to the hardware, and the guest OS is modified to use it (to call the hypervisor instead of executing privileged instructions); the application ABI is unchanged.

**Why for x86:** (1) some supervisor instructions fail silently instead of trapping, so full virtualization needs binary rewriting of the whole guest kernel, with translation and caching costs; (2) the MMU is hard to virtualize: full virtualization needs shadow page tables, trapping every page-table update, which is slow for process creation; (3) letting guests see real time and real machine addresses helps correctness (TCP timeouts) and performance (superpages, page coloring).

**Cost:** the guest OS must be ported: about 2,995 modified or added lines for Linux (1.36% of its x86 code) and 4,620 for Windows XP (0.04%). Closed-source OSes are hard to port.

**Less needed today:** since VT-x and AMD-V, hardware makes sensitive instructions trap and supports nested page tables, so unmodified guests run efficiently; the slides note that on modern CPUs Xen no longer requires guest modification, so it is no longer paravirtualization.
Marking points:
- Full virtualization: the VMM exposes virtual hardware functionally identical to the real machine, so an unmodified OS runs (VMware).
- Why for x86: (1) some supervisor instructions fail silently instead of trapping, so full virtualization needs binary rewriting of the whole guest kernel, with translation and caching costs; (2) the MMU is hard to virtualize: full virtualization needs …
- Cost: the guest OS must be ported: about 2,995 modified or added lines for Linux (1.36% of its x86 code) and 4,620 for Windows XP (0.04%).
- Less needed today: since VT-x and AMD-V, hardware makes sensitive instructions trap and supports nested page tables, so unmodified guests run efficiently; the slides note that on modern CPUs Xen no longer requires guest modification, so it is …
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-151
Unit: 5 Storage and Distributed Systems
Topic: Virtual Machines
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-133
In syllabus: yes
Question: x86 has a hardware-walked, untagged TLB. Explain Xen's two decisions about memory management, how a guest updates its page tables safely, and why these are cheaper than VMware's shadow page tables.
Answer: **The problem:** TLB misses are serviced by hardware walking the page tables, so valid translations must be in hardware-visible page tables; and since the TLB is untagged, every address-space switch flushes it.

**Decision 1: guests manage the real page tables.** Guest OSes allocate and manage the hardware page tables themselves, registered directly with the MMU, with Xen involved only for safety. A new page table is allocated from the guest's own memory and registered with Xen, after which the guest has **read-only** access; every update is a **hypercall** that Xen **validates** (map only pages you own; never map a page table writably). Updates are **batched** so one hypercall covers many (up to 2,048 in XenoLinux, building 8 MB of address space).

**Decision 2: Xen in the top 64 MB of every address space.** Entering and leaving the hypervisor is then not an address-space switch, so no TLB flush is needed on each hypercall or trap. The region is unused by common x86 ABIs.

**Versus shadow page tables:** full virtualization keeps a virtual page table for the guest (invisible to the MMU) and a shadow copy the MMU uses, trapping every guest update and propagating changes (including accessed and dirty bits) both ways; that is very costly for creating address spaces. Xen has one set of tables, only validates updates, and batches them, so it avoids the second copy and most traps.

Connection to Block 9: the TLB flush on a context switch is exactly why tagged TLBs (ASIDs) matter, and the top-64 MB trick is the same idea as mapping the kernel into every process's address space.
Marking points:
- The problem: TLB misses are serviced by hardware walking the page tables, so valid translations must be in hardware-visible page tables; and since the TLB is untagged, every address-space switch flushes it.
- Decision 1: guests manage the real page tables.
- Decision 2: Xen in the top 64 MB of every address space.
- Versus shadow page tables: full virtualization keeps a virtual page table for the guest (invisible to the MMU) and a shadow copy the MMU uses, trapping every guest update and propagating changes (including accessed and dirty bits) both ways …
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-152
Unit: 5 Storage and Distributed Systems
Topic: Virtual Machines
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers); same section as PYQ-133
In syllabus: yes
Question: In Xen, a guest's system calls can go straight to the guest OS, but page faults must always be delivered through Xen. Explain both, and how Xen keeps the fast handler safe.
Answer: **System calls:** they are the most frequent exception. Xen lets each guest register a "fast" exception handler that the processor invokes directly, without indirecting through ring 0; the application traps from ring 3 straight into the guest OS in ring 1. This keeps the system-call path almost as fast as native.

**Page faults:** the faulting address is stored in register CR2, which only ring-0 code can read. The guest runs in ring 1, so the fault must go to Xen, which saves CR2 into an extended stack frame and then passes control to the guest's registered page-fault handler.

**Safety:** handlers are validated when registered; the only check needed is that the handler's code segment does not specify ring 0 (no guest can create such a segment, so the selector is compared with a few values reserved by Xen). Other problems (handler not present or not paged in) cause a fault when Xen returns to it; if that fault occurs in Xen's exception code (a "double fault"), the guest is terminated.
Marking points:
- System calls: they are the most frequent exception.
- Page faults: the faulting address is stored in register CR2, which only ring-0 code can read.
- Safety: handlers are validated when registered; the only check needed is that the handler's code segment does not specify ring 0 (no guest can create such a segment, so the selector is compared with a few …
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-153
Unit: 5 Storage and Distributed Systems
Topic: Virtual Machines
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Block 4; same section as PYQ-133
In syllabus: yes
Question: Describe Xen's asynchronous I/O ring. Show that it is an instance of the bounded-buffer (producer–consumer) problem of Block 4, and explain why requests carry identifiers and why notifications are decoupled from producing entries.
Answer: **Structure:** a circular queue of descriptors, allocated by the domain but accessible from Xen. Descriptors do not contain data; they point to I/O buffers allocated by the guest. Two pairs of pointers: the guest advances the **request producer** pointer as it queues requests, Xen advances the **request consumer** as it takes them; Xen advances the **response producer** as it places responses, the guest advances the **response consumer** as it reads them.

**Bounded buffer:** it is a fixed-size circular buffer with producers and consumers on each side, like the textbook's buffer with in and out indices. The producer must not overrun slots that the consumer has not freed (full), and the consumer must not read past the producer (empty). Because each pointer is written by exactly one side and read by the other, the two sides can coordinate through shared memory without locks; events replace the semaphores' blocking and waking.

**Identifiers:** each request has a unique ID that is copied into its response, so Xen may process requests out of order, for example to reorder disk requests for efficiency (Block 11), and the guest still matches each response to its request.

**Decoupled notification:** a guest can enqueue many requests before one hypercall to alert Xen, and can ask to be notified only after a threshold of responses. Fewer notifications mean fewer expensive domain crossings: this trades latency for throughput, like interrupt coalescing or the batching of page-table updates.
Marking points:
- Structure: a circular queue of descriptors, allocated by the domain but accessible from Xen.
- Bounded buffer: it is a fixed-size circular buffer with producers and consumers on each side, like the textbook's buffer with in and out indices.
- Identifiers: each request has a unique ID that is copied into its response, so Xen may process requests out of order, for example to reorder disk requests for efficiency (Block 11), and the guest still matches …
- Decoupled notification: a guest can enqueue many requests before one hypercall to alert Xen, and can ask to be notified only after a threshold of responses.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-154
Unit: 5 Storage and Distributed Systems
Topic: Virtual Machines
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: A VMM runs 6 guests, each configured with 2 VCPUs, on a host with 4 physical CPUs. What is this situation called? Explain two effects on a guest that uses a 100 ms time-slice scheduler, and one remedy.
Answer: **Name:** CPU **overcommitment** (oversubscription): 12 VCPUs on 4 CPUs, so on average each VCPU gets at most a third of a physical CPU. The VMM schedules VCPU threads on CPUs with standard algorithms, sometimes with fairness added.

**Effects:** (1) **poor response time**: the guest thinks it gives each process 100 ms, but its VCPU is descheduled for part of that time, so a "100 ms" slice may take 100 ms, 1 s or more of real time; interactive users of the guest see delays. (2) **incorrect time-of-day**: a guest that keeps time by counting timer ticks misses ticks while descheduled, so its clock falls behind.

**Remedy:** some VMMs install an application (guest tools) in each guest to correct the time of day and provide other integration; Xen gives guests both real and virtual time explicitly. The administrator can also reduce overcommitment or dedicate CPUs to latency-sensitive guests.

Connection to Block 3: this is two-level scheduling. The guest's scheduler decides which process runs on a VCPU; the VMM's decides which VCPU runs on a CPU. Neither sees the whole picture, as with user threads on kernel threads in the many-to-one model.
Marking points:
- Name: CPU overcommitment (oversubscription): 12 VCPUs on 4 CPUs, so on average each VCPU gets at most a third of a physical CPU.
- Effects: (1) poor response time: the guest thinks it gives each process 100 ms, but its VCPU is descheduled for part of that time, so a "100 ms" slice may take 100 ms, 1 s …
- Remedy: some VMMs install an application (guest tools) in each guest to correct the time of day and provide other integration; Xen gives guests both real and virtual time explicitly.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-155
Unit: 5 Storage and Distributed Systems
Topic: Virtual Machines
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Block 10
In syllabus: yes
Question: A VMM gives 4 guests 4 GB each on a host with 12 GB. Explain the three methods VMware ESX uses to manage this, and use Block 10 to explain why the balloon driver usually beats double paging.
Answer: **Double paging:** the guest's page table says a page is in a physical frame, but the VMM moves some of those frames to its own backing store. The guest is unaware.

**Balloon:** a pseudo-device driver in each guest talks to the VMM. Told to inflate, it allocates (and pins) memory inside the guest, so the guest has less free memory and its own page replacement frees pages, which the VMM gives to other guests; told to deflate, it releases them.

**Deduplication:** the VMM detects the same page loaded more than once (same OS kernel, same libraries in several guests) and maps one frame into all of them, typically copy-on-write (Block 10), so a write splits the copy.

**Why the balloon is better:** page replacement works well only when the replacer knows which pages are in the working set. The guest knows (reference bits, its LRU approximation); the VMM does not, so double paging may evict pages the guest is actively using, causing faults the guest cannot explain. Worse, the guest may later choose to page out a page the VMM has already paged out: the VMM must read it in just so the guest can write it out, two I/Os for nothing. The balloon lets the guest's own policy choose victims, so the working set is protected and thrashing (Block 10) is less likely.
Marking points:
- Double paging: the guest's page table says a page is in a physical frame, but the VMM moves some of those frames to its own backing store.
- Balloon: a pseudo-device driver in each guest talks to the VMM.
- Deduplication: the VMM detects the same page loaded more than once (same OS kernel, same libraries in several guests) and maps one frame into all of them, typically copy-on-write (Block 10), so a write splits …
- Why the balloon is better: page replacement works well only when the replacer knows which pages are in the working set.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-156
Unit: 5 Storage and Distributed Systems
Topic: Virtual Machines
Type: numerical
Based on: imitates the professor's numericals (OSN Quiz 6 2020, OSN End 2022, AOS End 2025)
In syllabus: yes
Question: (a) List the steps of live migration. (b) A guest with 4 GB of memory is migrated over a link that sends 125 MB/s (1 Gb/s). While running, it dirties 10 MB of memory per second. Assume every dirtied byte must be resent and each round sends what was dirtied during the previous round. How long are the first four rounds, and how long is the guest paused if the VMM freezes it after the round that takes under 50 ms? (c) When does pre-copy fail to converge?
Answer: **(a)** (1) The source VMM connects to the target VMM. (2) The target creates a new guest (new VCPU, etc.). (3) The source sends all read-only memory pages. (4) The source sends all read-write pages, marking them clean. (5) It repeats step 4 for pages the guest dirtied meanwhile. (6) When the cycle of 4 and 5 becomes very short, the source freezes the guest, sends the VCPU's final state, other state and the final dirty pages, and tells the target to start the guest. (7) Once the target acknowledges that the guest is running, the source terminates its copy.

**(b)** Each round sends the data dirtied during the previous round: the ratio is 10 / 125 = 0.08.

| Round | Data | Time |
| --- | --- | --- |
| 1 (all memory) | 4,096 MB | 4096 / 125 = 32.77 s |
| 2 | 32.77 × 10 = 327.7 MB | 2.62 s |
| 3 | 2.62 × 10 = 26.2 MB | 0.210 s |
| 4 | 0.210 × 10 = 2.1 MB | **0.017 s** |

Round 4 takes under 50 ms, so the VMM freezes the guest and sends it (with the VCPU state) during the pause: **downtime ≈ 17 ms**; total migration ≈ 32.77 + 2.62 + 0.21 + 0.017 ≈ **35.6 s**. Users notice only the 17 ms pause. (In reality repeated writes to the same page are sent once, so the rounds shrink faster than this.)

**(c)** If the guest dirties memory as fast as or faster than the link can send it (dirty rate ≥ bandwidth, ratio ≥ 1), the rounds never shrink; the VMM must then stop the guest and copy the remainder anyway, with a long pause, or slow the guest down.

Connection to Block 10: the "dirty" status is the same dirty bit the page-replacement algorithm uses; the VMM write-protects pages after sending them so the next write marks them dirty.
Marking points:
- Final answer: (c) If the guest dirties memory as fast as or faster than the link can send it (dirty rate ≥ bandwidth, ratio ≥ 1), the rounds never shrink; the VMM must then stop the guest and copy the remainder anyway, with a long pause …
- (a) (1) The source VMM connects to the target VMM.
- (b) Each round sends the data dirtied during the previous round: the ratio is 10 / 125 = 0.08.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-157
Unit: 5 Storage and Distributed Systems
Topic: Virtual Machines
Type: true/false
Based on: imitates the professor's TRUE/FALSE correct-and-justify items (OSN End 2022 Q1, AOS End 2025 Q1)
In syllabus: yes
Question: TRUE or FALSE, correct if false and justify: (a) "A type 2 hypervisor gives better performance than a type 1 because the host OS handles the devices." (b) "Paravirtualization requires applications to be recompiled." (c) "In trap-and-emulate, the guest kernel runs in real kernel mode." (d) "Live migration copies the guest's disk to the target host."
Answer: **(a) FALSE.** Type 2 is usually slower: the VMM is an ordinary process that cannot use some hardware features, and the host OS is an extra layer in the path. Its advantage is that the host OS needs no change.

**(b) FALSE.** Paravirtualization modifies the guest **OS**, not the application binary interface: Xen's principle 1 is that unmodified application binaries must run.

**(c) FALSE.** Both virtual user mode and virtual kernel mode run in real **user** mode; privileged instructions trap to the VMM, which emulates them.

**(d) FALSE.** It copies memory pages and CPU (VCPU) state; the disk is expected to be on network storage reachable from both hosts.
Marking points:
- States FALSE.
- (a) FALSE: Type 2 is usually slower: the VMM is an ordinary process that cannot use some hardware features, and the host OS is an extra layer in the path.
- (b) FALSE: Paravirtualization modifies the guest OS, not the application binary interface: Xen's principle 1 is that unmodified application binaries must run.
- (c) FALSE: Both virtual user mode and virtual kernel mode run in real user mode; privileged instructions trap to the VMM, which emulates them.
- (d) FALSE: It copies memory pages and CPU (VCPU) state; the disk is expected to be on network storage reachable from both hosts.
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-158
Unit: 5 Storage and Distributed Systems
Topic: Virtual Machines
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Blocks 1 and 2
In syllabus: yes
Question: The Xen paper says a domain is to a guest OS as a process is to a program. Extend the analogy: for each of system calls, interrupts, signals, the PCB, address-space protection and the scheduler, give the hypervisor-level counterpart. Why does Xen keep policy in Domain0 rather than in the hypervisor?
Answer:
| OS and process | Hypervisor and guest |
| --- | --- |
| System call: a trap from user to kernel | **Hypercall**: a synchronous software trap from the guest OS into Xen (e.g. a batch of page-table updates) |
| Hardware interrupt | **Event**: an asynchronous notification from Xen (a bitmap of pending events and a guest handler) |
| Signals; disabling interrupts | Events are "akin to Unix signals"; a guest defers them by setting a flag, as if disabling interrupts |
| PCB with saved registers | **VCPU** state saved and restored on each switch |
| Process address space, page tables | Domain's memory reservation; page tables validated by Xen; nested or shadow tables in full virtualization |
| CPU scheduler for processes | Scheduler for domains (Xen used Borrowed Virtual Time) on top of each guest's own scheduler |
| Kernel vs user mode | Ring 0 (Xen) vs ring 1 (guest OS) vs ring 3 (applications) |

**Policy in Domain0:** Xen's goal is to separate policy from mechanism (Block 1). The hypervisor provides only basic mechanisms on the data path: scheduling CPUs between domains, filtering packets, checking access to disk blocks. Complex decisions such as admission control, how the CPU should be shared, and which packets a domain may send are made by management software in Domain0, an ordinary guest. This keeps the most privileged code small (fewer bugs that can break isolation) and lets policies change without changing the hypervisor, the same argument as for microkernels.
Marking points:
- Policy in Domain0: Xen's goal is to separate policy from mechanism (Block 1).
- System call: a trap from user to kernel: Hypercall: a synchronous software trap from the guest OS into Xen (e.g. a batch of page-table updates)
- Hardware interrupt: Event: an asynchronous notification from Xen (a bitmap of pending events and a guest handler)
- Signals; disabling interrupts: Events are "akin to Unix signals"; a guest defers them by setting a flag, as if disabling interrupts
- PCB with saved registers: VCPU state saved and restored on each switch
- Process address space, page tables: Domain's memory reservation; page tables validated by Xen; nested or shadow tables in full virtualization
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-159
Unit: 5 Storage and Distributed Systems
Topic: Virtual Machines
Type: written
Based on: end-sem syllabus item 5, "high-level questions may be given by connecting the topics discussed in several chapters"; connects to Block 14
In syllabus: yes
Question: Connect this block to Block 14: explain how specific VM features make IaaS clouds possible, and why VM isolation matters more in a public cloud than in a company's own cluster.
Answer: **Features to cloud functions:** **multiplexing** many guests on one server is consolidation (utilization from 5–15% to 60–80%) and lets providers sell fractions of machines; **templating and cloning** let a customer launch many identical instances from one image in seconds (rapid provisioning, elasticity); **disk images as files** make storing, copying and moving guests trivial; **suspend/resume and snapshots** support pay-per-use and recovery; **live migration** lets the provider balance load and service hardware with no customer downtime; APIs for creating guests are exactly IaaS's "request and release resources".

**Isolation:** in a public cloud, mutually untrusting customers share one physical machine. VMs give protection (a guest cannot touch another's memory or devices) and, with a VMM designed for it like Xen, **performance isolation**: in the paper's evaluation, two domains running disruptive workloads (a disk hog, a fork bomb, a memory hog) slowed well-behaved domains by only 2–4%, while on native Linux the same processes made the machine unusable. Within one company, users cooperate and the OS's process protection may be enough; in a cloud, it is not.
Marking points:
- Features to cloud functions: multiplexing many guests on one server is consolidation (utilization from 5–15% to 60–80%) and lets providers sell fractions of machines; templating and cloning let a customer launch many identical instances from one image in seconds …
- Isolation: in a public cloud, mutually untrusting customers share one physical machine.
- VMs give protection (a guest cannot touch another's memory or devices) and, with a VMM designed for it like Xen, performance isolation: in the paper's evaluation, two domains running disruptive workloads (a disk hog, a fork bomb, a memory hog) …
Answer source: written by Claude, no key
Weak / low priority: no

### PRED-160
Unit: 5 Storage and Distributed Systems
Topic: Virtual Machines
Type: written
Based on: imitates the professor's short explain / justify / compare questions (2020 quizzes, 2022 keys, AOS 2025 papers)
In syllabus: yes
Question: Why is the Java Virtual Machine called programming-environment virtualization, and how does a JIT compiler improve it?
Answer: The JVM virtualizes no real hardware: it defines an abstract machine (bytecode instructions, class loader, garbage-collected heap) that the Java language targets, and an implementation of it is compiled for each real architecture. Java classes compile to architecture-neutral bytecode, so the same .class files run on any system with a JVM ("write once, run anywhere").

Interpreting bytecode is slow, so a **just-in-time compiler** translates frequently executed bytecode into native code at run time and caches it, so later executions run natively: the same translate-once-and-cache idea as binary translation in VMware.
Marking points:
- The JVM virtualizes no real hardware: it defines an abstract machine (bytecode instructions, class loader, garbage-collected heap) that the Java language targets, and an implementation of it is compiled for each real architecture.
- Java classes compile to architecture-neutral bytecode, so the same .class files run on any system with a JVM ("write once, run anywhere").
- Interpreting bytecode is slow, so a just-in-time compiler translates frequently executed bytecode into native code at run time and caches it, so later executions run natively: the same translate-once-and-cache idea as binary translation in VMware.
Answer source: written by Claude, no key
Weak / low priority: no
