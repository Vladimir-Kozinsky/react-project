import { connect } from "react-redux"
import React from 'react'
import Navbar from "./Navbar"
import { getFriends } from "../../redux/navBarReduser"
import { RootState } from "../../redux/redux-store"
import { friends, getFriendsBlockSize } from "../../redux/navBarSelectors"
import { getCurrentPage } from "../../redux/navBarSelectors"



type MapStateToPropsType = {
    friends: {
        items: Array<itemsType>,
        totalCount: number,
        error: string
    },
    currentPage: number
    friendsBlockSize: number
}

type itemsType = {
    id: number,
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
        // if (this.props.friends.totalCount != prevProps.friends.totalCount) {
        //     this.props.getFriends(true, this.props.currentPage);
        //     console.log(this.props.friends.totalCount)
        //     console.log(prevProps.friends.totalCount)
        // }

        //if (prevProps.currentPage != this.props.currentPage || prevProps.friends.totalCount != this.props.friends.totalCount) {
    }

    // componentDidUpdate(prevProps, prevState) {
    // if (prevProps.friends.length != this.props.friends.length) {
    //     this.props.getFriends(true, this.props.currentPage);
    //     console.log(prevProps.friends)
    //     console.log(this.props.friends.length)
    // }
    // console.log(prevProps.friends.length)
    // console.log(this.props.friends)
    //}

    render() {
        return <Navbar friends={this.props.friends}
            currentPage={this.props.currentPage}
            friendsBlockSize={this.props.friendsBlockSize}
            getFriends={this.props.getFriends}
        />
    }
}

let mapStateToProps = (state: RootState): MapStateToPropsType => {
    return {
        friends: friends(state),
        currentPage: getCurrentPage(state),
        friendsBlockSize: getFriendsBlockSize(state),

    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, RootState>(mapStateToProps, {
    getFriends
})(NavBarContainer);