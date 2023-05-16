import axios from 'axios'

const login = async(username, password, state) => {
    axios.post('http://127.0.0.1:8000/api/spots/',
    {
        username: username,
        password: password
    }).then( response => {
        console.log(response.data)
        state(response.data)
    }).catch( error => {
        console.error(error)
    })
}   