const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
const { authorization } = require('./middlewares/jwt')
const UserModel = require('./models/User')
const schema = require('./schemas')

const app = express()

// plug in an auth middleware
app.use(authorization)

app.use('/graphql/playground',graphqlHTTP({
    graphiql: true,
    schema
}))

mongoose
    .connect(
        `mongodb://localhost:27017/graphql_express_mongodb_jwt`,
        {
            useNewUrlParser:true,
            useUnifiedTopology: true
        }
    )
    .then(()=>{
        // insert records
        // const user = new UserModel({
        //     firstName:'Miracle',
        //     lastName:'Okafor',
        //     email: 'email@gmail.com'
        // })
        // user.save()
        const PORT = process.env.PORT || 7000
        app.listen(PORT,()=>{
            console.log(`App listing on port ${PORT}`)
        })
    })
    .catch(err => {
        console.log(err)
    });

