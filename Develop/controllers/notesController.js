const express = require('express');
const router = express.Router();
const fs = require("fs")

router.get("/", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("oh no!");
            throw err;
        } else {
            const notesData = JSON.parse(data);
            res.json(notesData);
        }
    });
});

router.post("/", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("oh no!");
            throw err;
        } else {
            const notesData = JSON.parse(data);
            notesData.push(req.body)
            fs.writeFile("./db/db.json", JSON.stringify(notesData, null, 4), (err) => {
                if (err) {
                  res.status(500).send("oh no!");
                  throw err;
                } else {
                  res.send("data added!");
                }
              });
        }
    });
});

module.exports = router;