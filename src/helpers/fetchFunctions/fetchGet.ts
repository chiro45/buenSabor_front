import axios from "axios";

export const fetchGet = async (urlGet: string, headers: Record<string, string>) => {
  try {
    const res = await axios.get(urlGet, { headers });
    const data = res.data;
    return data;
  } catch (e) {
    console.log(e);
    throw new Error('Failed to fetch get: ' + e);
  }
};