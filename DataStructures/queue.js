class Queue {
    constructor() {
        // Array is used to implement a Queue
        this.data = [];
    }

    // Adds an element to the queue
    enqueue(item) {
            this.data.unshift(item);
        }
        // removing element from the queue 
        // returns underflow when called  
        // on empty queue 

    dequeue() {
        if (this.isEmpty()) {
            return "Underflow";
        }
        return this.data.pop();
    }

    // front function 
    front() {
        // returns the Front element of  
        // the queue without removing it. 
        if (this.isEmpty())
            return "No elements in Queue";
        return this.data[this.data.length - 1];
    }

    // isEmpty function 
    isEmpty() {
        // return true if the queue is empty. 
        return this.data.length === 0;
    }
}
// let q = new Queue();
// q.enqueue(12);
// q.enqueue(10);
// console.log(q.front());

module.exports = { Queue, a: 5 };