
let initialState = {
    sidebar: [
        { id: 1, friend: 'Pasha' },
        { id: 2, friend: 'Sasha' },
        { id: 3, friend: 'Marina' },
        { id: 4, friend: 'Lola' },
    ]
}

let navBarReduser = (state = initialState, action) => {
    return state;
}

export default navBarReduser;