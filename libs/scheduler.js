const operations = [];

export function scheduler(fn, ...args) {
  // do a dry run
  const result = fn.apply(
    {
      isScheduled: true,
    },
    args
  );
  if (result) {
    operations.push(fn.bind({}, ...args));
  }
  return result;
}

export function exec() {
  while (operations.length) {
    operations.shift()();
  }
}
