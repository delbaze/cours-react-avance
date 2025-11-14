import { useState } from 'react';

interface SearchFormProps {
  onSearch: (search: { name: string; status: string }) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ name, status });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-100 rounded-lg">
      <input
        type="text"
        placeholder="Nom du personnage..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-2 border rounded-lg flex-1"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-4 py-2 border rounded-lg"
      >
        <option value="">Tous les statuts</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Rechercher
      </button>
    </form>
  );
}