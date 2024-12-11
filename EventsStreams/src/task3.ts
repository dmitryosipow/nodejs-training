import csv from "csvtojson"
import * as fs from 'fs';

function exportCsvToTxt(csvFilePath: string, txtFilePath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const readerStream = fs.createReadStream(csvFilePath);
        const writeStream = fs.createWriteStream(txtFilePath);
        let ind = 0;

        const onError = (err: Error) => {
            writeStream.end();
            reject(err);
        };

        const onComplete = () => {
            writeStream.end();
            resolve(true);
        };

        csv()
        .fromStream(readerStream)
        .subscribe((json) => {
            return new Promise((resolve, reject) => {
                try {
                    console.log(`${ind++} This is chunk ${JSON.stringify(json)}`);
                    writeStream.write(`${JSON.stringify(json)}\r\n`);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }, onError, onComplete);
    });
}

exportCsvToTxt('./src/assets/sample.csv', './src/assets/final.txt').then(() => {
      console.log('done');
  },
  (err) => {
      console.log('error', err);
  });
