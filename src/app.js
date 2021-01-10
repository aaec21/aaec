const express = require('express')
require('./db/mongoose')

var notify = require('./emails/noti')

var cors = require('cors')


const app = express()
const port = process.env.PORT

app.use(cors()) // Use this after the variable declaration
const Ct = require('./models/ct')
const auth = require('./middleware/auth')
const authAdm = require('./middleware/authAdm')

app.use(express.json())


app.post('/createa', async (req, res) => {
    console.log(req.body)
    const ct = new Ct(req.body)
    try {
        await ct.save()
        const token = await ct.generateAuthToken()
        await notify('CreateA ' + ct._id, 'To Check')
        res.status(201).send({
            token
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

app.patch('/createb', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"]

    try {
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        if (!isValidOperation)
            throw new Error('Invalid Operation')

        updates.forEach((update) => req.ct[update] = req.body[update])
        await req.ct.save()

        await notify('CreateB ' + req.ct._id, 'To Check')
        console.log('STILL FINE')
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
    }
})

app.patch('/createc', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ["ca1", "ca2", "ca3", "ca4", "ca5"]

    try {
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        if (!isValidOperation)
            throw new Error('Invalid Operation')

        updates.forEach((update) => req.ct[update] = req.body[update])
        await req.ct.save()
        await notify('CreateC ' + req.ct._id, 'To Check')
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
    }
})


app.get('/getA', authAdm, async (req, res) => {
    try {
        const cs = await Ct.find();
        return res.status(200).send(cs)
    } catch (e) {
        res.status(400).send()
    }
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})