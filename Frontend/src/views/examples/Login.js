import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner,
  Alert,
} from "reactstrap";
import { useNavigate } from "react-router-dom"; 
import userService from "../../api/UserService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await userService.loginUser({ email, password });
      console.log("Login Successful", data);
      localStorage.setItem("token", data.token);
      setSuccess("Login successful! Redirecting..."); 
      setTimeout(() => {
        navigate("/index"); 
      }, 2000);
    } catch (err) {
      setError(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    navigate("/auth/register"); 
  };

  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <small>Login with credentials</small>
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
          <Form role="form" onSubmit={handleLogin}>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupText>
                  <i className="ni ni-email-83" />
                </InputGroupText>
                <Input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </FormGroup>
            <div className="text-center">
              <Button className="my-4" color="primary" type="submit" disabled={loading}>
                {loading ? <Spinner size="sm" /> : "Login"}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      <Row className="mt-3 ml-8">
        <Col className="text-right" xs="6">
          <a
            className="text-light"
            href="#pablo"
            onClick={(e) => {
              e.preventDefault(); 
              handleCreateAccount(); 
            }}
          >
            <small>Create new account</small>
          </a>
        </Col>
      </Row>
    </Col>
  );
};

export default Login;
