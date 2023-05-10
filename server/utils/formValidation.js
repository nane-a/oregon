const formValidation = (body, exceptions) => {
    let errorMessage = {}
    for (let key in body) {
        if ((!body[key] || ((typeof (body[key]) === 'string' && !body[key]?.length) || (typeof (body[key]) === 'number' && body[key] <= 0))) && (!exceptions || !exceptions.includes(key))) {
            errorMessage[key] = `${key.toUpperCase()} is required`
        }
    }
    return errorMessage
}

module.exports = formValidation