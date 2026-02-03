// Problem Description – once(fn)

// You are required to implement a wrapper function named once that accepts an asynchronous function fn.
// The wrapper should ensure that fn is executed only on the first call.
// Any subsequent calls must not re-execute fn and should instead return the same Promise or resolved result from the first invocation.

/**
 * HINT : 
 *  Ask yourself : Where can I store state that survives multiple calls to the wrapper?
 *  < CLOSURES />
 * 
 */


function once(fn) {
    let called  = false; 
    let result ;

    return function(...args){  // this returned function forms a closure with called and result 
        if(!called){
            called = true; // flip the switch 
            result = fn(...args);  //call function and store result 
        } 
        return result; // returns result 
    }
}

module.exports = once;

// PASSED // 