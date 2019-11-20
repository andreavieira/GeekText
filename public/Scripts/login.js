
var auth = firebase.auth();
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

    if((cUserfName == "") || (cUserlName == "") || (cUserEmail == "") 
        || (cUserPassword == "") || (cUserStreetAddress == "") || (cUserCity == "") 
        || (cUserState == "") || (cUserZipCode == "") || (cUserCountry == "")) 
    {
        window.alert("All fields are required, \nPlease fill out everything")
    } else {
        // Sign into firebase with email and pass. Stores to a promise for error catching
        var promise = firebase.auth().createUserWithEmailAndPassword(cUserEmail, cUserPassword);
        
        // Handle any errors that occur
        promise.catch(function(error) {
            // Handle errors here
            var errorCode = error.code;
            window.alert("Error: " + errorCode)
            if (errorCode == 'auth/weak-password') return // password to weak. Minimal 6 characters
            if (errorCode == 'auth/email-already-in-use') return // Return a email already in use error  
        });

        // If there are no errors, creates the account and stores all information to firestore
        promise.then(function() {
            var userUid = auth.currentUser.uid

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



// Send an email to reset password NOT IMPLEMENTED OR USED YET
function resetPassword(){

    var auth = firebase.auth();
    var emailAddress = "user@example.com";

    auth.sendPasswordResetEmail(emailAddress).then(function() {
        window.alert("Reset email sent.");
    }).catch(function(error) {
        window.alert("Error: " + error.message);
    });

}

function changefName() {
    document.getElementById("changefName").type="hidden";
    document.getElementById("fNameChange").type="text";
    document.getElementById("saveNewfName").type="button";
}

function changelName() {
    document.getElementById("changelName").type="hidden";
    document.getElementById("lNameChange").type="text";
    document.getElementById("saveNewlName").type="button";
}

function changeEmail() {
    document.getElementById("changeEmail").type="hidden";
    document.getElementById("emailChange").type="text";
    document.getElementById("saveNewEmail").type="button";
}

function changePassword() {
    document.getElementById("changePassword").type="hidden";
    document.getElementById("passwordChange").type="text";
    document.getElementById("saveNewPassword").type="button";
}


function changeHomeAdd() {
    document.getElementById("changeHomeAdd").type="hidden";
    document.getElementById("streetChange").type="text";
    document.getElementById("cityChange").type="text";
    document.getElementById("stateChange").type="text";
    document.getElementById("zipChange").type="text";
    document.getElementById("countryChange").type="text";
    document.getElementById("saveNewHomeAdd").type="button";
}

