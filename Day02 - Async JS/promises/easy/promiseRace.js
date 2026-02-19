// Problem Description – Custom Implementation of Promise.race

// You are required to implement your own version of Promise.race without using the built-in method. 
// The function should accept an iterable of values that may include Promises or plain values. 
// It must settle as soon as the first input settles, resolving or rejecting accordingly. 
// Using Promise.resolve ensures non-promise values are handled correctly.
function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        if(promises.length === 0) {  //stays pending for empty Promises 
            return;
        }
        
        promises.forEach((promise, index)=>{
            Promise.resolve(promise)
                .then((returnedAnswer)=>{
                    resolve(returnedAnswer);
                    return;
                })
                .catch((err)=>{
                    reject(err);
                    return;
                })
        })
    })
}

module.exports = promiseRace;

// VARDICT => 