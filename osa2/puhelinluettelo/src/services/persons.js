import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseURL)
}

const post = newPerson => {
    return axios.post(baseURL, newPerson)
}

const remove = id => {
    return axios.delete(baseURL + `/${id}`)
}

const update = (id, updated) => {
    return axios.put(baseURL + `/${id}`, updated)
}

export default {getAll, post, remove, update}