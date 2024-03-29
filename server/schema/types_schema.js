const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
} = graphql;

//Scalar Type
/* 
    String = GraphQLString
    int 
    Float
    Boolean
    ID
*/

const Person = new GraphQLObjectType({
  name: "Person",
  description: "Represent a Person Type",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLInt },
    isMarried: { type: GraphQLBoolean },
    gpa: { type: GraphQLFloat },

    justAType: {
      type: Person,
      resolve(parent, args) {
        return parent;
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    person: {
      type: Person,
      resolve: (parent, args) => {
        let personObj = {
          name: null,
          age: 26,
          isMarried: false,
          gpa: 4.0,
        };

        return personObj;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
