// Searches

// Iterates over an array from the start index to the last, returning the index when found
function linearSearch(list, item) {
    for(let i = 0; i<list.length; i++) {
        if (list[i] === item) {
            return i
        }
    }
    return -1
}
// Partitions the array into smaller halves until the middle index contains the value
function binarySearch(list, item) {
  let left = 0
  let right = list.length - 1
  while (left <= right) {
    let middle = (left + right) >> 1 
    if (list[middle] === item) {
      return middle
    } else if (list[middle] < item) {
      left = middle + 1
    } else {
      right = middle - 1
    }
  }
  return -1
}

// Sorts

// Compares the "next" item, swaps them and then moves on. When there have been no swaps an entire traversal the list is sorted
function bubbleSort(list) {
  let swapped = true
  while (swapped) {  
    swapped = false
    for (let i = 0; i < list.length - 1; i++) {
      if (list[i] > list[i + 1]) {
        [list[i], list[i + 1]] = [list[i + 1], list[i]]
        swapped = true
      }
    }
  }
}
// Starting at the start of the array, "inserts" the current item at the correct position in the left partition
function insertSort(list){
  for (i = 1; i<list.length; i++) {
    const temp = list[i]
    let pos = i
    while (pos > 0 && list[pos-1]>temp) {
      list[pos] = list[pos-1]
      pos--
    }
    list[pos] = temp
  }
}
// Breaks the array down into smaller arrays and then builds them back up in sorted order
function mergeSort(list, start=0, end=list.length-1) {
    if (end - start < 1) { return }
    let mid = (start + end) >> 1

    mergeSort(list, start, mid)
    mergeSort(list, mid + 1, end)
    
    let temp = []
    let lp=start
    let rp=mid + 1

    while(lp <= mid  && rp <= end) {
        if (list[lp] > list[rp]) {
            temp.push(list[rp++])
        } else {
            temp.push(list[lp++])
        }
    }
    while(lp <= mid) {
        temp.push(list[lp++])
    }
    while(rp <= end) {
        temp.push(list[rp++])
    }
    for (let index = start; index <= end; index++) {
        list[index] = temp[index-start]
    }
}
// Pivots around a pointer (keyPointer), swapping the pointer AND data when needed, every individual recursion sorts a single item in a partition and then passes the now, 2 separate partitons to recur
function quickSort(array, start=0, end=array.length-1) {
    if (end <= start) return;
    let pointer = start;
    let keyPointer = end;
    while (pointer != keyPointer) {
        if ((array[keyPointer] > array[pointer] && keyPointer < pointer) ||  (array[pointer] > array[keyPointer] && pointer < keyPointer)) {
            [array[pointer], array[keyPointer]] = [array[keyPointer], array[pointer]];
            [pointer, keyPointer] = [keyPointer, pointer];
        }
        pointer -= Math.sign(pointer - keyPointer);
    }
    quickSort(array, start, keyPointer-1);
    quickSort(array, keyPointer+1, end);
}

// Data Structures

