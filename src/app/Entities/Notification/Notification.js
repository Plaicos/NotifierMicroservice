module.exports = class Notification {
    constructor({ SCI, DAO, data }) {
        this._data = data
        this.SCI = SCI
        this.DAO = DAO
        this.entities = require("./SubEntities/notification_sub_entities")
    }

    build() {
        return new Promise(async (resolve, reject) => {
            let { data, DAO, SCI, entities } = this

            if (!data || typeof data !== "object") {
                return reject("Notification data must be a valid object")
            }

            let { notifier, target, type, _data } = data
            let Notification = new Object()

            try {
                Notification.type = await entities.type({ type, DAO })
                Notification.notifier = 
                Notification.target =
                Notification.created_at = Date.now()
                Notification.last_attempted = 0
                Notification.attempts = 0
            }
            catch (erro) {
                reject(erro)
            }
        })
    }
}

let _notification = {
    id: "",
    notifier: "Hello3",
    target: "Hello2",
    type: "new message",
    data: {
        base64: "base64"
    },
    created_at: "",
    last_attempted: "",
    attempts: 1
}