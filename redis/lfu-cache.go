package main

import (
	"container/heap"
	"time"
)

type LFUCache struct {
	hash map[int]*Entry // hashtable
	pq   PQ             // priority queue
	cap  int
}

// Constructor of LFUCache
func Constructor(capacity int) LFUCache {
	return LFUCache{
		hash: make(map[int]*Entry, capacity),
		pq:   make(PQ, 0, capacity),
		cap:  capacity,
	}
}

func (this *LFUCache) Get(key int) int {
	ep, ok := this.hash[key]
	if ok {
		this.pq.update(ep)
		return ep.value
	}
	return -1
}

// Put key&value into LFUCache
// if LFUCache is full，remove the least frequent key&valu in LFUCache
func (this *LFUCache) Put(key int, value int) {
	if this.cap <= 0 {
		return
	}
	ep, ok := this.hash[key]
	// if key is present, update value
	if ok {
		this.hash[key].value = value
		this.pq.update(ep)
		return
	}

	ep = &Entry{key: key, value: value}
	// if pq is full
	// 1. first remove the least frequently used key&value
	// 2. insert the new key&value
	if len(this.pq) == this.cap {
		temp := heap.Pop(&this.pq).(*Entry)
		delete(this.hash, temp.key)
	}
	this.hash[key] = ep
	heap.Push(&this.pq, ep)
}

// entry is a node of Priority Queue
type Entry struct {
	key       int
	value     int
	frequence int
	index     int
	date      time.Time
}

// PQ implements heap.Interface and holds entries.
type PQ []*Entry

func (pq PQ) Len() int { return len(pq) }

func (pq PQ) Less(i, j int) bool {
	if pq[i].frequence == pq[j].frequence {
		return pq[i].date.Before(pq[j].date)
	}

	return pq[i].frequence < pq[j].frequence
}

func (pq PQ) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
	pq[i].index = i
	pq[j].index = j
}

func (pq *PQ) Push(x interface{}) {
	n := len(*pq)
	entry := x.(*Entry)
	entry.index = n
	entry.date = time.Now()
	*pq = append(*pq, entry)
}

func (pq *PQ) Pop() interface{} {
	old := *pq
	n := len(old)
	entry := old[n-1]
	entry.index = -1 // for safety
	*pq = old[0 : n-1]
	return entry
}

// update modifies the priority of an entry in the queue.
func (pq *PQ) update(entry *Entry) {
	entry.frequence++
	entry.date = time.Now()
	heap.Fix(pq, entry.index)
}

func main() {
	c := Constructor(2)
	c.Put(1, 1)
	// c.Put(2, 2)
	// c.Put(3, 3)
}
