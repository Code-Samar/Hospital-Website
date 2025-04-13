document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');

    // Toggle to registration form
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (event) => {
            event.preventDefault();
            loginSection.style.display = 'none';
            registerSection.style.display = 'block';
        });
    }

    // Toggle to login form
    if (showLoginLink) {
        showLoginLink.addEventListener('click', (event) => {
            event.preventDefault();
            loginSection.style.display = 'block';
            registerSection.style.display = 'none';
        });
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            
            // Replace this with actual authentication logic
            if (username === 'patient' && password === 'password') {
                document.getElementById('login-status').innerText = 'Login successful!';
                // Optionally redirect to another page
                // window.location.href = 'dashboard.html';
            } else {
                document.getElementById('login-status').innerText = 'Invalid username or password.';
            }
        });
    }

    // Handle registration form submission
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('register-username').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;

            if (password === confirmPassword) {
                // Replace this with actual registration logic
                document.getElementById('register-status').innerText = 'Account created successfully!';
                // Optionally redirect to the login page or automatically log in the user
                // loginSection.style.display = 'block';
                // registerSection.style.display = 'none';
            } else {
                document.getElementById('register-status').innerText = 'Passwords do not match.';
            }
        });
    }
});
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('location').value;
    
    // Placeholder for hospital search results
    const hospitalList = document.getElementById('hospital-list');
    hospitalList.innerHTML = `<h3>Search Results for "${location}":</h3>
        <ul>
            <li><a href="hospital-details.html?name=Hospital%20A">Hospital A</a></li>
            <li><a href="hospital-details.html?name=Hospital%20B">Hospital B</a></li>
            <li><a href="hospital-details.html?name=Hospital%20C">Hospital C</a></li>
        </ul>`;
});
document.addEventListener('DOMContentLoaded', () => {
    // For Queue Management
    const queueForm = document.getElementById('queue-form');
    const queueList = document.getElementById('queue-list').querySelector('ul');

    if (queueForm) {
        queueForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const hospital = document.getElementById('hospital').value;
            const department = document.getElementById('department').value;
            const number = document.getElementById('number').value;

            const listItem = document.createElement('li');
            listItem.textContent = `Hospital: ${hospital}, Department: ${department}, People: ${number}`;
            queueList.appendChild(listItem);
            queueForm.reset();
        });
    }

    // For Find Hospitals
    const searchForm = document.getElementById('search-form');
    const hospitalList = document.getElementById('hospital-list');

    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const location = document.getElementById('location').value;

            // Example static data for demonstration
            const hospitals = [
                { name: 'General Hospital', image: 'hospital1.jpg', address: '123 Main St, City' },
                { name: 'City Medical Center', image: 'hospital2.jpg', address: '456 Elm St, City' },
                { name: 'Health Clinic', image: 'hospital3.jpg', address: '789 Oak St, City' }
            ];

            hospitalList.innerHTML = ''; // Clear previous results
            hospitals.forEach(hospital => {
                const card = document.createElement('div');
                card.className = 'hospital-card';
                card.innerHTML = `
                    <img src="${hospital.image}" alt="${hospital.name}">
                    <h4>${hospital.name}</h4>
                    <p>${hospital.address}</p>
                `;
                hospitalList.appendChild(card);
            });
        });
    }
});
document.getElementById('search-btn').addEventListener('click', function() {
    var location = document.getElementById('location').value;
    var hospitalItems = document.getElementById('hospital-items');

    // Clear previous results
    hospitalItems.innerHTML = '';

    // Example hospital data (you would replace this with real data from your server)
    var hospitals = [
        'General Hospital - <button class="select-btn">Select</button>',
        'City Health Center - <button class="select-btn">Select</button>'
    ];

    hospitals.forEach(function(hospital) {
        var li = document.createElement('li');
        li.innerHTML = hospital;
        hospitalItems.appendChild(li);
    });

    document.getElementById('department-selection').style.display = 'block';
});
// Function to handle appointment booking
function handleAppointmentBooking() {
    const form = document.getElementById('appointmentForm');
    const messageDiv = document.getElementById('appointmentMessage');
    const appointmentTable = document.getElementById('appointmentTable').getElementsByTagName('tbody')[0];

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        showSpinner(true);

        const patientName = form.patientName.value.trim();
        const appointmentDate = form.appointmentDate.value;
        const appointmentTime = form.appointmentTime.value;

        setTimeout(() => {
            showSpinner(false);

            if (patientName === '' || appointmentDate === '' || appointmentTime === '') {
                messageDiv.textContent = 'All fields are required!';
                return;
            }

            // Add appointment to the table
            const newRow = appointmentTable.insertRow();
            newRow.insertCell(0).textContent = patientName;
            newRow.insertCell(1).textContent = appointmentDate;
            newRow.insertCell(2).textContent = appointmentTime;

            messageDiv.textContent = 'Appointment booked successfully!';
            messageDiv.style.color = 'green';

            // Reset form fields
            form.reset();
        }, 2000);
    });
}

