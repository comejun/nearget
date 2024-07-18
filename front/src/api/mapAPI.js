import { API_SERVER_HOST } from "../staticData";
import axios from "axios";

const host = `${API_SERVER_HOST}/api/map`;

export const getRestaurantsLocation = async (mapData) => {

  const response = await axios.post(`${host}/mapdata`, mapData)

  return response.data;
};
