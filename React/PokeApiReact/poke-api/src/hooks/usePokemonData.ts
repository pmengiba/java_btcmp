import { useState, useEffect } from 'react';
import { Pokemon, PokemonDetails, EvolutionChain } from '../types/pokemon';

const LIMIT = 20;

interface PokemonWithPreEvolution extends Pokemon {
  preEvolutionName?: string;
}

interface UsePokemonDataReturn {
  pokemonList: PokemonWithPreEvolution[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  filterPokemon: (term: string) => void;
}

const getPokemonDetails = async (url: string): Promise<PokemonDetails | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error fetching Pokémon');
    const data = await response.json();

    const speciesResponse = await fetch(data.species.url);
    if (!speciesResponse.ok) throw new Error('Error fetching species url');
    const speciesData = await speciesResponse.json();

    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    if (!evolutionResponse.ok) throw new Error('Error fetching evolution url');
    const evolutionData = await evolutionResponse.json();

    const getPreEvolution = (chain: EvolutionChain, currentName: string): string | undefined => {
      if (chain.species.name === currentName) {
        return undefined;
      }
    
      for (const evolution of chain.evolves_to) {
        if (evolution.species.name === currentName) {
          return chain.species.name;
        }
    
        const preEvolution = getPreEvolution(evolution, currentName);
        if (preEvolution) {
          return preEvolution;
        }
      }
    
      return undefined;
    };

    const preEvolutionName = getPreEvolution(evolutionData.chain, data.name);

    return {
      id: data.id,
      name: data.name,
      sprites: {
        front_default: data.sprites.front_default || '/placeholder.png',
      },
      types: data.types,
      species: {
        url: data.species.url,
      },
      preEvolutionName,
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const usePokemonData = (): UsePokemonDataReturn => {
  const [allPokemon, setAllPokemon] = useState<PokemonWithPreEvolution[]>([]);
  const [pokemonList, setPokemonList] = useState<PokemonWithPreEvolution[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchPokemonData = async (currentOffset: number) => {
    if (!hasMore) return;
  
    setLoading(true);
  
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${currentOffset}`
      );
      if (!response.ok) throw new Error('Error fetching Pokémon data');
      const data = await response.json();
  
      const detailedPokemon = await Promise.all(
        data.results.map(async (pkm: Pokemon) => {
          const details = await getPokemonDetails(pkm.url);
          return details || {
            name: pkm.name,
            url: pkm.url,
            id: 0,
            sprites: { front_default: '/placeholder.png' },
            types: [],
            species: { url: '' }
          };
        })
      );
  
      const newPokemon = [...allPokemon, ...detailedPokemon];
      setAllPokemon(newPokemon);
      setPokemonList(newPokemon);
  
      if (data.results.length < LIMIT) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  const loadMore = () => {
    if (!loading && hasMore) {
      const newOffset = offset + LIMIT;
      setOffset(newOffset);
      fetchPokemonData(newOffset);
    }
  };

  const filterPokemon = (term: string) => {
    if (!term) {
      setPokemonList(allPokemon);
    } else {
      const filtered = allPokemon.filter((pkm) =>
        pkm.name.toLowerCase().includes(term.toLowerCase())
      );
      setPokemonList(filtered);
    }
  };

  useEffect(() => {
    fetchPokemonData(0);
  }, []);

  return { pokemonList, loading, hasMore, loadMore, filterPokemon };
};