//your JS code here. If required.
// DOM Elements
const timerElement = document.getElementById('timer');
const dateElement = document.getElementById('date');
const time12Element = document.getElementById('time12');
const time24Element = document.getElementById('time24');
const dayOfWeekElement = document.getElementById('dayOfWeek');
const statusTextElement = document.getElementById('statusText');

// Arrays for day and month names
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Function to add leading zero to single digit numbers
function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
}

// Function to format time in 12-hour format with AM/PM
function format12HourTime(hours, minutes, seconds) {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const twelveHour = hours % 12 || 12; // Convert 0 to 12 for midnight
    return `${addLeadingZero(twelveHour)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)} ${ampm}`;
}

// Function to format time in 24-hour format
function format24HourTime(hours, minutes, seconds) {
    return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
}

// Function to format date
function formatDate(date) {
    const day = daysOfWeek[date.getDay()];
    const month = monthsOfYear[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();
    
    return `${day}, ${month} ${dayOfMonth}, ${year}`;
}

// Function to update the clock display
function updateClock() {
    const now = new Date();
    
    // Extract time components
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Extract date components
    const dayOfWeek = now.getDay();
    
    // Update main timer display (24-hour format)
    timerElement.textContent = format24HourTime(hours, minutes, seconds);
    
    // Update date display
    dateElement.textContent = formatDate(now);
    
    // Update 12-hour format time
    time12Element.textContent = format12HourTime(hours, minutes, seconds);
    
    // Update 24-hour format time (same as main timer)
    time24Element.textContent = format24HourTime(hours, minutes, seconds);
    
    // Update day of week
    dayOfWeekElement.textContent = daysOfWeek[dayOfWeek];
    
    // Add visual effect for seconds change
    if (seconds % 2 === 0) {
        timerElement.style.textShadow = '0 0 30px rgba(0, 255, 245, 0.9)';
    } else {
        timerElement.style.textShadow = '0 0 30px rgba(0, 255, 245, 0.7)';
    }
    
    // Update status text with current time
    statusTextElement.textContent = `Last updated: ${format12HourTime(hours, minutes, seconds)}`;
}

// Function to initialize the clock
function initClock() {
    console.log('Clock Timer Initialized');
    console.log('Clock will update every second');
    
    // Initial update
    updateClock();
    
    // Update clock every second (1000 milliseconds)
    setInterval(updateClock, 1000);
    
    // Add click event to update time manually
    timerElement.addEventListener('click', function() {
        updateClock();
        // Visual feedback
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        console.log('Clock manually refreshed at:', new Date().toLocaleTimeString());
    });
    
    // Add hover effects to time cards
    const detailCards = document.querySelectorAll('.detail-card');
    detailCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 25px rgba(0, 255, 245, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
    
    // Display initialization message
    const initTime = new Date();
    console.log(`Clock started at: ${initTime.toLocaleString()}`);
}

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', initClock);

// Fallback in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClock);
} else {
    initClock();
}

// Additional utility functions for testing
function getCurrentTime() {
    return new Date();
}

function getFormattedTimestamp() {
    const now = new Date();
    return now.toISOString();
}

// Export functions for testing (if needed in browser console)
window.clockFunctions = {
    updateClock,
    getCurrentTime,
    getFormattedTimestamp,
    format12HourTime,
    format24HourTime,
    formatDate
};

console.log('Clock Timer Script Loaded Successfully');