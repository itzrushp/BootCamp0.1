// Problem Description – promisify(fn)

// You are required to write a function named promisify that takes a function following the callback pattern (error, data) => void. 
// The goal is to convert this function into one that returns a Promise. 
// The Promise should resolve with the data when no error occurs and reject when an error is provided.
function promisify(fn) {
    return function(...args){                             // returns a function 
        return new Promise((resolve, reject)=>{           // that returns a promise
            fn(...args , (error, data)=>{                 // callback Pattern 
                if(error) reject(error);                  // when error -> rejects with error  
                else resolve(data);                       // resolve with data otherwise
            })
        })
    }
}

module.exports = promisify;

// PASSED // 