/**
 * Represents a geographical location with latitude and longitude coordinates.
 */
export interface Location {
  /**
   * The latitude of the location.
   */
  lat: number;
  /**
   * The longitude of the location.
   */
  lng: number;
}

/**
 * Represents a location's details
 */
export interface LocationDetails {
  /**
   * The name of the city.
   */
  city: string;
  /**
   * The name of the state.
   */
  state: string;
  /**
   * The name of the country.
   */
  country: string;
}

/**
 * Asynchronously retrieves location details for a given location.
 *
 * @param location The location for which to retrieve location details.
 * @returns A promise that resolves to a LocationDetails object containing city, state and country.
 */
export async function getLocationDetails(location: Location): Promise<LocationDetails> {
  // TODO: Implement this by calling an API.

  return {
    city: 'Los Angeles',
    state: 'California',
    country: 'USA',
  };
}

