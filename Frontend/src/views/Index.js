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
  UncontrolledTooltip
} from "reactstrap";
import Header from "../components/Headers/Header";
import taskService from "../api/TaskService";
import userService from "../api/UserService";

const Tables = () => {
  const [tasks, setTasks] = useState([]);
  const [clients, setClients] = useState([]);
  const [modal, setModal] = useState(false);
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
        // Fetch tasks
        const taskResponse = await taskService.getAllTasks(token);
        if (Array.isArray(taskResponse?.data)) {
          setTasks(taskResponse.data);
        } else {
          console.error("Invalid task response:", taskResponse);
        }

        // Fetch clients
        const clientResponse = await userService.getAllUsers(token);
        if (Array.isArray(clientResponse?.data)) {
          setClients(clientResponse.data.filter((user) => user.role === "client"));
        } else {
          console.error("Invalid client response:", clientResponse);
        }
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
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleClientSelectionChange = (e) => {
    const selectedClients = Array.from(e.target.selectedOptions, (option) => option.value);
    setNewTask((prev) => ({ ...prev, clientIds: selectedClients }));
  };

  const handleAddTask = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await taskService.createTask(newTask, token);
      if (response?.data) {
        setTasks((prev) => [...prev, response.data]);
        toggleModal();
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Canceled":
        return "bg-danger";
      case "Done":
        return "bg-success";
      case "In progress":
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
                <Button color="primary" onClick={toggleModal}>
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
                      <td>
                        <div className="avatar-group">
                          {task.commercialId && (
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
                          {task.clientIds.map((client) => (
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
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem href="#pablo">Edit</DropdownItem>
                            <DropdownItem href="#pablo">Delete</DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <Pagination className="pagination justify-content-end mb-0">
                  <PaginationItem className="disabled">
                    <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="fas fa-angle-left" />
                      <span className="sr-only">Previous</span>
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="active">
                    <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="fas fa-angle-right" />
                      <span className="sr-only">Next</span>
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add New Task</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={newTask.title}
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
                value={newTask.description}
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
                value={newTask.state}
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
                value={newTask.releaseDate}
                onChange={handleTaskInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="achievementDate">Achievement Date</Label>
              <Input
                type="date"
                name="achievementDate"
                id="achievementDate"
                value={newTask.achievementDate}
                onChange={handleTaskInputChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button color="primary" onClick={handleAddTask}>
            Save Task
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Tables;
