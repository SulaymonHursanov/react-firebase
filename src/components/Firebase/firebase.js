import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCQyoNQ_76CROEpHlFi1ceUeV8qyqRdGig",
    authDomain: "react-firebase-e3cd3.firebaseapp.com",
    databaseURL: "https://react-firebase-e3cd3.firebaseio.com",
    projectId: "react-firebase-e3cd3",
    storageBucket: "",
    messagingSenderId: "1069255917827"
};


class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database()
    };

    doCreateUserWithEmailAndPassword = (email, password)=> {
       return this.auth.createUserWithEmailAndPassword(email, password)
    }

    doSignInWithEmailAndPassword = (email, password)=> {
       return this.auth.signInWithEmailAndPassword(email, password);
    }

    doSignOut = () => {
      return this.auth.signOut();
    }

    doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);


    // *** User API *** //

    user = uid => this.db.ref(`users/${uid}`);

    users = ()=> this.db.ref('users');

}


export default Firebase;
