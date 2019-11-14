const models = require('../models')
const Webtoon = models.webtoons
const User = models.users
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let user_id

exports.index = (req, res) => {
    if (req.params.user_id != undefined) {
        user_id = { create_by: req.params.user_id }
    } else { user_id = {} }
    Webtoon.findAll({
        where:
            user_id,

        include: [{
            model: User,
            as: "Owner",
            attributes: ['name'],
        }],
        attributes: [
            'id',
            'title',
            'genre',
            'image',
            ['image', 'url']
        ]
    }).then(result => { console.log(req.params.user_id), res.send(result) })
        .catch(err => console.log(err))
}

exports.show = (req, res) => {
    if (req.params.user_id != undefined) {
        user_id = {
            create_by: req.params.user_id,
            id: req.params.webtoon_id
        }
    } else { user_id = { id: req.params.webtoon_id } }

    Webtoon.findOne({
        where:
            user_id,

        include: [{
            model: User,
            as: "Owner"
        }]
    }).then(result => res.send(result))
        .catch(err => console.log(err))
}
exports.search = async (req, res) => {
    await Webtoon.findAll({
        where: {
            title: { [Op.like]: `%${req.query.title}%` }
        },
        include: [{
            model: User,
            as: "Owner"
        }]
    }).then(result => res.send(result))
        .catch(err => console.log(err))
}

exports.store = (req, res) => {
    const title = req.body.title
    const genre = req.body.genre
    const image = req.body.image
    const isFavorite = req.body.isFavorite
    const favorite_count = req.body.favorite_count
    const create_by = req.params.user_id
    if (req.params.user_id != undefined) {
        user_id = {
            create_by: req.params.user_id
        }
    } else { user_id = { id: req.params.webtoon_id } }
    Webtoon.create({
        title,
        genre,
        image,
        isFavorite,
        favorite_count,
        create_by
    }).then(result => {
        res.send({
            message: "success",
            result
        })
    })
        .catch(err => console.log(err))
}

exports.update = (req, res) => {
    if (req.params.user_id != undefined) {
        user_id = {
            create_by: req.params.user_id,
            id: req.params.webtoon_id
        }
    } else { user_id = { id: req.params.webtoon_id } }

    Webtoon.update(
        req.body,
        {
            where:
                user_id

        }
    ).then(result => {
        res.send({
            message: "success",
            result
        })
    })
        .catch(err => console.log(err))
}

exports.delete = (req, res) => {
    if (req.params.user_id != undefined) {
        user_id = {
            create_by: req.params.user_id,
            id: req.params.webtoon_id
        }
    } else { user_id = { id: req.params.webtoon_id } }

    Webtoon.destroy({
        where: user_id,

    }).then(result => {
        res.send({
            message: "success",
            result
        })
    })
        .catch(err => console.log(err))
}