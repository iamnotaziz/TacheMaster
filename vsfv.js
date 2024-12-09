import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledTooltip,
} from "reactstrap";
import Header from "../components/Headers/Header";
import taskService from "../api/TaskService";

const Tables = () => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    state: "ToDo",
    commercialId: "",
    clientIds: [],
    releaseDate: "",
    achievementDate: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await taskService.getAllTasks(token);
        if (response && Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error("API response is not an array:", response);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

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

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleCreateTask = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await taskService.createTask(newTask, token);
      if (response && response.data) {
        setTasks([...tasks, response.data]);
        toggleModal(); // Close modal after task is created
      } else {
        console.error("Failed to create task:", response);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        {/* Create Task Button */}
        <Row>
          <div className="col text-right">
            <Button color="primary" onClick={toggleModal}>
              Create Task
            </Button>
          </div>
        </Row>
        {/* Task Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Task Manager</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Task</th>
                    <th scope="col">Status</th>
                    <th scope="col">Commercials</th>
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
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>

      {/* Modal for Creating Task */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Create New Task</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Task Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={newTask.title}
                onChange={handleInputChange}
                placeholder="Enter task title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="state">Task State</Label>
              <Input
                type="select"
                name="state"
                id="state"
                value={newTask.state}
                onChange={handleInputChange}
              >
                <option>ToDo</option>
                <option>In progress</option>
                <option>Done</option>
                <option>Canceled</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="releaseDate">Release Date</Label>
              <Input
                type="date"
                name="releaseDate"
                id="releaseDate"
                value={newTask.releaseDate}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="achievementDate">Achievement Date</Label>
              <Input
                type="date"
                name="achievementDate"
                id="achievementDate"
                value={newTask.achievementDate}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleCreateTask}>
            Create Task
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Tables;
