
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
            console.log("Current User: " + email_id + "; Email Verification: " + email_verified);
            
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
        swal({
            title: "All fields must not be left blank",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
    } else {
        // Sign into firebase with email and pass. Stores to a promise for error catching
        var promise = firebase.auth().createUserWithEmailAndPassword(cUserEmail, cUserPassword);
        
        // Handle any errors that occur
        promise.catch(function(error) {
            // Handle errors here
            var errorCode = error.code;
            swal({
                title: "Error Message: " + errorCode,
                text: "",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
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
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .then(
        swal({
            title: "Login Successful",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
    )
    .catch(function(error) {
        // Handle errors here
        var errorCode = error.code;
        swal({
            title: "Error Message: " + errorCode,
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
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
        swal({
            title: "Verification email has been sent",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
    }).catch(function(error) {
        swal({
            title: "Error Message: " + error.message,
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
    });
}



// Send an email to reset password
function resetPassword(){

    var emailAddress = document.getElementById("userEmailin").value;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
        swal({
            title: "Password reset email has been sent",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
    }).catch(function(error) {
        swal({
            title: "Error Message: " + error.message,
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
    });

}

function changePassword() {
    var user = firebase.auth().currentUser;
    var emailAddress = user.email;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
        swal({
            title: "Password reset email has been sent",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
    }).catch(function(error) {
        swal({
            title: "Error Message: " + error.message,
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
    });

    
}

function saveProfile() {

    var userUid = auth.currentUser.uid
    var user = firebase.auth().currentUser;

    var newfName = document.getElementById("fNameChange").value;
    var newlName = document.getElementById("lNameChange").value;
    var userEmail = user.email;
    var newStreetAddress = document.getElementById("streetChange").value;
    var newCity = document.getElementById("cityChange").value;
    var newState = document.getElementById("stateChange").value;
    var newZipCode = document.getElementById("zipChange").value;
    var newCountry = document.getElementById("countryChange").value;

    if  ((newfName == "") || (newlName == "") || (newStreetAddress == "") 
        || (newCity == "")  || (newState == "") 
        || (newZipCode == "") || (newCountry == ""))
    {
        swal({
            title: "Cannot Save",
            text: "All input fields must not be left blank",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
    } else {
        
        db.collection('users').doc(userUid).set({
            fName: newfName,
            lName: newlName,
            email: userEmail,
            streetAddress: newStreetAddress,
            city: newCity,
            state: newState,
            zipCode: newZipCode,
            country: newCountry
        })
        swal({
            title: "Updating Profile was a success!",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });
    }
}