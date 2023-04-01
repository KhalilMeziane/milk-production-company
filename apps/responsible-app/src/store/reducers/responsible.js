
export default function ResponsibleReducer (state, action) {
    switch (action.type) {
    case 'GET_RESPONSIBLES': return [...action.payload]
    case 'SET_RESPONSIBLE': return [...state, action.payload]
    case 'DELETE_RESPONSIBLE': return [...action.payload]
    case 'UPDATE_RESPONSIBLE': return [...action.payload]
    default: return state
    }
}
