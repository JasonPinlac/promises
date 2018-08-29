/*
A promise is a javascript object that links the producing code -- the executor callback function (async or sync) and the consuming code (.then() and .catch()) together.
The "promise code" takes whatever time it needs to produce the promised result, and the "promise" makes that
result available to all of the subscribed code (callback functions of the .then() and .catch()) when its ready by either resolve(value) or reject(error).

constructor syntax for a promise
the callback function passed into the new Promise is called the executor function. when the promise is created, this executor function runs automatically.

the Promise object has internal properties:
state - initally pending, then changes to either fulfilled or rejected.
result - an arbitrary value of your choosing usually undefined.

when the executor finishes its job, it should call one of the functions that it gets as arguments. Resolve or Reject
resolve(value) - indicates a sucessful job - sets result to value - sets state to "fulfilled"
reject(error) - indicates that an error occured - sets result to error - sets state to "rejected"

executor is called immediately amd automatically (by the new Promise)
executor recieves two arguments: resolve and reject -- these functions are pre-defined by Javascript engine 
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
The callback functions to these two consumers execute when the Promise state is "fulfilled" (resolved) or "rejected"

The handlers .then() and .catch() are always asynchronous (non-blocking). Code below these handlers will continue to execute.
If a promise is pending, the .then/.catch handlers wait for the result while code still continues to execute.
Even when the Promise is immediately resolved, code which occurs on lines below your .then/.catch may still execute first.
This is because the JavaScript engine has an internal execution queue which gets all .then/catch handlers but it only looks into that queue when the current execution is finished.
In other words, .then/catch handlers are pending execution until the engine is done with the current code.

This is why console.log("hi mom") executes before the preceeding promise.this().catch();

https://stackoverflow.com/questions/48733021/is-promise-resolve-a-asynchronous-function
https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5
*/

/* 
promises are so nice because simply by looking at them you can see that
if an async or sync function returns a promise object, this means that when we invoke .then((result) => {...callback code...}) or .catch((error) => {...callback code...}) 
their callback functions are executed once the async or sync function/opertion of the promise objects executor function is resolved. They allow our program to be async in nature
and give us control on execution flow in a easy to read way.
*/

