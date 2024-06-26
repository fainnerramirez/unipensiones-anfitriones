import { Box, HStack, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import CardAnfitrion from "../assets/cardAfitrion.png";
import LogoRow from "../components/LogoRow.component";
import RegisterNew from "../components/RegisterNew.component";
import "../styles/glass.css";

const Homepage = () => {
  return (
    <HStack
      spacing={10}
      justifyContent={"center"}
      alignItems={"center"}
      flexDir={{ base: "column", md: "row" }}
      height={{ base: "auto", md: "100vh" }}
    >
      <Box
        bg={"#01c380"}
        height={"100%"}
        width={{ base: "100%", md: "50%" }}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        flexDir={"column"}
      >
        <Box mt={10}>
          <LogoRow />
        </Box>
        <Box mt={10}>
          <Image
            src={CardAnfitrion}
            borderRadius={10}
            m={"auto"}
            width={{ base: "90%", md: 800 }}
          />
        </Box>
        <Box color={"white"} textAlign={"center"} mt={{ base: 2, md: 10 }}>
          <Heading fontWeight={"bold"} p={1}>
            Personaliza Tu Anuncio
          </Heading>
          <Text
            width={{ base: "90%", md: "50%" }}
            margin={"auto"}
            fontSize={20}
            pb={5}
          >
            Agrega una foto llamativa de tu pensión, un titulo divertido, el
            precio, entre otros datos; y nosotros nos encargamos de que cientos
            de estudiantes puedan encontrarte!
          </Text>
        </Box>
      </Box>
      <Box
        height={"100%"}
        width={{ base: "100%", md: "50%" }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box pr={{ base: 5, md: 20 }} pl={{ base: 5, md: 20 }}>
          <Heading
            width={"100%"}
            p={{ base: 5, md: 10 }}
            fontWeight={"bold"}
            fontSize={{ base: 30, xl: 35 }}
            textAlign={"center"}
          >
            Cientos de estudiantes listos para encontrar tu pensión
            universitaria
          </Heading>
          <RegisterNew />
        </Box>
      </Box>
    </HStack>
  );
};

export default Homepage;
