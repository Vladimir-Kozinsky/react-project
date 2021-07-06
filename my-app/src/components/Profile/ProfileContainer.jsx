import Profile from "./Profile";
import React from 'react';
import { connect } from "react-redux";
import { setProfileInfo, getUserInfo } from "../../redux/profileReduser";
import { withRouter } from "react-router-dom";

class ProfileAPIContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }

        this.props.getUserInfo(userId);

    }

    render() {
        return <Profile {...this.props} profileInfo={this.props.profileInfo}  isAuth={this.props.isAuth} />
    }
}
let mapStateToProps = (state) => {
    return {
        profileInfo: state.profilePage.profileInfo,
        isAuth: state.auth.isAuth
    }
}

let WithUrl = withRouter(ProfileAPIContainer)

let ProfileContainer = connect(mapStateToProps, {
    setProfileInfo, getUserInfo
})(WithUrl);

export default ProfileContainer;