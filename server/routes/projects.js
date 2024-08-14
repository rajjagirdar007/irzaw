const express = require('express');
const app = express.Router();
const path = require('path');
const connection = require('/var/www/dev.irzaw.com/server/services/db/irzaw.js');
const project_upload = require('/var/www/dev.irzaw.com/server/services/upload/projects_upload.js');
const logAction = require('/var/www/dev.irzaw.com/server/services/add_log.js'); 

app.get('/getProjects', (req, res) => {
    var id = req.params.id

    var sql = `SELECT * FROM projects ORDER BY priority ASC`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
})

app.post('/updateProjects', (req, res) => {
    const projects = req.body.projects
    const update = req.body.update
    // Perform the necessary database update operations
    // For example, assuming you have a 'projects' table with 'id' and 'order' columns:
    projects.forEach((project, index) => {
        connection.query(
            'UPDATE projects SET `priority` = ? WHERE `id` = ?', [project.priority, project.id],
            (error, results) => {
                if (error) {
                    console.error('Failed to update project:', error)
                }
            },
        )
    })

    logAction(update);	
    res.send('Projects updated successfully')
})

app.post('/delete_project', (req, res) => {
    const id = req.body.id_delete
    var sql1 = `DELETE FROM project_team WHERE project_id = '${id}'`
    connection.query(sql1, function(err, data) {
        if (err) throw err
        console.log('deleted' + id)
        var sql = `DELETE FROM projects WHERE id = '${id}'`
        connection.query(sql, function(err, data) {
            if (err) throw err
            console.log('deleted' + id)
        })
    })
})

app.post('/projects_by_cat', (req, res) => {
    const  categories  = req.body.sele;
    const trimmedArray = categories.filter(value => value != null);

  console.log(trimmedArray);
    const queries = trimmedArray.map(cat => {
      return `SELECT * FROM projects WHERE category LIKE '%${cat}%'`;
    });

    
    const query = queries.join(' INTERSECT ');
  
    connection.query(query, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      console.log(results); 
      res.json(results);
    });
  });

  app.post('/projects_not_in_cat', (req, res) => {
    const categories = req.body.sele;
    const trimmedArray = categories.filter(value => value != null);
    console.log(trimmedArray);
  
    const query = `
      SELECT * FROM projects
      WHERE NOT EXISTS (
        SELECT * FROM projects AS p
        WHERE category LIKE CONCAT('%', ? , '%')
      )
    `;
  
    connection.query(query, [trimmedArray.join('%'), ...trimmedArray], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
  
      res.json(results);
    });
  });
  

app.post('/active_project', (req, res) => {
    var id = req.body.id_update
    var value = req.body.value
    var sql = `UPDATE projects SET active = '${value}' WHERE id = '${id}'`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        res.send('good')
    })
})

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


app.get('/get_allTags', (req, res) => {
    var sql = `SELECT * FROM tags WHERE level=1 `
    connection.query(sql, function(err, rows1, fields1) {
        if (err) throw err
        var s = `SELECT * FROM tags WHERE level=2 `
        connection.query(s, function(err, rows2, fields2) {
            if (err) throw err
            var q = `SELECT * FROM tags WHERE level=3 `
            connection.query(q, function(err, rows3, fields3) {
                if (err) throw err

                var object = {
                    level1: rows1,
                    level2: rows2,
                    level3: rows3,
                }

                for (e = 0; e < object.level1.length; e++) {
                    object.level1[e].subfilters = []
                }
                for (f = 0; f < object.level2.length; f++) {
                    object.level2[f].subfilters = []
                }

                for (o = 0; o < object.level2.length; o++) {
                    for (j = 0; j < object.level3.length; j++) {
                        if (object.level3[j].parent_id == object.level2[o].id) {
                            object.level2[o].subfilters.push(object.level3[j])
                        }
                    }
                }

                for (i = 0; i < object.level1.length; i++) {
                    for (k = 0; k < object.level2.length; k++) {
                        if (object.level2[k].parent_id == object.level1[i].id) {
                            object.level1[i].subfilters.push(object.level2[k])
                        }
                    }
                }

                res.send(object.level1)
            })
        })
    })
})

