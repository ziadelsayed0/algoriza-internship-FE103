export default async function flightsLocations(location) {
  const destinationsUrl = `https://booking-com15.p.rapidapi.com/api/v2/locations/auto-complete?languagecode=en-us&text=${location}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "70f5784584mshded6e9ecf61039fp1bba74jsnd87ecb87b6b0",
      "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
    },
  };

  try {
    const destinationsResponse = await fetch(destinationsUrl, options);
    const destinationsData = (await destinationsResponse.json()).data;

    // Extract dest_id from the first destination (you may need to adapt this logic based on the API response)
    const destId = destinationsData?.[0]?.dest_id;

    if (!destId) {
      return [];
    }

    const hotelsUrl = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=${location}&dest_id=${destId}`;
    const hotelsResponse = await fetch(hotelsUrl, options);
    const hotelsData = (await hotelsResponse.json()).data;

    const cities = hotelsData
      .map((hotel) => hotel["city_name"])
      .filter((item) => item !== "");

    const result = Array.from(new Set(cities));
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}