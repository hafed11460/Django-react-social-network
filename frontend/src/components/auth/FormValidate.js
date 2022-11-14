// https://github.com/parthprajapati32/reacthookform/blob/84f1e1ce0210044313d8cd5123c7dc798724d140/src/components/BootstrapForm/index.js
import * as React from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col
  // InputGroup,
  // FormControl
} from "react-bootstrap";

import { useForm } from "react-hook-form";

const FormValidate = () => {
  const initState = {
    email: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false
  };

  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = React.useState(initState);

  const onSubmit = (values) => {
    console.log("Values:::", values);
    console.log("Values:::", JSON.stringify(values));
  };

  const onError = (error) => {
    console.log("ERROR:::", error);
  };

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors }
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    // reValidateMode: "onChange",
    defaultValues: initialValues
  });

  // const x = JSON.stringify(data);
  // const y = JSON.stringify(listShow);

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(">>", value, name, type);
      // {1: '1', 2: '9'} '2' 'change'
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Container className="my-4">
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresar correo"
            {...register("email", { required: "Correo es obligatorio" })}
          />
          {errors.email && (
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: "Contraseña es obligatoria" })}
          />
          {errors.password && (
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirmar Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            {...register("confirmPassword", {
              required: "Confirmar contraseña es obligatorio"
            })}
          />
          {errors.confirmPassword && (
            <Form.Text className="text-danger">
              {errors.confirmPassword.message}
            </Form.Text>
          )}
        </Form.Group>

        {/* <Form.Group className="mb-3">
          <Form.Check
            type="radio"
            label="Peru"
            id="Peru"
            value={1}
            name="nation"
            {...register("nation", {
              required: "Nación es obligatorio"
            })}
          />
          <Form.Check
            type="radio"
            label="Uruguay"
            id="Uruguay"
            value={2}
            name="nation"
            {...register("nation", {
              required: "Nación es obligatorio"
            })}
          />
          {errors.nation && (
            <Form.Text className="text-danger">
              {errors.nation.message}
            </Form.Text>
          )}
        </Form.Group> */}

        {/* Funcionando */}
        <Form.Group className="mb-3" controlId="radio-with-other">
          <Form.Check
            type="radio"
            label="Peru"
            id="Peru"
            value={1}
            name="nation"
            {...register("nation", {
              required: "Nación es obligatorio"
            })}
          />
          <Form.Check
            type="radio"
            label="Uruguay"
            id="Uruguay"
            value={2}
            name="nation"
            {...register("nation", {
              required: "Nación es obligatorio"
            })}
          />

          <Row className="mb-3">
            <Col
              xs="auto"
              sm="auto"
              className="col-form-label"
              style={{ marginRight: "-1.5rem" }}
              // className="me-n3" // Activar negative margin en bootstrap
              // https://getbootstrap.com/docs/5.1/utilities/spacing/#negative-margin
            >
              <Form.Check
                name="nation"
                type="radio"
                id="Otras"
                value={3}
                aria-label="Radio button for following text input"
                {...register("nation", {
                  required: "Nación es obligatorio",
                  validate: (v) => {
                    // console.log(v);
                    // console.log(v === "3");
                    // console.log(getValues("nation.otras"));
                    // console.log("length", getValues("nation.otras")?.length);
                    // console.log(getValues("nation.otras")?.length > 0);
                    if (v === "3" || getValues("nation.otras") !== undefined) {
                      return (
                        getValues("nation.otras")?.length > 0 ||
                        "Nación es obligatorio 2"
                      );
                    }
                    return true;
                  }
                })}
              />
            </Col>
            <Col>
              <Form.Control placeholder="Otras" {...register("nation.otras")} />
            </Col>
          </Row>
          {errors.nation && (
            <Form.Text className="text-danger">
              {errors?.nation?.message}
              {errors?.nation?.otras?.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Acepto Términos y Condiciones"
            {...register("termsAndConditions", {
              required: "Términos y Condiciones es obligatorio"
            })}
          />
          {errors.termsAndConditions && (
            <Form.Text className="text-danger">
              {errors.termsAndConditions.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Ingrese carnet</Form.Label>
          {/* <Form.Control
            type="file"
            {...register("archivo", {
              required: "Archivo es obligatorio"
            })}
          /> */}
          <Form.Control
            as="input"
            type="file"
            {...register("archivo", {
              required: "Archivo es obligatorio"
            })}
          />
          {errors.archivo && (
            <Form.Text className="text-danger">
              {errors.archivo.message}
            </Form.Text>
          )}
        </Form.Group>

        {/* probando 2 */}
        {/* <Form.Group className="mb-3">
          <Form.Check
            type="radio"
            label="Peru"
            id="Peru"
            value={1}
            name="nation"
            {...register("nation", {
              required: "Nación es obligatorio"
            })}
          />
          <Form.Check
            type="radio"
            label="Uruguay"
            id="Uruguay"
            value={2}
            name="nation"
            {...register("nation", {
              required: "Nación es obligatorio"
            })}
          />
          <InputGroup>
            <InputGroup.Radio //
              aria-label="Radio button for following text input"
              {...register("nation", {
                required: "Nación es obligatorio"
              })}
            />
            <FormControl //
              aria-label="Text input with radio button"
              {...register("nation.otras")}
            />
          </InputGroup>
          {errors.nation && (
            <Form.Text className="text-danger">
              {errors.nation.message}
            </Form.Text>
          )}
        </Form.Group> */}

        {/* <Row className="align-items-center">
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInput" visuallyHidden>
              Name
            </Form.Label>
            <Form.Control
              className="mb-2"
              id="inlineFormInput"
              placeholder="Jane Doe"
            />
          </Col>
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
              Username
            </Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Text>@</InputGroup.Text>
              <FormControl id="inlineFormInputGroup" placeholder="Username" />
            </InputGroup>
          </Col>
          <Col xs="auto">
            <Form.Check
              type="checkbox"
              id="autoSizingCheck"
              className="mb-2"
              label="Remember me"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" className="mb-2">
              Submit
            </Button>
          </Col>
        </Row> */}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default FormValidate;
