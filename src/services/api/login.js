import axios from 'axios'

const login = async(username, password) => {
    return axios.post('http://127.0.0.1:8000/api/login/',
    {
        username: username,
        password: password
    }).then( response => {
        console.log(response.data)
        return response
    }).catch( error => {
        console.error(error)
        return error.response
    })
}


const signup = async(form) => {
    return axios.post('http://127.0.0.1:8000/api/signup/',
    {
        username: form.username,
        password: form.password,
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
    }).then( response => {
        console.log(response.data)
        return response
    }).catch( error => {
        console.error(error)
        var response = error.response
        response.message = error.message
        return response
    })
}

export {
    login,
    signup
}