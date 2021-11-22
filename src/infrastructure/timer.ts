let startTimestamp = 0;
let endTimestamp = 0;

export function start(): void {
  startTimestamp = new Date().getTime();
}

export function end(): void {
  endTimestamp = new Date().getTime();
}

export function delay(): number {
  return endTimestamp - startTimestamp;
}
