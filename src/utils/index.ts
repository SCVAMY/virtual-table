export function isNumber(value: string | number) {
  const reg = /^[-]{0,1}[0-9]+([.]{1}[0-9]+){0,1}$/
  return reg.test((value || '').toString())
}

export const insertArray = (arr: any[], index: number, insertItems = []) => {
  const start = arr.slice(0, index + 1)
  const end = arr.slice(index + 1)

  return start.concat(insertItems).concat(end)
}

export const sliceArray = (arr: any[], index: number, length: number) => {
  const start = arr.slice(0, index + 1)
  const end = arr.slice(index + 1 + length)

  return start.concat(end)
}
