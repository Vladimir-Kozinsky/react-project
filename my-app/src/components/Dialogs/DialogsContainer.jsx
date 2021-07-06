import React from 'react';
import Dialogs from './Dialogs';
import { addMessage, changeMessageText } from '../../redux/dialogsReduser';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from '../hoc/withAuthRedirect';

class DialogsAPIContainer extends React.Component {
    componentDidCatch() {

    }
    render () {
        return <Dialogs messagesPage={this.props.messagesPage} 
        isAuth={this.props.isAuth}
        addMessage={this.props.addMessage}
        changeMessageText={this.props.changeMessageText} />
    }
}

let AuthRedirectComponent = withAuthRedirect(DialogsAPIContainer);


let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage
    }
}



let WithUrl = withRouter(AuthRedirectComponent)

const DialogsContainer = connect(mapStateToProps, {addMessage, changeMessageText})(WithUrl);

export default DialogsContainer;