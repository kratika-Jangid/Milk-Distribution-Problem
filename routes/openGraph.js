let route = require('express').Router();
const { db, datas, users } = require('../db/loginTable');

route.post('/', async(req, res) => {

    req.session.graph = req.body.id;
    console.log(req.session.graph);




    res.send({ id: req.body.id });
})
route.get('/', async(req, res) => {
    data = await datas.findAll({
        where: {
            id: req.session.graph
        }
    })
    res.send(data);
})

module.exports = {
    route
}