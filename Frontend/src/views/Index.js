import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Container,
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Media,
  UncontrolledTooltip,
} from "reactstrap";
import Header from "../components/Headers/Header";
import taskService from "../api/TaskService";
import userService from "../api/UserService";


const Tables = () => {
  const [tasks, setTasks] = useState([]);
  const [clients, setClients] = useState([]);
  const [modal, setModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskDetailModal, setTaskDetailModal] = useState(false);  // New state for task details modal
  const [taskDetails, setTaskDetails] = useState(null);  // Store selected task details

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    state: "ToDo",
    commercialId: "",
    clientIds: [],
    releaseDate: "",
    achievementDate: "",
  });

  const toggleModal = () => setModal(!modal);

  // New function to toggle task details modal
  const toggleTaskDetailModal = () => setTaskDetailModal(!taskDetailModal);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const taskResponse = await taskService.getAllTasks(token);
        const clientResponse = await userService.getAllUsers(token);
        if (taskResponse?.data) setTasks(taskResponse.data);
        if (clientResponse?.data)
          setClients(clientResponse.data.filter((user) => user.role === "client"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "commercial") {
      setNewTask((prev) => ({ ...prev, commercialId: user._id }));
    }
  }, []);

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    if (taskToEdit) {
      setTaskToEdit((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewTask((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleClientSelectionChange = (e) => {
    const selectedClients = Array.from(e.target.selectedOptions, (option) => option.value);
    if (taskToEdit) {
      setTaskToEdit((prev) => ({ ...prev, clientIds: selectedClients }));
    } else {
      setNewTask((prev) => ({ ...prev, clientIds: selectedClients }));
    }
  };

  const handleAddTask = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await taskService.createTask(newTask, token);
      setTasks((prev) => [...prev, response.data]);
      toggleModal();
      setNewTask({
        title: "",
        description: "",
        state: "ToDo",
        commercialId: "",
        clientIds: [],
        releaseDate: "",
        achievementDate: "",
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateTask = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await taskService.updateTask(taskToEdit._id, taskToEdit, token);
      setTasks((prev) =>
        prev.map((task) => (task._id === response.data._id ? response.data : task))
      );
      toggleModal();
      setTaskToEdit(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    toggleModal();
  };

  const handleDeleteTask = async (taskId) => {
    const confirmation = window.confirm("Are you sure you want to delete this task?");
    if (confirmation) {
      const token = localStorage.getItem("token");
      try {
        await taskService.deleteTask(taskId, token);
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Canceled":
        return "bg-danger";
      case "Done":
        return "bg-success";
      case "In Progress":
        return "bg-warning";
      case "ToDo":
        return "bg-info";
      default:
        return "bg-secondary";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  // Function to show task details
  const handleShowTaskDetails = (task) => {
    setTaskDetails(task);
    toggleTaskDetailModal();
  };
  // Feedback state and function
// State for feedback input
const [feedback, setFeedback] = useState("");

// Function to handle feedback submission
const handleAddFeedback = async (e) => {
  e.preventDefault();

  try {
    // Assuming `createFeedback` from your API helper
    await setFeedback(
      { taskId: taskDetails._id, feedback }, 
      // eslint-disable-next-line no-undef
      userToken // Assuming userToken is available
    );

    alert("Feedback submitted successfully!");
    setFeedback(""); // Clear form
    toggleTaskDetailModal(); // Close modal
  } catch (error) {
    console.error("Error submitting feedback:", error);
    alert("Failed to submit feedback. Please try again.");
  }
};





  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Task Manager</h3>
                <Button color="primary" onClick={() => {
                  setTaskToEdit(null);
                  toggleModal();
                }}>
                  Add Task
                </Button>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Task</th>
                    <th scope="col">Status</th>
                    <th scope="col">Commercial</th>
                    <th scope="col">Clients</th>
                    <th scope="col">Release Date</th>
                    <th scope="col">Achievement Date</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {tasks && tasks.length > 0 ? (
                    tasks.map((task) => (
                      <tr key={task._id}>
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">{task?.title || "No title"}</span>
                            </Media>
                          </Media>
                        </th>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className={getStatusBadgeColor(task?.state || "ToDo")} />
                            {task?.state || "ToDo"}
                          </Badge>
                        </td>
                        <td>
                          <div className="avatar-group">
                            {task?.commercialId && (
                              <a
                                className="avatar avatar-sm"
                                href="#pablo"
                                id={`tooltip${task.commercialId._id}`}
                                onClick={(e) => e.preventDefault()}
                                key={task.commercialId._id}
                              >
                                <img
                                  alt="..."
                                  className="rounded-circle"
                                  src={task.commercialId.imageUrl}
                                />
                                <UncontrolledTooltip
                                  delay={0}
                                  target={`tooltip${task.commercialId._id}`}
                                >
                                  {task.commercialId.username}
                                </UncontrolledTooltip>
                              </a>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="avatar-group">
                            {task?.clientIds.map((client) => (
                              <a
                                className="avatar avatar-sm"
                                href="#pablo"
                                id={`tooltip${client._id}`}
                                onClick={(e) => e.preventDefault()}
                                key={client._id}
                              >
                                <img
                                  alt="..."
                                  className="rounded-circle"
                                  src={client.imageUrl}
                                />
                                <UncontrolledTooltip
                                  delay={0}
                                  target={`tooltip${client._id}`}
                                >
                                  {client.username}
                                </UncontrolledTooltip>
                              </a>
                            ))}
                          </div>
                        </td>
                        <td>{formatDate(task.releaseDate)}</td>
                        <td>{formatDate(task.achievementDate)}</td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              role="button"
                              size="sm"
                              color=""
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" end>
                              <DropdownItem onClick={() => handleEditClick(task)}>
                                Edit
                              </DropdownItem>
                              <DropdownItem onClick={() => handleDeleteTask(task._id)}>
                                Delete
                              </DropdownItem>
                              <DropdownItem onClick={() => handleShowTaskDetails(task)}>
                                Show Task Detail
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No tasks found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <ul className="pagination justify-content-end mb-0">
                    <li className="page-item disabled">
                      <a className="page-link" href="#pablo" tabIndex="-1">
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#pablo">
                        1
                        <span className="sr-only">(current)</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#pablo">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#pablo">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#pablo">
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>

      {/* Modal for Adding/Editing Task */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {taskToEdit ? "Edit Task" : "Add Task"}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="taskTitle">Title</Label>
              <Input
                type="text"
                id="taskTitle"
                name="title"
                value={taskToEdit ? taskToEdit.title : newTask.title}
                onChange={handleTaskInputChange}
                placeholder="Task title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="taskDescription">Description</Label>
              <Input
                type="textarea"
                id="taskDescription"
                name="description"
                value={taskToEdit ? taskToEdit.description : newTask.description}
                onChange={handleTaskInputChange}
                placeholder="Task description"
              />
            </FormGroup>
            <FormGroup>
              <Label for="taskState">Status</Label>
              <Input
                type="select"
                name="state"
                id="taskState"
                value={taskToEdit ? taskToEdit.state : newTask.state}
                onChange={handleTaskInputChange}
              >
                <option value="ToDo">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
                <option value="Canceled">Canceled</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="taskClients">Clients</Label>
              <Input
                type="select"
                name="clientIds"
                id="taskClients"
                multiple
                value={taskToEdit ? taskToEdit.clientIds : newTask.clientIds}
                onChange={handleClientSelectionChange}
              >
                {clients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.username}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="releaseDate">Release Date</Label>
              <Input
                type="date"
                id="releaseDate"
                name="releaseDate"
                value={taskToEdit ? taskToEdit.releaseDate : newTask.releaseDate}
                onChange={handleTaskInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="achievementDate">Achievement Date</Label>
              <Input
                type="date"
                id="achievementDate"
                name="achievementDate"
                value={taskToEdit ? taskToEdit.achievementDate : newTask.achievementDate}
                onChange={handleTaskInputChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={taskToEdit ? handleUpdateTask : handleAddTask}>
            {taskToEdit ? "Update Task" : "Add Task"}
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal for Task Details */}
      <Modal isOpen={taskDetailModal} toggle={toggleTaskDetailModal}>
  <ModalHeader toggle={toggleTaskDetailModal}>Task Details</ModalHeader>
  <ModalBody>
    {taskDetails ? (
      <div>
        <h5>Title: {taskDetails.title}</h5>
        <p>Description: {taskDetails.description}</p>
        <p>Status: {taskDetails.state}</p>
        <p>Release Date: {formatDate(taskDetails.releaseDate)}</p>
        <p>Achievement Date: {formatDate(taskDetails.achievementDate)}</p>
        <p>Commercial: {taskDetails.commercialId?.username}</p>
        <p>Clients: {taskDetails.clientIds.map(client => client.username).join(", ")}</p>

        {/* Feedback Form - Show only if task is completed */}
        {taskDetails.state === "Done" ? (
          <>
            <h5 className="mt-4">Add Feedback</h5>
            <Form onSubmit={handleAddFeedback}>
              <FormGroup>
                <Label for="feedbackText">Feedback</Label>
                <Input
                  type="textarea"
                  id="feedbackText"
                  name="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter your feedback"
                  required
                />
              </FormGroup>
              <Button color="primary" type="submit">
                Submit Feedback
              </Button>
            </Form>
          </>
        ) : (
          <p className="text-muted mt-3">
            Feedback can only be added after the task is completed.
          </p>
        )}
      </div>
    ) : (
      <p>Loading details...</p>
    )}
  </ModalBody>
  <ModalFooter>
    <Button color="secondary" onClick={toggleTaskDetailModal}>
      Close
    </Button>
  </ModalFooter>
</Modal>

    </>
  );
};

export default Tables;
