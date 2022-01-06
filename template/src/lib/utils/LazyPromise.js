export default class LazyPromise {
  resolve;
  reject;
  constructor() {
    this.deferred = new Promise((_resolve, _reject) => {
      this.resolve = _resolve;
      this.reject = _reject;
    });
  }
}
