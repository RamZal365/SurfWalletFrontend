import axios from 'axios'

const allSpots = async(state) => {
    axios.get('http://127.0.0.1:8000/api/spots/').then( response => {
        console.log(response.data)
        state(response.data)
    }).catch( error => {
        console.error(error)
    })
}

const getSpot = async(id, state) => {
    axios.get(`http://127.0.0.1:8000/api/spots/${id}/`).then( response => {
        console.log(response.data)
        state(response.data)
    }).catch( error => {
        console.error(error)
    })
}

export {
    allSpots,
    getSpot
}