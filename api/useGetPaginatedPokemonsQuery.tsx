import { QueryKey, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { PokemonList } from "../types/PokemonList";

const PAGE_LIMIT = 10;
const initialDataUpdatedTimestamp = Date.now();

type ResponseData = {
  pokemons: PokemonList;
  totalPokemons: number;
};

export const getPaginatedPokemonsQueryKey = (page: number): QueryKey => {
  return ["pokemons", page];
};

export const fetchPokemons = async (page: number = 1) => {
  const currentOffset = PAGE_LIMIT * page;
  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_LIMIT}&offset=${currentOffset}`
  );

  return {
    pokemons: res.data.results,
    totalPokemons: res.data.count,
  };
};

const useGetPaginatedPokemonsQuery = (page: number = 1) => {
  return useQuery<unknown, AxiosError, ResponseData>({
    queryKey: getPaginatedPokemonsQueryKey(page),
    queryFn: () => fetchPokemons(page),
    keepPreviousData: true,
  });
};

export default useGetPaginatedPokemonsQuery;
