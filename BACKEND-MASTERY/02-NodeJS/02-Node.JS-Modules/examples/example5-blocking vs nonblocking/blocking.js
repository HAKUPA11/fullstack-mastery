console.log('a')
console.log('b')
console.log('c')
// addEventListener, b, c gets printed sequentially this is the example of synchronus code

setTimeout(()=>{
    console.log("inside setTimeout will - this will get printed after 2 seconds")
}, 2000)

console.log("this line is after settimeout line but will get printed before that")