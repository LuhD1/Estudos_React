import "./Menu.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import logoIcon from "./../../assets/icons/livros.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/auth";
import { toast } from "react-hot-toast";

export function Menu() {
  const navigate = useNavigate();

  function onLogout() {
    logout()
      .then(() => {
        toast.success(`Logout com sucesso.`);
        navigate("/login");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu... Erro: ${erro.code}`);
      });
  }

  return (
    <Navbar bg="success" variant="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <img src={logoIcon} width="32" alt="Logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/livros/adicionar">
              Adicionar Livros
            </Nav.Link>
            <Nav.Link as={Link} to="/livros">
               Livros
            </Nav.Link>
            <Nav.Link as={Link} to="/emprestimos">
               Novo emprestimo
            </Nav.Link>
            <Nav.Link onClick={onLogout}>
              <i className="bi bi-box-arrow-right"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
