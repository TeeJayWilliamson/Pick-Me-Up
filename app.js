// Initialize EmailJS with your public key
(function(){
    emailjs.init("fIxIVsRzC22mERFVa"); // Replace with your actual public key
})();

// Function to show the custom alert modal
function showAlert(message) {
    document.getElementById('alert-message').innerText = message;
    document.getElementById('custom-alert').style.display = 'block';
}

// Function to close the custom alert modal
function closeAlert() {
    document.getElementById('custom-alert').style.display = 'none';
}

// Function to get the user's location and send it via email
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Convert coordinates to a Google Maps address using Geocoding API
            const geocoder = new google.maps.Geocoder();
            const latlng = { lat: latitude, lng: longitude };

            geocoder.geocode({ location: latlng }, function (results, status) {
                if (status === "OK") {
                    if (results[0]) {
                        const address = results[0].formatted_address;
                        document.getElementById('user-location').textContent = `Your Address: ${address}`;

                        // Send email to TJ with the address using EmailJS
                        emailjs.send("service_uy2rjw8", "template_uwvvd14", {
                            to_email: "tevorjwilliamson@gmail.com",
                            from_name: document.getElementById("user-name").value,
                            user_address: address,
                        })
                        .then(function(response) {
                            showAlert("Location sent to TJ successfully!");
                        }, function(error) {
                            console.error("EmailJS Error:", error);
                            showAlert("Failed to send location. Check console for details.");
                        });

                    } else {
                        document.getElementById('user-location').textContent = "No results found";
                    }
                } else {
                    document.getElementById('user-location').textContent = "Geocoder failed due to: " + status;
                }
            });
        }, function (error) {
            showAlert("Unable to retrieve location.");
        });
    } else {
        showAlert("Geolocation is not supported by this browser.");
    }
}

// Function to toggle button state based on input
function toggleButtonState() {
    const usernameInput = document.getElementById('user-name');
    const pickupButton = document.getElementById('pickup-btn');
    pickupButton.disabled = usernameInput.value.trim() === "";
}

// Add event listener to the username input
const usernameInput = document.getElementById('user-name');
usernameInput.addEventListener('input', toggleButtonState);

// Initialize button state on page load
toggleButtonState();

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('change', function() {
    document.body.classList.toggle('dark');
    const container = document.querySelector('.container');
    container.classList.toggle('dark', this.checked);
});

// Add event listener to the "Pick Me Up" button
const pickupButton = document.getElementById('pickup-btn');
pickupButton.addEventListener('click', getUserLocation);
