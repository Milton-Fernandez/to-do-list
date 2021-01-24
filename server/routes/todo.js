const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.get('/',(req,res) => {
    let queryText = 'SELECT * FROM "to_do" ORDER By "published";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
    .catch(error =>{
        console.log('error getting tasks',error);
        res.sendStatus(500);
    });
});

router.post('/',(req,res) => {
    let newTask = req.body;
    console.log('Adding Task', newTask);
    let queryText = `INSERT INTO "to_do"("task", "published") VALUES ($1, $2);`;
    pool.query(queryText,[newTask.task,newTask.date])
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log(`Error adding new Task`,error);
        res.sendStatus(500);
    });
});


router.delete('/:id',(req,res) => {
    const queryText = `DELETE FROM "to_do" WHERE "id" = $1;`;
    pool.query(queryText,[req.params.id]) 
    .then((result) => {
        res.sendStatus(204);
    })
    .catch((err) => {
        console.log(`Error deleting`,err);
        res.sendStatus(500);
    })
});

module.exports = router;