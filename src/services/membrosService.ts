import { FetchMembrosParamsDataType, PessoaDataType } from "@/types/membros";
import api from "../http/api";

export const fetchMembrosAction = async (
  params?: FetchMembrosParamsDataType
) => {
  const queryString = new URLSearchParams(
    params as Record<string, string>
  ).toString();

  return api.get(`/membros${queryString ? `?${queryString}` : ""}`);
};

export const getMemberById = async (id: number) => {
  return api.get(`/membros/${id}`);
};

export const createUser = async (user: PessoaDataType) => {
  return api.post("/plataforma/pessoas", user);
};

export const updateUser = async (user: PessoaDataType) => {
  return api.post("/plataforma/alterar-pessoa", user);
};
