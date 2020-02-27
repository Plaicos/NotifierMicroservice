module.exports = class Queue {
    constructor({ DAO, SCI, Queue }) {
        this.DAO = DAO
        this.SCI = SCI
        this.active = false
    }

    queue(notification) {

    }

    start() {
        
    }

    stop() {
        this.active = false;
    }
}