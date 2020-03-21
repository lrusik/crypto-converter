const set = () => {
   return {
     type: "SETINFO"
   }
}

const get = (callback) => {
   return {
     type: "GETINFO", 
     callback: callback
   }
}

const update = (callback) => {
   return {
     type: "UPDATEINFO", 
     callback: callback
   }
}

export {update, get, set};