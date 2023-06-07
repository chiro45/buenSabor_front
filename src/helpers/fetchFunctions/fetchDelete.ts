import axios from "axios";

export const fetchDeleteById = async (urlDelete: string, headers: Record<string, string>) => {
  try {
    const res = await axios.delete(urlDelete, { headers });
    const data = res.data;
    return data;
  } catch (e) {
    console.log(e);
    throw new Error('Failed to fetch: ' + e);
  }
};
