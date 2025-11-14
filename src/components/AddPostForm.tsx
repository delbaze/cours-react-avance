import { useState } from "react";
import { useAddPostMutation } from "../app/features/api/apiSlice";

function AddPostForm() {
  const [addPost, { data, isLoading, isSuccess, isError, reset }] =
    useAddPostMutation();
  console.log("%c⧭", "color: #ffa640", data);

  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const canSave = userId && title && body && !isLoading;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (canSave) {
      try {
        await addPost({ body, title, userId: +userId }).unwrap();
        setUserId("");
        setTitle("");
        setBody("");
        reset();
      } catch (err) {
        console.error("Echec", err);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button type="submit">
          {isLoading ? "Envoi en cours ..." : "Ajouter le post"}
        </button>
      </form>

      <div>
        {isSuccess && <p>Succès!</p>}
        {isError && <p>Erreur lors de l'ajout</p>}
      </div>
    </div>
  );
}

export default AddPostForm;
