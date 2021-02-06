import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://us-central1-website-1-21-9f313.cloudfunctions.net/api' //The API url
  // http://localhost:5001/website-1-21-9f313/us-central1/api
})

export default instance;
