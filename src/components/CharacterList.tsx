import {  useEffect } from "react";
import {
  useGetCharactersPaginatedQuery,
  useGetFavoritesQuery,
  useSearchCharactersQuery,
} from "../app/features/api/apiRickMorty";
import { StatusBadge } from "./StatusBadge";
import {
  invalidateFavorites,
  toggleFavorite,
} from "../app/features/api/favoriteSlice";
import { useAppDispatch } from "../app/hooks";

interface CharacterListProps {
  page?: number;
  search?: { name?: string; status?: string };
  onSelectCharacter: (id: number) => void;
  onInfoChange?: (info: { pages: number; count: number }) => void;
}

export default function CharacterList({
  page = 1,
  search = {},
  onSelectCharacter,
  onInfoChange,
}: CharacterListProps) {
  const hasSearch = !!search.name || !!search.status;
  const { data: favoriteIds = [] } = useGetFavoritesQuery();
  // 1. Pagination pure
  const {
    data: paginatedData,
    isLoading: pagLoading,
    error: pagError,
  } = useGetCharactersPaginatedQuery(page, {
    skip: hasSearch,
  });

  // 2. Recherche + pagination
  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
  } = useSearchCharactersQuery({ ...search, page }, { skip: !hasSearch });

  const dispatch = useAppDispatch();
  // Choisir les données
  const data = hasSearch ? searchData : paginatedData;
  const isLoading = hasSearch ? searchLoading : pagLoading;
  const error = hasSearch ? searchError : pagError;

  const characters = data?.results ?? [];

  const handleToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id));
    dispatch(invalidateFavorites()); // rafraîchit useGetFavoritesQuery
  };

  // Propager info pour pagination
  useEffect(() => {
    if (data?.info) {
      onInfoChange?.(data.info);
    }
  }, [data?.info, onInfoChange]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center">Erreur de chargement</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {characters.map((char) => {
        const isFavorite = favoriteIds.includes(char.id);
        return (
          <div
            key={char.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-xl transition cursor-pointer bg-white"
          >
            <img
              onClick={() => onSelectCharacter(char.id)}
              src={char.image}
              alt={char.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-3"> 
              <div className="flex relative">
                <h3 className="font-bold text-lg truncate">{char.name}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFavorite(char.id);
                  }}
                  className={`absolute top-2 right-2 p-1 rounded-full transition ${
                    isFavorite
                      ? "bg-yellow-400 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {isFavorite ? "★" : "☆"}
                </button>
              </div>
              <div className="flex items-center mt-1 relative">
                <StatusBadge status={char.status} />
                <span className="text-sm text-gray-600">
                  {char.status} - {char.species}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
