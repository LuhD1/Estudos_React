import { Button, Container, Badge, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { pegarEmprestimos } from "../../firebase/emprestimos";
import { Loader } from "../../components/Loader/Loader";

export function Emprestimos() {
  const [emprestimo, setEmprestimo] = useState(null);

  useEffect(() => {
    pegarEmprestimos().then((busca) => {
      setEmprestimo(busca);
    });
  }, []);

  return (
    <div>
      <Container>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h1>Emprestimos</h1>
          <Button variant="success" as={Link} to="/emprestimo/adicionar">
            Adicionar emprestimo
          </Button>
        </div>
        <hr />
        {emprestimo === null ? (
          <Loader />
        ) : (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Leitor</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Titulo do Livro</th>
                <th>Status</th>
                <th>Data de Emprestimo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {emprestimo.map((emprestimo) => {
                const data = emprestimo.dataEmprestimo
                  .toDate()
                  .toLocaleDateString("pt-br");
                return (
                  <tr key={emprestimo.id}>
                    <td>{emprestimo.leitor}</td>
                    <td>{emprestimo.email}</td>
                    <td>{emprestimo.telefone}</td>
                    <td>{emprestimo.livro.titulo}</td>
                    <td>
                      {" "}
                      {emprestimo.status === "Pendente" ? (
                        <Badge variant="warning" bg="warning" text="dark">
                          Pendente
                        </Badge>
                      ) : (
                        <Badge variant="success" bg="success">
                          Concluído
                        </Badge>
                      )}
                    </td>
                    <td>{data}</td>
                    <td>
                      <Button
                        as={Link}
                        to={`/emprestimos/editar/${emprestimo.id}`}
                        variant="warning"
                        size="sm"
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
}
