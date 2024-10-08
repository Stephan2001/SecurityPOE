import {useAuthContext} from '../Context/AuthenticationContext'

export const useLogout = () = {
    const {dispatch} = useAuthContext()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({})
    }
}