export class User {
    constructor(id, name, email) {
      this.id = id;
      this.name = name;
      this.email = email;
    }
    get id() {
      return this._id;
    }

    get name() {
      return this._name;
    }

    get email() {
      return this._email;
    }
  }
