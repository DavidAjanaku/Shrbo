import React from 'react';
import { FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';

const CityCard = ({ name, description, image, facts, destinations }) => {
  return (
    <div className="city-card mx-1 bg-white rounded-lg shadow-md overflow-hidden h-full transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-lg">
      <div className="relative h-72">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white">{name}</h2>
        </div>
      </div>
      <div className="p-6 flex-grow">
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="city-facts mb-4">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            Facts:
          </h3>
          <ul>
            {facts.map((fact, index) => (
              <li key={index} className="mb-2">
                {fact}
              </li>
            ))}
          </ul>
        </div>
        <div className="city-destinations">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            Destinations:
          </h3>
          <ul>
            {destinations.map((destination, index) => (
              <li key={index} className="mb-2">{destination}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CityCard;