app.get('/getFilters_level1', (req, res) => {
    var sql = 'SELECT * FROM tags WHERE level=1'
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
})

app.get('/client', (req, res) => {
    var sql = 'SELECT * FROM client'
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
})

app.post('/addproject', (req, res) => {
    const insert = req.body.form
    const team = req.body.team_tag.leader_id

    var sql = `INSERT INTO projects SET ?`
    connection.query(sql, insert, function(err, data, fields) {
        if (err) throw err
        const id = data.insertId
        var sql2 = `INSERT INTO project_team SET project_id = '${id}', leader_id = '${team}'`
        connection.query(sql2, function(err, data, fields) {
            if (err) throw err
        })
    })
})

app.get('/get_subfilters/:id', (req, res) => {
    var id = req.params.id

    var sql = `SELECT * FROM tags WHERE level=2 AND parent_id = ${id}`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
})

app.get('/getProject/:id', (req, res) => {
    var id = req.params.id

    var sql = `SELECT * FROM projects WHERE id = '${id}'`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        var object = {
            category: rows[0].category,
            client: rows[0].client,
            date: rows[0].date,
            description: rows[0].description.toString('utf8'),
            id: rows[0].id,
            image: rows[0].image,
            location: rows[0].location,
            name: rows[0].name,
            partners: rows[0].partners,
            priority: rows[0].priority,
            project_number: rows[0].project_number,
        }
        var array = []
        array.push(object)
        res.send(array)
    })
})

app.get('/peopleProjects/:id', (req, res) => {
    const projectId = req.params.id;
    const projectTeamSql = 'SELECT * FROM project_team WHERE project_id = ?';

    connection.query(projectTeamSql, [projectId], (err, projectTeamRows) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        // Create an array to store promises for fetching additional data
        const fetchPromises = projectTeamRows.map(row => {
            return new Promise((resolve, reject) => {
                if (row.leader_id === null) {
                    const leaderSql = 'SELECT * FROM employee WHERE id = ?';
                    connection.query(leaderSql, [row.engineer_id], (err, leaderData) => {
                        if (err) {
                            console.error(err);
                            reject(err);
                        } else {
                            row.employee_data = leaderData[0];
                            resolve(row);
                        }
                    });
                } else {
                    const employeeSql = 'SELECT * FROM people WHERE id = ?';
                    connection.query(employeeSql, [row.leader_id], (err, employeeData) => {
                        if (err) {
                            console.error(err);
                            reject(err);
                        } else {
                            row.employee_data = employeeData[0];
                            resolve(row);
                        }
                    });
                }
            });
        });

        // Use Promise.all to wait for all promises to resolve
        Promise.all(fetchPromises)
            .then(resultRows => {
                console.log(resultRows);
                res.send(resultRows);
            })
            .catch(error => {
                console.error(error);
                res.status(500).send('Internal Server Error');
            });
    });
});


app.post('/editproject/:id', (req, res) => {
    const insert = req.body
    const id = req.params.id
    var sql = `UPDATE projects SET ? where id = '${id}'`
    connection.query(sql, insert, function(err, data, fields) {
        if (err) throw err
        res.send('Good')
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


app.post('/addPeopleProject', (req, res) => {
    const insert = req.body;
    var sql = `INSERT INTO project_team SET ?`
    connection.query(sql, insert, function(err, data, fields) {
        if (err) throw err
        res.send('Good')
    })
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

app.post('/deselect_filters', (req, res) => {
    var deselected = req.body.filter;
    var idArray = req.body.id;

    idArray.forEach((id) => {
        var updateQueries = deselected
            .filter(value => value !== null)
            .map(filteredValue => `UPDATE projects SET category = REPLACE(category, '${filteredValue}', '') WHERE id = ${id}`);

        updateQueries.forEach(query => {
            connection.query(query, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
            });
        });
    });

    res.status(200).send('Filters deselected successfully');
});





app.post('/uploadmultiple', project_upload.array('image', 5), (req, res) => {
    try {
        console.log(req.files) // Uploaded files can be accessed here


        res.status(200).json({ message: 'Images uploaded successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'An error occurred' })
    }
})

module.exports = app;
