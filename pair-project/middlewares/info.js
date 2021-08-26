

function isGetInfo(req, res, next) {
    if (req.session.getInfo) {
        next()
    } else {
        req.session.getInfo = true
        res.render('info')
    }
}

module.exports = isGetInfo