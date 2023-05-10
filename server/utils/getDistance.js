const { default: axios } = require("axios");

const getDistance = async (originLatArr, originLngArr, destLatArr, destLngArr, apiKey) => {
    let distance = 0
    for (let i = 0; i < destLatArr.length; i++) {
        await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLatArr[i]},${originLngArr[i]}&destinations=${destLatArr[i]},${destLngArr[i]}&key=${apiKey}`)
            .then(response => {
                distance += response.data.rows[0].elements[0].distance.value / 1603
            })
            .catch(error => console.error(error));
    }
    return distance
}

module.exports = getDistance