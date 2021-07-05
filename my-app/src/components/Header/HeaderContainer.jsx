import { connect } from "react-redux";
import Header from "./Header";
import { getDataAC } from "./../../redux/authReduser";
import axios from "axios";
import React from 'react';


class HeaderAPIContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0//auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.getDataAC(response.data)
                }

            })
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
    getDataAC
})(HeaderAPIContainer);

export default HeaderContainer;