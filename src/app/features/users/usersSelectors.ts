import type { RootState } from "../../store";
import { usersAdapter } from "./usersAdapter";

export const selectUsersState = (state: RootState) => state.users;

export const {
  selectAll: selectAllUsers, // tous les users en tableau trié
  selectById: selectUserById, // un user par son id
  selectIds: selectUserIds, // tous les Ids
  selectEntities: selectUserEntities, //retourne l'objet entities ({ [id] : user})
  selectTotal: selectTotalUsers, // retourne le nombre total d'users
} = usersAdapter.getSelectors(selectUsersState);


