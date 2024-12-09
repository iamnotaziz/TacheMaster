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
  Pagination,
  PaginationItem,
  PaginationLink,
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

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const taskResponse = await taskService.getAllTasks(token);
        const clientResponse = await userService.getAllUsers(token);

        setTasks(taskResponse?.data || []);
        setClients(clientResponse?.data.filter((user) => user.role === "client") || []);
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
    const token = localStorage.getItem("token");
    try {
      await taskService.deleteTask(taskId, token);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
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
  {tasks.map((task) => (
    <tr key={task._id}>
      <th scope="row">
        <Media className="align-items-center">
          <Media>
            <span className="mb-0 text-sm">{task.title}</span>
          </Media>
        </Media>
      </th>
      <td>
        <Badge color="" className="badge-dot mr-4">
          <i className={getStatusBadgeColor(task.state)} />
          {task.state}
        </Badge>
      </td>
      <td>{task.commercialId?.username}</td>
      <td>{task.clientIds.map((c) => c.username).join(", ")}</td>
      <td>{formatDate(task.releaseDate)}</td>
      <td>{formatDate(task.achievementDate)}</td>
      <td className="text-right">
        <UncontrolledDropdown>
          <DropdownToggle
            className="btn-icon-only text-light"
            href="#pablo"
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
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  ))}
</tbody>

               
              </Table>
            </Card>
          </div>
        </Row>
      </Container>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {taskToEdit ? "Edit Task" : "Add New Task"}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={taskToEdit ? taskToEdit.title : newTask.title}
                onChange={handleTaskInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                value={taskToEdit ? taskToEdit.description : newTask.description}
                onChange={handleTaskInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="state">Status</Label>
              <Input
                type="select"
                name="state"
                id="state"
                value={taskToEdit ? taskToEdit.state : newTask.state}
                onChange={handleTaskInputChange}
              >
                <option>ToDo</option>
                <option>In Progress</option>
                <option>Done</option>
                <option>Canceled</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="clientIds">Clients</Label>
              <Input
                type="select"
                name="clientIds"
                id="clientIds"
                multiple
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
                name="releaseDate"
                id="releaseDate"
                value={taskToEdit ? taskToEdit.releaseDate : newTask.releaseDate}
                onChange={handleTaskInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="achievementDate">Achievement Date</Label>
              <Input
                type="date"
                name="achievementDate"
                id="achievementDate"
                value={taskToEdit ? taskToEdit.achievementDate : newTask.achievementDate}
                onChange={handleTaskInputChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button
            color="primary"
            onClick={taskToEdit ? handleUpdateTask : handleAddTask}
          >
            {taskToEdit ? "Update Task" : "Save Task"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Tables;
