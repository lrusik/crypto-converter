const setFrom = (data) => {
   return {
      type: 'SETFROM', 
      data: data
   }
}

const setTo = (data) => {
   return {
      type: 'SETTO', 
      data: data
   }
}

const setOrigin = (data) => {
   return {
      type: 'SETORIGIN', 
      data: data
   }
}

export { setOrigin, setFrom, setTo }