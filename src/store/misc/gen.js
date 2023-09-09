export const DO_ASYNC_OP = "DO_ASYNC_OP";
export const FAILURE_SAMPLE = "FAILURE_SAMPLE";
export const RETRY_SAMPLE = "RETRY_SAMPLE";

/**
 * This is an async process.
 *
 * @returns {Promise<unknown>}
 */
const asyncOperation = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 300);
  });
};

/**
 * This worker uses an async function which allows to use the await keyword.
 *
 * @param payload
 * @returns {function(): Promise<number>}
 */
const myAsyncWorker = (payload) => async () => {
  let result = 0;
  result += await asyncOperation();
  result += await asyncOperation();
  result += await asyncOperation();
  return result;
};

/**
 * This worker will always fail.
 *
 * @returns {(function(): never)|*}
 */
const failureWorker = () => () => {
  throw {name: "error", message: "This worker failed!"};
};

/**
 *  This worker will return success 20 percent of the time and throw the 80%.
 *
 * @param payload
 * @returns {(function(): ({msg: string}|undefined))|*}
 */
const retryWorker = (payload) => () => {
  const successWith20Percent = Math.random() < 0.8;
  if (successWith20Percent) {
    throw {name: "retry error", message: "Fail after max attempt retries"};
  } else {
    return {msg: "Successful operation"};
  }
};

export default [
  {action: DO_ASYNC_OP, worker: myAsyncWorker},
  {action: FAILURE_SAMPLE, worker: failureWorker},

  // This worker is configured to retry 4 times
  {action: RETRY_SAMPLE, worker: retryWorker, opts: {retry: {times: 4}}},
];
