import React, { useEffect, useState } from "react";
import { PseudoBox, Box, IconButton } from "@chakra-ui/core";
import LazyLoad from "react-lazy-load";
import { jsx } from "@emotion/core";

const CardImage = ({ picture }) => {
  const placeholderSrc = (width, height) =>
    `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="grey" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`;

  let [loaded, setLoaded] = useState(false);

  return (
    <Box overflow="hidden" position="relative" backgroundColor="#eee">
      <LazyLoad
        width={"255px"}
        height={"255px"}
        debounce={false}
        offsetVertical={500}
        onContentVisible={() => setLoaded(true)}
      >
        <PseudoBox
          as="img"
          w="100%"
          h="100%"
          borderRadius="11px 11px 0 0"
          src={picture}
          onError={event =>
            event.target.setAttribute("src", placeholderSrc(290, 290))
          }
          _groupHover={{
            transform: "scale(1.1)",
            transition: "all 1.5s ease-in-out"
          }}
        />
      </LazyLoad>

      <IconButton
        top="1%"
        left="1%"
        size="lg"
        _hover={{ color: "pink.100" }}
        bg="transparent"
        position="absolute"
        icon="heart"
        color="white"
      />
      <PseudoBox
        position="absolute"
        left={0}
        top={0}
        width="100%"
        height="100%"
        z-index={1}
        transform="scale(1.01)"
        pointerEvents="none"
        // background="radial-gradient(ellipse at center, rgba(0,0,0,0) 65%,rgba(0,0,0,1) 100%)"
        // background="linear-gradient(to bottom, black 0, rgba(0,0,0,0.1) 25%, transparent 100%) center no-repeat"
      />
    </Box>
  );
};

export default CardImage;
