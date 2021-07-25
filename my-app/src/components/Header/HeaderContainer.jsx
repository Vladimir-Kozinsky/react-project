import { connect } from "react-redux";
import Header from "./Header";
import { getDataAC, getAuth, logout } from "./../../redux/authReduser";
import React from 'react';


class HeaderAPIContainer extends React.Component {
    componentDidMount() {

        this.props.getAuth();
    }

    render() {
        return <Header authdata={this.props.authdata} isAuth={this.props.isAuth} logout={this.props.logout} avararPhoto={this.props.avararPhoto} />

    }
}

let mapStateToProps = (state) => {
    return {
        authdata: state.auth.authdata,
        isAuth: state.auth.isAuth,
        avararPhoto: state.profilePage.profileSmallPhotoUrl,
    }
}

let HeaderContainer = connect(mapStateToProps, {
    getDataAC, getAuth, logout
})(HeaderAPIContainer);

export default HeaderContainer;