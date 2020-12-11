import './App.css';
import "./video-react.css";
import {Home, End} from './pages/Index'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import store from './store/index'
import {Provider} from 'react-redux'

function App() {
  return (
    <Provider store = {store}>
      <Router>
        <Switch>
          <Route exact = {true} path="/" component={Home} ></Route>
          <Route exact={true} path = "/thanks" component = {End} ></Route>
        </Switch>
      </Router>
    </Provider>
    
  );
}

export default App;
