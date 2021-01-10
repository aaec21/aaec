const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const ctSchema = new mongoose.Schema({
    b1: {
        type: String
    },
    b2: {
        type: String
    },
    b3: {
        type: String
    },
    b4: {
        type: String
    },
    c1: {
        type: String
    },
    c2: {
        type: String
    },
    c3: {
        type: String
    },
    c4: {
        type: String
    },
    c5: {
        type: String
    },
    c6: {
        type: String
    },
    c7: {
        type: String
    },
    c8: {
        type: String
    },
    ca1: {
        type: String
    },
    ca2: {
        type: String
    },
    ca3: {
        type: String
    },
    ca4: {
        type: String
    },
    ca5: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

}, {
    timestamps: true
})

ctSchema.methods.generateAuthToken = async function () {

    const ct = this
    const token = jwt.sign({
        _id: ct._id.toString()
    }, process.env.JWT_SECRET)
    ct.tokens = ct.tokens.concat({
        token
    })
    await ct.save()
    return token
}
ctSchema.methods.toJSON = function () {

    const ct = this
    const ctObject = ct.toObject()

    delete ctObject.tokens
    delete ctObject.__v

    return ctObject
}

const Ct = mongoose.model('Ct', ctSchema)

module.exports = Ct