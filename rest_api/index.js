const express = require('express')
const bodyParser = require('body-parser')
require('express-group-routes')

const app = express()
const port = 5000

app.use(bodyParser.json())

//controllers
const IsConnectController = require('./controllers/isConnect')
const AuthController = require('./controllers/auth')
const FavoriteController = require('./controllers/favorites')
const webtoonController = require('./controllers/webtoons')
const episodeController = require('./controllers/episodes')
const imageController = require('./controllers/images')

//middlewares
const { authenticated } = require('./middleware')

app.get('/', IsConnectController.isConnect)
app.group("/api/v1", (router) => {

    //auth API
    router.post('/login', AuthController.login)
    router.post('/register', AuthController.register)

    // for reader
    router.group((reader) => {

        //webtoon API
        reader.get('/webtoons', webtoonController.index)
        reader.get('/webtoon/:webtoon_id', webtoonController.show)
        reader.get('/webtoon', webtoonController.search)

        //episode API
        reader.get('/webtoon/:webtoon_id/episodes', episodeController.index)
        reader.get('/webtoon/:webtoon_id/episode/:episode_id', episodeController.show)

        //image API
        reader.get('/webtoon/:webtoon_id/episode/:episode_id/images', imageController.index)
        reader.get('/webtoon/:webtoon_id/episode/:episode_id/image/:image_id', imageController.show)

        //another APIs goes here
    })

    // for creator
    router.group('/user', (creator) => {
        //favorite API
        creator.get('/:user_id/favorites', authenticated, FavoriteController.index)
        creator.post('/:user_id/favorite', authenticated, FavoriteController.addFavorite)
        creator.delete('/:user_id/favorite/:webtoon_id', authenticated, FavoriteController.unFavorite)


        //webtoon API
        creator.get('/:user_id/webtoons', authenticated, webtoonController.index)
        creator.get('/:user_id/webtoon/:webtoon_id', authenticated, webtoonController.show)
        creator.get('/:user_id/webtoon', authenticated, webtoonController.search)
        creator.post('/:user_id/webtoon', authenticated, webtoonController.store)
        creator.patch('/:user_id/webtoon/:webtoon_id', authenticated, webtoonController.update)
        creator.delete('/:user_id/webtoon/:webtoon_id', authenticated, webtoonController.delete)

        //episode API
        creator.get('/:user_id/webtoon/:webtoon_id/episodes', authenticated, episodeController.index)
        creator.get('/:user_id/webtoon/:webtoon_id/episode/:episode_id', authenticated, episodeController.show)
        creator.post('/:user_id/webtoon/:webtoon_id/episode', authenticated, episodeController.store)
        creator.patch('/:user_id/webtoon/:webtoon_id/episode/:episode_id', authenticated, episodeController.update)
        creator.delete('/:user_id/webtoon/:webtoon_id/episode/:episode_id', authenticated, episodeController.delete)

        //image API
        creator.get('/:user_id/webtoon/:webtoon_id/episode/:episode_id/images', authenticated, imageController.index)
        creator.get('/:user_id/webtoon/:webtoon_id/episode/:episode_id/image/:image_id', authenticated, imageController.show)
        creator.post('/:user_id/webtoon/:webtoon_id/episode/:episode_id/image', authenticated, imageController.store)
        creator.patch('/:user_id/webtoon/:webtoon_id/episode/:episode_id/image/:image_id', authenticated, imageController.update)
        creator.delete('/:user_id/webtoon/:webtoon_id/episode/:episode_id/image/:image_id', authenticated, imageController.delete)

        //another APIs goes here
    })

})


// app.listen(process.env.PORT||9876, function(){ console.log(`Listening on port ${port}!`)})
app.listen(port, () => console.log(`Listening on port ${port}!`))