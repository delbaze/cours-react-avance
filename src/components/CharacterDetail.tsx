import { useGetCharacterQuery } from "../app/features/api/apiRickMorty";

interface CharacterDetailProps {
  id: number;
}

export default function CharacterDetail({ id }: CharacterDetailProps) {
  const { data: character, isLoading, isFetching } = useGetCharacterQuery(id);

  if (isLoading || isFetching) {
    return <div className="text-center">Chargement du personnage...</div>;
  }

  if (!character) return <div>Personnage non trouvé</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex gap-6">
        <img
          src={character.image}
          alt={character.name}
          className="w-48 h-48 rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{character.name}</h1>
          <p className="text-lg mt-2">
            <strong>Statut :</strong> {character.status} - {character.species}
          </p>
          <p>
            <strong>Origine :</strong> {character.origin.name}
          </p>
          <p>
            <strong>Dernière position :</strong> {character.location.name}
          </p>
          <p>
            <strong>Apparitions :</strong> {character.episode.length} épisode(s)
          </p>

          {isFetching && (
            <span className="text-xs text-blue-600 mt-4 inline-block">
              (Chargement depuis le cache...)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
