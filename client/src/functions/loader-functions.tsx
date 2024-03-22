import axios from "axios";

export async function toSettings(params: object, token: string) {
  const data = await axios.get("http://localhost:2883/auth/user", {
    params,
    headers: { Authorization: "Bearer " + token },
  });
  return data;
}
