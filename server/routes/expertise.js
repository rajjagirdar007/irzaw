const express = require('express');
const app = express.Router();
const connection = require('/var/www/dev.irzaw.com/server/services/db/irzaw.js');
const upload_expertise = require('/var/www/dev.irzaw.com/server/services/upload/expertise_upload.js');

app.get('/get_descriptions/:id', async (req, res) => {
    var id = req.params.id

    var sql = `SELECT * FROM expertise WHERE type = '${id}'`
    const [rows, fields] = await connection.execute(sql);
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
            res.send(rows)
    })
    //try {
    //    const id = req.params.id;
    //    const sql = `SELECT * FROM expertise WHERE type = '${id}'`;

        
        //const [rows, fields] = await connection.execute(sql);

        //res.send(rows);
    //} catch (err) {
        //console.error(err);
        //res.status(500).send("Internal Server Error");
    //}
    
})

app.get('/get_expertise/:id', (req, res) => {
    var id = req.params.id

    var sql = `SELECT * FROM expertise WHERE id = '${id}'`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
})

app.get('/expertise_details/:id', (req, res) => {
    var id = req.params.id

    var sql = `SELECT * FROM expertise WHERE id = '${id}'`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
	console.log(rows);   
        res.send(rows)
    })
})

app.get('/expertise_projects/:id', (req, res) => {
    var category = req.params.id
      const sql = 'SELECT * FROM projects WHERE category LIKE ?';
  connection.query(sql, [`%${category}%`], (err, results) => {
    if (err) {
      console.error('Error executing the query: ' + err);
      res.status(500).json({ error: 'An error occurred while fetching data' });
      return;
    }
	  res.send(results);
})
})

app.get('/expertise_tags/:id', (req, res) => {
   var tag = req.params.id
   const sql = `SELECT * FROM tags WHERE parent_id = ${tag} AND active = 1`;
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
        res.send(rows)
    })
  
})

app.post(
    '/uploadexpertiseimage',
    upload_expertise.array('expertise'),
    (req, res) => {
        console.log(req.files)
        console.log('insert')
    },
)

app.post('/editexpertise/:id', (req, res) => {
  const { type, description, headline, image } = req.body;
  const expertiseId = req.params.id;

  const sql = `UPDATE expertise SET type = ?, description = ?, headline = ?, image = ? WHERE id = ?`;

  connection.query(sql, [type, description, headline, image, expertiseId], (err, result) => {
    if (err) {
      console.error('MySQL update error: ' + err.message);
      res.status(500).json({ message: 'Failed to update expertise data' });
    } else {
      console.log('Expertise data updated');
      res.json({ message: 'Expertise data updated' });
    }
  });
});

app.get('/get_allexpertise', async (req, res) => {
   
    var sql = `SELECT * FROM expertise`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
    //try {
        //const sql = `SELECT * FROM expertise`;
        //const [rows, fields] = await connection.execute(sql);

        //res.send(rows);
    //} catch (err) {
        //console.error(err);
        //res.status(500).send("Internal Server Error");
    //}
})

app.post('/change_filters', (req, res) => {
    var filter = req.body.filter
    var id = req.body.id
    var idd = [id]
    var sql = `UPDATE projects SET category = '${filter}' WHERE id in (?)`
    connection.query(sql, idd, function(err, rows, fields) {
        if (err) throw err
    })
})

app.post('/edit_description/:id', (req, res) => {
        var id = req.params.id
        var description = req.body.description
        var sql = `UPDATE expertise SET description = '${description}' WHERE type = '${id}'`
        connection.query(sql, function(err, rows, fields) {
            if (err) throw err
        })
    })

module.exports = app;
