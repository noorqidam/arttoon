const models = require('../models')
const Episode = models.episodes
const Webtoon = models.webtoons

exports.index = (req, res) => {
    Episode.findAll({
        where:{webtoonId: req.params.webtoon_id},
        include: [{ 
            model: Webtoon,
            as: "webtoon_id",
        }]
    }).then(result=>res.send(result))
    .catch(err => console.log(err))
}

exports.show = (req, res) => {
    Episode.findOne({
        where:{
            webtoonId: req.params.webtoon_id, 
            id: req.params.episode_id
        },
        include: [{ 
            model: Webtoon,
            as: "webtoon_id",
        }]
    }).then(result=> res.send(result))
    .catch(err => console.log(err))
}

exports.store = (req, res) => {
    const title= req.body.title
    const image= req.body.image
    const webtoonId= req.params.webtoon_id
    Episode.create({
        title,
        image,
        webtoonId
    }).then(result=> {
        res.send({
            message: "success",
            result
        })
    })
    .catch(err => console.log(err))
}

exports.update = (req, res) => {
    Episode.update(
        req.body,
        {
            where:{
                webtoonId: req.params.webtoon_id, 
                id: req.params.episode_id
            },
            include: [{ 
                model: Webtoon,
                as: "webtoon_id",
            }]
        }
    ).then(result=> {
        res.send({
            message: "success",
            result
        })
    })
    .catch(err => console.log(err))
}

exports.delete = (req, res) => {
    Episode.destroy({
        where:{
            webtoonId: req.params.webtoon_id, 
            id: req.params.episode_id
        }
    }).then(result=> {
        res.send({
            message: "success",
            result
        })
    })
    .catch(err => console.log(err))
}