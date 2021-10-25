import React from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useInit } from './components/app/hooks/useInit';
import { Nav } from './components/app/Nav';
import { Home } from './views/Home';
import { Signup } from './views/Signup';
import { Login } from './views/Login';
import { About } from './views/About';
import { Contact } from './views/Contact';
import { Shop } from './views/Shop';
import { Shipment }from './views/Shipment';
import { Profile } from './views/Profile';
import { Close } from './components/app/Close';
const App: React.FC = () => {
  const { user, logoutUser, setUser, cart, setCart, login } = useInit()
  return (
    <div className="App">
      <Router >
        <header>
          <Nav user={user} logoutUser={logoutUser}/>
        </header>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/login" exact render={(props) => 
            <Login {...props} setUser={setUser} login={login}/>}/>
          <Route path="/about" exact component={About}/>
          <Route path="/contact" exact component={Contact}/>
          <Route path="/shop" exact render={(props) => 
            <Shop {...props} user={user} cart={cart} setCart={setCart} />}/>
          <Route path="/shipping" exact render={(props) => 
            <Shipment {...props} cart={cart} user={user}/>}/>
          <Route path="/profile" exact render={(props) => 
            <Profile {...props} user={user}/>}/>
        </Switch>
        <footer className="footer">
          <Close/>
        </footer> 
      </Router>
    </div>
  );
}

export default App;
