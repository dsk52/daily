import * as React from 'react'
import { firebase, providerTwitter } from '../firebase/apps';
import * as H from 'history'

const context = {
  user: null,
  loginWithTwitter: null,
  signOut: null
}

type AuthProviderProp = {
  children?: React.ReactNode
}

export const AuthContext = React.createContext(context);

const loginWithTwitter = async (history: H.History) => {
  try {
    await firebase.auth().signInWithRedirect(providerTwitter)
    history.push('/daily/list')
  } catch(error) {
    console.error(error)
  }
}

const signOut = async (history: H.History) => {
  console.log('do signout');

  try {
    await firebase.auth().signOut()
    history.replace('/')
  } catch (error) {
    console.error(error);
  }
}

export const AuthProvider: React.FC = ({ children }: AuthProviderProp) => {
  const [user, setUser] = React.useState<firebase.User>()

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('user on auth state change', user);

      if (user == undefined) return

      setUser(user)
    })
    return () => {
      console.log('unmount');
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithTwitter,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
