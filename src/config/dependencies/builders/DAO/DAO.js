module.exports = class DAO {
    constructor({ db, ObjectId }) {
        this.db = db
        this.ObjectId = ObjectId
        this.collections = {
            notification_types: db.collection("notification_types"),
            notification_queue: db.collection("notification_queue")
        }
    }

    check_notification_type(type) {
        return new Promise(async (resolve, reject) => {
            this.collections.notification_types.find({ type: type }).toArray((erro, result) => {
                if (erro) {
                    return reject(erro) 
                }
                if (result.length === 0) {
                    resolve(false);
                }
                else {
                    resolve(true)
                }
            })
        })
    }

}