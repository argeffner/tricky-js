function curriedAdd(total) {
// initailly make sure that empty value returns  
 if (total === undefined) return 0;
  return function addMore(val) {
    if (val === undefined) return total;
    total += val;
    // return addMore in order to pass multiple functions and values
    // otherwise it won't work return 
    return addMore;
  };
}

module.exports = { curriedAdd };


// let x = curriedAdd; 

// x() 
// // or
// curriedAdd()