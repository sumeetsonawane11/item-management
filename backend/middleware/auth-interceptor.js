// This middleware will act as an interceptor to all incoming request
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // console.log(`Authorization token: ---- ${req.headers.authorization}`)
        const token = req.headers.authorization.split(' ')[1];// Extract the token from authorization headers
        // console.log(`Token : ---- ${token}`)
        const decodedToken = jwt.verify(token, 'sample_secret_token');
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        // console.log(`Req user data ${req.userData}`)
        next();
    } catch (err) {
        res.status(401).json({
            message: 'You are not authenticated. Please login'
        })
    }
}

//  Key is  'sample_secret_token', value is an Object  { email: req.body.email, userId: fetchedUser._id },
//  const token = jwt.sign(
//     { email: req.body.email, userId: fetchedUser._id },
//     'sample_secret_token',
//     { expiresIn: '1h' }
// );


