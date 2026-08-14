const os =require("os");

//checking the cpu's information
console.log(os.cpus());

// cpu count
console.log("CPU cores:", os.cpus().length);

//checking system memory, the resulting numbers will be in bytes
console.log("Total memory:", os.totalmem());

//checking free meory
console.log("Free memory:", os.freemem());

// let us find out on which platform node.js is working
console.log("Platform:", os.platform());

// checking the CPU architecture
console.log("Architecture:", os.arch());

//computers host name
console.log("Hostname:", os.hostname());

console.log("OS type:", os.type());

console.log("OS release:", os.release());

console.log("System uptime:", os.uptime());

console.log("Home directory:", os.homedir());

console.log("Temporary directory:", os.tmpdir());

console.log("Current username:", os.userInfo().username);