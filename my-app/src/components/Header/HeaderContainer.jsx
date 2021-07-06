import { connect } from "react-redux";
import Header from "./Header";
import { getDataAC, getAuth } from "./../../redux/authReduser";
import React from 'react';


class HeaderAPIContainer extends React.Component {
    componentDidMount() {

        this.props.getAuth();
    }

    render() {
        return <Header authdata={this.props.authdata} isAuth={this.props.isAuth} />

    }
}

let mapStateToProps = (state) => {
    return {
        authdata: state.auth.authdata,
        isAuth: state.auth.isAuth
    }
}

let HeaderContainer = connect(mapStateToProps, {
    getDataAC, getAuth
})(HeaderAPIContainer);

export default HeaderContainer;