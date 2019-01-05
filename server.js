const {createServer} = require("http");
const next = require("next");
const routes = require('./routes');
const readLastLine = require('read-last-line');
const rp = require('request-promise');

var bodyParser = require('body-parser');

var express = require('express');
var exp = express();

exp.use(bodyParser.json());
exp.use(bodyParser.urlencoded ({extended: false}));

const app = next({
    dev: process.env.NODE_ENV !== "production"
});

const handler = routes.getRequestHandler(app);

exp.get('/get-contract-address',async function(req, res){
    console.log("/get-contract-address");
    let address ="";

    await readLastLine.read('ethereum/CONTRACT_ADDRESS', 1).then(function (line) {
            console.log(line);
        address = line;
        }).catch(function (err) {
            console.log(err.message);
        })

    res.json({value: address});
});

exp.post('/set-contract-address',async function(req, res){
    console.log("/set-contract-address req.firstParam = ",  req.body.firstParam  + " req.secondParam = ", req.body.secondParam);


    res.json({value_1: parseInt(req.body.firstParam) * 10, value_2:  parseInt(req.body.secondParam) * 10});
});


// With express
app.prepare().then(() => {
    exp.use(handler).listen(3000, (err) => {
        if (err) throw err;
        console.log("Express Ready on localhost:3000");
    })
})




//
// app.prepare().then(() => {
//     createServer(handler,
//         function(req, res){
//             console.log("function(req, res)");
//         }
//
//
//
//
//
//
//
//
//         ).listen(3000, (err) =>{
//         if(err)  throw err;
//         console.log("Ready on localhost:3000");
//     })
// });