/**
 *
 * Assume we are fetching the data from a rest endpoint in the get data function.
 * we can simulate the same by replacing the setTimeout with fetch api and executing the same in a browser.
 *
 */
// How do you solve this problem. How can we wait for till the function execution is completed,
// so that we can have correct email at line 10?

console.log('start');
/** Callback */
function getData(uId, callback) {
  setTimeout(() => {
    console.log('Fetched the data!');
    callback('skc@gmail.com');
  }, 4000);
}

getData('skc', function (email) {
  console.log('Callback Email id of the user id is: ' + email);
  console.log('end');
});

/** Promise */
let promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Fetched the data!');
    resolve('skc@gmail.com');
  }, 4000);
});

promise.then(function (email) {
  console.log('Promise Email id of the user id is: ' + email);
  console.log('end');
});

/** Async Await */
function getDataOriginal(uId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Fetched the data!');
      resolve('skc@gmail.com');
    }, 4000);
  });
}
async function getDataAsync() {
  let test = await getDataOriginal('skc');
  console.log('Async AwaitEmail id of the user id is: ' + test);
  console.log('end');
}
getDataAsync();
