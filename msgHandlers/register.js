const sqlite3 = require("sqlite3");

class RegisterService {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    async inject(collecton) {

    }

    async handle(msg) {
        return msg;
    }
}