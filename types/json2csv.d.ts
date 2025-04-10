declare module 'json2csv' {
  export class Parser<T> {
    constructor(opts?: object)
    parse(data: T[]): string
  }
} 