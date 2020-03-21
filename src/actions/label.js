const setLabel = (data) => {
   return {
      type: data[0], 
      data: data[1]
   }
}

export { setLabel }