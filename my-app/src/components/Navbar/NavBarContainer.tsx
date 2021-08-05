import { connect } from "react-redux"
import React from 'react'
import Navbar from "./Navbar"
import { getFriends } from "../../redux/navBarReduser"
import { RootState } from "../../redux/redux-store"



type MapStateToPropsType = {
    friends: Array<initialStateSideBarType>,
    currentPage: number,
    totalCount: number,
    friendsBlockSize: number
}

type initialStateSideBarType = {
    id: number,
    friend: string,
    photos: {
        small: string,
        large: string
    }
}

type MapDispatchToPropsType = {
    getFriends: (isFollow: boolean, currentPage: number) => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnProps

type OwnProps = {};

class NavBarContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getFriends(true, this.props.currentPage);
        console.log(this.props.currentPage)
        console.log(this.props.friends)
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
            totalCount={this.props.totalCount}
            friendsBlockSize={this.props.friendsBlockSize}
            getFriends={this.props.getFriends}
        />
    }
}

let mapStateToProps = (state: RootState): MapStateToPropsType => {
    return {
        friends: state.navBarPage.friends,
        currentPage: state.navBarPage.currentPage,
        totalCount: state.navBarPage.totalCount,
        friendsBlockSize: state.navBarPage.friendsBlockSize

    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, RootState>(mapStateToProps, {
    getFriends
})(NavBarContainer);