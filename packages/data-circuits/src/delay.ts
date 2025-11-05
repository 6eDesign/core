export const delayedReject = (duration: number): Promise<void> =>
  new Promise((_res, rej) => setTimeout(rej, duration));

export const delay = (duration: number): Promise<void> => {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, duration);
  });
}