const authAdm = async (req, res, next) => {
    try {
        const ad1 = req.body.ad1;
        const ad2 = req.body.ad2;
        console.log(process.env.AD1)
        if (ad1 === process.env.AD1 && ad2 === process.env.AD2)
            next()
        else throw new Error()
    } catch (e) {
        res.status(401).send({
            error: 'Not Authorized'
        })
    }
}

module.exports = authAdm