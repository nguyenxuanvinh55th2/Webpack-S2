module.exports= {
  Query: {
    hello(root) {
      let ob ={name:"nguyen xuan vinh"}
      return ob;
    },
    vinh(root){
      return "worl"
    }
  },
  Mutation: {
    addTask(_) {
     return "vinh"
   },
 }
};
