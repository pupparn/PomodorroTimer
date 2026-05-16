# Pomodorro Timer

A sleek, functional, and aesthetically pleasing Pomodoro Timer built with vanilla HTML, CSS, and JavaScript. 

Pomodorro helps you maintain focus and manage your work sessions effectively using the popular Pomodoro technique (25 minutes of focus, followed by a 5-minute short break).

## ✨ Features

- **Classic Pomodoro Intervals**: Alternates between 25-minute focus sessions and 5-minute short breaks.
- **Visual Progress Ring**: A smooth, animated SVG circular progress indicator that tracks your current session.
- **Audio Notifications**: Pleasant, dynamically generated chime sounds using the Web Audio API to alert you when a session ends.
- **Session Tracking**: Keeps track of how many focus sessions you've completed.
- **Dark/Light Mode**: Built-in theme toggle with local storage support to remember your preference.
- **Complete Timer Controls**: Play, pause, reset, or skip to the next session at any time.

## 🛠️ Technologies Used

- **HTML5**: Semantic structure.
- **CSS3**: Custom properties (variables), Flexbox/Grid for layout, smooth transitions, and glassmorphism styling.
- **JavaScript**: Timer logic, Web Audio API integration, SVG manipulation, and DOM interactions.
- **Google Fonts**: Inter.
- **FontAwesome**: Icons for UI elements.

## 🚀 Getting Started

This project is completely static and requires no build tools or package managers.

1. Clone the repository:
   ```bash
   git clone https://github.com/pupparn/PomodorroTimer.git
   ```
2. Navigate into the project directory:
   ```bash
   cd Pomodorro
   ```
3. Open `index.html` in your favorite web browser.

Alternatively, you can serve it locally using a simple HTTP server, for example:
```bash
npx serve .
```

## 🎮 How to Use

1. Click the **Play** button to start a 25-minute Focus Time session.
2. The progress ring will gradually fill up, and the tab title will update with the remaining time.
3. Once the time is up, a chime will play, and the timer will automatically transition to a 5-minute Short Break and begin counting down.
4. Use the **Skip** button if you want to immediately jump between Focus and Break modes.
5. Use the **Reset** button to restart the current session's timer back to its full duration.
6. Toggle between light and dark themes using the sun/moon icon in the top right corner.

## 📄 License

This project is open-source and available under the MIT License.
