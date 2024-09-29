import { render, screen } from '@testing-library/react';
import CityWeather from './CityWeather';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ description: 'Sunny' }),
  })
) as jest.Mock;

describe('CityWeather component', () => {
  test('renders initial city, initial weather data', () => {
    // Render the Greeting component
    render(<CityWeather initialCityName="Melbourne" initialWeatherData={{
        temperature: 38,
        description: 'sunny',
        icon: 'test',
    }} initialError={null} />);

    // Find the heading and check if it contains the correct text
    const heading = screen.getByText(/Melbourne/i);

    // Assertion: Expect the heading to be in the document
    expect(heading).toBeInTheDocument();

    // Find the heading and check if it contains the correct text
    const temperature = screen.getByText(/38/i);

    // Assertion: Expect the temperature to be in the document
    expect(temperature).toBeInTheDocument();
  });
});
