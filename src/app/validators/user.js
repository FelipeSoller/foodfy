const User = require('../models/User');
const { checkAllFields, getParams } = require('../../lib/utils');

async function show(req, res, next) {
    const { userId: id } = req.session

    const user = await User.findOne({ where: { id } })

    if (!user) return res.render('users/register', {
        error: 'Usuário não encontrado!'
    });

    req.user = user

    next();
}
async function post(req, res, next) {
    try {
        const fillAllFields = checkAllFields(req.body)

        if (fillAllFields) return res.render('users/register', fillAllFields)
      
        const { email } = req.body

        const user = await User.findOne({ where: { email } })

        if (user) return res.render('users/register', {
            user: req.body,
            error: 'Usuário já cadastrado!'
        })

        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (!email.match(mailFormat)) return res.render('users/register', {
            user: req.body,
            error: 'Email inválido!'
        })

        next()

    } catch (error) {
        console.error(error)
    }
}
async function edit(req, res, next) {
    const { id } = req.params

    const user = await User.findOne({ where: { id } })


    if (!user) return res.render('users/register', {
        error: 'Usuário não encontrado!'
    })
    
    req.user = user

    next()
}
async function update(req, res, next) {
    const fillAllFields = checkAllFields(req.body)

    if (fillAllFields) return res.render('users/edit', fillAllFields)

    const { id, email } = req.body

    const user = await User.findOne({ where: { id } })

    if (email != user.email) {
        const isNotAvaliable = await User.findOne({ where: { email } })

        if (isNotAvaliable) return res.render('users/edit', {
            user: req.body,
            error: 'Email já cadastrado!'
        })
    }

    next()
}
async function exclude(req, res, next) {
    const params = getParams(req.query, 6)

    const users = await User.pagination(params)

    const pagination = { page: params.page }

    users.length == 0
    ? pagination.total = 1
    : pagination.total = Math.ceil(users[0].total / params.limit)

    if (req.session.userId == req.body.id) return res.render('users/list', {
        users,
        pagination,
        error: 'Desculpe, não é possível excluir a própria conta!'
    })

    next()
}

module.exports = {
    show,
    post,
    edit,
    update,
    exclude
};