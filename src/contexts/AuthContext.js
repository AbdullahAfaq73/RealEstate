import React, { createContext, useContext, useReducer, useEffect } from 'react'
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

const AuthContext = createContext()

const initialState = { isAuthenticated: false, isProcessing: true }

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return Object.assign({}, { isAuthenticated: true  }, { isProcessing: false }, { user: action.payload.user })
        case "LOGOUT":
            return Object.assign({}, { isAuthenticated: false }, { isProcessing: false })
        default:
            return state
    }
}

export default function AuthContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        auth().onAuthStateChanged(async (user) => {
            console.log(user)
            if (user) {
                // console.log(user)
                const userData = (await firestore().collection('users').doc(user.uid).get()).data();
                // console.log(userData)
                dispatch({ type: "LOGIN", payload: { user: userData } })
            } else {
                console.log("user isn't signed in")
                dispatch({ type: "LOGOUT" })
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => {
    return useContext(AuthContext)
}

export { useAuthContext }