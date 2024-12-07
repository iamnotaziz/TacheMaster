import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupText,
  InputGroup,
  Col,
  Spinner,
  Alert,
} from "reactstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import userService from "../../api/UserService";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    cin: "",
    role: "client",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await userService.createUser(formData);
      setSuccess("Registration successful! Redirecting to login...");
      console.log("Registration Successful", data);

      // Redirect after success message
      setTimeout(() => navigate("/auth/login"), 2000);
    } catch (err) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Col lg="6" md="8">
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <small>Sign up with credentials</small>
          </div>
          {success && (
            <Alert color="success" style={{ color: "white" }} className="text-center">
              {success}
            </Alert>
          )}
          {error && (
            <Alert color="danger" style={{ color: "white" }} className="text-center">
              {error}
            </Alert>
          )}
          <Form role="form" onSubmit={handleRegister}>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupText>
                  <i className="ni ni-single-02" />
                </InputGroupText>
                <Input
                  placeholder="Username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupText>
                  <i className="ni ni-email-83" />
                </InputGroupText>
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupText>
                  <i className="ni ni-lock-circle-open" />
                </InputGroupText>
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupText>
                  <i className="ni ni-mobile-button" />
                </InputGroupText>
                <Input
                  placeholder="Phone"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupText>
                  <i className="ni ni-credit-card" />
                </InputGroupText>
                <Input
                  placeholder="CIN"
                  type="text"
                  name="cin"
                  value={formData.cin}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupText>
                  <i className="ni ni-tag" />
                  <span style={{ marginLeft: "10px" }}>Role</span>
                </InputGroupText>
                <InputGroup className="input-group-alternative">
                  <select
                    className="form-control"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="client">Client</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </InputGroup>
              </InputGroup>
            </FormGroup>
            <div className="text-center">
              <Button className="mt-4" color="primary" type="submit" disabled={loading}>
                {loading ? <Spinner size="sm" /> : "Sign up"}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Register;
