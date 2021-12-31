class Service {
  log(...rest) {
    if (__DEV__) {
      console.log.apply(console.log, rest);
    }
  }

  info(...rest) {
    if (__DEV__) {
      console.info.apply(console.info, rest);
    }
  }

  error(...rest) {
    if (__DEV__) {
      console.error.apply(console.error, rest);
    }
  }
}

const Logger = new Service();

export default Logger;
