const converter = (state = { "from": 0, "to": 0, "origin": "" }, action) => {
   switch(action.type) {
      case 'SETFROM':
         state["from"] = action.data;
         return state;
      case 'SETTO':
         state["to"] = action.data;
         return state;
      case 'SETORIGIN':
         state["origin"] = action.data;
         return state; 
      default:
         return state;
   }
}

export default converter;