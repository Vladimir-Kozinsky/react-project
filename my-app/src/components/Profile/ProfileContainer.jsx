import Profile from "./Profile";
import React from 'react';
import { connect } from "react-redux";
import { setProfileInfo, getUserInfo } from "../../redux/profileReduser";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../hoc/withAuthRedirect";

class ProfileAPIContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }

        this.props.getUserInfo(userId);

    }

    render() {
        return <Profile {...this.props} profileInfo={this.props.profileInfo} isAuth={this.props.isAuth} />
    }
}

let AuthRedirectComponent = withAuthRedirect(ProfileAPIContainer)





let mapStateToProps = (state) => {
    return {
        profileInfo: state.profilePage.profileInfo,
    }
}

let WithUrl = withRouter(AuthRedirectComponent)

let ProfileContainer = connect(mapStateToProps, {
    setProfileInfo, getUserInfo
})(WithUrl);

export default ProfileContainer;