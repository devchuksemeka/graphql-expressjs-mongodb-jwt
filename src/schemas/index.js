const graphql = require('graphql')
const {getUsersList, addUser, loginUser} = require('../services/user.service')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
    })
})
const AuthType = new GraphQLObjectType({
    name: 'Auth',
    fields: () => ({
        token: { type: GraphQLString },
        user: { type: UserType },
    })
})

const query = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            async resolve(parentValue,args, req){
                if(!req.isAuth) throw new Error('Unauthorized request')
                return await getUsersList()
            }
        },
        loginUser: {
            type: AuthType,
            args:{
                email: {type:  new GraphQLNonNull(GraphQLString)},
                password: {type:  new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parentValue,args){
                return await loginUser(args)
            }
        },
    }
})
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args:{
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                lastName: {type:  new GraphQLNonNull(GraphQLString)},
                email: {type:  new GraphQLNonNull(GraphQLString)},
                password: {type:  new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parentValue,args){
                return await addUser(args)
            }
        },
    }
})

module.exports = new GraphQLSchema({
    mutation,
    query
})