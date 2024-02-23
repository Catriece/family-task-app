import axios from "axios";

export async function toSettings(params: object, token: string) {
  console.log("PARAMS ARE: ", params);
  const data = await axios.get("http://localhost:2883/auth/user", {
    params,
    headers: { Authorization: "Bearer " + token },
  });
  return data;
}
