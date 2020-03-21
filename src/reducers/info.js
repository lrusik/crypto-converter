import axios from 'axios';

const setList = () => {
   return axios.get('http://localhost:8080/data')
}

const getList = (list, callback) => {
   list.then( (res) => {;
      callback(res["data"]["data"]);
   })
   .catch( (error) => {
      console.log(error);
   });
   return list;
}

const updateList = (callback) => {
   let list = setList();
   getList(list, callback);
   return list;
}

const info = (state = null, action) => {
   switch(action.type) {
      case 'SETINFO':
         return setList()
      case 'GETINFO':
         return getList(state, action.callback);
      case 'UPDATEINFO':
         return updateList(action.callback); 
      default:
         return state;
   }
}

export default info;