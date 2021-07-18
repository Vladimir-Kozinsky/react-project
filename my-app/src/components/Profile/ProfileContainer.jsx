import Profile from "./Profile";
import React from 'react';
import { connect } from "react-redux";
import { setProfileInfo, getUserInfo, setStatus, getStatus, updateStatus } from "../../redux/profileReduser";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from 'redux';


class ProfileAPIContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId.id;
        } if (!userId) {
            this.props.history.push('/login');
        }
        this.props.getUserInfo(userId);
        this.props.getStatus(userId);
    }

    render() {
        return <Profile {...this.props} profileInfo={this.props.profileInfo}
            isAuth={this.props.isAuth} status={this.props.status}
            setStatus={this.props.setStatus} updateStatus={this.props.updateStatus} />
    }
}
let mapStateToProps = (state) => {
    return {
        profileInfo: state.profilePage.profileInfo,
        status: state.profilePage.status,
        authorizedUserId: state.auth.authdata,
        isAuth: state.auth.isAuth,

    }
}
export default compose(
    connect(mapStateToProps, { setProfileInfo, getUserInfo, setStatus, getStatus, updateStatus }),
    withRouter,
    withAuthRedirect
)(ProfileAPIContainer);