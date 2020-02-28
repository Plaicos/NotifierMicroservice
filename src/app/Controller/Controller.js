module.exports = class Controller {
    constructor(dependencies) {
        this.dependencies = dependencies
        this.UseCases = new (require("../UseCases/UseCases"))(dependencies)
    }

    handle_error(erro, callback) {
        console.log({ erro })
        callback(Error(erro), null)
    }

    initialize() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.UseCases.initialize()
                resolve()
            }
            catch{
                reject(erro)
            }
        })
    }

    queue() {
        let self = this
        return async function (call, callback) {
            let { notification_data } = call.request

            try {
                await self.UseCases.queue_notification(notification_data)
                callback(null, { status: "ok" })
            }
            catch (erro) {
                self.handle_error(erro, callback)
            }
        }
    }
}