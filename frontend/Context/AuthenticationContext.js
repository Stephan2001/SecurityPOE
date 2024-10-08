import { createContext, useReducer } from 'react'

export const AuthenticationContext = createContext()

export const UuserReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return {
                user: action.payload
            }
            case 'LOGOUT':
            return {
                user: null
            }
                

            default:
                return state
    }
}

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: []
    })
    
    return (
        <UserContext.Provider value={{...state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}