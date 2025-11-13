import Form from "./components/Form";
import TodoList from "./components/TodoList";

const validate = async (values: any) => {
  const errors: any = {};
  if (!values.email.includes("@")) errors.email = "Email invalide";
  if (values.password.length < 6) errors.password = "Trop court";

  // async check
  await new Promise((r) => setTimeout(r, 500));
  if (values.email === "demo@test.com") errors.email = "Email déjà pris";

  return errors;
};

function App() {
  return (
    <div>
      {/* <Form
        initialValues={{ email: "", password: "" }}
        validate={validate}
        onSubmit={async (v) => {
          await new Promise((r) => setTimeout(r, 1000));
          console.log("Submitted", v);
        }}
      >
        {({
          values,
          errors,
          isValid,
          isSubmitting,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <input
                name="email"
                value={values.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p role="alert">{errors.email}</p>}
            </div>

            <div>
              <input
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>

            <button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "Envoi..." : "S’inscrire"}
            </button>
          </form>
        )}
      </Form> */}
      <TodoList />
    </div>
  );
}

export default App;
