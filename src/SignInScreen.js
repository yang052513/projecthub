// Import FirebaseAuth and firebase.
import React from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from "firebase"
import App from "./App"
import "./styles/index.css"

// Configure Firebase.
const config = {
  apiKey: "AIzaSyADkkb297MIxw6TMNeodIEIJQQC86ehrIc",
  authDomain: "pinboard-25.firebaseapp.com",
  databaseURL: "https://pinboard-25.firebaseio.com",
  projectId: "pinboard-25",
  storageBucket: "pinboard-25.appspot.com",
  messagingSenderId: "649585637777",
  appId: "1:649585637777:web:07f6bc2b38cb1ef7f90230",
  measurementId: "G-1VTSFT88XS",
}
firebase.initializeApp(config)

class SignInScreen extends React.Component {
  // The component's Local state.
  state = {
    isSignedIn: false, // Local signed-in state.
  }

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  }

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => this.setState({ isSignedIn: !!user }))
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver()
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      )
    }
    return <App />
  }
}

export default SignInScreen
