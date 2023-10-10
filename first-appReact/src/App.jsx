import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Link } from "react-router-dom";
import ok from '../images/ok.webp'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
    <br />
      <div className='container text-center'>
        <h1>Vite + React</h1>
        <hr />
      </div>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div> */}
      <div className="container text-center">
        <Link className="btn btn-success" to={"/TodoList"}> Movimientos </Link>
        <p className="read-the-docs">
          <br />
          Bienvenido, puedes usar tranquilamente el simulador.
        </p>

        <div className="img-thumbnail border-0 shadow rounded">
          <img src={ok} alt="" srcset="" />
        </div>
      </div>
    </>
  )
}

export default App
