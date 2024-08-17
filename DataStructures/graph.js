const { Queue } = require("./queue");
const Stack = require("./stack").Stack;
const PriorityQueue = require("./priorityQueue");

class Graph {
    constructor() {
        this.edges = {};
        this.nodes = [];
    }

    addNode(node) {
        this.nodes.push(node);
        this.edges[node] = [];
    }

    addEdge(node1, node2, weight = 1) {
        this.edges[node1].push({ node: node2, weight: weight });
        this.edges[node2].push({ node: node1, weight: weight });
    }

    addDirectedEdge(node1, node2, weight = 1) {
        this.edges[node1].push({ node: node2, weight: weight });
    }

    // addEdge(node1, node2) {
    //   this.edges[node1].push(node2);
    //   this.edges[node2].push(node1);
    // }

    // addDirectedEdge(node1, node2) {
    //   this.edges[node1].push(node2);
    // }

    display() {
        let graph = "";
        this.nodes.forEach(node => {
            graph += node + "->" + this.edges[node].map(n => n.node).join(", ") + "\n";
        });
        console.log(graph);
    }

    primsMST() {
        // Initialize graph that'll contain the MST
        const MST = new Graph();
        console.log(this.nodes);
        if (this.nodes.length === 0) {
            return MST;
        }
        if (this.nodes.length === 1) {
            MST.addNode(this.nodes[0]);
            return MST;
        }
        if (this.nodes.length === 2) {
            MST.addNode(this.nodes[0]);
            MST.addNode(this.nodes[1]);
            MST.addEdge(this.nodes[0], this.nodes[1], this.edges[0]);
            return MST;
        }

        // Select first node as starting node
        let s = this.nodes[0];

        // Create a Priority Queue and explored set
        let edgeQueue = new PriorityQueue();
        let explored = new Set();
        explored.add(s);
        MST.addNode(s);

        // Add all edges from this starting node to the PQ taking weights as priority
        this.edges[s].forEach(edge => {
            edgeQueue.enqueue([s, edge.node], edge.weight);
        });

        // Take the smallest edge and add that to the new graph
        let currentMinEdge = edgeQueue.dequeue();
        //console.log(currentMinEdge);
        while (!edgeQueue.isEmpty()) {
            // COntinue removing edges till we get an edge with an unexplored node
            while (!edgeQueue.isEmpty() && explored.has(currentMinEdge.element[1])) {
                currentMinEdge = edgeQueue.dequeue();
            }
            let nextNode = currentMinEdge.element[1];
            // Check again as queue might get empty without giving back unexplored element
            if (!explored.has(nextNode)) {
                MST.addNode(nextNode);
                MST.addEdge(currentMinEdge.element[0], nextNode, currentMinEdge.priority);

                // Again add all edges to the PQ
                this.edges[nextNode].forEach(edge => {
                    edgeQueue.enqueue([nextNode, edge.node], edge.weight);
                });

                // Mark this node as explored
                explored.add(nextNode);
                s = nextNode;
            }
        }
        return MST;
    }



    djikstraAlgorithm(startNode) {
        let distances = {};

        // Stores the reference to previous nodes
        let prev = {};
        let pq = new PriorityQueue();

        // Set distances to all nodes to be infinite except startNode
        distances[startNode] = 0;
        pq.enqueue(startNode, 0);

        this.nodes.forEach(node => {
            if (node !== startNode) distances[node] = Infinity;
            prev[node] = null;
        });

        while (!pq.isEmpty()) {
            let minNode = pq.dequeue();
            //console.log(minNode);
            let currNode = minNode.element;
            let weight = minNode.priority;
            //console.log(this.edges[currNode]);
            this.edges[currNode].forEach(neighbor => {
                let alt = distances[currNode] + neighbor.weight;
                if (alt < distances[neighbor.node]) {
                    distances[neighbor.node] = alt;
                    prev[neighbor.node] = currNode;
                    pq.enqueue(neighbor.node, distances[neighbor.node]);
                }
            });
        }
        return distances;
    }

    floydWarshallAlgorithm() {
        let dist = {};
        let path = {};
        for (let i = 0; i < this.nodes.length; i++) {
            dist[this.nodes[i]] = {};
            path[this.nodes[i]] = {};

            // For existing edges assign the dist to be same as weight
            this.edges[this.nodes[i]].forEach((e) => {
                dist[this.nodes[i]][e.node] = e.weight;
                path[this.nodes[i]][e.node] = e.node;
            });
            //console.log(path);
            //console.log(dist);
            this.nodes.forEach(n => {
                // For all other nodes assign it to infinity
                if (dist[this.nodes[i]][n] == undefined) {
                    dist[this.nodes[i]][n] = Infinity;
                    path[this.nodes[i]][n] = n;
                }
                // For self edge assign dist to be 0
                if (this.nodes[i] === n) dist[this.nodes[i]][n] = 0;
            });
        }
        //console.log(dist);
        this.nodes.forEach(i => {
            this.nodes.forEach(j => {
                this.nodes.forEach(k => {
                    // Check if going from i to k then from k to j is better
                    // than directly going from i to j. If yes then update
                    // i to j value to the new value
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                        path[i][j] = path[i][k];
                    }
                });
            });
        });
        //console.log(path);
        return dist;
    }
    floydWarshallPath() {
        let dist = {};
        let path = {};
        for (let i = 0; i < this.nodes.length; i++) {
            dist[this.nodes[i]] = {};
            path[this.nodes[i]] = {};

            // For existing edges assign the dist to be same as weight
            this.edges[this.nodes[i]].forEach((e) => {
                dist[this.nodes[i]][e.node] = e.weight;
                path[this.nodes[i]][e.node] = e.node;
            });
            //console.log(path);
            //console.log(dist);
            this.nodes.forEach(n => {
                // For all other nodes assign it to infinity
                if (dist[this.nodes[i]][n] == undefined) {
                    dist[this.nodes[i]][n] = Infinity;
                    path[this.nodes[i]][n] = n;
                }
                // For self edge assign dist to be 0
                if (this.nodes[i] === n) dist[this.nodes[i]][n] = 0;
            });
        }
        //console.log(dist);
        this.nodes.forEach(i => {
            this.nodes.forEach(j => {
                this.nodes.forEach(k => {
                    // Check if going from i to k then from k to j is better
                    // than directly going from i to j. If yes then update
                    // i to j value to the new value
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                        path[i][j] = path[i][k];
                    }
                });
            });
        });
        //console.log(path);
        return path;
    }
}
let g = new Graph();
g.addNode('A')
g.addNode('B')

g.addEdge('A', 'B', 5)

g.display();
//console.log(g.floydWarshallAlgorithm());
//console.log(g.floydWarshallPath());
let asd = g.primsMST();
asd.display();
module.exports = { Graph };