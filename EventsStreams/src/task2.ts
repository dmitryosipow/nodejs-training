import axios from 'axios';
import { WithTime } from './WithTime';

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));
withTime.on('data', (data, time) => {
  console.log(
    `Received ${JSON.stringify(data)}, \n execution time ${time}ms`,
  );
});
withTime.on('error', (error) => {
  console.error(`Error occurred: ${error.message}`);
});

const fetchFromUrl = (
  url: string,
  cb: (error: Error | null, data?: any) => void,
) => {
  axios
    .get(url)
    .then((response) => {
      cb(null, response.data);
    })
    .catch((error) => {
      cb(error);
    });
};

withTime.execute(
  fetchFromUrl,
  'https://jsonplaceholder.typicode.com/posts/1',
);
