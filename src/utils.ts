import faker from 'faker'

export function uuid() {
  let d = Date.now()
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now() //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export function mock(length = 1000) {
  return Array.from({ length }, (v, i) => {
    return {
      name: i,
      email: faker.internet.email(),
      address: faker.address.country(),
      children:
        i % 2 === 0
          ? Array.from({ length: 10 }, (v, index) => ({
              name: `children-${i}-${index}`,
              email: faker.internet.email(),
              address: faker.address.country()
            }))
          : null
    }
  })
}

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
