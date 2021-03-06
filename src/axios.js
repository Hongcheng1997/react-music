import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://120.79.15.59:3000/'

axios.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error)
})

function fetch(url, query) {
  return axios.get(url, { params: query })
}

fetch.post = function(url, query) {
  return axios.post(url, query)
}

axios.postQs = function(url, query) {
  return axios({
    url,
    method: 'post',
    query,
    transformRequest: [
      function(data) {
        qs.stringify(data)
        return data
      }
    ]
  })
}

export default fetch
