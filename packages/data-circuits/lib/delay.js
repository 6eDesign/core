export const delayedReject = (duration) =>
  new Promise((res, rej) => setTimeout(rej, duration));

export const delay = (duration) =>
  new Promise((res) => setTimeout(res, duration));
