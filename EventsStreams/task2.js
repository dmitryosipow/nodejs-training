import fetch from "node-fetch";
import { WithTime } from "./WithTime.js";

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));
withTime.on('data', (data, time) => {
    console.log(`Received ${JSON.stringify(data)}, \n execution time ${time}ms`)
});

const getData = async (...args) => {
    const response = await fetch(args[0]);
    return await response.json();
}

withTime.execute(getData, 'https://jsonplaceholder.typicode.com/posts/1');
