const label = (state = { "from": '', "to": ''}, action) => {
   switch(action.type) {
      case 'from':
         state["from"] = action.data;
         return state;
      case 'to':
         state["to"] = action.data;
         return state;
      default:
         return state;
   }
}

export default label;