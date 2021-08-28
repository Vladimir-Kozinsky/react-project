import { connect } from "react-redux";
import Header from "./Header";
import { getAuth, logout } from "../../redux/authReduser";
import React from 'react';
import { RootState } from "../../redux/redux-store";


type MapStateToPropsType = {
    authdata: {
        id: string | null,
        email: string | null,
        login: string | null,
        token: string | null
    }
    isAuth: boolean
    avatarPhoto: null | string
}
type MapDispatchToPropsType = {
    getAuth: () => void
    logout: () => void
}


type OwnProps = {}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnProps

class HeaderAPIContainer extends React.Component<PropsType> {
    componentDidMount() {

        this.props.getAuth();
    }

    render() {
        return <Header
            authdata={this.props.authdata}
            isAuth={this.props.isAuth}
            logout={this.props.logout}
            avatarPhoto={this.props.avatarPhoto} />

    }
}

let mapStateToProps = (state: RootState): MapStateToPropsType => {
    return {
        authdata: state.auth.authdata,
        isAuth: state.auth.isAuth,
        avatarPhoto: state.profilePage.profileSmallPhotoUrl,
    }
}

let HeaderContainer = connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, RootState>(mapStateToProps, {
    getAuth, logout
})(HeaderAPIContainer);

export default HeaderContainer;