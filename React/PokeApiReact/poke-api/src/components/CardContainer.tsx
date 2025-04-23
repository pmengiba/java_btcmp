import  { useRef } from 'react';
import Card from './Card';

interface CardContainerProps {
  pokemonList: { name: string; url: string; preEvolutionName?: string; sprites?: { front_default?: string } }[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

const CardContainer = ({ pokemonList, loading, hasMore, loadMore }: CardContainerProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastCardRef = (node: HTMLDivElement | null) => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });

    if (node) observer.current.observe(node);
  };

  return (
    <div className="card-container" id="pkm-container">
      {pokemonList.map((pkm, index) => (
        <Card
          key={index}
          details={{
            ...pkm,
            types: [],
            sprites: { front_default: pkm.sprites?.front_default || '/placeholder.png' },
            id: index + 1,
            species: { url: '' },
          }}
        />
      ))}

      <div ref={lastCardRef} style={{ height: '10px' }}></div>

      {loading && <div>Loading more Pokémon...</div>}
      {!hasMore && <div>No more Pokémon to load.</div>}
    </div>
  );
};

export default CardContainer;