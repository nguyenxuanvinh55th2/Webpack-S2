module.exports = [`
type Name {
  name:String
}
type Query {
  hello: Name,
},

type Mutation {
  addTask: String,
},
schema {
  query: Query,
   mutation: Mutation
}`];
