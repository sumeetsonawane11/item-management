const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.CreateUser = (req, res) => {

    // bcrypt is used to hash the password which is an async task
    bcrypt.hash(req.body.password, 10)
        .then((hashPassword) => {
            const user = new User({
                email: req.body.email,
                password: hashPassword
            });
            user.save()
                .then((user) => {
                    res.status(201).json({
                        message: 'User created successfully',
                        userId: user._id
                    })
                })
                .catch((err) => {
                    res.json(500).json({
                        error: err
                    })
                });
        })
};

exports.LoginUser = (req, res) => {
    let fetchedUser;
    User.findOne({ email: req.body.email }) // Checks only if email exists
        .then(user => {
            if (!user) {
                res.status(401).json({
                    message: 'Invalid Authentication credentials'
                });
            }
          
            fetchedUser = user;// If user exists, check password
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(isPasswordCorrect => {
            if (!isPasswordCorrect) { // If password does not match    
                res.status(401).json({
                    message: 'Invalid Authentication credentials'
                });
            }

            // If password matched, create token 
            const token = jwt.sign(
                { email: req.body.email, userId: fetchedUser._id },
                'sample_secret_token',
                { expiresIn: '1h' }
            );

            return res.status(200).json({
                token: token,
                userId: fetchedUser._id,
                expiresIn: 3600,
                userEmailId: req.body.email
            });
        });
};