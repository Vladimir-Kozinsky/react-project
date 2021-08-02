import { connect } from "react-redux"
import React from 'react'
import Navbar from "./Navbar"
import { getFriends } from "./../../redux/navBarReduser"


class NavBarContainer extends React.Component {
    componentDidMount() {
        this.props.getFriends();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.friends != this.props.friends) {
            this.props.getFriends();
            console.log(prevProps.friends)
        }
    }

    render() {
        return <Navbar friends={this.props.friends} />
    }
}

let mapStateToProps = (state) => {
    return {
        friends: state.navBarPage.friends,
    }
}

export default connect(mapStateToProps, {
    getFriends
})(NavBarContainer);