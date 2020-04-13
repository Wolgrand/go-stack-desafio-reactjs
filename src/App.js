import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository(e) {
    e.preventDefault();

    const data = {
      url,
      title,
      techs,
    };

    const response = await api.post('repositories', data);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddRepository}>
        <input
          type="text"
          placeholder="Url"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Techs"
          value={techs}
          onChange={e => setTechs(e.target.value)}
        />
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default App;
