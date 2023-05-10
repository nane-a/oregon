const axelsNameFormator = async (number) => {
    if (number === 5) {
        return 'five'
    } else if (number === 6) {
        return 'six'
    } else if (number === 7) {
        return 'seven'
    } else if (number === 8) {
        return 'eight'
    } else if (number >= 9) {
        return 'nine_or_more'
    }
}

module.exports = axelsNameFormator