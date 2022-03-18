export class Queue<T> {
    queue: {[index: number]: T | undefined} = {};
    head = 0;
    tail = -1;
    isEmpty():boolean {
        return this.head > this.tail;
    }
    queueHead():T | undefined {
        if (this.isEmpty()) return undefined;
        return this.queue[this.head];
    }
    dequeue():T | undefined {
        if (this.isEmpty()) return undefined;
        const ret = this.queue[this.head];
        delete this.queue[this.head];
        this.head++;
        return ret;
    }
    enqueue(x: T) {
        this.queue[++this.tail] = x;
    }
}
