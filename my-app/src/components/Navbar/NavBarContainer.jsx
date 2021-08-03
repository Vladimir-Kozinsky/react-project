import { connect } from "react-redux"
import React from 'react'
import Navbar from "./Navbar"
import { getFriends } from "./../../redux/navBarReduser"


class NavBarContainer extends React.Component {
    componentDidMount() {
        this.props.getFriends(true, this.props.currentPage);
    }
    componentDidUpdate(prevProps, prevState) {
        // if (prevProps.friends.length != this.props.friends.length) {
        //     this.props.getFriends(true, this.props.currentPage);
        //     console.log(prevProps.friends)
        //     console.log(this.props.friends.length)
        // }
        // console.log(prevProps.friends.length)
        // console.log(this.props.friends)
    }

    render() {
        return <Navbar friends={this.props.friends}
            currentPage={this.props.currentPage}
            totalCount={this.props.totalCount}
            friendsBlockSize={this.props.friendsBlockSize}
            getFriends={this.props.getFriends}
        />
    }
}

let mapStateToProps = (state) => {
    return {
        friends: state.navBarPage.friends,
        currentPage: state.navBarPage.currentPage,
        totalCount: state.navBarPage.totalCount,
        friendsBlockSize: state.navBarPage.friendsBlockSize

    }
}

export default connect(mapStateToProps, {
    getFriends
})(NavBarContainer);