import { Component } from "react";
import { Paper, TextField, Checkbox, Button } from "@material-ui/core";
import {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
} from "./services/taskServices";

class Tasks extends Component {
    state = {
        tasks: [],
        currentTask: "",
    };

    async componentDidMount() {
        try {
            const { data } = await getTasks();

            // ✅ normalize backend response
            const tasks = Array.isArray(data)
                ? data
                : Array.isArray(data.tasks)
                ? data.tasks
                : [];

            this.setState({ tasks });
        } catch (error) {
            console.error("Failed to load tasks:", error);
            this.setState({ tasks: [] });
        }
    }

    handleChange = ({ currentTarget }) => {
        this.setState({ currentTask: currentTarget.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await addTask({
                task: this.state.currentTask,
            });

            // ✅ no state mutation
            this.setState((prevState) => ({
                tasks: [...prevState.tasks, data],
                currentTask: "",
            }));
        } catch (error) {
            console.error("Add task failed:", error);
        }
    };

    handleUpdate = async (id) => {
        const originalTasks = [...this.state.tasks];

        try {
            const tasks = originalTasks.map((task) =>
                task._id === id
                    ? { ...task, completed: !task.completed }
                    : task
            );

            this.setState({ tasks });

            const updated = tasks.find((t) => t._id === id);
            await updateTask(id, { completed: updated.completed });
        } catch (error) {
            console.error("Update failed:", error);
            this.setState({ tasks: originalTasks });
        }
    };

    handleDelete = async (id) => {
        const originalTasks = [...this.state.tasks];

        try {
            const tasks = originalTasks.filter((t) => t._id !== id);
            this.setState({ tasks });
            await deleteTask(id);
        } catch (error) {
            console.error("Delete failed:", error);
            this.setState({ tasks: originalTasks });
        }
    };

    render() {
        const { tasks, currentTask } = this.state;

        return (
            <Paper elevation={3} className="todo-container">
                <form onSubmit={this.handleSubmit} className="task-form">
                    <TextField
                        variant="outlined"
                        size="small"
                        className="task-input"
                        value={currentTask}
                        required
                        onChange={this.handleChange}
                        placeholder="Add New TO-DO"
                    />
                    <Button
                        className="add-task-btn"
                        color="primary"
                        variant="outlined"
                        type="submit"
                    >
                        Add Task
                    </Button>
                </form>

                <div className="tasks-list">
                    {(tasks || []).map((task) => (
                        <Paper key={task._id} className="task-item">
                            <Checkbox
                                checked={task.completed}
                                onClick={() => this.handleUpdate(task._id)}
                                color="primary"
                            />
                            <div
                                className={
                                    task.completed
                                        ? "task-text completed"
                                        : "task-text"
                                }
                            >
                                {task.task}
                            </div>
                            <Button
                                onClick={() =>
                                    this.handleDelete(task._id)
                                }
                                color="secondary"
                                className="delete-task-btn"
                            >
                                Delete
                            </Button>
                        </Paper>
                    ))}
                </div>
            </Paper>
        );
    }
}

export default Tasks;

