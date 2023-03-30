import { Container, Spinner } from "react-bootstrap";

export function Loader() {
    return (
        <Container className="d-flex justify-content-center align-items-center mb-3">
            <Spinner></Spinner>
            <span className="ms-2">Carregando...</span>
        </Container>
    )
}