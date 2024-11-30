
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}              CopyRight

            <p
              className="font-weight-bold ml-1"
             
              rel="noopener noreferrer"
              target="_blank"
            >
            </p>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <NavItem>
              <NavLink
                href="https://www.creative-tim.com?ref=adr-admin-footer"
                rel="noopener noreferrer"
                target="_blank"
              >
               https://www.linkedin.com/in/azza-tilouche-143543272/ 
               https://www.linkedin.com/in/eya-ben-mlah-92719925b/
               https://www.linkedin.com/in/maryem-amara-a727a6292/
              </NavLink>
            </NavItem>

           

           
          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
