import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import { appleAuth } from '@invertase/react-native-apple-authentication';

export function AppleSignIn({onPress}) {
  return (
    <AppleButton
      buttonStyle={AppleButton.Style.BLACK}
      buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width: 160,
        height: 45,
      }}
      onPress={() => onPress().then(() => console.log('Apple sign-in complete!'))}
    />
  );
}

const signInAnonymously = (onResult) => {
  auth().signInAnonymously().then((res) => {
      console.log('User signed in anonymously');
      onResult(res)
    })
    .catch(error => {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      }

      console.error(error);
    });
}

const signInWithEmailAndPassword = (onResult) => {
  auth()
    .signInWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
    .then((user) => {
      console.log('User account created & signed in!', user);
      onResult(user)
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
}

const signOut = (onResult) => {
  auth().signOut().then(() =>{
    onResult();
    console.log('User signed out!')
  });
}

async function onAppleButtonPress(onResult) {
  console.log('Start the sign-in request');
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw 'Apple Sign-In failed - no identify token returned';
  }

  // Create a Firebase credential from the response
  const { identityToken, nonce } = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

  // Sign the user in with the credential
  return auth().signInWithCredential(appleCredential).then((res) => {
    onResult(res)
  });
}

function Authenticate() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  console.log('user', user);
  if (!user) {
    return (
      <>
          <AppleSignIn onPress={() => onAppleButtonPress(onAuthStateChanged)} />
          <Button title="Logg inn med email" onPress={() => signInWithEmailAndPassword(onAuthStateChanged)}/>
      </>
    );
  }

  return (
    <>
      <Text>Welcome {user?.user?._user.email}</Text>

      <Button title="Logg ut" onPress={() => signOut(onAuthStateChanged)}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Authenticate