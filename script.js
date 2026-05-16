const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60;  // 5 minutes in seconds

let timeLeft = WORK_TIME;
let isRunning = false;
let isWorkMode = true;
let timerId = null;
let sessionsCompleted = 0;

// DOM Elements
const timeDisplay = document.getElementById('time-display');
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const resetBtn = document.getElementById('reset-btn');
const skipBtn = document.getElementById('skip-btn');
const modeText = document.getElementById('mode-text');
const dotWork = document.getElementById('dot-work');
const dotBreak = document.getElementById('dot-break');
const sessionCount = document.getElementById('session-count');
const progressCircle = document.getElementById('progress');
const themeToggle = document.getElementById('theme-toggle');

// Setup Progress Ring
const radius = progressCircle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
}

// Sound Notification (Web Audio API)
function playNotificationSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        
        const ctx = new AudioContext();
        
        const playTone = (freq, startTime, duration, vol) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, startTime);
            
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(vol, startTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
            
            osc.start(startTime);
            osc.stop(startTime + duration);
        };

        const now = ctx.currentTime;
        // Plays a pleasant, calming chime (A major arpeggio)
        playTone(440.00, now, 1.5, 0.4);       // A4
        playTone(554.37, now + 0.15, 1.5, 0.3); // C#5
        playTone(659.25, now + 0.3, 2.0, 0.4);  // E5
    } catch (e) {
        console.error("Audio playback failed", e);
    }
}

// Timer Logic
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    timeDisplay.textContent = formattedTime;
    document.title = `${formattedTime} - ${isWorkMode ? 'Focus' : 'Break'}`;

    const totalTime = isWorkMode ? WORK_TIME : BREAK_TIME;
    // Calculate percentage (starts at 100%, goes to 0%)
    const percentage = (timeLeft / totalTime) * 100;
    setProgress(percentage);
}

function switchMode() {
    isWorkMode = !isWorkMode;
    timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
    
    if (isWorkMode) {
        modeText.textContent = 'Focus Time';
        document.body.classList.remove('break-mode');
        dotWork.classList.add('active');
        dotBreak.classList.remove('active');
    } else {
        modeText.textContent = 'Short Break';
        document.body.classList.add('break-mode');
        dotWork.classList.remove('active');
        dotBreak.classList.add('active');
        
        // Only increment session count when completing a work session
        sessionsCompleted++;
        sessionCount.textContent = `Sessions completed: ${sessionsCompleted}`;
    }
    
    updateDisplay();
}

function finishSession() {
    playNotificationSound();
    clearInterval(timerId);
    isRunning = false;
    playIcon.classList.replace('fa-pause', 'fa-play');
    switchMode();
    // Auto-start next session
    toggleTimer();
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(timerId);
        playIcon.classList.replace('fa-pause', 'fa-play');
    } else {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft <= 0) {
                finishSession();
            }
        }, 1000);
        playIcon.classList.replace('fa-play', 'fa-pause');
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    playIcon.classList.replace('fa-pause', 'fa-play');
    timeLeft = isWorkMode ? WORK_TIME : BREAK_TIME;
    updateDisplay();
}

// Event Listeners
playPauseBtn.addEventListener('click', toggleTimer);

resetBtn.addEventListener('click', resetTimer);

skipBtn.addEventListener('click', () => {
    resetTimer();
    switchMode();
});

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('pomodorro-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('pomodorro-theme', newTheme);
    
    themeToggle.innerHTML = newTheme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
});

// Initialize
initTheme();
updateDisplay();
