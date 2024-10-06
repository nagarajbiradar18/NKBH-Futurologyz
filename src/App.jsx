import { useState } from 'react'
import Driver from './components/Driver'
import City from './components/City'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <nav class="navbar navbar-expand-sm bg-success navbar-dark text-center">
        <h5 className="app-header  ">NKBH Futurologyz</h5>
      </nav>
      <br />

      <div className='container-fluid'>
        <div className="card">
          <h6 className="card-header text-bg-success">DC Calculation</h6>
          <div className="card-body">
            <h5 className="card-title"></h5>
            <div className="card-text">
              <Driver />
            </div>
            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
          </div>
        </div>

        <br />
        <div className="card">
          <h6 className="card-header text-bg-success">Name Number</h6>
          <div className="card-body">
            <h5 className="card-title"></h5>
            <div className="card-text">
              <City />
            </div>
            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
          </div>
        </div>

        <br />
      </div>

    </>
  )
}

export default App
