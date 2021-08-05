import { connect } from "react-redux";
import { followSuccess, setCurrentPage, follow, unfollow, unfollowSuccess, toggleIsProgress, requestUsers } from "../../redux/usersReduser";
import React from 'react';
import Users from "./Users";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { withRouter } from "react-router-dom";
import { compose } from 'redux';
import { getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress, getUsers } from "../../redux/usersSelectors";
import { RootState } from "../../redux/redux-store";


type MapStateToPropsType = {
    pageSize: number,
    currentPage: number,
    users: Array<UserType>,
    isFetching: boolean,
    followingInProgress: Array<Number>,
    totalUsersCount: number
}

type UserType = {
    id: number,
    name: string,
    status: string,
    photos: UserPhotosType,
    folowed: boolean
}
type UserPhotosType = {
    small: string,
    large: string
}

type MapDispatchToPropsType = {
    //  unfollowSuccess: () => void
    // followSuccess: () => void
    setCurrentPage: (pageNumber: number) => void
    // toggleIsProgress: () => void
    requestUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    // toggleFetching: () => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnProps

type OwnProps = {};

class UsersAPIComponent extends React.Component<PropsType> {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }
    onPageChanged = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize);
        this.props.setCurrentPage(pageNumber)
    }
    render() {
        return <Users {...this.props} totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            onPageChanged={this.onPageChanged}
            currentPage={this.props.currentPage}
            users={this.props.users}
            unfollow={this.props.unfollow}
            follow={this.props.follow}
            // toggleFetching={this.props.toggleFetching}
            isFetching={this.props.isFetching}
            //  toggleIsProgress={this.props.toggleIsProgress}
            followingInProgress={this.props.followingInProgress}
        //isAuth={this.props.isAuth}
        />
    }
}

let mapStateToProps = (state: RootState):MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
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

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, RootState>(mapStateToProps, {
        setCurrentPage, requestUsers, follow, unfollow
    }),
    withRouter,
    withAuthRedirect
)(UsersAPIComponent);