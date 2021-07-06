import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import { Route } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/login/login';



const App = (props) => {
  return (

    <div className="appWrapper">
      <HeaderContainer />
      <Navbar state={props.store.getState().navBarPage} />
      <div className="appContent">
        <Route path="/profile/:userId" render={() => <ProfileContainer />} />
        <Route path="/dialogs" render={() => <DialogsContainer />} />
        <Route path="/users" render={() => <UsersContainer /> } />
        <Route path="/login" render={() => <Login /> } />
      </div>

    </div>

  );
}

export default App;
