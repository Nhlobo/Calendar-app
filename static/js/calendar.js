// Dark/Light Mode Toggle
const toggleThemeButton = document.getElementById('toggle-theme');
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Calendar Logic
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
let selectedDate = new Date(currentYear, currentMonth, 1);

const monthYearElement = document.getElementById('month-year');
const calendarDaysElement = document.getElementById('calendar-days');

function renderCalendar() {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const firstDayIndex = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

    monthYearElement.textContent = `${selectedDate.toLocaleString('default', { month: 'long' })} ${selectedDate.getFullYear()}`;
    
    calendarDaysElement.innerHTML = '';
    
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day');
        calendarDaysElement.appendChild(emptyDay);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = i;
        dayElement.addEventListener('click', () => {
            document.getElementById('event-date').value = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        });
        calendarDaysElement.appendChild(dayElement);
    }
}

document.getElementById('prev-month').addEventListener('click', () => {
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    renderCalendar();
});

// Initial
