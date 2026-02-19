// Problem Description – Time-Limited Async Function

// You are given an asynchronous function and a time limit t in milliseconds.
// Your task is to wrap this function so that it either resolves normally if it completes within the given time or rejects 
// with the message "Time Limit Exceeded" if execution takes longer than t.


/*Hint :
* Think carefully:
* You want “first to finish wins”
* If function resolves first → resolve
* If timeout fires first → reject
* What built-in utility models this behavior?
 */

function timeLimit(fn, t) {
    return function (...args) {  // wrap it in a function 
        // PROMISE 1 
        // resolving the promise using fn 
        let a = Promise.resolve(fn(...args)); // make sure to call the function as it returns a promise

        // PROMISE 2
        let b = new Promise((_, reject) => {  // this promise sends a reject after t milliseconds
            setTimeout(() => {
                reject("Time Limit Exceeded");
            }, t)
        })

        return Promise.race([a, b]);  // whoever ends before 
    }

}

module.exports = timeLimit;

// PASSED 
