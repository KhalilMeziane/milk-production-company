
export default function CowReducer (state, action) {
    switch (action.type) {
    case 'GET_COWS': return { ...state, cows: action.payload }
    default: return state
    }
}
