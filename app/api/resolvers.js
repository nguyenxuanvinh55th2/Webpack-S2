module.exports= {
  Query: {
    hello(root) {
      console.log("resolves");
      return 'world';
    }
  },
  Mutation: {
    addTask(_) {
     return "vinh"
   },
 }
};
