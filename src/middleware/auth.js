const jwt = require('jsonwebtoken')
const Ct = require('../models/ct')

const auth = async (req, res, next) => {
    try {
        console.log('Starting')
        //Get the token from the header
        const token = req.header('Authorization').replace('Bearer ', '')

        // Decode the token to get the User's ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //Find the user with the decodedID and token
        const ct = await Ct.findOne({
            _id: decoded._id,
            'tokens.token': token
        })

        //Return 401 if no user is found
        if (!ct) {
            throw new Error()
        }

        req.token = token
        req.ct = ct

        //When User is Authenticated, next will be called
        next()

    } catch (e) {
        res.status(401).send({
            error: 'Not Authorized'
        })
    }
}

module.exports = auth