class Utilities {
    static GetRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    static GetRandomIntExcept(max, exception) {
        let result = this.GetRandomInt(max);
        return result !== exception ? result : this.GetRandomIntExcept(max, exception);
    }
}

module.exports = Utilities;