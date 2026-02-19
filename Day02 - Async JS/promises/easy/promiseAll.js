// Problem Description – Custom Implementation of Promise.all

// You are required to implement your own version of Promise.all without using the built-in method. 
// The function should accept an array of values that may include Promises or plain constants. 
// It must resolve with an array of results in the same order once all inputs resolve, or reject immediately if any input rejects.
function promiseAll(promises) {

    // promise.all returns a new promise

    return new Promise((resolve, reject) => {
        if (promises.length === 0) { // if empty array
            resolve([]);
            return;
        }

        let ans = new Array(promises.length)
        let resolveCounter = 0;

        promises.forEach((promise, index) => {

            Promise.resolve(promise)   // firstly resolve this promise 
                .then((returnedAnswer) => {
                    ans[index] = returnedAnswer;  // ensures the ordering of resolved promises
                    resolveCounter++;

                    if (resolveCounter === promises.length) {
                        resolve(ans);
                        return;
                    }
                })
                .catch(error => {
                    reject(error);
                    return;
                })
        });
    });
}

module.exports = promiseAll;
