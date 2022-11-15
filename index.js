import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from 'graphql';
import { v1 as uuid } from "uuid";

const persons = [
  {
    name: "Mauricio",
    phone: "76056432",
    street: "Street 1",
    city: "Managua",
    id: "001",
  },
  {
    name: "Darvin",
    phone: "1212121",
    street: "Street 2",
    city: "El viejo",
    id: "002",
  },
  {
    name: "Fernando",
    street: "Street 3",
    city: "Matagalpa",
    id: "003",
  },
];

const typeDefs = `#graphql
  type Address {
    street: String!
    city: String
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons: [Person]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
  }
`;

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) => {
      const { name } = args;
      return persons.find((person) => person.name === name);
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find((p) => p.name === args.name)) {
        // throw new Error('Name must be unique')
        throw new GraphQLError("Name must be unique", {
          invalidArgs: args.name,
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      const person = { ...args, id: uuid() };
      persons.push(person); //update database with new person
      return person;
    },
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
