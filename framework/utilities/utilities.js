class Utilities {
    static getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    static getRandomIntExcept(max, exception) {
        let result = Math.floor(Math.random() * max);
        return result !== exception ? result : this.getRandomInt(max, exception);
    }
}

module.exports = Utilities;