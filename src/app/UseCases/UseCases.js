module.exports = class UseCases {
    constructor(dependencies) {
        this.dependencies = dependencies
        let { DAO, SCI, Queue } = dependencies

        this.Queue = Queue
        this.SCI = SCI
        this.DAO = DAO
        this.entities = require("../Entities/entities")
    }
    
    initialize() {
        return new Promise(async (resolve, reject) => {
            let { Queue, DAO, SCI } = this

            try {
                Queue.set_callback(this.notify())
                resolve()
                console.log("Queue Initialized")
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    queue_notification(data) {
        return new Promise(async (resolve, reject) => {
            let { Queue, entities, SCI, DAO } = this
            let Notification = {}

            if (!data || typeof data !== "object") {
                return reject("Notification data must be a valid object")
            }

            try {
                console.log({ data })
                Notification = await new entities.Notification({ SCI, DAO, data }).build()
                await Queue.queue(Notification)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    notify() {
        let { DAO, SCI, entities } = this
        return async function (job, done) {
            // return new Promise(async (resolve, reject) => {
            //     
            //     
            // }) 
            console.log("Got it")

            done()
        }
    }

}