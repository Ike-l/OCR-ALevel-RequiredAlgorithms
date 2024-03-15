// Welcome, 
// This contains all required algorithms for OCR spec as of February 2024
// Made by Isaac Loffredo

// Note:
// "private" functions/variables in classes are camelCase

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
    Delete(dataToDelete) {
        // comments may be false
        // they were my guidlines to the algorithm
        // if root when change pointer of parent, change this.root 
        // find node, find parent, find direction from parent
        // find depth of right most node of left child + the parent + direction
        // find depth of left most node of right child + the parent + direction
        // comapare
        // save child nodes of node
        // save child node of highest depth node
        // replace node with highest depth node
        // - attach children of node to the replacement
        // - attach children of replacement to the replacement parent
        let isRoot = false
        if (dataToDelete === this.root.data) {
            isRoot = true
        }
        // Node, Parent, Direction
        const NodeStructure = this.ExploreNodeStructure(dataToDelete)

        const NodeChildren = {
            Left: NodeStructure.Node.left,
            Right: NodeStructure.Node.right
        }
        // LowestNode, LowestNodeParent, LowestNodeChild, LowestNodeChildDirection, Depth
        const LeftChildStructure = this.ExploreChildNodeDepth(NodeChildren.Left, "left")
        const RightChildStructure = this.ExploreChildNodeDepth(NodeChildren.Right, "right")


        let usingStructure = LeftChildStructure
        if (RightChildStructure.Depth > LeftChildStructure.Depth) {
            usingStructure = RightChildStructure
        }
        if (isRoot) {
            this.root = usingStructure.LowestNode
        } else {
            NodeStructure.Parent[NodeStructure.Direction] = usingStructure.LowestNode
        }
        if (usingStructure.LowestNode && usingStructure.LowestNode !== NodeChildren.Left) {
            usingStructure.LowestNode.left = NodeChildren.Left
        }
        if (usingStructure.LowestNode && usingStructure.LowestNode !== NodeChildren.Right) {
            usingStructure.LowestNode.right = NodeChildren.Right
        }

        if (usingStructure.LowestNodeParent) {
            usingStructure.LowestNodeParent[usingStructure.LowestNodeChildDirection] = usingStructure.LowestNodeChild
        }
    }
    ExploreNodeStructure(data) {
        let current = this.root
        let parent = null
        let direction = null
        let found = false
        while (current && !found) {
            if (current.data > data) {
                parent = current
                direction = "left"
                current = current.left
            } else if (current.data < data) {
                parent = current
                direction = "right"
                current = current.right
            } else {
                found = true
            }
        }
        return {
            Node: current,
            Parent: parent,
            Direction: direction
        }
    }
    ExploreChildNodeDepth(startNode, directionFromParent) {
        let otherSide = directionFromParent == "left" ? "right" : "left"
        if (!startNode) {
            return {
                LowestNode: null,
                LowestNodeParent: null,
                LowestNodeChild: null,
                LowestNodeChildDirection: otherSide,
                Depth: 0,
            }
        }
        let current = startNode
        let parent = null
        let depth = 0
        while (current[otherSide]) {
            parent = current
            current = current[otherSide]
            depth++
        }
        const lowestChild = current[directionFromParent]
        if (lowestChild) {
            depth++
        }
        return {
            LowestNode: current,
            LowestNodeParent: parent,
            LowestNodeChild: lowestChild,
            LowestNodeChildDirection: otherSide,
            Depth: depth,
        }
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
    InOrderTraversal(node=this.root) {
        if (node.left) {
            this.InOrderTraversal(node.left)
        }
        console.log(node.data)
        if (node.right) {
            this.InOrderTraversal(node.right)
        }
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
        // Arbitrary Function, returns float
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
// Demonstrats Traversal Algorithms
class Graph {
    static Node = class {
        constructor(data) {
            this.data = data
            this.connections = []
            this.heuristic = 0
        } 
    }
    static Connect(node1, node2, cost) {
        node1.connections.push({Node: node2, Cost: cost})
        node2.connections.push({Node: node1, Cost: cost})
    }
    static isVisited(Visited, node) {
        for (let visited of Visited) {
            if (visited.Node === node) return true
        }
        return false
    }
    static Dijkstra(start) {
        let current = start
        const Visited = [{Node: current, Distance: 0, From: null}]

        let minimumDistance 
        let minimumFrom
        let minimumNode
        while (minimumDistance !== Infinity) {
            minimumDistance = Infinity
            for (let visited of Visited) {
                for (let connection of visited.Node.connections) {
                    if (!Graph.isVisited(Visited, connection.Node)) {
                        if (connection.Cost + visited.Distance < minimumDistance) {
                            minimumDistance = connection.Cost + visited.Distance
                            minimumFrom = visited.Node
                            minimumNode = connection.Node
                        }
                    }
                }
            }
            Visited.push({Node: minimumNode, Distance: minimumDistance, From: minimumFrom})
        }
        Visited.splice(-1, 1)
        return Visited
    }
    static A_Star(start, end) {
        /* Here */
        function findPath(Visited, node, path = []) {
            for (let visited of Visited) {
                const Node = visited.Node
                if (Node === node) {
                    path.push(Node)
                    findPath(Visited, visited.From, path)
                }
            }
            return path
        }
        /* To Here */
        let current = start
        const Visited = [{Node: current, Distance: 0, From: null}]

        let minimumDistance 
        let minimumFrom
        let minimumNode
        while (minimumDistance !== Infinity) {
            minimumDistance = Infinity
            for (let visited of Visited) {
                for (let connection of visited.Node.connections) {
                    if (!Graph.isVisited(Visited, connection.Node)) {
                        if (connection.Cost + visited.Distance + /* Here */ connection.Node.heuristic /* To Here */< minimumDistance) {
                            minimumDistance = connection.Cost + visited.Distance
                            minimumFrom = visited.Node
                            minimumNode = connection.Node
                        }
                    }
                }
            }                
            Visited.push({Node: minimumNode, Distance: minimumDistance, From: minimumFrom})
            /* Here */
            if (minimumNode === end) return [findPath(Visited, minimumNode), minimumDistance]
            /* To Here */
        }
        console.error("No End Node Found In Graph!")
    }
}

//
// End Of Algorithms
//
const a = shuffle(generateNumberData(1000))

console.log(intMSDRadixSort(a))

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
    return array
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
function formatGraphPath([path, distance]) {
    let pathString = ""
    for (let Node of path) {
        pathString += Node.data + " < "
    }
    console.log("Path: ", pathString.slice(0, -3))
    console.log("Total Distance:", distance)
}
function fib(num) {
    if (num <= 1) {
        return 1
    }
    return fib(num-1) + fib(num-2)
}
function fibA(num, mult = 1) {
    if (num <= 1) {
        return 1 * mult
    }
    return fibA(num-1, mult) + fibA(num-2, mult)
}
function intMSDRadixSort(array) {
    const strArray = array.map(x => x.toString())
    let maxLength = 0
    for (let item of strArray) {
        if (item.length > maxLength) {
            maxLength = item.length
        }
    }
    const paddedStrArray = strArray.map(x => x.padStart(maxLength, "0"))
    intMSDRadixSortSort(paddedStrArray, 0, maxLength)
    return paddedStrArray
}
function intMSDRadixSortSort(array, digit, maxLength) {
    const buckets = new Array(10).fill(null).map(x => new Array)
    for (let item of array) {
        buckets[item[digit]].push(item)
    }
    
    for (let bucket of buckets) {
        // if still divisible or reached the end of the string -> fail
        if (bucket.length > 1 && digit < maxLength - 1) {
            intMSDRadixSortSort(bucket, digit+1, maxLength)
        }
    }
    // copy buckets.flat into array?

    const temp = buckets.flat()
    
    for (let index = 0; index < array.length; index++) {
        array[index] = temp[index]
    }

    /* 
    put items into corresponding bucket using first digit
    if bucket has more than 1 item:
        make sub bucket
        put items from bucket into corresponding sub bucket using second digit
        if sub bucket has more than 1 item:
        repeat

    collapse entire bucket array into 1 array -> sorted
    */
}

//
// Testing
//

// Class - Graph
function prepareGraph() {
    const A = new Graph.Node("A")
    const B = new Graph.Node("B")
    const C = new Graph.Node("C")
    const D = new Graph.Node("D")
    const E = new Graph.Node("E")
    const F = new Graph.Node("F")
    const G = new Graph.Node("G")
    const H = new Graph.Node("H")
    const I = new Graph.Node("I")
    const J = new Graph.Node("J")
    const K = new Graph.Node("K")
    const L = new Graph.Node("L")
    Graph.Connect(A, C, 6)
    Graph.Connect(A, F, 6)
    Graph.Connect(B, C, 3)
    Graph.Connect(B, D, 1)
    Graph.Connect(C, E, 1)
    Graph.Connect(D, G, 2)
    Graph.Connect(D, H, 5)
    Graph.Connect(D, I, 1)
    Graph.Connect(E, F, 1)
    Graph.Connect(E, G, 1)
    Graph.Connect(F, J, 1)
    Graph.Connect(F, G, 2)
    Graph.Connect(G, I, 1)
    Graph.Connect(H, I, 6)
    Graph.Connect(H, L, 6)
    Graph.Connect(I, K, 6)
    Graph.Connect(J, K, 4)
    Graph.Connect(K, L, 4)
    return {Start: A, End: L}    
}
function updateHeuristics(start, end) {
    const graphCosts = Graph.Dijkstra(end)
    for (let Cost of graphCosts) {
        Cost.Node.heuristic = Math.max(0, Cost.Distance - Math.floor(Math.random()*Cost.Distance)) 
        // apply offset (heuristic is admissible if it never overestimates so always subtract)
        // use max because could change "*Cost.Distance" which could make it negative
        console.log(Cost.Node.data, ":", Cost.Distance , ">", Cost.Node.heuristic)
    }
}
function testGraph() {
    console.log("-".repeat(10), "Dijkstra's", "-".repeat(10))
    const Dijkstra = prepareGraph().Start
    console.log(Graph.Dijkstra(Dijkstra))
    console.log("-".repeat(10), "A*", "-".repeat(10))
    const A_Star = prepareGraph()
    updateHeuristics(A_Star.Start, A_Star.End)
    formatGraphPath(Graph.A_Star(A_Star.Start, A_Star.End))
    // expect Path : L < K < J < F < A
    // expect Distance : 15
    // expect Dijkstra to be consistent with A*
}

// Class - Binary Tree
function prepareTree() {
    const BT = new BinaryTree()
    BT.Insert("lion")
    BT.Insert("tiger")
    BT.Insert("mouse")
    BT.Insert("cat")
    BT.Insert("dog")
    BT.Insert("zebra")
    BT.Insert("yak")
    BT.Insert("owl")
    BT.Insert("aardvark")
    return BT
}
function testTree() {
    const BT = prepareTree()
    BT.BreadthFirstSearch()
    BT.Delete("lion")
    console.log("-".repeat("3"), "DELETED", "-".repeat("3"))
    BT.BreadthFirstSearch()
}

// Other
function testFib() {
    const test = 5
    const multi = 5
    console.log(fib(test) * multi === fibA(test, multi))
}