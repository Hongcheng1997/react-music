import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://10.0.26.189:3000/'

function fetch(url, query) {
  return axios.get(url, query)
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
