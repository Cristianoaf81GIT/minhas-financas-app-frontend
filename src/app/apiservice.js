import axios from 'axios'
import baseUrl from '../util/baseURL'



const httpClient = axios.create({
  baseURL: baseUrl
})


class ApiService {

  constructor ( apiurl ) {
    this.apiurl = apiurl
  }

  post( url, objeto ) {
    return httpClient.post( `${this.apiurl}${url}`, objeto )
  }

  put ( url, objeto ) {
    return httpClient.put( `${this.apiurl}${url}`, objeto )
  }

  delete( url ) {
    return httpClient.delete( `${this.apiurl}${url}` ) 
  }

  get( url ) {
    return httpClient.get( `${this.apiurl}${url}` )
  }
}


export default ApiService