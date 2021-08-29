export class StoreError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StoreError";
  }
}

export class StoreEmptyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StoreEmptyError";
  }
}

export class StoreObjectError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StoreObjectError";
  }
}

export class StoreIdError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StoreIdError";
  }
}
