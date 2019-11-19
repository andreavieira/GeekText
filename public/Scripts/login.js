

var db = firebase.firestore();


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function accountDrop() {
    document.getElementById("accDropdown").classList.toggle("show");
}
 


// Close the dropdown if the user cursor moves outside of it
window.onclick = function(event) {
    if (!event.target.matches('.account-btn')) {
        var dropdowns = document.getElementsByClassName("account-dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}



// Add a realtime listener to check if user is logged in or not
firebase.auth().onAuthStateChanged(function(user) {
    if (user){
        // A user is signed in

        // Show the logged in view and hide the not-logged in view
        document.getElementById("loggedin-div").style.display = "block";
        document.getElementById("not-loggedin-div").style.display = "none";

        // var user = firebase.auth().currentUser;
        // db.get().then(function (db) {
        //     // Catch errors if it exists
        //     promise.catch(function (error) {
        //         // Return error
        //     });
        //     promise.then(function () {
        //         // Continue with success
        //     })
        // })

        if(user != null) {
            var email_id = user.email;
            var email_verified = user.emailVerified;
            
            if(email_verified) {
                document.getElementById("welcome-user").innerHTML = "Welcome: \n" + email_id + "\n";
                document.getElementById("verify-btn").style.display = "none";
            } else {
                document.getElementById("welcome-user").innerHTML = "Welcome: \n" + email_id +
                                                                "\n" + "User NOT Verified"; 
                document.getElementById("verify-btn").style.display = "block";
            }

        }

    } else {
        // No user is logged in

        // Show the not-logged in view and hide the logged in view
        document.getElementById("loggedin-div").style.display = "none";
        document.getElementById("not-loggedin-div").style.display = "block";
    }
});



// Creating user in function
function createUser() {
    // TODO: Validate for REAL email

    var auth = firebase.auth();

    // Obtains and initializes var with user email and pass
    var cUserfName = document.getElementById("createfName").value;
    var cUserlName = document.getElementById("createlName").value;
    var cUserEmail = document.getElementById("createEmail").value;
    var cUserPassword = document.getElementById("createPassword").value;
    var cUserStreetAddress = document.getElementById("createStreetAddress").value;
    var cUserCity = document.getElementById("createCity").value;
    var cUserState = document.getElementById("createState").value;
    var cUserZipCode = document.getElementById("createZipCode").value;
    var cUserCountry = document.getElementById("createCountry").value;


    // Sign into firebase with email and pass. Stores to a promise for error catching
    var promise = firebase.auth().createUserWithEmailAndPassword(cUserEmail, cUserPassword);
    
    // Handle any errors that occur
    promise.catch(function(error) {
        // Handle errors here
        var errorCode = error.code;
        console.log("Error: " + errorCode)
        if (errorCode == 'auth/weak-password') return // password to weak. Minimal 6 characters
        if (errorCode == 'auth/email-already-in-use') return // Return a email already in use error  
    });

    // If there are no errors, creates the account and stores all information to firestore
    promise.then(function() {
        var userUid = auth.currentUser.uid
        var db = firebase.firestore();

        db.collection('users').doc(userUid).set({
            fName: cUserfName,
            lName: cUserlName,
            email: cUserEmail,
            emailVerified: false,
            password: cUserPassword,
            streetAddress: cUserStreetAddress,
            city: cUserCity,
            state: cUserState,
            zipCode: cUserZipCode,
            country: cUserCountry
        })
    })
}



// Signing user in function
function login() {
    // Obtains and initializes var with user email and pass
    var userEmail = document.getElementById("userEmailin").value;
    var userPass = document.getElementById("userPassword").value;

    // Sign into firebase with email and pass. Stores to a promise for error catching
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle errors here
        var errorCode = error.code;
        var errorMessage = error.message;
    });    
}



// Sign out function
function logout() {
    firebase.auth().signOut();
}



// Send user verification by email to ensure that the email account belongs to the user
function sendUserVerification() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
        window.alert("Verification sent");   // Email sent.
    }).catch(function(error) {
        window.alert("Error: " + error.message);// An error happened.
    });
}



// Send an email to reset password 
function resetPassword(){

    var auth = firebase.auth();
    var emailAddress = "user@example.com";

    auth.sendPasswordResetEmail(emailAddress).then(function() {
        window.alert("Reset email sent.");
    }).catch(function(error) {
        window.alert("Error: " + error.message);
    });

}


// Used on the profile page to update user information
function updateUserProfile() {
    // stores the current user instance in var user
    var user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: "Jane Q. User",
        photoURL: "https://example.com/jane-q-user/profile.jpg"

        // console.log("Sign-in provider: " + profile.providerId);
        // console.log("  Provider-specific UID: " + profile.uid);
        // console.log("  Name: " + profile.displayName);
        // console.log("  Email: " + profile.email);
        // console.log("  Photo URL: " + profile.photoURL);


    }).then(function() {
        window.alert("Update was successful");  // Update successful.
    }).catch(function(error) {
        window.alert("Error with update: " + error.message);    // An error happened.
});
}