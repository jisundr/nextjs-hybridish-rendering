import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";
import useGetPaginatedPokemonsQuery, {
  fetchPokemons,
  getPaginatedPokemonsQueryKey,
} from "../api/useGetPaginatedPokemonsQuery";
import Pagination from "../components/Pagination";
import { useRouterQuery } from "../hooks/useRouterQuery";

const PAGE_LIMIT = 10;

const Pokemons: FC = () => {
  const router = useRouter();
  const { page: currentPageString } = useRouterQuery();
  const currentPage = !isNaN(Number(currentPageString))
    ? Number(currentPageString)
    : 1;

  const { data, refetch, isInitialLoading } =
    useGetPaginatedPokemonsQuery(currentPage);

  const handlePageChange = (page: number) => {
    router.push({ query: { page } }, undefined, { shallow: true });
    refetch();
  };

  return (
    <Container p="0 2rem" maxWidth="container.xl">
      <Flex
        as="main"
        minHeight="100vh"
        padding="4rem 0"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text as="h1" lineHeight="1.15" fontSize="2rem" margin="0">
          Pokemons
        </Text>

        <Divider margin="2rem 0" />

        {isInitialLoading && <CircularProgress />}

        {!isInitialLoading && (
          <Grid templateColumns="repeat(5, 1fr)" gap="4">
            {data?.pokemons.map((item) => {
              return (
                <GridItem key={item.name}>
                  <Box
                    border="2px"
                    padding="4"
                    _hover={{
                      borderColor: "blue.400",
                      textColor: "blue.400",
                    }}
                  >
                    <Text textAlign="center">{item.name}</Text>
                  </Box>
                </GridItem>
              );
            })}
          </Grid>
        )}

        <Pagination
          page={currentPage}
          limit={PAGE_LIMIT}
          displayCount={3}
          totalCount={data?.totalPokemons || 0}
          onPageChange={handlePageChange}
        />
      </Flex>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { page = 1 } = context.query;
  const currentPage = !isNaN(Number(page)) ? Number(page) : 1;

  await queryClient.prefetchQuery(
    getPaginatedPokemonsQueryKey(currentPage),
    () => fetchPokemons(currentPage)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Pokemons;
