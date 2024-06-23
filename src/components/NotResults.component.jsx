import React from "react";
import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react";
import EmptyResults from "../assets/notresults.png";

export const NotResultsEmpty = () => {
  return (
    <Stack display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Box marginTop={{ base: 10, md: 20 }}>
        <Image
          src={EmptyResults}
          width={{ base: 200, md: 300 }}
          height={{ base: 200, md: 300 }}
        />
      </Box>
      <Box>
        <Heading textAlign={"center"}>Aún no tienes publicaciones</Heading>
      </Box>
    </Stack>
  );
};
