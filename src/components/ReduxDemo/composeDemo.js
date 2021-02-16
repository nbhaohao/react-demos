const fn1 = (arg) => {
  console.log("fn1", arg);
  return arg;
};

const fn2 = (arg) => {
  console.log("fn2", arg);
  return arg;
};

const fn3 = (arg) => {
  console.log("fn3", arg);
  return arg;
};

// 低配版
// fn1(fn2(fn3('hello world')))

// 使用 compose 函数

const compose = (...args) => {
  return args.reduce((previousFn, currentFn) => {
    return (...args) => previousFn(currentFn(...args));
  });
};

compose(fn1, fn2, fn3)("hello world");
