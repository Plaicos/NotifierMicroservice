module.exports = class DAO {
    constructor({ db, ObjectId }) {
        this.db = db
        this.ObjectId = ObjectId
        this.collections = {
            notification_types: db.collection("notification_types"),
            notification_queue: db.collection("notification_queue")
        }
    }

    async check_notification_type(type) {
        try {
            let exists = await this.collections.notification_types.find({ type: type }).toArray((erro, result) => {
                if (erro) {
                    throw erro
                }
                if (result.length === 0) {
                    return false;
                }
                else {
                    return true
                }
            })
            return exists;
        }
        catch{
            reject(erro)
        }
    }

}