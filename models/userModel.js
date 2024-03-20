const con = require("../config/db_connection");

// Get User 
exports.findUser = (email, password, callback) => {
    con.query(`select * from users where email = '${email}' AND  password ='${password}' `, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        if (result.length > 0) {
            return callback(true);
        }
        return callback(false);
    });
}

// Add User
exports.addUser = (name, email, password, callback) => {
    con.query(`INSERT INTO users (name, email,password) VALUES ('${name}', '${email}','${password}')`, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        if (result.affectedRows) {
            return callback({ status: true, data: { id: result.insertId, name: name } });
        }
        return callback({ status: false });
    })
}