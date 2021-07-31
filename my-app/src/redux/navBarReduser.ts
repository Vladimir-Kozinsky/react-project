
export type initialStateType = {
    sidebar: Array<initialStateSideBarType>
}
type initialStateSideBarType = {
    id: number,
    friend: string,
}
let initialState: initialStateType = {
    sidebar: [
        { id: 1, friend: 'Pasha' },
        { id: 2, friend: 'Sasha' },
        { id: 3, friend: 'Marina' },
        { id: 4, friend: 'Lola' },
    ]
}


let navBarReduser = (state = initialState, action: any): initialStateType => {
    return state;
}

export default navBarReduser;