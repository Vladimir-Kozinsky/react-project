import axios from "axios";
import Profile from "./Profile";
import React from 'react';
import { connect } from "react-redux";
import { setProfileInfo } from "../../redux/profileReduser";
import { withRouter } from "react-router-dom";

class ProfileAPIContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }


        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setProfileInfo(response.data);
            })
            
    }

    render() {
        return <Profile {...this.props} profileInfo={this.props.profileInfo} />
    }
}
let mapStateToProps = (state) => {
    return {
        profileInfo: state.profilePage.profileInfo,
    }
}

let WithUrl = withRouter(ProfileAPIContainer)

let ProfileContainer = connect(mapStateToProps, {
    setProfileInfo
})(WithUrl);

export default ProfileContainer;