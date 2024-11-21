const { useState, useEffect } = React;
const { createRoot } = ReactDOM;

// Todo item structure
const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];

function App() {
    const [todos, setTodos] = useState(initialTodos);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all');
    const [priority, setPriority] = useState('medium');
    const [dueDate, setDueDate] = useState('');
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const toggleTheme = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    };

    const addTodo = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newTodo = {
            id: Date.now(),
            text: inputValue,
            status: 'todo',
            priority,
            dueDate,
            createdAt: new Date().toISOString(),
        };

        setTodos([...todos, newTodo]);
        setInputValue('');
        setDueDate('');
        setPriority('medium');
    };

    const updateTodoStatus = (id, newStatus) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                const updatedTodo = { ...todo, status: newStatus };
                // Add a temporary animation class when marked as completed
                if (newStatus === 'completed') {
                    const element = document.querySelector(`[data-todo-id="${todo.id}"]`);
                    if (element) {
                        element.classList.add('completing');
                        setTimeout(() => {
                            element.classList.remove('completing');
                        }, 500);
                    }
                }
                return updatedTodo;
            }
            return todo;
        }));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const getStatusBadge = (status) => {
        return (
            <span className={`status-badge status-${status}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const filteredTodos = todos
        .filter(todo => {
            const matchesFilter = 
                filter === 'all' ? true :
                filter === todo.status;

            return matchesFilter;
        })
        .sort((a, b) => {
            // First sort by status
            const statusOrder = { 'in-process': 1, 'todo': 2, 'completed': 3 };
            const statusDiff = statusOrder[a.status] - statusOrder[b.status];
            if (statusDiff !== 0) return statusDiff;

            // Then sort by priority within each status
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <button 
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label="Toggle theme"
            >
                {darkMode ? '☀️' : '🌙'}
            </button>

            <h1 className="text-4xl font-bold text-center mb-8">Luxury Todo App</h1>
            
            <form onSubmit={addTodo} className="todo-form">
                <div className="flex flex-wrap gap-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="What needs to be done?"
                        className="flex-1 p-2 rounded luxury-input"
                    />
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="p-2 rounded luxury-input"
                    >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="p-2 rounded luxury-input"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 rounded luxury-button"
                    >
                        Add Todo
                    </button>
                </div>
            </form>

            <div className="mb-6 flex flex-wrap gap-4">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 rounded luxury-input"
                >
                    <option value="all">All Tasks</option>
                    <option value="todo">Todo</option>
                    <option value="in-process">In Process</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div className="todo-list">
                {filteredTodos.map(todo => (
                    <div
                        key={todo.id}
                        data-todo-id={todo.id}
                        className={`todo-item ${todo.status} flex items-center justify-between p-4 rounded-lg shadow-sm priority-${todo.priority}`}
                    >
                        <div className="flex items-center gap-4">
                            <select
                                value={todo.status}
                                onChange={(e) => updateTodoStatus(todo.id, e.target.value)}
                                className="p-1 rounded luxury-input text-sm"
                            >
                                <option value="todo">Todo</option>
                                <option value="in-process">In Process</option>
                                <option value="completed">Completed</option>
                            </select>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-lg todo-text">{todo.text}</p>
                                    {getStatusBadge(todo.status)}
                                </div>
                                <div className="text-sm opacity-75 mt-1 todo-metadata">
                                    {todo.dueDate && (
                                        <span className="mr-4">Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
                                    )}
                                    <span className="capitalize">Priority: {todo.priority}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            className="luxury-button px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center opacity-75">
                <p>
                    {todos.filter(t => t.status === 'todo').length} todo |{' '}
                    {todos.filter(t => t.status === 'in-process').length} in process |{' '}
                    {todos.filter(t => t.status === 'completed').length} completed
                </p>
            </div>
        </div>
    );
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<App />);
