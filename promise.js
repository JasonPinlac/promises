/*
A promise is a javascript object that links the producing code (async) and the consuming code together.
The "promise code" takes whatever time it needs to produce the promised result, and the "promise" makes that
result available to all of the subscribed code when its ready.

constructor syntax for a promise
the callback function passed into the new Promise is called the executor function. when the promise is created, this executor function runs automatically.

the Promise object has internal properties:
state - initally pending, then changes to either fulfilled or rejected.
result - an arbitrary value of your choosing usually undefined.

when the executor finishes its job, it should call one of the functions that it gets as arguments. Resolve or Reject
resolve(value) - indicates a sucessful job - sets result to value - sets state to "fulfilled"
reject(error) - indicates that an error occured - sets result to error - sets state to "rejected"

executor is called immediately amd automatically (by the new Promise)
executor recieves two arguments: resolve and reject -- these fucntions are pre-defined by Javascript engine 
so we dont need to create them but just have the executor call them when ready
*/
function getStudentFromDB() {
    return new Promise(function executor(resolve, reject) {
        //resolve(123); // this is a non async operation
        
        let student;
        // Async operation to mock getting a student from the DB. It has a callback to resolve or reject the results from the database.
        setTimeout(() => {
            student = {name: "Jason Pinlac"};
            student ? resolve(student): reject(new Error("Failed to retrieve student from the database"))
        }, 1000);
    });
}

promise = getStudentFromDB();

promise
.then((result) => {console.log(result)})
.catch((error) => {console.log(error.message)});

console.log('hi mom');

/*
consumers: .then() and .catch()
The promise object serves as the link between the executor function and the consuming function .then() and catch()
The callback functions to these two consumers run when the Promise is RESOLVED OR REJECTED

These handlers .then() and .catch() are always asynchronous.
If a promise is pending, the .then/.catch handlers wait for the result.
Even when the Promise is immediately resolved, code which occurs on lines below your .then/.catch may still execute first.
The JavaScript engine has an internal execution queue which gets all .then/catch handlers but it only looks into that queue when the current execution is finished.
In other words, .then/catch handlers are pending execution until the engine is done with the current code.

This is why console.log("hi mom") executes before the preceeding promise.this().catch();

.then and .catch are async functions that execute their callbacks once synchronous code on the call stack is free and the promise has either been resolved or rejected.

https://stackoverflow.com/questions/48733021/is-promise-resolve-a-asynchronous-function
https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5
*/

/* 
promises are so nice because simply by looking at them if an async function/operation returns a promise, this means that when we invoke .then() or .catch() their callbacks are executed once the async function/opertion of the promise objects executor function is resolved!
*/

