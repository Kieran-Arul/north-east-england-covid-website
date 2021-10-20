/**
 * This is the callback function that will be executed when any of the tier status option buttons in the "Select Region" drop down menu are clicked. It works by determining which button (which tier) was clicked and then shows the government guidelines/advice pertaining to that tier while hiding the rest. It will also change the tier header to the tier that was chosen by the user. A mix of both JavaScript and jQuery is used here. The former to demonstrate understanding of what is being done and the latter to reduce the volume of code so as to improve readability and ease of debugging in future.
 * @function
 * @name showTierRules
 * @param {MouseClickEvent} event Refers to a mouseclick event on any of the tier status options in the drop down menu
 * @listens MouseClickEvent
 * @returns {void}
 */
function showTierRules(event) {
    
    // Gives access to the tier header (in the title section)
    let tierHeading = document.querySelector(".tier-status-header");

    // Changes the tier header depending on what tier option was chosen by the user
    tierHeading.textContent = "Tier Status: " + event.target.textContent;

    // Switch statement to determine which tier option guidelines to show and which to hide
    switch (event.target.textContent) {

        // Shows tier 1 guidelines and hides the rest
        case "Tier 1":
            $(".tier-1").removeClass("hidden-element");
            $(".tier-2").addClass("hidden-element");
            $(".tier-3").addClass("hidden-element");
            $(".national-lockdown").addClass("hidden-element");
            break;

        // Shows tier 2 guidelines and hides the rest
        case "Tier 2":
            $(".tier-2").removeClass("hidden-element");
            $(".tier-1").addClass("hidden-element");
            $(".tier-3").addClass("hidden-element");
            $(".national-lockdown").addClass("hidden-element");
            break;
        
        // Shows tier 3 guidelines and hides the rest
        case "Tier 3":
            $(".tier-3").removeClass("hidden-element");
            $(".tier-1").addClass("hidden-element");
            $(".tier-2").addClass("hidden-element");
            $(".national-lockdown").addClass("hidden-element");
            break;

        // Shows national lockdown guidelines and hides the rest
        case "National Lockdown":
            $(".national-lockdown").removeClass("hidden-element");
            $(".tier-1").addClass("hidden-element");
            $(".tier-2").addClass("hidden-element");
            $(".tier-3").addClass("hidden-element");
            break;
        
        // Error handling: Logs the error for debugging purposes
        default:
            console.log(event.target.textContent);
            break;
    }

    // Ensures that the anchor tags do not reload after being clicked
    event.preventDefault();

}

// Allows access to each of the drop-down items (tier options) in the tier select menu
let allTiersOptions = document.querySelectorAll(".tier-status-option");

// Applies the event listener to each tier status option
for (let i = 0; i < allTiersOptions.length; i++) {
    
    allTiersOptions[i].addEventListener("click", showTierRules);
    
}
