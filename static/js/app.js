document.addEventListener('DOMContentLoaded', function () {
  const calendarContainer = document.querySelector('.calendar-container');
  const toggleModeButton = document.getElementById('toggle-mode');
  
  const daysInMonth = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  function generateCalendar() {
    calendarContainer.innerHTML = '';
    for (let i = 1; i <= daysInMonth; i++) {
      const cell = document.createElement('div');
      cell.className = 'calendar-cell';
      cell.innerText = i;
      calendarContainer.appendChild(cell);
    }
  }

  function toggleMode() {
    document.body.classList.toggle('dark-mode');
    const cells = document.querySelectorAll('.calendar-cell');
    cells.forEach(cell => cell.classList.toggle('dark-mode'));
    toggleModeButton.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
  }

  toggleModeButton.addEventListener('click', toggleMode);

  generateCalendar();
});
