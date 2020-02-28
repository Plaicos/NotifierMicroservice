module.exports = class Queue {
    constructor() {
        this.Queue = require("bull")
        this.options = require("./queue_options")
    }

    build() {
        return new Promise(async (resolve, reject) => {

            let { Queue, options } = this
            let Notification_Queue = {}

            try {
                Notification_Queue = new Queue(options.name)
                Notification_Queue = await this.methods(Notification_Queue)
                
                resolve(Notification_Queue)
            }
            catch(erro){
                reject(erro)
            }
        })
    }

    methods(Queue) {
        Queue = {
            queue: this.queue(Queue),
            set_callback: this.set_callback(Queue)
        }
        return Queue;
    }

    set_callback(Queue) {
        return function (callback) {
            try {
                Queue.process(callback)
                return
            }
            catch (erro) {
                throw (erro)
            }
        }
    }

    queue(Queue) {
        var { options } = this
        return function (job) {
            return new Promise(async (resolve, reject) => {
                try {
                    console.log("Quering...", job)
                    await Queue.add(job, { attempts: options.attempts })
                    resolve()
                }
                catch (erro) {
                    reject(erro)
                }
            })
        }
    }

}