import axios from 'axios'

const allWetsuits = async(state) => {
    axios.get('http://127.0.0.1:8000/api/wetsuits/').then( response => {
        console.log(response.data)
        state(response.data)
    }).catch( error => {
        console.error(error)
    })
}

const getWetsuit = async(id, state) => {
    axios.get(`http://127.0.0.1:8000/api/wetsuits/${id}/`).then( response => {
        console.log(response.data)
        state(response.data)
    }).catch( error => {
        console.error(error)
    })
}

export {
    allWetsuits,
    getWetsuit
}