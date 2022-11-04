import { Box, Container, Divider, Flex, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <Container p="0 2rem" maxWidth="container.xl">
      <Head>
        <title>NextJS Hybrid-ish Rendering</title>
      </Head>

      <Flex
        as="main"
        minHeight="100vh"
        padding="4rem 0"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text as="h1" lineHeight="1.15" fontSize="4rem" margin="0">
          Next JS Hybrid-sh Rendering
        </Text>

        <Divider margin="4rem 0" />

        <VStack>
          <Link href="/pokemons">
            <Box
              border="2px"
              padding="1.5rem"
              borderRadius="md"
              _hover={{
                borderColor: "blue.400",
                textColor: "blue.400",
              }}
            >
              <Text fontWeight="bold">List of Pokemons</Text>
            </Box>
          </Link>
        </VStack>
      </Flex>
    </Container>
  );
}
