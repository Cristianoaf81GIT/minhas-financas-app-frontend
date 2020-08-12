import React from 'react'
import 'bootswatch/dist/flatly/bootstrap.css'
import 'toastr/build/toastr.min.js'
// eslint-disable-next-line
import $ from 'jquery'
// eslint-disable-next-line
import Popper from 'popper.js'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'font-awesome/css/font-awesome.min.css'
import '../styles/custom.css'
import Rotas from './rotas'
import Navbar from '../components/navBar'
import 'toastr/build/toastr.css'
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'



class App extends React.Component {
  
  render () {
    return (
      <>        
        <Navbar/>        
        <div className="container">
          <Rotas/>
        </div>
      </>
    )
  }

}

export default App
