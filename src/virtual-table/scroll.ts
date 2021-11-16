export interface ScrollOptions {
  root?: HTMLElement;
  columnHeight?: number;
  data?: any[];
  isScrollBusy?: boolean;
}

export const handleScroll = ({ root, columnHeight = 40, data = [] }: ScrollOptions, callback?: Function) => {
  if (!root) return;

  requestAnimationFrame(() => {
    if (!root) return;

    // TODO: poolBuffer
    const poolBuffer = 50;

    const range: number[] = [];
    range[0] = Math.floor(root.scrollTop / columnHeight) - Math.floor(poolBuffer / 2);
    range[0] = Math.max(range[0], 0);
    range[1] = range[0] + Math.floor(root.clientHeight / columnHeight) + poolBuffer;
    range[1] = Math.min(range[1], data.length);

    const pool = data.slice(range[0], range[1]).map((v: any, i) => ({ ...v, _index: range[0] + i }));
    const paddingTop = range[0] * columnHeight;

    callback && callback({ pool, paddingTop });
  });
};

export const getScollPool = ({ root, columnHeight = 40, data = [] }: ScrollOptions) => {
  if (!root) return;

  // TODO: poolBuffer
  const poolBuffer = 50;
  const containerSize = root.clientHeight || 0;
  const contentLines = Math.ceil(containerSize / columnHeight);
  const totalLines = contentLines + poolBuffer;
  const range = [0, totalLines];

  const pool = data.slice(range[0], range[0] + range[1]).map((v: any, i) => ({ ...v, _index: range[0] + i }));

  console.log(pool);

  return pool;
};
