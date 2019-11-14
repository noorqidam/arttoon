const models = require('../models')
const Favorite = models.favorites
const Webtoon = models.webtoons

exports.index = (req, res) => {
    Favorite.findAll({
        where: {
            id_user: req.params.user_id,
        },
        include: [{
            model: Webtoon,
            as: "webtoon_id"
        }],
    }).then(result => res.send(result))
        .catch(err => console.log(err))
}

exports.addFavorite = (req, res) => {
    const { id_webtoon } = req.body
    Favorite.create(
        {
            id_user: req.params.user_id,
            id_webtoon
        }).then(result => {
            res.send({
                message: "success",
            })
        })
        .catch(err => console.log(err))
}

exports.unFavorite = (req, res) => {
    Favorite.destroy({
        where: {
            id_user: req.params.user_id,
            id_webtoon: req.params.webtoon_id,
        }
    }).then(result => {
        res.send({
            message: "success",
            result
        })
    })
        .catch(err => console.log(err))
}