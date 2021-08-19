import { connect } from "react-redux";
import { setCurrentPage, follow, unfollow, requestUsers } from "../../redux/usersReduser";
import React from 'react';
import Users from "./Users";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { withRouter } from "react-router-dom";
import { compose } from 'redux';
import { getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress, getUsers } from "../../redux/usersSelectors";
import { RootState } from "../../redux/redux-store";
import { getFriendsCurrentPage } from "../../redux/navBarSelectors";
import { getFriends } from './../../redux/navBarReduser';



type MapStateToPropsType = {
    pageSize: number,
    currentPage: number,
    users: Array<UserType>,
    isFetching: boolean,
    followingInProgress: Array<Number>,
    totalUsersCount: number,
    friendsCurrentPage: number
}

type UserType = {
    id: number,
    name: string,
    status: string,
    photos: {
        small: string,
        large: string
    }
    followed: boolean
}

type MapDispatchToPropsType = {
    setCurrentPage: (currentPage: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getFriends: (isFolowed: boolean, currentPage: number) => void
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
            isFetching={this.props.isFetching}
            followingInProgress={this.props.followingInProgress}
        />
    }
}

let mapStateToProps = (state: RootState): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        friendsCurrentPage: getFriendsCurrentPage(state)
    }
}

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, RootState>(mapStateToProps, {
        setCurrentPage, requestUsers, follow, unfollow, getFriends
    }),
    withRouter,
    withAuthRedirect
)(UsersAPIComponent);