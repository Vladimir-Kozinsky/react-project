import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import { Route } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';



const App = (props) => {
  return (

    <div className="appWrapper">
      <Header />
      <Navbar state={props.store.getState().navBarPage} />
      <div className="appContent">
        <Route path="/profile/:userId" render={() => <ProfileContainer />} />
        <Route path="/dialogs" render={() => <DialogsContainer />} />
        <Route path="/users" render={() => <UsersContainer /> } />
      </div>

    </div>

  );
}

export default App;
