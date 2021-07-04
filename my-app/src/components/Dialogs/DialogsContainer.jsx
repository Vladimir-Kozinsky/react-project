import React from 'react';
import Dialogs from './Dialogs';
import { addMessageTextActionCreator, changeMessageTextActionCreator } from '../../redux/dialogsReduser';
import { connect } from 'react-redux';



let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            dispatch(addMessageTextActionCreator());
        },
        changeMessageText: (newText) => {
            dispatch(changeMessageTextActionCreator(newText));
        },
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;