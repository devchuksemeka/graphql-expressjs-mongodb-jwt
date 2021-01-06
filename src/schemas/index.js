const graphql = require('graphql')
const {getUsersList, addUser} = require('../services/user.service')
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

const query = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            async resolve(parentValue,args){
                return await getUsersList()
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