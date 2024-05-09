const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()

app.use(cors())
app.use(express.json());


const connection = mysql.createConnection(process.env.DATABASE_URL)

app.get('/', (req, res) => {
  res.send('Hello world!!')
})

app.get('/animal', (req, res) => {
  connection.query(
    'SELECT * FROM animal',
    function(err, results, fields) {
      res.send(results)
    }
  )
})

app.get('/animal/:id', (req, res) => {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM animal WHERE id = ?', [id],
        function (err, results, fields) {
            res.send(results)
        }
    )
})

app.post('/animal', (req, res) => {
    connection.query(
        'INSERT INTO `animal` (`name`, `detail`, `price`, `coverimage`) VALUES (?, ?, ?, ?)',
        [req.body.name, req.body.details, req.body.Price, req.body.image],
         function (err, results, fields) {
            if (err) {
                console.error('Error in POST /animal:', err);
                res.status(500).send('Error adding animal');
            } else {
                res.status(201).send(results);
            }
        }
    )
})


app.put('/animal', (req, res) => {
    connection.query(
        'UPDATE `animal` SET `name`=?, `detail`=?, `price`=?, `coverimage`=? WHERE id =?',
        [req.body.name, req.body.detail, req.body.price, req.body.coverimage, req.body.id],
         function (err, results, fields) {
            res.send(results)
        }
    )
})

app.delete('/animal', (req, res) => {
    connection.query(
        'DELETE FROM `animal` WHERE id =?',
        [req.body.id],
         function (err, results, fields) {
            res.send(results)
        }
    )
})


app.listen(process.env.PORT || 3000)
