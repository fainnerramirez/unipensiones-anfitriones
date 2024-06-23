import React from "react";
import { HStack, Heading, Image } from "@chakra-ui/react";
import Logo from "../assets/logoUP.png";
import { COLOR } from "../utils/Constants/Color";

const LogoRow = () => {
  return (
    <HStack spacing={5}>
      <Image src={Logo} width={50} height={50} borderRadius={10} />
      <Heading size={"lg"} textDecoration={"none"} color={COLOR.BLACK}>
        Unipensiones
      </Heading>
    </HStack>
  );
};

export default LogoRow;
