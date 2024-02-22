import { Route, Redirect, Switch } from "react-router-dom";
import './App.css'
import NavBar from "./Components/NavBar"
import Posts from "./Components/Posts"
import Adopciones from "./Components/Adopciones"
import IndividualAdoption from "./Components/IndividualAdoption"
import Profile from "./Components/Profile"
import Login from "./Components/Login"
import Register from "./Components/Register"
import Admin from "./Components/management/Admin"
import Mod from "./Components/management/Mod"
import NotFound from "./Components/NotFound"
import Inicio from "./Components/Inicio"

function App() {

  return (
    <div className="App_Main">
      <NavBar/>
      <Switch>
        <Route exact path="/">
            <Redirect to="/inicio" />
        </Route>
        <Route path="/inicio">
          <Inicio/>
        </Route>
        <Route path="/posts">
          <Posts/>
        </Route>
        <Route path="/adoptions">
          <Adopciones/>
        </Route>
        <Route path="/adoption/:id">
          <IndividualAdoption/>
        </Route>
        <Route path="/profile">
          <Profile/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/admin">
          <Admin/>
        </Route>
        <Route path="/mod">
          <Mod/>
        </Route>

        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </div>
  )
}

export default App
