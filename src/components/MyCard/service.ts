import axios from 'axios';

const coordinatesUrl = 'http://api.openweathermap.org/geo/1.0/zip' //?zip={zip code},{country code}&appid={API key}'
const wheatherUrl = 'https://api.openweathermap.org/data/3.0/onecall' //?lat={lat}&lon={lon}&exclude={part}&appid={API key}'

interface CoordinatesResponse {
   data: { lat: number;
    lon: number;
    zip: string;
    name: string;
    country: string;
}}

interface WeatherResponse {
    current: {
        temp: number;
        weather: {
            description: string;
            icon: string;
        }[];
        // Add other properties as needed
    };
    // Add other properties as needed
}

export const fetchDataWithParams = async ( params: Record<string, string | number>) => {
  try {
    const coordiantes:CoordinatesResponse = await axios.get(coordinatesUrl, { params:{
        zip: `${params.zip},${params.country}`, appid: params.appid
    } });

    console.log(coordiantes);
    
    const { lat, lon, ...locationData } = coordiantes.data;

    const currentCall: WeatherResponse = await axios.get(wheatherUrl, { 
        params: { lat, lon, exclude: 'minutely,hourly,daily', appid: params.appid, units: params.units }
     }).then((data) => data.data);
   
     return {locationData,...currentCall};

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;  // Re-throw the error if needed
  }
};