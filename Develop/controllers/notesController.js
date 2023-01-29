const express = require('express');
const router = express.Router();
const fs = require("fs")
const generateUniqueId = require('generate-unique-id');

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
            const id = generateUniqueId()
            newNote = {
                title: req.body.title,
                text: req.body.text,
                id: id
            }
            notesData.push(newNote)
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

router.delete("/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("oh no!");
            throw err;
        } else {
            let notesData = JSON.parse(data);
            notesData = notesData.filter((friend) => {
                if (friend.id == req.params.id) {
                    return false;
                } else {
                    return true;
                }
            });
            fs.writeFile("./db/db.json", JSON.stringify(notesData, null, 4), (err) => {
                if (err) {
                    res.status(500).send("oh no!");
                    throw err;
                } else {
                    res.send("data deleted!");
                }
            });
        }
    });
});

module.exports = router;