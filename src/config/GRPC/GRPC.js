async function initialize(dependencies) {
    let serverBuilder = require("./Server/ServerBuilder").build
    let serviceFactory = new (require("./Server/Service/ServiceFactory"))
    let apiBuilder = require("./Server/API/API")

    try {
        let service = serviceFactory.makeService()
        let api = await new apiBuilder(dependencies).build()
        let server = serverBuilder(service, api)

        server.start()
        console.log("GRPC NOTIFIER SERVER RUNNING")
        return
    }
    catch (erro) {
        console.log("Error trying to initialize GRPC server, aborting...", erro)
        process.abort()
    }
}

function exportClient() {
    let Client = new (require("./Client/clientBuilder"))().build()
    return Client
}

module.exports = {
    initialize,
    exportClient
}