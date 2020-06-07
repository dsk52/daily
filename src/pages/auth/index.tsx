import * as React from 'react';
import { firebase, providerTwitter } from '../../firebase/app';


function loginWithTwitter() {
  firebase.auth().signInWithRedirect(providerTwitter)
  firebase.auth().getRedirectResult().then(result => {
    console.log(result);
  }).catch(error => {
    console.error(error);
  })
}

export const Auth: React.FC = () => {
  const [user, setUser] = React.useState<firebase.User>()

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user == undefined) return

      setUser(user)
    })
  }, [])

  if(user == undefined) {
    return (
      <div>
        <button type='button' onClick={loginWithTwitter}>Sign in</button>
      </div>
    )
  }

  return (
    <div>
      <div>
        <img src={user.photoURL} alt=""/>
      </div>
      <p>hello, {user.displayName}</p>
    </div>
  )
}
