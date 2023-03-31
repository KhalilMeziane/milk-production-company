
export default function AuthReducer (state, action) {
    switch (action.type) {
    case 'AUTH_LOGIN': return { ...action.payload }
    case 'AUTH_LOGOUT': return {}
    case 'AUTH_REFRESH': return { ...state, ...action.payload }
    default: return state
    }
}
