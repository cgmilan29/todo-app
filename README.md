# Modern Todo App

A feature-rich, responsive Todo application built with React that includes dark mode, priority settings, and due dates.

## Features

- ✨ Clean and modern user interface
- 🌓 Dark/Light mode toggle
- ⭐ Priority levels for tasks
- 📅 Due date setting
- 🔍 Filter tasks by status
- 💾 Local storage persistence
- 📱 Responsive design

## Prerequisites

Before running this project, make sure you have:
- Python 3.x installed (for running the local server)
- A modern web browser
- Internet connection (for CDN resources)

## Dependencies

The project uses the following technologies and libraries:

### Frontend
- React (via CDN)
- React DOM (via CDN)
- Modern CSS3

### Backend
- Python's built-in `http.server` module
- Python's `socketserver` module

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

## Running the Application

1. Start the Python server:
```bash
python server.py
```

2. Open your web browser and navigate to:
```
http://localhost:8000
```

## Usage

1. Add a new todo by typing in the input field and pressing Enter
2. Set priority levels (Low, Medium, High) for each task
3. Add due dates to tasks
4. Mark tasks as complete by clicking the checkbox
5. Filter tasks using the filter buttons (All, Active, Completed)
6. Toggle dark/light mode using the theme switch
7. Your todos are automatically saved in the browser's local storage

## Project Structure

```
todo-app/
├── index.html      # Main HTML file
├── App.js          # React application logic
├── styles.css      # Styling
├── server.py       # Simple Python server
└── README.md       # Documentation
```

## Browser Compatibility

The app works best in modern browsers that support ES6+ features:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.