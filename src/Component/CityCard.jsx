import React from 'react';

function CityCard({ name, description, image, facts, destinations }) {
  return (
    <div className="w-full h-[70vh] p-4 relative">
      <div className="bg-white h-[70vh] rounded-lg example overflow-scroll shadow-md">
        <div className="sticky top-0 bg-white pb-5">
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover rounded-t-lg mb-4"
          />
        </div>
        <div className='pb-10  p-4'>
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Facts:</h3>
            <ul className="list-disc ml-5">
              {facts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Tourist Destinations:</h3>
            <ul className="list-disc ml-5">
              {destinations.map((destination, index) => (
                <li key={index}>{destination}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CityCard;
