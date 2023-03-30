import Cookies from 'js-cookie'

export default function AuthReducer (state, action) {
    Cookies.set('auth', JSON.stringify(action.payload))
    switch (action.type) {
    case 'AUTH_LOGIN': return { ...action.payload }
    case 'AUTH_LOGOUT': return {}
    case 'AUTH_REFRESH': return { ...state, ...action.payload }
    default: return state
    }
}
