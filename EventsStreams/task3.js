import csv from "csvtojson"
import * as stream from 'stream';
import * as fs from 'fs';
import * as readline from 'readline';

const readerStream = fs.createReadStream('./csvdirectory/sample.csv');
const writeStream = fs.createWriteStream('./csvdirectory/final.txt');
let ind = 0;
/*
const rl = readline.createInterface({
    input: readerStream,
    crlfDelay: Infinity
});


for await (const chunk of rl) {
    console.log(`${ind++} This is chunk ${chunk}`);
}*/

const onError = (err) => { console.log(err) }
const onComplete = () => { writeStream.end() }

csv()
    .fromStream(readerStream)
    .subscribe((json)=>{
        return new Promise((resolve,reject)=>{
            // long operation for each json e.g. transform / write into database.
            console.log(`${ind++} This is chunk ${JSON.stringify(json)}`);
            writeStream.write(`${JSON.stringify(json)}\r\n`)
            resolve();
        })
    },onError,onComplete);