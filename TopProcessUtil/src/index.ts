import run from './activity-monitor';

run().then(() => {
  console.log('Monitoring started successfully.');
}).catch(error => {
  console.error('Failed to start monitoring:', error);
});