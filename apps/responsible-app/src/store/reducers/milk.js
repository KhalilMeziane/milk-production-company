
export default function MilkReducer (state, action) {
    switch (action.type) {
    case 'GET_MILKS': return [...action.payload]
    case 'SET_MILK': return [...state, action.payload]
    case 'DELETE_MILK': return [...action.payload]
    case 'UPDATE_MILK': return [...action.payload]
    default: return state
    }
}
