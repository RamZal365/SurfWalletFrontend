import axios from 'axios'

const allSurfboards = async(state) => {
    axios.get('http://127.0.0.1:8000/api/surfboards/').then( response => {
        console.log(response.data)
        state(response.data)
    }).catch( error => {
        console.error(error)
    })
}

const getSurfboard = async(id, state) => {
    axios.get(`http://127.0.0.1:8000/api/surfboards/${id}/`).then( response => {
        console.log(response.data)
        state(response.data)
    }).catch( error => {
        console.error(error)
    })
}

export {
    allSurfboards,
    getSurfboard
}