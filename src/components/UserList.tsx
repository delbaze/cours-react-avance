import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchUsers } from "../app/features/users/usersThunks";
import { useEffect } from "react";
import { selectUsers } from "../app/features/users/usersSelectors";
function UserList() {
  const dispatch = useAppDispatch();
  const { error, items: users, status } = useAppSelector(selectUsers);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Chargement des utilisateurs ...</div>;
  }
  if (status === "failed") {
    return <div>Erreur : {error}</div>;
  }
  return (
    <div>
      <h2>Users ({users.length})</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
