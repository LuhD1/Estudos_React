import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { addLivro, uploadCapaLivro } from "../../firebase/livros";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function AdicionarLivro() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const imagem = data.imagem[0];
    if (imagem) {
      const toastId = toast.loading("Upload da imagem...", {
        position: "top-right",
      });
      uploadCapaLivro(imagem).then((url) => {
        toast.dismiss(toastId);
        data.urlCapa = url;
        delete data.imagem;
        addLivro(data).then(() => {
          toast.success("Livro adicionado com sucesso!", {
            duration: 2000,
            position: "bottom-right",
          });
          navigate("/livros");
        });
      });
    } else {
      delete data.imagem;
      addLivro(data).then(() => {
        toast.success("Livro adicionado com sucesso!", {
          duration: 2000,
          position: "bottom-right",
        });
        navigate("/livros");
      });
    }
  }

  return (
    <div className="Adicionar-Livro">
      <Container>
        <h1 className="mt-3">Adicionar Livro</h1>
        <hr />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              {...register("titulo", {
                required: "Título é obrigatório",
                maxLength: { value: 255, message: "Limite de 255 caracteres!" },
              })}
              className={errors.titulo && "is-invalid"}
            />
            <Form.Text className="text-danger">
              {errors.titulo?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              type="text"
              {...register("autor", {
                required: "Autor é obrigatório",
                maxLength: { value: 255, message: "Limite de 255 caracteres!" },
              })}
              className={errors.autor && "is-invalid"}
            />
            <Form.Text className="text-danger">
              {errors.autor?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              type="text"
              {...register("categoria", {
                required: "Categoria é obrigatória",
                maxLength: { value: 255, message: "Limite de 255 caracteres!" },
              })}
              className={errors.categoria && "is-invalid"}
            />
            <Form.Text className="text-danger">
              {errors.categoria?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              {...register("isbn", {
                required: "ISBN é obrigatóri",
                minLength: {
                  value: 12,
                  message: "Minimo de 16 caracteres! Exmp: XXX-XX-XXXXX-XX-X",
                },
              })}
              className={errors.isbn && "is-invalid"}
            />
            <Form.Text className="text-danger">
              {errors.isbn?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail"></Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagem da capa</Form.Label>
            <Form.Control
              type="file"
              accept=".png,.jpg,.jpeg,.gif"
              {...register("imagem")}
            />
          </Form.Group>
          <Button type="submit" variant="success">
            Adicionar
          </Button>
        </Form>
      </Container>
    </div>
  );
}
