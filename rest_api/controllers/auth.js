const jwt = require('jsonwebtoken')
const models = require('../models')
const User = models.users

exports.login = async(req, res)=>{    
    //check if email and pass match in db tbl user
    const email = req.body.email
    const password = req.body.password //use encryption in real world case!

    await User.findOne({where: {email, password}}).then(user=>{
        if(user){
            const token = jwt.sign({ userId: user.id }, 'my-secret-key')
            res.send({
                user,
                token
            }) 
        }else{
            res.send({
                error: true,
                message: "Wrong Email or Password!"
            })
        }
    })
    .catch(err => console.log(err))
}
exports.register = (req, res)=>{
    const email = req.body.email
    const password = req.body.password 
    const name = req.body.name
             User.create({
                name,
                email,
                password
            }).then(result=> {
                const token = jwt.sign({ userId: result.dataValues.id }, 'my-secret-key');
                res.send({
                    message: "success",
                    data: {
                        id: result.dataValues.id.toString(),
                        name: result.dataValues.name,
                        email: result.dataValues.email,
                        token: token
                    }
                })
            }).catch(err => console.log(err)) 
}