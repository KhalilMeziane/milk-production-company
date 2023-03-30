
export default function CowReducer (state, action) {
    switch (action.type) {
    case 'GET_COWS': return [...action.payload]
    case 'SET_COW': return [...state, action.payload]
    case 'DELETE_COW': return [...action.payload]
    case 'UPDATE_COW': return [...action.payload]

    default: return state
    }
}
