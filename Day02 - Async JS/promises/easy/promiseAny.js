// Problem Description – promiseAny(promises)

// You are required to implement a function named promiseAny that accepts an array of Promises. 
// The function should return a new Promise that resolves immediately when any one of the input promises resolves successfully. 
// If all the promises reject, the returned Promise should reject with an error.
function promiseAny(promises) {
    return new Promise((resolve , reject)=>{
        if(promises.length===0) {
            reject(new Error("Empty iterable"));
            return;
        }

        let rejectCount = 0;

        promises.forEach((promise, index)=>{

            Promise.resolve(promise) // making sure that if its a value then returned automatically
                .then((result)=>{
                    resolve(result); // immediatly resolves 
                    return; 
                })
                .catch(()=>{
                    rejectCount++;
                    if(rejectCount === promises.length){
                        reject(new Error("All promises were rejected"));
                        return;
                    }
                })
        })
    })
}

module.exports = promiseAny;

// PASSED 