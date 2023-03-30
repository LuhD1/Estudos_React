import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getEmprestimo, updateEmprestimo } from "../../firebase/emprestimos";
import { getLivro, getLivros } from "../../firebase/livros";

export function EditarEmprestimo() {
  const { id } = useParams();
  const [livros, setLivros] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(data) {
    getLivro(data.idLivro).then((livro) => {
      delete data.idLivro;
      let editEmprestimo = { ...data, livro };
      updateEmprestimo(id, editEmprestimo).then(() => {
        toast.success("Empréstimo editado com sucesso!", {
          duration: 2500,    
        });
        navigate("/emprestimos");
      });
    });
  }
  useEffect(() => {
    getLivros().then((busca) => {
      setLivros(busca);
    });
    getEmprestimo(id).then((emprestimo) => {
      emprestimo.idLivro = emprestimo.livro.id;
      reset(emprestimo);
    });
  }, [id, reset]);

  return (
    <Container>
      <div className="Editar-Emprestimo">
        <h1>Editar Emprestimos</h1>
        <hr />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label className="mt-2">Leitor: </Form.Label>
            <Form.Control
              type="text"
              className={errors.leitor && "is-invalid"}
              {...register("leitor", {
                required: "Leitor é obrigatorio!",
                minLength: { value: 2, message: "Minimo de 2 caracteres!" },
              })}
            />
            <Form.Text className="text-danger">
              {errors.leitor?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Email: </Form.Label>
            <Form.Control
              type="email"
              className={errors.email && "is-invalid"}
              {...register("email", { required: "E-mail é obrigatorio!" })}
            />
            <Form.Text className="text-danger">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Telefone: </Form.Label>
            <Form.Control
              type="tell"
              className={errors.telefone && "is-invalid"}
              {...register("telefone", {
                required: "Telefone é obrigatorio!",
                minLength: { value: 8, message: "Minimo de 8 digitos!" },
              })}
            />
            <Form.Text className="text-danger">
              {errors.telefone?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Livros: </Form.Label>
            <Form.Select
              className={errors.idLivro && "is-invalid"}
              {...register("idLivro", {
                required: "Selecione um livro.",
              })}
            >
              <option disabled value="">
                Selecione um livro
              </option>
              {livros.map((livro) => (
                <option key={livro.id} value={livro.id}>
                  {livro.titulo}
                </option>
              ))}
            </Form.Select>
            <Form.Text className="text-danger">
              {errors.idLivro?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Status: </Form.Label>
            <Form.Select
              className={errors.status && "is-invalid"}
              {...register("status", {
                required: "Selecione um livro.",
              })}
            >
              <option value="Pendente">Pendente</option>
              <option value="Concluido">Concluído</option>
            </Form.Select>
            <Form.Text className="text-danger">
              {errors.status?.message}
            </Form.Text>
          </Form.Group>
          <Button className="mt-3" type="submit" variant="success">
            Editar
          </Button>
        </Form>
      </div>
    </Container>
  );
}
