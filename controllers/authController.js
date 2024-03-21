const { findUser, addUser } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { body, validationResult } = require('express-validator');
var fs = require('fs');
const Logger =require('../helpers/logger');
const logger = new Logger('auth-login','storage/logs')


//User  Login Fun
exports.userLogin = (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error({Validation:errors})
        res.formError(errors);
    } else {
        findUser(email, password, (result) => {
            
            if (result) {
                const token = generateToken();
                console.log('token??', token);
                logger.success(token)
              return res.response({ token }, "login successfully done!!", 200);
            } else {
                logger.error({Result:result})
                res.response({}, "invalid login !!", 201);
            }
        });
        

    }

}



//Create User Fun
exports.createUser = (req, res) => {
    const { name, email, password } = req.body;
    console.log({ name, email, password });
    const data = [
        body('password', 'Your password must be at least 5 characters').not().isEmpty(),
        body('email', 'Email length should be 10 to 30 characters')
            .isEmail().isLength({ min: 30, max: 50 }),
        body('name', 'Name length should be 10 to 20 characters')
            .isLength({ min: 10, max: 20 }),
    ];
    console.log('>>', data)
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        res.json(errors)
    }

    // If no error occurs, then this
    // block of code will run

    if (email === undefined || name === undefined || password === undefined) {
        res.status(404).json({
            status: 404,
            message: 'user not created'
        });
    } else {
        findUser(email, password, (result) => {
            if (result) {
                res.response({}, "user already exists!!!!", 404);
            } else {
                addUser(name, email, password, (resp) => {
                    if (resp.status) {
                        res.response(resp.data, "user created successfully!!", 200);
                    } else {
                        res.response({}, "user not created !!", 201);
                    }
                })
                //  res.status(422).json({ errors: errors.array() })
            }
        })
    }
}

generateToken = () => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    //  Generate Secret Key In Jwt 

    // const jwtSecretKey = crypto.randomBytes(32).toString('hex');
    // console.log('jwtSecretKey@@@@',jwtSecretKey)
    let data = {
        time: Date(),
        userId: 1,
    }
    const token = jwt.sign(data, jwtSecretKey, { expiresIn: '100s' });
    // console.log('token??', token)
    return token;
}


