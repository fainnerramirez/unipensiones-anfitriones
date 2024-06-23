import React from "react";
import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react";
import EmptyResults from "../assets/notresults.gif";

export const NotResultsEmpty = () => {
  return (
    <Stack display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Box>
        <Image src={EmptyResults} width={300} height={300} />
      </Box>
      <Box>
        <Heading>Aún no tienes publicaciones</Heading>
        <Text textAlign={"center"}>Publica tu primer anuncio</Text>
      </Box>
    </Stack>
  );
};
