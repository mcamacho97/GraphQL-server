const graphql = require("graphql");
let _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
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
  {
    id: "1",
    title: "programming",
    description: "Using the computers",
    userId: "1",
  },
  { id: "2", title: "rowing", description: "rowing description", userId: "1" },
  {
    id: "3",
    title: "swimming",
    description: "swimming description",
    userId: "2",
  },
  {
    id: "4",
    title: "fencing",
    description: "fencing description",
    userId: "4",
  },
  { id: "5", title: "hiking", description: "hiking description", userId: "3" },
];

let postData = [
  { id: "1", comment: "Buildin a mind", userId: "1" },
  { id: "2", comment: "GraphQL is Amazing", userId: "4" },
  { id: "2", comment: "GraphQL is Amazing", userId: "2" },
  { id: "3", comment: "How to change the World", userId: "3" },
  { id: "3", comment: "How to change the World", userId: "1" },
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
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return _.filter(postData, { userId: parent.id });
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return _.filter(hobbiesData, { userId: parent.id });
      },
    },
  }),
});

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobby description",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(userData, { id: parent.userId });
      },
    },
  }),
});

//Post type (id, comment)
const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post description",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(userData, { id: parent.userId });
      },
    },
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
