document.addEventListener('DOMContentLoaded', function() {
    const calendarBody = document.querySelector('.calendar-body');
    const monthYearDisplay = document.querySelector('.month-year');
    const prevMonthButton = document.querySelector('.prev-month');
    const nextMonthButton = document.querySelector('.next-month');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const eventForm = document.querySelector('#event-form');
    const eventsList = document.querySelector('#events-list');

    let currentDate = new Date();

    function renderCalendar() {
        calendarBody.innerHTML = '';
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        monthYearDisplay.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

        // Get the first day of the month and the number of days in the month
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        // Create blank spaces for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const blankCell = document.createElement('div');
            calendarBody.appendChild(blankCell);
        }

        // Create day cells
        for (let day = 1; day <= lastDay; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');
            dayCell.textContent = day;

            // Optional: Add click event to show event details
            dayCell.addEventListener('click', function() {
                showDayEvents(year, month, day);
            });

            calendarBody.appendChild(dayCell);
        }
    }

    function showDayEvents(year, month, day) {
        // Fetch and display events for the selected day
        // This is a placeholder function; you need to implement event fetching logic
        eventsList.innerHTML = `<h3>Events for ${day}/${month + 1}/${year}</h3>`;
        // Example static event
        eventsList.innerHTML += `
            <li>
                <strong>Sample Event</strong>
                <p>Description of the event.</p>
            </li>
        `;
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }

    // Handle Month Navigation
    prevMonthButton.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Handle Dark Mode Toggle
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Handle Event Form Submission
    eventForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('event-title').value;
        const date = document.getElementById('event-date').value;
        const description = document.getElementById('event-description').value;

        if (title && date) {
            // Implement form submission to server or local storage
            eventsList.innerHTML += `
                <li>
                    <strong>${title} (${date})</strong>
                    <p>${description}</p>
                    <button class="edit-event">Edit</button>
                    <button class="delete-event">Delete</button>
                </li>
            `;

            // Reset form
            eventForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });

    // Initial Calendar Render
    renderCalendar();
});
