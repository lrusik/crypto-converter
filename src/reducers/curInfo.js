const curStore = (state = {}, action) => {
   switch(action.type) {
      case 'GETINFO':
         return {hello: "Hello1"};
      default:
         return state;
   }
}

export default curStore;