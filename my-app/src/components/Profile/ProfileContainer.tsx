import Profile from "./Profile";
import React from 'react';
import { connect } from "react-redux";
import { getUserInfo, setStatus, getStatus, updateStatus, savePhoto, saveProfileInfo, setEditMode } from "../../redux/profileReduser";
import { follow, unfollow } from "../../redux/usersReduser";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from 'redux';
import { RootState } from "../../redux/redux-store";


type MapStateToPropsType = {
    profileInfo: {
        userId: number | null
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
    authorizedUserId: number | null
    isAuth: boolean
    editMode: boolean
    captchaUrl: string | null
    users: Array<UserType>
}

type UserType = {
    id: number,
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
    getUserInfo: (userId: number) => void
    setStatus: (status: string) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (photo: string) => void
    saveProfileInfo: (formData: any) => void
    setEditMode: (editMode: boolean) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
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
            isAuth={this.props.isAuth} status={this.props.status}
            setStatus={this.props.setStatus} updateStatus={this.props.updateStatus}
            isOwner={!this.props.match.params.userId}
            savePhoto={this.props.savePhoto}
            saveProfileInfo={this.props.saveProfileInfo}
            editMode={this.props.editMode}
            setEditMode={this.props.setEditMode}
            users={this.props.users}
        />
    }
}
let mapStateToProps = (state: RootState): MapStateToPropsType => {
    return {
        profileInfo: state.profilePage.profileInfo,
        status: state.profilePage.status,
        authorizedUserId: state.auth.authdata.id,
        isAuth: state.auth.isAuth,
        editMode: state.profilePage.editMode,
        // setCaptchaUrlSucces: state.auth.setCaptchaUrlSucces,
        captchaUrl: state.auth.captchaUrl,
        users: state.navBarPage.friends.items


    }
}
export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, RootState>(mapStateToProps, { getUserInfo, setStatus, getStatus, updateStatus, savePhoto, saveProfileInfo, setEditMode, follow, unfollow }),
    withRouter,
    withAuthRedirect
)(ProfileAPIContainer);