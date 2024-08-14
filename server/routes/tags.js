const express = require('express');
const app = express.Router();
const connection = require('/var/www/dev.irzaw.com/server/services/db/irzaw.js');
const tags_upload = require('/var/www/dev.irzaw.com/server/services/upload/tags_upload.js');

app.post('/insert', (req, res) => {
    const insert = req.body
    var sql = `INSERT INTO tags SET ?`
    connection.query(sql, insert, function(err, data, fields) {
        if (err) throw err
        res.send('Good')
    })
})

app.post('/delete_filter', (req, res) => {
    const id = req.body.id_delete
    var sql = `DELETE FROM tags WHERE id = '${id}'`
    connection.query(sql, function(err, data) {
        if (err) throw err
        console.log('deleted' + id)
    })
})

app.post('/change', (req, res) => {
    const id = req.body.id
    const name = req.body.name

    const sql = `UPDATE tags  SET name = '${name}' WHERE id = ${id}`

    connection.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(`Row with ID ${id} has been updated`)
    })
})

app.post('/active_filters', (req, res) => {
    var id = req.body.id_update
    var value = req.body.value
    var sql = `UPDATE tags SET active = '${value}' WHERE id = '${id}'`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        res.send('good')
    })
})

app.get('/get_tags', (req, res) => {
    const query = 'SELECT * FROM tags';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching tags: ' + error.message);
            res.status(500).json({ error: 'Failed to fetch tags' });
        } else {
            res.json(results);
        }
    });
});

app.get('/get_tags/:id', (req, res) => {
    const tagId = req.params.id;
    const query = 'SELECT * FROM tags WHERE id = ?';

    connection.query(query, [tagId], (error, results) => {
        if (error) {
            console.error('Error fetching tag: ' + error.message);
            res.status(500).json({ error: 'Failed to fetch the tag' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Tag not found' });
            }
        }
    });
});

app.post('/edittag/:id', (req, res) => {
    const tagId = req.params.id;
    const updatedTagData = req.body;
    const query = 'UPDATE tags SET ? WHERE id = ?';

    connection.query(query, [updatedTagData, tagId], (error) => {
        if (error) {
            console.error('Error updating tag: ' + error.message);
            res.status(500).json({ error: 'Failed to update the tag' });
        } else {
            res.status(200).send('Tag updated successfully');
        }
    });
});

app.post('/tag_upload', tags_upload.single('image'), (req, res) => {
    try {
        console.log(req.file) 


        res.status(200).json({ message: 'Images uploaded successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'An error occurred' })
    }
})

module.exports = app;
