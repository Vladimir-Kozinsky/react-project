import { connect } from "react-redux";
import { followSuccess, setCurrentPage, follow, unfollow, unfollowSuccess , toggleIsProgress, getUsers } from "../../redux/usersReduser";
import React from 'react';
import Users from "./Users";


class UsersAPIComponent extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
             
        this.props.setCurrentPage(pageNumber)
        

    }

    render() {

        return <Users totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            onPageChanged={this.onPageChanged}
            currentPage={this.props.currentPage}
            users={this.props.users}
            unfollow={this.props.unfollow}
            follow={this.props.follow}
            toggleFetching={this.props.toggleFetching}
            isFetching={this.props.isFetching}
            toggleIsProgress={this.props.toggleIsProgress}
            followingInProgress={this.props.followingInProgress}

        />
    }
}



let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

// let mapDispatchToProps = (dispatch) => {
// return {
//     unfollow: (userId) => {
//         dispatch(unfollowAC(userId));
//     },
//     follow: (userId) => {
//       dispatch(followAC(userId));
//   },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (currentPage) => {
//             dispatch(setCurrentPageAC(currentPage))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleFetching: (isFetching) => {
//             dispatch(toggleFetchingAC(isFetching))
//         }
//     }
// }

const UsersContainer = connect(mapStateToProps, {
    unfollowSuccess , followSuccess ,  
    setCurrentPage,  
    toggleIsProgress, getUsers, follow, unfollow
})(UsersAPIComponent);

export default UsersContainer;