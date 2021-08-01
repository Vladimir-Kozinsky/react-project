import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import { Route, withRouter } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/login/login';
import { Component } from 'react';
import { connect } from 'react-redux';
import { initialazeApp } from './redux/appReduser';
import { compose } from 'redux';
import Preloader from './components/common/Preloader';
import NavBarContainer from './components/Navbar/NavBarContainer';



class App extends Component {

  componentDidMount() {

    this.props.initialazeApp();
  }

  render() {
    if (!this.props.initialazed) {
      return <Preloader />
    }
    return (
      <div className="app">
        <HeaderContainer />
        <div className="appWrapper">
          <NavBarContainer />
          <div className="appContent">
            <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
            <Route path="/dialogs" render={() => <DialogsContainer />} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <Login />} />
          </div>
        </div>
      </div>
    );
  }

}

let mapStateToProps = (state) => {
  return {
    initialazed: state.app.initialazed,
  }
}


export default compose(withRouter(connect(mapStateToProps, { initialazeApp })(App)));
