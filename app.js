// Initialize EmailJS with your public key
(function(){
    emailjs.init("fIxIVsRzC22mERFVa"); // Replace with your actual public key
})();



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
                            alert("Location sent to TJ successfully!");
                        }, function(error) {
                            console.error("EmailJS Error:", error);
                            alert("Failed to send location. Check console for details.");
                        });

                    } else {
                        document.getElementById('user-location').textContent = "No results found";
                    }
                } else {
                    document.getElementById('user-location').textContent = "Geocoder failed due to: " + status;
                }
            });
        }, function (error) {
            alert("Unable to retrieve location.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Add event listener to the "Pick Me Up" button
const pickupButton = document.getElementById('pickup-btn');
pickupButton.addEventListener('click', getUserLocation);
