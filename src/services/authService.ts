import api from "../lib/api";

export const authenticate = async () => {
  const { data } = await api.post("/autenticacao", {
    client_id: import.meta.env.VITE_CLIENT_ID,
    client_secret: import.meta.env.VITE_CLIENT_SECRET,
  });
  return data;
};

export const login = async (email: string, otp: string) => {
  // This is a mock login function, it will be replaced with the actual login logic
  console.log(email, otp);
  return {
    token: "mock-token",
  };
};
