import React from 'react';
import Dialogs from './Dialogs';
import { addMessage } from '../../redux/dialogsReduser';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux'

class DialogsAPIContainer extends React.Component {
    componentDidCatch() {

    }
    render() {
        return <Dialogs dialogs={this.props.dialogs}
            isAuth={this.props.isAuth}
            addMessage={this.props.addMessage}
            changeMessageText={this.props.changeMessageText}
            avatarPhoto={this.props.avatarPhoto} />
    }
}
let mapStateToProps = (state) => {
    return {
        dialogs: state.messagesPage.dialogs,
        avatarPhoto: state.profilePage.profileSmallPhotoUrl

    }
}
export default compose(
    connect(mapStateToProps, { addMessage }),
    withRouter,
    withAuthRedirect,
)(DialogsAPIContainer);