let route = require('express').Router();
const { db, datas, users } = require('../db/loginTable');
const graph = require('../DataStructures/graph').Graph;

route.post('/', async(req, res) => {
    console.log(req.body.nodes + "****");
    console.log(req.body.edges);
    let g = new graph();
    for (let i = 0; i < req.body.nodes.length - 1; i++) {
        await g.addNode(req.body.nodes[i]);
    }
    let x = 0;
    for (let i = 0; i < req.body.nodes.length - 1; i++) {
        for (let j = i + 1; j < req.body.nodes.length - 1; j++) {
            await g.addEdge(req.body.nodes[i], req.body.nodes[j], parseInt(req.body.edges[x]));
            x++;
        }
    }
    console.log("())))");
    if (x == req.body.edges.length) {

        g.display();
        console.log("())))");
        let floyd = await g.floydWarshallAlgorithm();
        let mst = await g.primsMST();
        let pat = await g.floydWarshallPath();
        console.log(floyd + " floyd");
        mst.display();
        console.log("((((())))))))");
        res.send({ fw: floyd, prism: mst, path: pat });
    }

})

module.exports = {
    route
}