// FIFO / LILO
class Queue {
    constructor(length) {
        this.length = length
        this.rawArray = new Array(this.length)
        this.frontPointer = 0
        this.rearPointer = 0
    }
    get isEmpty() {
        return this.frontPointer === this.rearPointer
    }
    get isFull() {
        return this.rearPointer === this.length
    }
    get Front() {
        return this.rawArray[this.frontPointer]
    }
    get Display() {
        console.log(this.rawArray)
    }
    Enqueue(item) {
        if (!this.isFull) {
            this.rawArray[this.rearPointer++] = item
        } else {
            console.warn("Queue Overflow\nTrying to Enqueue:", item)
        }
    }
    Dequeue() {
        if (!this.isEmpty) {
            return this.rawArray[this.frontPointer++]
        } else {
            console.warn("Queue Underflow\nTrying to Dequeue")
        }
    }
    Clear() {
        this.frontPointer = 0
        this.rearPointer = 0
    }
}
// Wraps around the edge of the queue
class CircularQueue {
    constructor(length) {
        this.length = length
        this.rawArray = new Array(this.length)
        this.frontPointer = 0
        this.rearPointer = 0
        this.size = 0
    }
    get isEmpty() {
        return this.size = 0
    }
    get isFull() {
        return this.size === this.length
    }
    get Front() {
        return this.rawArray[this.frontPointer]
    }
    get Display() {
        console.log(this.rawArray)
    }
    Enqueue(item) {
        if (!this.isFull) {
            this.rawArray[this.rearPointer] = item
            this.rearPointer = (this.rearPointer+1) % this.length
            this.size++
        } else {
            console.warn("Queue Overflow\nTrying to Enqueue:", item)
        }
    }
    Dequeue() {
        if (!this.isEmpty) {
            let value = this.rawArray[this.frontPointer]
            this.frontPointer = (this.frontPointer+1) % this.length
            this.size--
            return value
        } else {
            console.warn("Queue Underflow\nTrying to Dequeue")
        }
    }
    Clear() {
        this.frontPointer = 0
        this.rearPointer = 0
        this.size = 0
    }
}
// FILO / LIFO
class Stack {
    constructor(length) {
        this.length = length
        this.rawArray = new Array(this.length)
        this.pointer = 0
    }
    get isEmpty() {
        return this.pointer === 0
    }
    get isFull() {
        return this.pointer === this.length
    }
    get Top() {
        return this.rawArray[this.pointer-1]
    }
    get Display() {
        console.log(this.rawArray)
    }
    Push(item) {
        if (!this.isFull) {
            this.rawArray[this.pointer++] = item
        } else {
            console.warn("Stack Overflow\nTrying to Push:", item)
        }
    }
    Pop() {
        if (!this.isEmpty) {
            return this.rawArray[--this.pointer]
        } else {
            console.warn("Stack Underflow\nTrying to Pop")
        }
    }
    Clear() {
        this.pointer = 0
    }
}
// Hierarchial structure with 2 children
class BinaryTree {
    static BTNode = class {
        constructor(data) {
            this.data = data
            this.left = null
            this.right = null
        }
    }
    constructor() {
        this.root = null
    }
    Search(data) {
        let current = this.root
        while (current) {
            if (current.data > data) {
                current = current.left
            } else if (current.data < data) {
                current = current.right
            } else {
                return true
            }
        }
        return false
    }
    Insert(data) {
        const newNode = new BinaryTree.BTNode(data)
        if (!this.root) {
            this.root = newNode
            return
        }
        let current = this.root
        while(true) {
            if (current.data > data) {
                if (!current.left) {
                    current.left = newNode
                    return
                }
                current = current.left
            } else if (current.data < data) {
                if (!current.right) {
                    current.right = newNode
                    return
                }
                current = current.right
            } else {
                console.warn("Tried inserting a duplicate:", data)
                return
            }
        }
    }
    Delete(data) {
        this.root = this.deleteNode(this.root, data)
    }
    deleteNode(node, data) {
        if (!node) return node

        if (data < node.data) {
            node.left = this.deleteNode(node.left, data)
        } else if (data > node.data) {
            node.right = this.deleteNode(node.right, data)
        } else {
            if (!node.left) {
                return node.right
            } else if (!node.right) {
                return node.left
            }
            node.data = this.FindMinimumNode(node.right).data
            node.right = this.deleteNode(node.right, node.data)
        }
        return node
    } 
    FindMinimumNode(node) {
        if (!node.left) return node
        return this.FindMinimumNode(node.left)
    }
    BreadthFirstSearch() {
        const queue = new Queue()
        queue.Enqueue(this.root)
        while(!queue.isEmpty) {
            console.log(queue.Front.data)
            if (queue.Front.left) {
                queue.Enqueue(queue.Front.left)
            }
            if (queue.Front.right) {
                queue.Enqueue(queue.Front.right)
            }
            queue.Dequeue()
        }
    }
    DepthFirstSearch(order, node=this.root) {
        if (order === "pre") console.log(node.data)
        
        if (node.left) {
            this.DepthFirstSearch(order, node.left)
        }
        if (node.right) {
            this.DepthFirstSearch(order, node.right)
        }
        
        if (order === "post") console.log(node.data)
    }
}
// Each node contains data and a reference to the next node in an ordered (optional) sequence
class LinkedList {
    static LLNode = class {
        constructor(data) {
            this.data = data
            this.next = null
        }
    }
    constructor() {
        this.root = null
    }
    Search(data) {
        let current = this.root
        while (current != null) {
            if (current.data == data) {
                return true
            }
            current = current.next
        }
        return false
    }
    Delete(data) {
        let current = this.root
        let previous = null
        while (current != null) {
            if (current.data == data) {
                const deleted = previous.next
                previous.next = current
                return deleted
            }
            previous = current
            current = current.next
        }
    }
    Add(data) {
        const newNode = new LinkedList.LLNode(data) 
        let current = this.root
        let previous = null
        while (current != null && newNode.data > current.data) {
            previous = current
            current = current.next
        }
        newNode.next = current
        if (previous == null) {
            this.root = newNode
        } else {
            previous.next = newNode
        }
    }
    Display() {
        const array = []
        let current = this.root
        while (current) {
            array.push(current.data)
            current = current.next
        }
        console.log(array)
    }
}
// Stores key-value pairs (key is the hashed value)
class HashTable {
    constructor(length) {
        this.length = length
        this.rawArray = new Array(this.length)
    }
    weightInput(value) {
        // Arbitrary Function
        return value.reduce((acc, [item, index]) => {
            const itemAscii = item.charCodeAt(0)
            const indexAscii = index.charCodeAt(0)
            const contribution = (indexAscii**2)*(itemAscii**2)
            return acc + contribution
        }, 0) >> 3
    }
    Hash(value) {
        const weightedValue = this.weightInput(Object.entries(value))
        const hash = weightedValue % this.length
        return hash
    }
    Insert(value) {
        const startHashKey = this.Hash(value)
        let hashValuePointer = startHashKey
        let pass = false
        while(this.rawArray[hashValuePointer] && (!pass || hashValuePointer < startHashKey)) {
            hashValuePointer ++
            if (hashValuePointer === this.length) {
                hashValuePointer = 0
                pass = true
            }
        }
        this.rawArray[hashValuePointer] = value
    }
    Find(value) {
        const startHashKey = this.Hash(value)
        let hashValuePointer = startHashKey
        let pass = false
        let record = this.rawArray[hashValuePointer]
        while(this.rawArray[hashValuePointer] !== value && (!pass || hashValuePointer < startHashKey)) {
            hashValuePointer ++
            if (hashValuePointer === this.length) {
                hashValuePointer = 0
                pass = true
            }
            record = this.rawArray[hashValuePointer]
        }
        return record === value
    }
    Display() {
        console.log(this.rawArray)
    }
}


