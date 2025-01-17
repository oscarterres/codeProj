const connection = require('../config/db');
const controller = {};
const multer = require('multer');

//Listar usuarios
controller.listUsers = (req, res) => {
    let listSql = 'SELECT * FROM user';
    connection.query(listSql, (error, data) => {
        if (err) {
            throw err;
        } else {
            // console.log(data)
            res.render('users', { resultsUsers: data })
        }
    })
};
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/avatars')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });


//Crear User con INSERT
controller.createUser = upload.single('avatar'),(req, res) => {
    console.log(req.body);
    let name = req.body.name;
    let email = req.body.email;
    let user = req.body.user;
    let password = req.body.password;
    let avatar = req.file.originalname;

    let insertSql = 'INSERT INTO user set?';

    connection.query(insertSql, { name, email, user, password ,avatar},
        (error, createResult) => {
            res.redirect('/users');
        }
    )
};

//Borrar usuario con DELETE FROM table
controller.deleteUser = (req,res)=> {
    let user_id = req.params.user_id;
    let deleteSql = 'DELETE FROM user WHERE user_id =';
    connection.query(deleteSql + user_id, (err, deleteUser) => {
        if (!user_id) {
            res.send('El usuario no existe en la Base de datos');
            throw err;
        }
        res.redirect('/users')
    })
};

//Editar usuario igualando el id al de la tabla
controller.editUser = (req, res) => {
    let user_id = req.params.user_id;
    let editSql = `SELECT * FROM user WHERE user_id = '${user_id}' `;
    connection.query(editSql, (error, resultEdit) => {
        res.send(resultEdit);
    })
}
//Actualizamos datos de User con UPDATE
controller.updateUser= (req, res)=>{
    let user_id = req.params.user_id; //toma el ID de la URL
    let { name, email, user, password ,avatar} = req.body;

    let updateSql = 'UPDATE user set? WHERE user_id=' ;
    connection.query(updateSql + user_id, {name, email, user, password ,avatar}, (error, resultsUpdate)=>{
        res.render('user', {
            results: resultsUpdate[0]
        })
    })
};

//Exportamos el Controller
module.exports = controller;