module.exports = async ({ type, DAO }) => {
    if (!type || typeof type !== "string") {
        throw ("Notification type must be a valid string")
    }

    let exist = false

    try {
        exist = await DAO.check_notification_type(type)
        if (!exist) {
            throw (`Notification type '${type}' does not exist`)
        }
        return type;
    }
    catch (erro) {
        throw (erro)
    }
}