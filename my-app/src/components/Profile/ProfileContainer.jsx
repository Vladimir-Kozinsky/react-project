import Profile from "./Profile";
import React from 'react';
import { connect } from "react-redux";
import { setProfileInfo, getUserInfo, setStatus, getStatus, updateStatus, savePhoto, saveProfileInfo, setEditMode } from "../../redux/profileReduser";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from 'redux';



class ProfileAPIContainer extends React.Component {

    updateProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId.id;
        } if (!userId) {
            this.props.history.push('/login');
        }
        this.props.getUserInfo(userId);
        this.props.getStatus(userId);
    }
    componentDidMount() {
        this.updateProfile()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.userId != this.props.match.params.userId) {
            this.updateProfile()
        }

    }

    render() {
        return <Profile {...this.props} profileInfo={this.props.profileInfo}
            isAuth={this.props.isAuth} status={this.props.status}
            setStatus={this.props.setStatus} updateStatus={this.props.updateStatus}
            isOwner={!this.props.match.params.userId}
            savePhoto={this.props.savePhoto}
            saveProfileInfo={this.props.saveProfileInfo}
            editMode={this.props.editMode}
            setEditMode={this.props.setEditMode}
            />
    }
}
let mapStateToProps = (state) => {
    return {
        profileInfo: state.profilePage.profileInfo,
        status: state.profilePage.status,
        authorizedUserId: state.auth.authdata,
        isAuth: state.auth.isAuth,
        editMode: state.profilePage.editMode,
        setCaptchaUrlSucces: state.auth.setCaptchaUrlSucces,
        captchaUrl: state.auth.captchaUrl


    }
}
export default compose(
    connect(mapStateToProps, { setProfileInfo, getUserInfo, setStatus, getStatus, updateStatus, savePhoto, saveProfileInfo, setEditMode }),
    withRouter,
    withAuthRedirect
)(ProfileAPIContainer);