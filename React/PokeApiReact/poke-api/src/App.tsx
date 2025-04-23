import SearchBar from './components/SearchBar';
import CardContainer from './components/CardContainer';
import { usePokemonData } from './hooks/usePokemonData';
import './App.css';

const App = () => {
  const { pokemonList, loading, hasMore, loadMore, filterPokemon } = usePokemonData();

  return (
    <div>
      <div className="triangle top-left"></div>
      <div className="triangle top-right"></div>

      <div className="container">
        <div className="circle bottom-left"></div>
        <div className="circle bottom-right"></div>

        <div className="row">
          <SearchBar onSearch={filterPokemon} />
        </div>

        <div className="row">
          {loading && <div>Loading Pokémon data...</div>}
          <CardContainer
            pokemonList={pokemonList}
            loading={loading}
            hasMore={hasMore}
            loadMore={loadMore}
          />
        </div>
      </div>
    </div>
  );
};

export default App;