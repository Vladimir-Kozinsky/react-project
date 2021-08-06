import React from 'react';
import Dialogs from './Dialogs';
import { addMessage } from '../../redux/dialogsReduser';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux'
import { RootState } from '../../redux/redux-store';

type MapStateToPropsType = {
    dialogs: Array<dialogsType>
    avatarPhoto: null | string
    isAuth: boolean
}

type dialogsType = {
    id: number,
    name: string,
    messages: any
}

// type messagesType = {
//     id: number,
//     message: string,
// }

type OwnProps = {};

type MapDispatchToPropsType = {
    addMessage: (changeMessageText: string, id: number, messageId: number) => void

}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnProps

class DialogsAPIContainer extends React.Component<PropsType> {
    componentDidCatch() {

    }
    render() {
        return <Dialogs dialogs={this.props.dialogs}
            isAuth={this.props.isAuth}
            addMessage={this.props.addMessage}
           // changeMessageText={this.props.changeMessageText}
            avatarPhoto={this.props.avatarPhoto} />
    }
}
let mapStateToProps = (state: RootState): MapStateToPropsType => {
    return {
        dialogs: state.messagesPage.dialogs,
        avatarPhoto: state.profilePage.profileSmallPhotoUrl,
        isAuth: state.auth.isAuth

    }
}
export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType ,OwnProps, RootState>(mapStateToProps, { addMessage }),
    withRouter,
    withAuthRedirect,
)(DialogsAPIContainer);