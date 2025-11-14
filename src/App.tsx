// import AddPostForm from "./components/AddPostForm";
// import Form from "./components/Form";
// import PostList from "./components/PostList";
// import PostsList from "./components/PostsList";
// import TodoList from "./components/TodoList";
// import UserList from "./components/UserList";

import { useState } from "react";
import SearchForm from "./components/SearchForm";
import CharacterList from "./components/CharacterList";
import Pagination from "./components/Pagination";
import CharacterDetail from "./components/CharacterDetail";

// const validate = async (values: any) => {
//   const errors: any = {};
//   if (!values.email.includes("@")) errors.email = "Email invalide";
//   if (values.password.length < 6) errors.password = "Trop court";

//   // async check
//   await new Promise((r) => setTimeout(r, 500));
//   if (values.email === "demo@test.com") errors.email = "Email déjà pris";

//   return errors;
// };

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<{ name?: string; status?: string }>({});

  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-700 text-white p-6 text-center">
          <h1 className="text-4xl font-bold">Rick & Morty Explorer</h1>
          <p className="mt-2">Exercice RTK Query</p>
        </header>

        <main className="max-w-7xl mx-auto p-4">
          {!selectedId ? (
            <>
              <SearchForm
                onSearch={(s) => {
                  setSearch(s);
                  setPage(1);
                }}
              />
              <CharacterList
                page={page}
                search={search}
                onSelectCharacter={setSelectedId}
              />
              {Object.keys(search).length === 0 && (
                <Pagination
                  page={page}
                  totalPages={42} // Approx, ou fetch via info.pages
                  onPageChange={setPage}
                />
              )}
            </>
          ) : (
            <div>
              <button
                onClick={() => setSelectedId(null)}
                className="mb-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                ← Retour à la liste
              </button>
              <CharacterDetail id={selectedId} />
            </div>
          )}
        </main>
      </div>
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
      {/* <AddPostForm />
      <PostsList />
      <PostList />
      <UserList />
      <TodoList /> */}
    </div>
  );
}

export default App;
