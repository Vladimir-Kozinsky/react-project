import { connect } from "react-redux";
import { follow, setCurrentPage, setTotalUsersCount, setUsers, toggleFetching, unfollow, setChoosedId } from "../../redux/usersReduser";
import axios from 'axios';
import React from 'react';
import Users from "./Users";

class UsersAPIComponent extends React.Component {
    componentDidMount() {
        this.props.toggleFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleFetching(false);
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            })
    }
    onPageChanged = (pageNumber) => {
        this.props.toggleFetching(true);
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleFetching(false);
                this.props.setUsers(response.data.items);

            })
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
        />
    }
}



let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
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
    unfollow, follow, setUsers, setCurrentPage, setTotalUsersCount, toggleFetching
})(UsersAPIComponent);

export default UsersContainer;