module.exports = async ({ target, SCI }) => {
    if (!target || typeof target !== "string") {
        throw ("Notification target must be a valid string")
    }

    let exist = false

    try {
        exist = await SCI.User.check_user(target)
        if (!exist) {
            throw (`Target user '${target}' does not exist`)
        }
        return target;
    }
    catch (erro) {
        throw (erro)
    }
}