// Initialize page-specific content
document.addEventListener('DOMContentLoaded', () => {
    highlightActiveLink();
    if (document.title === "Appointments") {
        handleAppointmentBooking();
    }
});
// Function to fetch and display bed availability
function fetchBedAvailability() {
    // Simulate fetching data
    setTimeout(() => {
        const bedTableBody = document.getElementById('bedTable').getElementsByTagName('tbody')[0];

        // Example data
        const bedData = [
            { ward: 'Ward 1', bedNumber: '101', status: 'Available' },
            { ward: 'Ward 1', bedNumber: '102', status: 'Occupied' },
            { ward: 'Ward 2', bedNumber: '201', status: 'Available' },
            { ward: 'Ward 2', bedNumber: '202', status: 'Occupied' }
        ];

        // Clear existing table rows
        bedTableBody.innerHTML = '';

        // Populate table with bed data
        bedData.forEach(bed => {
            const newRow = bedTableBody.insertRow();
            newRow.insertCell(0).textContent = bed.ward;
            newRow.insertCell(1).textContent = bed.bedNumber;
            newRow.insertCell(2).textContent = bed.status;
        });
    }, 1000);
}

// Initialize page-specific content
document.addEventListener('DOMContentLoaded', () => {
    highlightActiveLink();
    if (document.title === "Bed Availability") {
        fetchBedAvailability();
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the search form submission
    document.getElementById('search-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const location = document.getElementById('location').value;
        const spinner = document.getElementById('loading-spinner');
        const resultsDiv = document.getElementById('hospital-list');

        // Show loading spinner
        spinner.style.display = 'block';

        // Mock API call to get hospitals based on the location
        setTimeout(() => {
            // Hide loading spinner
            spinner.style.display = 'none';

            // Update the hospital results with sample data
            resultsDiv.innerHTML = `
                <div class="hospital-card">
                    <img src="images/hospital1.jpg" alt="Hospital 1">
                    <div>
                        <h4>Hospital 1</h4>
                        <p>Address: 123 Example St, City</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                </div>
                <div class="hospital-card">
                    <img src="images/hospital2.jpg" alt="Hospital 2">
                    <div>
                        <h4>Hospital 2</h4>
                        <p>Address: 456 Another Ave, City</p>
                        <p>Phone: (987) 654-3210</p>
                    </div>
                </div>
            `;

            // Initialize the map with sample data
            initMap();
        }, 1000); // Simulate API response time
    });

    // Initialize Google Map
    function initMap() {
        const mapOptions = {
            center: { lat: -34.397, lng: 150.644 }, // Default location, should be updated dynamically
            zoom: 10,
        };

        const map = new google.maps.Map(document.getElementById('map'), mapOptions);

        // Sample hospital locations (replace with dynamic data)
        const hospitals = [
            { lat: -34.397, lng: 150.644, name: 'Hospital 1' },
            { lat: -34.500, lng: 150.700, name: 'Hospital 2' },
        ];

        // Add markers for each hospital
        hospitals.forEach(hospital => {
            new google.maps.Marker({
                position: { lat: hospital.lat, lng: hospital.lng },
                map: map,
                title: hospital.name
            });
        });
    }

    // Load the Google Maps API script dynamically
    function loadMapScript() {
        const script = document.createElement('script');
        script.src = ``;
        script.async = true;
        document.body.appendChild(script);
    }

    // Load the map script when the page loads
    loadMapScript();
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');
    const messageDiv = document.getElementById('appointmentMessage');
    const tableBody = document.querySelector('#appointmentTable tbody');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const patientName = document.getElementById('patientName').value;
        const appointmentDate = document.getElementById('appointmentDate').value;
        const appointmentTime = document.getElementById('appointmentTime').value;

        // Add the appointment to the table
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${patientName}</td>
            <td>${appointmentDate}</td>
            <td>${appointmentTime}</td>
        `;
        tableBody.appendChild(newRow);

        // Show confirmation message
        messageDiv.innerHTML = `<p>Appointment booked for ${patientName} on ${appointmentDate} at ${appointmentTime}.</p>`;
        
        // Clear the form fields
        form.reset();
    });
});
