const express = require('express');
const app = express.Router();
const path = require('path');
const connection = require('/var/www/dev.irzaw.com/server/services/db/irzaw.js');
const upload_leadership = require('/var/www/dev.irzaw.com/server/services/upload/leadership_upload.js');
const upload_personal = require('/var/www/dev.irzaw.com/server/services/upload/personal_upload.js');


app.get('/get_allpeople', (req, res) => {
    var sql = `SELECT * FROM people ORDER BY priority ASC`
    connection.query(sql, function(err, rows1, fields1) {
        if (err) throw err
        var s = `SELECT * FROM employee ORDER BY priority ASC`
        connection.query(s, function(err, rows2, fields2) {
            if (err) throw err
            var obj = {
                leadership: rows1,
                people: rows2,
            }
            res.send(obj)
        })
    })
})

app.get('/get_people/:id', (req, res) => {
    var id = req.params.id

    var sql = `SELECT * FROM people WHERE id = '${id}'`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        var object = {
            first_name: rows[0].first_name,
            last_name: rows[0].last_name,
            leadership_picture: rows[0].leadership_picture,
            certifications: rows[0].certifications,
            personal_picture: rows[0].personal_picture,
            description: rows[0].description.toString('utf8'),
            role: rows[0].role,
            active: rows[0].active,
            id: rows[0].id,
        }
        var array = []
        array.push(object)
        res.send(array)
    })
})

app.get('/get_people_employee/:id', (req, res) => {
    var id = req.params.id

    var sql = `SELECT * FROM employee WHERE id = '${id}'`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        var object = {
            first_name: rows[0].first_name,
            last_name: rows[0].last_name,
            leadership_picture: rows[0].leadership_picture,
            certifications: rows[0].certifications,
            personal_picture: rows[0].personal_picture,
            description: rows[0].description.toString('utf8'),
            role: rows[0].role,
            active: rows[0].active,
            id: rows[0].id,
        }
        var array = []
        array.push(object)
        res.send(array)
    })
})

app.post(
    '/uploadpeoplepersonal',
    upload_personal.array('personal'),
    (req, res) => {
        console.log(req.files)
        console.log('insert')
    },
)
app.post(
    '/uploadpeopleleadership',
    upload_leadership.array('leadership'),
    (req, res) => {
        console.log(req.files)
        console.log('insert')
    },
)

app.post('/editleader/:id', (req, res) => {
    const insert = req.body
    const id = req.params.id
    var sql = `UPDATE people SET ? where id = '${id}'`
    connection.query(sql, insert, function(err, data, fields) {
        if (err) throw err
        res.send('Good')
    })
})

app.post('/editemployee/:id', (req, res) => {
    const insert = req.body
    const id = req.params.id
    var sql = `UPDATE employee SET ? where id = '${id}'`
    connection.query(sql, insert, function(err, data, fields) {
        if (err) throw err
        res.send('Good')
    })
})
app.post('/addleader', (req, res) => {
    const insert = req.body
    var sql = `INSERT INTO people SET ?`
    connection.query(sql, insert, function(err, data, fields) {
        if (err) throw err
        res.send('Good')
    })
})

app.post('/addpeople', (req, res) => {
    const insert = req.body
    var sql = `INSERT INTO employee SET ?`
    connection.query(sql, insert, function(err, data, fields) {
        if (err) throw err
        res.send('Good')
    })
})

app.post('/delete_leader', (req, res) => {
    const id = req.body.id_delete
    var sql = `DELETE FROM people WHERE id = '${id}'`
    connection.query(sql, function(err, data) {
        if (err) throw err
        console.log('deleted' + id)
    })
})

app.post('/delete_people', (req, res) => {
    const id = req.body.id_delete
    var sql = `DELETE FROM employee WHERE id = '${id}'`
    connection.query(sql, function(err, data) {
        if (err) throw err
        console.log('deleted' + id)
    })
})


app.post('/delete_peopleproject', (req, res) => {
    const id = req.body.id_delete
    var sql = `DELETE FROM project_team WHERE id = '${id}'`
    connection.query(sql, function(err, data) {
        if (err) throw err
        console.log('deleted' + id)
    })
})

app.post('/active_leader', (req, res) => {
    var id = req.body.id_update
    var value = req.body.value
    var sql = `UPDATE people SET active = '${value}' WHERE id = '${id}'`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        res.send('good')
    })
})

app.post('/active_people', (req, res) => {
    var id = req.body.id_update
    var value = req.body.value
    var sql = `UPDATE employee SET active = '${value}' WHERE id = '${id}'`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        res.send('good')
    })
})

app.post('/updatePeople', (req, res) => {
    const leadership = req.body.leadership

    leadership.forEach((leader, index) => {
        connection.query(
            'UPDATE people SET `priority` = ? WHERE `id` = ?', [leader.priority, leader.id],
            (error, results) => {
                if (error) {
                    console.error('Failed to update project:', error)
                }
            },
        )
    })

    res.send('Leader updated successfully')
})

app.post('/updatePeopleEmployee', (req, res) => {
    const employee = req.body.people

    employee.forEach((employ, index) => {
        connection.query(
            'UPDATE employee SET `priority` = ? WHERE `id` = ?', [employ.priority, employ.id],
            (error, results) => {
                if (error) {
                    console.error('Failed to update project:', error)
                }
            },
        )
    })

    res.send('Leader updated successfully')
})

module.exports = app;
