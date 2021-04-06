import logo from './logo.svg'
import './App.css'
//import 'bootstrap/dist/css/boostrap.min.css'
//import 'bootswatch/dist/darkly/bootstrap.min.css'
import 'bootswatch/dist/flatly/bootstrap.min.css'
import '@fortawesome/fontawesome-free/js/all' 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
