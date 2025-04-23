import { PokemonDetails } from '../types/pokemon';

interface CardProps {
  details: PokemonDetails & { preEvolutionName?: string };
}

const Card = ({ details }: CardProps) => {
  const imageSrc = details.sprites?.front_default || '/placeholder.png';

  console.log('URL:', imageSrc);

  return (
    <div className="card">
      <div className="card-img">
        <img src={imageSrc} alt={details.name} loading="lazy" />
        <span>#{details.id.toString().padStart(3, '0')}</span>
      </div>
      <div className="card-info">
        <h1 className="pkm-name">{details.name}</h1>
        <div className="pkm-type">
          {details.types.map((typeObj, index) => (
            <p key={index}>{typeObj.type.name}</p>
          ))}
        </div>
        {details.preEvolutionName && (
          <div className="pkm-evo">
            <p>Evolucionada de:</p>
            <p>{details.preEvolutionName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;