// NOT IN SPEC

// Performance
function generateNumberData(count) {
    let list = []
    for (let i = 0; i < count; i++) {
        list.push(i)
    }
    return list
}
function shuffle(array, count = array.length) {
    for(let _ = 0; _ < count; _++) {
        const index1 = Math.floor(Math.random()*array.length);
        const index2 = Math.floor(Math.random()*array.length);
        [array[index1], array[index2]] = [array[index2], array[index1]]
    }
}
function testFunction(func, iterations=1000) {
    console.log(`Testing: ${func.name}`)
    const allTimes = [{iterations: iterations}]
    for (let dataPoints = 10; dataPoints <= 1e5; dataPoints*=10) {
        const data = generateNumberData(dataPoints)
        const shuffleDuration = []
        const start = performance.now()
        for (let i=0; i < iterations; i++) {
            const startShuffle = performance.now()
            shuffle(data)
            shuffleDuration.push(performance.now() - startShuffle)
            func(data)
        }
        const time = performance.now() - start
        const totalShuffleDuration = shuffleDuration.reduce((acc, curr) => acc+curr, 0)
        const netTime = time - totalShuffleDuration
        allTimes.push({netTime: netTime, dataPoints: dataPoints})
    }
    console.log("Finished")
    return allTimes
}
// Other
function reverse(array) {
    for (let pointer = 0; pointer < Math.floor(array.length/2); pointer++) {
        const endPointer = array.length - pointer - 1;
        [array[pointer], array[endPointer]] = [array[endPointer], array[pointer]];
    }
}
function highestCommonFactor(x, y) {
    while(y) [x, y] = [y, x%y]
    return x
}
