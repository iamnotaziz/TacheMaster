import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import UserHeader from "../../components/Headers/UserHeader.js";
import userService from "../../api/UserService.js";
import taskService from "../../api/TaskService.js";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("User ID is not defined");
      return;
    }

    userService.getUserById(userId, token)
      .then(response => {
        console.log("User API Response:", response);
        if (!response.data) {
          throw new Error("User data is undefined");
        }
        console.log("User data:", response.data);
        setUser(response.data);

        // Fetch tasks based on user role
        if (response.data.role === 'commercial') {
          return taskService.getTasksByCommercialId(response.data._id, token);
        } else if (response.data.role === 'client') {
          return taskService.getTasksByClientId(response.data._id, token);
        } else {
          throw new Error("Invalid user role");
        }
      })
      .then(taskResponse => {
        console.log("Task API Response:", taskResponse);
        if (taskResponse && taskResponse.data && Array.isArray(taskResponse.data)) {
          console.log("Tasks data:", taskResponse.data);
          setTasks(taskResponse.data);
        } else {
          throw new Error("Tasks data is not an array or is undefined");
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/team-4-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
 
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Tasks</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {user.username}
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {user.email}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                      {user.phone}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                      {user.role}
                  </div>
                  <hr className="my-4" />
                  
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>

                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={user.username}
                            id="input-username"
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={user.email}
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Phone Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={user.phone}
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Role
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={user.role}
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  
                  {/* Tasks */}
                  <h6 className="heading-small text-muted mb-4">Tasks</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                    <Row>
                      <Col xl="12">
                        <Card className="shadow">
                          <CardHeader className="border-0">
                          </CardHeader>
                          <CardBody>
                            {error && <p className="text-danger">{error}</p>}
                          <ul>
                            {(tasks || []).map(task => (
                            <li key={task._id}>{task.name}</li>
                            ))}
                          </ul>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
