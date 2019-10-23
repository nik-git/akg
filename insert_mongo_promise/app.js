var express = require("express");
var mongodb = require('mongodb');
var url = "mongodb://localhost:27017/";
var app = express();
var port = 3000;
 
app.get("/", (req, res) => {
res.send("Hello World");
});

app.post("/addrecord", (req, res) => {
    const promise = new Promise((resolve, reject) => {
        mongodb.MongoClient.connect(url, {useUnifiedTopology: true}, (err, conn) => {
            if (err) reject(err);
            var dbo = conn.db("EmployeeDB");
            var myobj = { "Employeeid" : "16", "Employee Name": "Highway 136" };
            dbo.collection("Employee").insertOne(myobj, (err, result) => {
            if (err) reject(err);
            resolve(conn)
        })
    })
    })
      .then(item => {
        res.send("item saved to database");
      })
      .catch(err => {
        res.status(400).send("unable to save to database " + err);
      });
  });
 
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
