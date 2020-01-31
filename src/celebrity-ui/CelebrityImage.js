import { Box, IconButton, PseudoBox, Image } from "@chakra-ui/core";
import React, { useContext } from "react";
import { AppContext } from "../authentication/AppProvider";

const Header = ({ nickname }) => <Box>{`Login to follow ${nickname}`}</Box>;

const CelebrityImage = ({ picture, hover, nickname }) => {
  const { useAuthDisclosure } = useContext(AppContext);
  const { onOpen } = useAuthDisclosure();

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    onOpen("login", <Header {...{ nickname }} />);
  };
  return (
    <Box overflow="hidden" position="relative">
      <Image
        w="100%"
        alt={nickname}
        borderRadius="11px 11px 0 0"
        src={`https://954c0b23.ngrok.io${picture}`}
        fallbackSrc="https://via.placeholder.com/150"
        transform={hover ? "scale(1.1)" : ""}
        transition={hover ? "all 1.8s ease-in-out" : ""}
      />

      <IconButton
        top="1%"
        left="1%"
        size="lg"
        _hover={{ color: "pink.100" }}
        bg="transparent"
        onClick={handleClick}
        position="absolute"
        icon="heart"
        color="white"
      />
      {/* <PseudoBox
        position="absolute"
        left={0}
        top={0}
        width="100%"
        height="100%"
        z-index={1}
        transform="scale(1.01)"
        pointerEvents="none"
        background="radial-gradient(ellipse at center, rgba(0,0,0,0) 65%,rgba(0,0,0,1) 100%)"
        // background="linear-gradient(to top, black 0, rgba(0,0,0,0.1) 25%, transparent 55%) center no-repeat"
      /> */}
    </Box>
  );
};

export default CelebrityImage;
