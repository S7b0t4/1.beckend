const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require("cors")

const db = new sqlite3.Database("credentials.db", (err)=>{
    if(err){
        console.log(err.message)
    }
    console.log("Connect to the access db")

    const insert = 'INSERT INTO credentials (usernmae, password) VALUES (?,?)'
    const delite = 'DELETE FROM credentials'
    app.post("/", (req, res) => {
        db.run(insert, [req.body.use, req.body.pas])
        res.send(req.body)
        reDB()
        dataB = []
    })
    app.post("/delit",(req, res) => {
        db.run(delite)
        dataB = []
    })
});

const PORT = 5000;

const app = express();

app.use(express.json())
app.use(cors());

let dataB = []

const reDB = () => {
    console.log("--------------------------")
    db.each("SELECT * FROM credentials", (err, row) => {
        console.log(row)
        dataB.push(row)
    });
}

reDB()

app.get("/", (req, res)=>{
    res.set("Access-Control-Allow-Origin", "*")
    db.each("SELECT * FROM credentials", (err, row) => {
        if(err){
            console.log(err)
        }
    });
    res.send(dataB)
})

app.listen(PORT, ()=>{
    console.log("server is run");
})
db.close