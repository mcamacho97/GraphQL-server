const graphql = require("graphql");
let _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

//dummy data
let userData = [
  { id: "1", name: "Mauricio", age: 26, profession: "engineer" },
  { id: "2", name: "Francys", age: 25, profession: "finances" },
  { id: "3", name: "Claudia", age: 50, profession: "business administrator" },
  { id: "4", name: "Mauricio Padre", age: 50, profession: "accountant" },
  { id: "5", name: "Derich", age: 29, profession: "engineer" },
];

let hobbiesData = [
  { id: "1", title: "programming", description: "Using the computers" },
  { id: "2", title: "rowing", description: "rowing description" },
  { id: "3", title: "swimming", description: "swimming description" },
  { id: "4", title: "fencing", description: "fencing description" },
  { id: "5", title: "hiking", description: "hiking description" },
];

let postData = [
  { id: "1", comment: "Buildin a mind" },
  { id: "2", comment: "GraphQL is Amazing" },
  { id: "3", comment: "How to change the World" },
];

// Create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "User description",

  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobby description",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

//Post type (id, comment)
const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post description",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
  }),
});

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description of RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(userData, { id: args.id });
        //We resolve with data
        //get and return from a datasource
      },
    },
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(hobbiesData, { id: args.id });
        //return data for our hobby
      },
    },

    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return data for our post
        return _.find(postData, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
