
export default function ResponsibleReducer (state, action) {
    switch (action.type) {
    case 'GET_RESPONSIBLES': return [...action.payload]
    case 'DELETE_RESPONSIBLE': return [...action.payload]
    default: return state
    }
}
