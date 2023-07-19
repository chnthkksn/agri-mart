import React, { useContext, useState, useEffect } from "react"
import { auth, googleProvider } from "../config/auth"
import { signInWithEmailAndPassword } from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function googleSign() {
        return auth.signInWithPopup(googleProvider)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signIn,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        googleSign
    }

    return (
        <AuthContext.Provider value={value}>
            {
                loading ?
                    <div className='flex justify-center items-center h-screen'>
                        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
                    </div> : children
            }
        </AuthContext.Provider>
    )
}