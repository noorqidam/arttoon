const models = require('../models')
const Episode = models.episodes
const Image = models.images

exports.index = (req, res) => {
    Image.findAll({
        where:{ 
            episodeId: req.params.episode_id,
            webtoonId: req.params.webtoon_id
        },
        include: [{ 
            model: Episode,
            as: "episode",
        }]
    }).then(result=>res.send(result))
    .catch(err => console.log(err))
}

exports.show = (req, res) => {
    Image.findOne({
        where:{ 
            webtoonId: req.params.webtoon_id,
            episodeId: req.params.episode_id,
            id: req.params.episode_id
        },
            include: [{ 
                model: Episode,
                as: "episode",
        }]
}).then(result=> res.send(result))
    .catch(err => console.log(err))
}

exports.store = (req, res) => {
    const page= req.body.page
    const image= req.body.image
    const episodeId= req.params.episode_id
    const webtoonId= req.params.webtoon_id

    Image.create({
        page,
        image,
        webtoonId,
        episodeId
       

}).then(result=> {
        res.send({
            message: "success",
            result
        })
    })
    .catch(err => console.log(err))
}

exports.update = (req, res) => {
    Image.update(
        req.body,
        {where:{ 
            webtoonId: req.params.webtoon_id,
            episodeId: req.params.episode_id,
            id: req.params.episode_id
        },
            include: [{ 
                model: Episode,
                as: "episode",
        }]}
    ).then(result=> {
        res.send({
            message: "success",
            result
        })
    })
    .catch(err => console.log(err))
}

exports.delete = (req, res) => {
    Image.destroy({
        where:{ 
            webtoonId: req.params.webtoon_id,
            episodeId: req.params.episode_id,
            id: req.params.image_id
        },
            include: [{ 
                model: Episode,
                as: "episode",
        }]
    }).then(result=> {
        res.send({
            message: "success",
            result
        })
    })
    .catch(err => console.log(err))
}