const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const testschema = require("./schema/types_schema");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: testschema,
  }),
);

app.listen(4000, () => {
  //localhost:4000
  console.log("Listening for requrest on my awesome port 4000");
});
