import axios from 'axios';
import removeDuplicates from "@/utils";

const USERNAME = process.env.USERNAME_FROM_GEONAMES_API;

export const searchCity = async (query: string): Promise<string[]> => {
  try {
    const response = await axios.get(`http://api.geonames.org/searchJSON?q=${query}&maxRows=5&username=${USERNAME}`);

    //choose first from the list of available cities
    // const results = [response.data.geonames[0].name]

    const results = response.data.geonames.map((result: any) => result.name);
    return removeDuplicates(results);
  } catch (error) {
    console.error('Error fetching city suggestions', error);
    return [];
  }
};