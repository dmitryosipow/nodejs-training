// getRandomNumber() function exported by default. The function returns a random integer from 1 to 1000
// getRandomNumber.ts
export default function getRandomNumber() {
  return Math.floor(Math.random() * 1000) + 1;
}

console.log(getRandomNumber());
