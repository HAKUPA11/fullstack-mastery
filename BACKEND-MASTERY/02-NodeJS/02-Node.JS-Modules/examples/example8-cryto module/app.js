const crypto=require("crypto")
//Node's crypto module: can generate cryptographically strong random data.

console.log(crypto.randomBytes(16)); // run it twice and the valu changes each time

console.time("pbkdf2");// just added before crypto.pbkdf2 for checking the perfomance pupose and since this crypto.pbkdf is 
//actually and expensive operation to do since it iteerates 100000 tmies here


console.log("Before pbkdf2");// just to check its ascynchronus nature

crypto.pbkdf2(
    "myPassword", // this will be the password/input
    "mySalt", //salt
    100000,  //100000 iterations
    64,  //64-byte derived key
    "sha512", //Hash algo
    (err, derivedKey) => {  // this is a call back fxn which crypto.pbkdf2 has which runs when the operation is performed
        if (err) {
            console.error(err);
            return;
        }

        console.timeEnd("pbkdf2");// for measurement purpose only
        console.log(derivedKey.toString("hex"));
    }
);

console.log("After pbkdf2");// checking the asynchronus nature