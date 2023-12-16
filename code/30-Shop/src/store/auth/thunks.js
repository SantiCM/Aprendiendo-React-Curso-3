import { loginWithEmailPassword, registerUserWithEmailPassword, singInWithInGoogle } from "../../firebase/provider"
import { onCheking, onLogin, onLogout } from "./authSlice"

export const chekignInformation = () => {

    return async(dispatch) => {
        
        dispatch(onCheking())
    
    }

}

export const chekingGoogle = () => {

    return async(dispatch) => {

        dispatch(onCheking())

        const result = await singInWithInGoogle()

        if(!result.ok) {
            
            return dispatch(onLogout(result.errorMessage))
        
        }
        
        dispatch(onLogin(result))

    }

}

export const startCreatingEmailPassword  = ({email, password, displayName }) => {

    return async(dispatch) => {
    
        dispatch(onCheking())

        const {ok, uid, errorMessage} = await registerUserWithEmailPassword({email, password, displayName})

        if(!result.ok) {
            
            return dispatch(onLogout({errorMessage}))
        
        }

        dispatch(onLogin({uid, email, displayName}))
    
    }

}


export const startLoginWithEmailPassword = ({email, password}) => {

    return async (dispatch) => {
        
        dispatch(checkingCredencial())

        const resp = await loginWithEmailPassword({email, password})

        if(!resp.ok) return dispatch(onLogout(resp))

        // dispatch del login con su cuenta
        dispatch(onLogin(resp))
    
    }

}