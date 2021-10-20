/**
 * This function is the callback function that will be executed when the email subscribe button is clicked, or either of the download buttons are clicked. It works by establishing which element triggered the event, then first making that element (button) flash. Then, depending on whether it was the email subscribe button or one of the download buttons, the function will give the user an alert with a custom message. A mix of both vanilla Javascript and jQuery was used in the creation of these event listeners. The former to demonstrate knowledge and understanding of what was happening, and the latter to reduce code volume and improve readability.
 * @function
 * @name buttonFlashAndAlert
 * @param {MouseClickEvent} event Refers to a mouseclick event on the email subscribe button or either of the two download buttons
 * @listens MouseClickEvent
 * @returns {void}
 */
function buttonFlashAndAlert(event) {

    // Makes the clicked button, flash
    $(event.target).fadeOut(100).fadeIn(100);

    // Obtains the class list of the clicked button
    let clickedElementClassList = event.target.classList;

    // If the clicked button was the email sign up one
    if (clickedElementClassList.contains("sign-up-button")) {
        
        setTimeout(function () {
            alert("Thank you for subscribing to the email list."); 
        }, 1000);

    // If the clicked button was one of the download buttons
    } else if (clickedElementClassList.contains("download-button")) {
        
        setTimeout(function () {
            alert("Your download will commence shortly."); 
        }, 1000);

    // Error case
    } else {

        console.log(event.target);

    }
    
}

// Allows access to the email sign-up button
let emailSignUpButton = document.querySelector(".sign-up-button");

// Allows access to both app download buttons
let downloadButtons = document.querySelectorAll(".download-button");

// Adds click event listener to email subscribe button
emailSignUpButton.addEventListener("click", buttonFlashAndAlert);

// Adds click event listener to both download buttons
for (let i = 0; i < downloadButtons.length; i++) {
    
    // Adds event listener to each button
    downloadButtons[i].addEventListener("click", buttonFlashAndAlert);
    
}
