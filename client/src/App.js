import './App.css';
import { BrowserRouter, Route, Switch} from "react-router-dom"
import NavBar from './Components/NavBar/NavBar';
import LandingPage from './Views/LandingPage/LandingPage';
import Home from './Views/Home/Home';
import Form from './Views/Form/Form';
import Details from './Views/Details/Details';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Route path={"*"} component= {NavBar}/>
      <Switch>
         <Route exact path={"/"} component ={LandingPage}/>
         <Route path={"/home"} component ={Home}/>
         <Route path={"/form"} component={Form}/>
         <Route path={"/details/:id"} component ={Details}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
