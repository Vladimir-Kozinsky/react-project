import { connect } from "react-redux"
import React from 'react'
import Navbar from "./Navbar"
import { getFriends } from "../../redux/navBarReduser"
import { RootState } from "../../redux/redux-store"
import { friends, getFriendsBlockSize } from "../../redux/navBarSelectors"
import { getFriendsCurrentPage } from "../../redux/navBarSelectors"



type MapStateToPropsType = {
    friends: {
        items: Array<itemsType>,
        totalCount: number,
        error: string
    },
    currentPage: number
    friendsBlockSize: number
    isAuth: boolean
    users: Array<itemsType>,
}

type itemsType = {
    id: string,
    name: string,
    photos: {
        small: string,
        large: string
    }
    status: string,
    followed: boolean
}


type MapDispatchToPropsType = {
    getFriends: (isFollow: boolean, currentPage: number) => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnProps

type OwnProps = {};

class NavBarContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getFriends(true, this.props.currentPage);
    }
    componentDidUpdate(prevProps: PropsType, prevState: RootState) {
        if (prevProps.users != this.props.users) {
            this.props.getFriends(true, this.props.currentPage)
        }

    }
    render() {
        return <Navbar friends={this.props.friends}
            currentPage={this.props.currentPage}
            friendsBlockSize={this.props.friendsBlockSize}
            getFriends={this.props.getFriends}
            isAuth={this.props.isAuth}
        />
    }
}

let mapStateToProps = (state: RootState): MapStateToPropsType => {
    return {
        friends: friends(state),
        currentPage: getFriendsCurrentPage(state),
        friendsBlockSize: getFriendsBlockSize(state),
        isAuth: state.auth.isAuth,
        users: state.usersPage.users
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, RootState>(mapStateToProps, {
    getFriends
})(NavBarContainer);