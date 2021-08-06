import { RootState } from "./redux-store";

export const friends = (state: RootState) => {
    return state.navBarPage.friends;
}
export const getCurrentPage = (state: RootState) => {
    return state.navBarPage.currentPage;
}
export const getFriendsBlockSize= (state: RootState) => {
    return state.navBarPage.friendsBlockSize;
}