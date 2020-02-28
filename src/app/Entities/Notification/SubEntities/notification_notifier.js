module.exports = async ({ notifier, SCI }) => {
    if (!notifier || typeof notifier !== "string") {
        throw ("Notification notifier must be a valid string")
    }

    let exist = false

    try {
        exist = await SCI.User.check_user(notifier)
        if (!exist) {
            throw (`Notifier user '${notifier}' does not exist`)
        }
        return notifier;
    }
    catch (erro) {
        throw (erro)
    }
}