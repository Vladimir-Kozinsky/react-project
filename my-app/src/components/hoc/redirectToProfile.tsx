
import React from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { RootState } from "../../redux/redux-store";

type PropsType = {
    isAuth: boolean
}

let mapStateToPropsForRedirect = (state: RootState) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const redirectToProfile = (Component: any) => {

    class RedirectComponent extends React.Component<PropsType> {
        render() {
            if (this.props.isAuth) return <Redirect to={"/profile"} />
            return <Component {...this.props} />
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
    return ConnectedAuthRedirectComponent;
}


