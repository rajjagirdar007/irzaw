const express = require('express')
const app = express()
const port = 3024
const path = require('path')
const fs = require('fs')
var http = require('http')
const history = require('connect-history-api-fallback')
const mysql = require('mysql2')
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: '/var/www/irzaw.com/server/public',
})
const upload = multer({ storage: storage })

const storage1 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/var/www/organized.mpengs.com/public/images/projects/') // Adjust the destination folder as needed
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname) // Keep the original filename
    },
})

const upload1 = multer({ storage: storage1 })

const storage_personal = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/var/www/organized.mpengs.com/public/images/people/personal/') // Adjust the destination folder as needed
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname) // Keep the original filename
    },
})

const upload_personal = multer({ storage: storage_personal })

const storage_leadership = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/var/www/organized.mpengs.com/public/images/people/leadership/') // Adjust the destination folder as needed
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname) // Keep the original filename
    },
})

const upload_leadership = multer({ storage: storage_leadership })

//app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '10mb' })) // Adjust the limit as per your requirement

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('/var/www/irzaw.com/web_front/irzaw_v2/dist'))
app.use(
    history({
        disableDotRule: true,
        verbose: true,
    }),
)
app.use(express.static('/var/www/irzaw.com/web_front/irzaw_v2/dist'))

app.use(
    cors({
        origin: '',
        optionsSuccessStatus: 200,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: ['Content-Type', 'Authorization'],
    }),
)

//app.use(cors());
/*
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'mpengslocal',
    password: 'Password123',
    database: 'irzaw',
})
*/
const connection = require(path.join(__dirname, "./db.js"));
app.post('/upload', upload.array('images'), (req, res) => {
    console.log(req.files)
    console.log('insert')
})

