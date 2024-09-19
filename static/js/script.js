document.addEventListener("DOMContentLoaded", function() {
    const monthYear = document.getElementById('month-year');
    const calendarDays = document.getElementById('calendar-days');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const toggleModeBtn = document.getElementById('toggle-mode');
    
    let currentDate = new Date();
    
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        
        monthYear.innerHTML = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
        calendarDays.innerHTML = '';
        
        // Padding days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            calendarDays.appendChild(emptyDiv);
        }
        
        // Days of the month
        for (let day = 1; day <= lastDate; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;
            
            // Highlight today's date
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add('today');
            }
            
            // Add click event to add reminders/events
            dayDiv.addEventListener('click', function() {
                if (sessionStorage.getItem('username')) {
                    const reminder = prompt(`Add a reminder for ${day}/${month + 1}/${year}`);
                    if (reminder) {
                        dayDiv.innerHTML += `<div class="reminder">${reminder}</div>`;
                    }
                } else {
                    alert('Please sign in to add reminders.');
                }
            });
            
            calendarDays.appendChild(dayDiv);
        }
    }
    
    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    toggleModeBtn.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
    });
    
    renderCalendar();
});
