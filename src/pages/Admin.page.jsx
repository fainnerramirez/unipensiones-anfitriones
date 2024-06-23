import ContainerCardsAviso from "../components/CardAviso.component";
import { Box, Divider, HStack, Heading, SkeletonText } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { MdWorkspacePremium } from "react-icons/md";
import ModalAnuncio from "../components/ModalAnuncio";
import Sidebar from "../components/Sidebar.component";
import { AuthContext } from "../context/authContext";
import { getAllAdvertsAnfitrionByUserId } from "../firebase/collections/querys/anfitriones";
import { NotResultsEmpty } from "../components/NotResults.component";
import { COLOR } from "../utils/Constants/Color";

const AvisoPage = () => {
  const [documentAdvert, setDocumentAdvert] = useState(null);
  const [image, setImage] = useState("");
  const { userAuth, isSuperanfitrion } = useContext(AuthContext);

  useEffect(() => {
    const getAverts = async () => {
      const advertsAnfitrion = await getAllAdvertsAnfitrionByUserId(
        userAuth?.uid,
        10
      );
      setDocumentAdvert(advertsAnfitrion);
    };
    getAverts();
  }, [image, userAuth]);

  return (
    <Box width={"90%"} margin={"auto"}>
      <Box>
        <Heading textAlign={"center"} p={10}>
          Panel Principal
        </Heading>
      </Box>
      <Box
        display={{ base: "none", md: "flex" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginBottom={5}
      >
        <Box display={"flex"} alignItems={"center"} width={"full"}>
          <Sidebar />
          {userAuth != null ? (
            <Heading
              as="h2"
              size={"lg"}
              marginLeft={{ base: 5, md: 10 }}
              display={"flex"}
              textTransform={"capitalize"}
            >
              Mi perfil
              {isSuperanfitrion && (
                <Box bg={"#e6b219"} ml={1} borderRadius={5}>
                  <MdWorkspacePremium ml={3} />
                </Box>
              )}
            </Heading>
          ) : (
            <SkeletonText noOfLines={1} spacing="4" skeletonHeight="2" />
          )}
        </Box>
        <Box>
          <ModalAnuncio
            isvalidPublished={documentAdvert != null ? false : true}
          />
        </Box>
      </Box>
      <Divider
        height={2}
        bg={COLOR.GREEN}
        borderRadius={35}
        display={{ base: "none", md: "block" }}
      />
      {documentAdvert != null ? (
        <Heading as="h4" marginTop={10} size={"lg"} textAlign={"center"}>
          Tus anuncios
        </Heading>
      ) : (
        <Box>
          <NotResultsEmpty />
        </Box>
      )}
      <Box display={"flex"} justifyContent={"start"} marginTop={10}>
        {documentAdvert != null && (
          <HStack
            spacing={10}
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            flexWrap={"wrap"}
          >
            <ContainerCardsAviso anuncios={documentAdvert} />
          </HStack>
        )}
      </Box>
    </Box>
  );
};

export default AvisoPage;
