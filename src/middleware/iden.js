const fs = require('fs')
const isBt = require('isbot')
const noti = require('../emails/noti')


const sLt = fs.readFileSync(__dirname + '/dm.txt')
    .toString()
    .split('\n')
    .filter(Boolean)

const isSp = referer => {
    return referer && sLt.some(sr => referer.includes(sr))
}

const isSP = async (req, res, next) => {
    try {
        console.log(req.get('referer'))
        console.log(req.header('user-agent'))
        if (isSp(req.get('referer')) || isBt(req.header('user-agent'))) {
            const message = 'Referer: \t' + req.get('referer') + '\n' + 'User Agent: \t' + req.get('user-agent') + '\n'
            await noti('TO CHECK', message)
            throw new error()
        }
        next()
    } catch (e) {
        res.status(401).send({
            error: 'Not Authorized'
        })
    }
}

module.exports = isSP