app.post('/uploadmultiple', upload1.array('image', 5), (req, res) => {
    try {
        console.log(req.files) // Uploaded files can be accessed here

        // Handle processing of the uploaded files and any other logic

        res.status(200).json({ message: 'Images uploaded successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'An error occurred' })
    }
})

app.get('/', (req, res) => {
    res.sendFile('/var/www/irzaw.com/web_front/irzaw_v2/dist/index.html')
})

app.get('/login_irzaw', (req, res) => {
    res.sendFile('/var/www/irzaw.com/server/views/templates/login.html')
})

app.get('/upload_this', (req, res) => {
    res.sendFile('/var/www/irzaw.com/server/views/templates/image.html')
})

app.get('/people_panel', (req, res) => {
    res.send('manage_people')
})

//user has access to the app. Implement the session logic here and redirect the user to the actual application
app.post('/login_irzaw', (req, res) => {
    //username and permission information from jalfry
    let u = req.body.username
    let p = req.body.permission

    //store user information in session
    req.session.username = u
    req.session.role = p
    req.session.loggedin = true

    //redirect user to the application
    res.send({ url: `https://www.irzaw.com` })
})

app.get('/data', (req, res) => {
    var sql = 'SELECT * FROM projects WHERE active = 1 ORDER BY priority ASC'
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

app.get('/getFilters_level1', (req, res) => {
    var sql = 'SELECT * FROM tags WHERE level=1'
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        res.send(rows)
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

app.get('/get_subsubfilters/:id', (req, res) => {
    var id = req.params.id

    var sql = `SELECT * FROM tags WHERE level=3 AND parent_id = ${id}`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
})

app.get('/gettags', (req, res) => {
    var sql = `SELECT * FROM tags`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
})

app.get('/get_allTagsfront', (req, res) => {
    var sql = `SELECT * FROM tags WHERE level=1 AND active=1`
    connection.query(sql, function(err, rows1, fields1) {
        if (err) throw err
        var s = `SELECT * FROM tags WHERE level=2 AND active=1`
        connection.query(s, function(err, rows2, fields2) {
            if (err) throw err
            var q = `SELECT * FROM tags WHERE level=3 AND active=1`
            connection.query(q, function(err, rows3, fields3) {
                if (err) throw err

                var object = {
                    level1: rows1,
                    level2: rows2,
                    level3: rows3,
                }

                console.log(object)

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

                console.log(object)
                res.send(object.level1)
            })
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

app.get('/get_allTags3', (req, res) => {
    var sql = `SELECT * FROM tags WHERE level=1`
    connection.query(sql, function(err, rows1, fields1) {
        if (err) throw err

        var s = `SELECT * FROM tags WHERE level=2`
        connection.query(s, function(err, rows2, fields2) {
            if (err) throw err

            var q = `SELECT * FROM tags WHERE level=3`
            connection.query(q, function(err, rows3, fields3) {
                if (err) throw err

                var r = `SELECT * FROM tags WHERE level=4`
                connection.query(r, function(err, rows4, fields4) {
                    if (err) throw err

                    var t = `SELECT * FROM tags WHERE level=5`
                    connection.query(t, function(err, rows5, fields5) {
                        if (err) throw err

                        var object = {
                            level1: rows1,
                            level2: rows2,
                            level3: rows3,
                            level4: rows4,
                            level5: rows5,
                        }

                        // Add subfilters arrays to each level1 and level2 object
                        for (e = 0; e < object.level1.length; e++) {
                            object.level1[e].subfilters = []
                        }
                        for (f = 0; f < object.level2.length; f++) {
                            object.level2[f].subfilters = []
                        }

                        // Add level3 objects to their respective level2 subfilters arrays
                        for (o = 0; o < object.level2.length; o++) {
                            for (j = 0; j < object.level3.length; j++) {
                                if (object.level3[j].parent_id == object.level2[o].id) {
                                    object.level2[o].subfilters.push(object.level3[j])
                                }
                            }
                        }

                        // Add level4 objects to their respective level3 subfilters arrays
                        for (p = 0; p < object.level3.length; p++) {
                            for (q = 0; q < object.level4.length; q++) {
                                if (object.level4[q].parent_id == object.level3[p].id) {
                                    object.level3[p].subfilters.push(object.level4[q])
                                }
                            }
                        }

                        // Add level5 objects to their respective level4 subfilters arrays
                        for (r = 0; r < object.level4.length; r++) {
                            for (s = 0; s < object.level5.length; s++) {
                                if (object.level5[s].parent_id == object.level4[r].id) {
                                    object.level4[r].subfilters.push(object.level5[s])
                                }
                            }
                        }

                        // Add level2 objects to their respective level1 subfilters arrays
                        for (i = 0; i < object.level1.length; i++) {
                            for (k = 0; k < object.level2.length; k++) {
                                if (object.level2[k].parent_id == object.level1[i].id) {
                                    object.level1[i].subfilters.push(object.level2[k])
                                }
                            }
                        }
                        console.log('yes')

                        // Send the modified level1 array as a response
                        res.send(object.level1)
                    })
                })
            })
        })
    })
})

app.get('/get_allTags2', (req, res) => {
    var sql = `SELECT * FROM tags WHERE level=1`
    connection.query(sql, function(err, rows1, fields1) {
        if (err) throw err
        var s = `SELECT * FROM tags WHERE level=2`
        connection.query(s, function(err, rows2, fields2) {
            if (err) throw err
            var q = `SELECT * FROM tags WHERE level=3`
            connection.query(q, function(err, rows3, fields3) {
                if (err) throw err
                res.send(rows1.concat(rows2, rows3))
            })
        })
    })
})

app.post('/setActive/:id', (req, res) => {
    var id = req.params.id

    var sql = `UPDATE tags SET active = !active WHERE id = '${id}'`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        res.send('good')
    })
})

app.post('/active_project', (req, res) => {
    var id = req.body.id_update
    var value = req.body.value
    var sql = `UPDATE projects SET active = '${value}' WHERE id = '${id}'`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        res.send('good')
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

app.post('/delete_filter', (req, res) => {
    const id = req.body.id_delete
    var sql = `DELETE FROM tags WHERE id = '${id}'`
    connection.query(sql, function(err, data) {
        if (err) throw err
        console.log('deleted' + id)
    })
})

app.post('/insert', (req, res) => {
    const insert = req.body
    var sql = `INSERT INTO tags SET ?`
    connection.query(sql, insert, function(err, data, fields) {
        if (err) throw err
        res.send('Good')
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

app.post('/editproject/:id', (req, res) => {
    const insert = req.body
    const id = req.params.id
    var sql = `UPDATE projects SET ? where id = '${id}'`
    connection.query(sql, insert, function(err, data, fields) {
        if (err) throw err
        res.send('Good')
    })
})

app.post('/edit_name', (req, res) => {
    const name = req.body.name
    const id = req.body.id
    var sql = `UPDATE tags SET name = '${name}' WHERE id = '${id}'`
    connection.query(sql, function(err, data, fields) {
        if (err) throw err
        res.send('Good')
    })
})

app.post('/post_activity1', (req, res) => {
    const insert = req.body
    var sql = `UPDATE projects SET ? WHERE level=1`
    connection.query(sql, insert, function(err, data, fields) {
        if (err) throw err
        res.send('Good')
    })
})

//login/register
app.post('/register', (req, res) => {
    const register = req.body
    console.log(register)
    var sql = `INSERT INTO account SET ?`
    connection.query(sql, register, function(err, data, fields) {
        if (err) throw err
        res.send('Good')
    })
})

app.post('/login', (req, res) => {
    const register = req.body
    console.log(register)
    var sql = `SELECT * FROM  account WHERE username = '${register.username}' AND password = '${register.password}'`
    connection.query(sql, register, function(err, data, fields) {
        if (err) throw err
        if (data.length > 0) {
            jwt.sign({ data }, 'dirtysprite', { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    console.log(err)
                }
                console.log(token)
                res.send(token)
            })
        } else {
            console.log('not signed in')
        }
        console.log(data)
    })
})

app.post('/change', (req, res) => {
    const id = req.body.id
    const name = req.body.name

    // Create a MySQL query to update the row with given ID
    const sql = `UPDATE tags  SET name = '${name}' WHERE id = ${id}`

    // Execute the query and handle the response
    connection.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(`Row with ID ${id} has been updated`)
    })
})

app.post('/login_jalfry_post', (req, res) => {
    //username and permission information from jalfry
    let u = req.body.username
    let p = req.body.permission

    //store user information in session
    req.session.username = u
    req.session.role = p
    req.session.loggedin = true

    //redirect user to the application
    res.send({ url: `https://irzaw.com/dashboard` })
})

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

    res.send('Projects updated successfully')
})

app.post('/updatePeople', (req, res) => {
    const leadership = req.body.leadership

    // Perform the necessary database update operations
    // For example, assuming you have a 'projects' table with 'id' and 'order' columns:
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

    // Perform the necessary database update operations
    // For example, assuming you have a 'projects' table with 'id' and 'order' columns:
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

app.get('/getProjects_count', (req, res) => {
    var id = req.params.id

    var sql = `SELECT COUNT(*) AS project_count FROM projects WHERE active = true`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        var obj = {
            count: rows[0].project_count,
        }
        res.send({ data: obj })
    })
})

app.get('/projects11', (req, res) => {
    var sql = `SELECT id, client, location, date, name, image, category FROM projects WHERE active = 1 ORDER BY priority ASC`
    var data = []
    var array = []
    connection.query(sql, function(err, results) {
        if (err) throw err
            //    console.log(results);

        for (var i = 0; i < results.length; i++) {
            var tb = results[i].image.split(',')[0]
            var obj = {
                tb: tb,
                id: results[i].id,
                client: results[i].client,
		name: results[i].name,
                category: results[i].category,
                location: results[i].location,
                date: results[i].date,
            }

            data.push(obj)
        }
        res.send({ data: data })
        console.log(data)
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

// app.get('/peopleProjects/:id', (req, res) => {
//     var id = req.params.id
//     var sql = `SELECT * FROM project_team WHERE project_id = '${id}'`
//     connection.query(sql, function(err, rows, fields) {
//         if (err) throw err
//         console.log(rows);
//         res.send(rows);
//     })
// })

app.post('/addPeopleProject', (req, res) => {
    const insert = req.body;
    var sql = `INSERT INTO project_team SET ?`
    connection.query(sql, insert, function(err, data, fields) {
        if (err) throw err
        res.send('Good')
    })
})


// app.get('/peopleProjects/:id', (req, res) => {
//     var id = req.params.id;
//     var sql = `SELECT * FROM project_team WHERE project_id = '${id}'`;

//     connection.query(sql, function(err, rows, fields) {
//         if (err) throw err;

//         // Iterate through the rows and fetch additional data as needed
//         const results = [];
//         const numRows = rows.length - 1;
//         console.log(numRows);

//         function fetchAdditionalData(index) {
//             if (index >= numRows) {
//                 res.send(results);
//                 return;
//             }

//             const row = rows[index];
//             console.log(row);
//             // Check if leader_id is null
//             if (row.leader_id === null) {
//                 const leaderSql = `SELECT * FROM employee WHERE id = ${row.employee_id}`;
//                 connection.query(leaderSql, function(err, leaderData) {
//                     if (err) throw err;
//                     row.leader_data = leaderData[0];
//                     results.push(row);
//                     fetchAdditionalData(index + 1);
//                 });
//             } else {
//                 // leader_id is not null, fetch employee data
//                 const employeeSql = `SELECT * FROM people WHERE id = ${row.leader_id}`;
//                 connection.query(employeeSql, function(err, employeeData) {
//                     if (err) throw err;
//                     row.employee_data = employeeData[0];
//                     results.push(row);
//                     fetchAdditionalData(index + 1);
//                 });
//             }
//         }

//         // Start fetching data
//         fetchAdditionalData(0);
//     });
// });


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


//expertise
app.get('/get_descriptions/:id', (req, res) => {
    var id = req.params.id

    var sql = `SELECT description FROM expertise WHERE type = '${id}'`
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err
        res.send(rows)
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

app.post('/edit_description/:id', (req, res) => {
        var id = req.params.id
        var description = req.body.description
        var sql = `UPDATE expertise SET description = '${description}' WHERE type = '${id}'`
        connection.query(sql, function(err, rows, fields) {
            if (err) throw err
        })
    })
    //PEOPLE
    //
    //
    //
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

app.listen(port, () => {
    console.log(`Listening in on ${port}`)
})
