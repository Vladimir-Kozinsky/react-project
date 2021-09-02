import Profile from "./Profile";
import React from 'react';
import { connect } from "react-redux";
import { getUserInfo, getStatus, updateStatus, savePhoto, saveProfileInfo } from "../../redux/profileReduser";
import { follow, unfollow } from "../../redux/usersReduser";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from 'redux';
import { RootState } from "../../redux/redux-store";
import { FormDataValuesType } from "./Profileinfo/ProfileInfoForm";


type MapStateToPropsType = {
    profileInfo: {
        userId: string | null
        lookingForAJob: boolean | null
        lookingForAJobDescription: string | null
        fullName: string | null
        contacts: {
            github: string | null
            vk: string | null
            facebook: string | null
            instagram: string | null
            twitter: string | null
            website: string | null
            youtube: string | null
            mainLink: string | null
        }
        photos: {
            small: string | null,
            large?: string | undefined
        }
    }
    status: string
    authorizedUserId: string | null
    captchaUrl: string | null
    users: Array<UserType>
    userId: string | null
}

type UserType = {
    id: string,
    name: string,
    status: string,
    photos: UserPhotosType,
    followed: boolean
}

type UserPhotosType = {
    small: string,
    large: string
}

type MapDispatchToPropsType = {
    getUserInfo: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
    savePhoto: (photo: string, userId: string) => void
    saveProfileInfo: (formData: FormDataValuesType) => void
    follow: (userId: string) => void
    unfollow: (userId: string) => void
}

type OwnProps = {
    match: any
    history: any
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnProps

class ProfileAPIContainer extends React.Component<PropsType> {

    updateProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        } if (!userId) {
            this.props.history.push('/login');
        }
        this.props.getUserInfo(userId);
        this.props.getStatus(userId);
    }
    componentDidMount() {
        this.updateProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: RootState) {
        if (prevProps.match.params.userId != this.props.match.params.userId) {
            this.updateProfile()
        } 
    }

    render() {
        return <Profile {...this.props} profileInfo={this.props.profileInfo}
            status={this.props.status}
            updateStatus={this.props.updateStatus}
            isOwner={!this.props.match.params.userId}
            savePhoto={this.props.savePhoto}
            saveProfileInfo={this.props.saveProfileInfo}
            users={this.props.users}
            userId = {this.props.userId}
        />
    }
}
let mapStateToProps = (state: RootState): MapStateToPropsType => {
    return {
        profileInfo: state.profilePage.profileInfo,
        status: state.profilePage.status,
        authorizedUserId: state.auth.authdata.id,
        // setCaptchaUrlSucces: state.auth.setCaptchaUrlSucces,
        captchaUrl: state.auth.captchaUrl,
        users: state.navBarPage.friends.items,
        userId: state.auth.authdata.id


    }
}
export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, RootState>(mapStateToProps, { getUserInfo, getStatus, updateStatus, savePhoto, saveProfileInfo, follow, unfollow }),
    withRouter,
    withAuthRedirect
)(ProfileAPIContainer);