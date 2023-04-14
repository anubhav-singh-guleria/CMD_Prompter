const { log } = require("console");
const fs = require("fs");
const path = require("path");

const inputArr = process.argv.slice(2);
// options and files ko alag alag kardo 

const options = [];
const files = [];

for(let i = 0;i<inputArr.length;i++){
    const str = inputArr[i];
    if(str.charAt(0) === '-'){
        options.push(str);
    }else{
        files.push(str);
    }
}

let content = "";
for(let i = 0 ;i<files.length;i++){
    if(fs.existsSync(files[i])){
        let bufferContent = fs.readFileSync(files[i]);
        content += bufferContent + "\r\n";
    }
}

let contentArray = content.split('\r\n');

// -s 
const isSPresent = options.includes("-s");
if(isSPresent == true){
    for(let i = 1; i<contentArray.length ; i++){
        if(contentArray[i] == "" && contentArray[i-1] == ""){
            contentArray[i] = null;
        }else if(contentArray[i] == "" && contentArray[i-1]==null){
            contentArray[i] = null;
        }
    }
    let tempArr = [];
    for(let i = 0;i<contentArray.length;i++){
        if(contentArray[i]!== null){
            tempArr.push(contentArray[i]);
        }
    }
    contentArray = tempArr;
}

const isNPresent = options.includes("-n");

if(isNPresent){
    for(let i = 0;i<contentArray.length;i++){
        contentArray[i] = `${i+1} ${contentArray[i]}`;
    }
}

const isBPresent = options.includes("-b");

if(isBPresent){
    let counter = 1;
    for(let i = 0;i<contentArray.length;i++){
        if(contentArray[i]!== ""){
            contentArray[i] = `${counter++} ${contentArray[i]}`
        }
    }
}
if(isNPresent & isBPresent){
    log("ERROR");
}
else{
    log(content);
}