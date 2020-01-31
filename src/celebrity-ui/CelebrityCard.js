import { Box, PseudoBox, Text } from "@chakra-ui/core";
import React, { useState } from "react";
import CelebrityImage from "./CelebrityImage";
import { root_url } from "./hooks";

const CelebrityCard = ({
  nickname,
  currency = "₦",
  profession,
  slug_url,
  onClick,
  price = "",
  picture
}) => {
  let [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };
  return (
    <PseudoBox
      as="a"
      cursor="pointer"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      w="100%"
      borderWidth="2xs"
      overflow="hidden"
      href={`${root_url}${slug_url}`}
      rounded="xl"
    >
      <CelebrityImage {...{ picture, hover, nickname }} />

      <Box py={[4, 5]} px={5}>
        <Text
          fontSize="lg"
          fontWeight="semibold"
          lineHeight="short"
          isTruncated
        >
          {nickname}
        </Text>

        <Text isTruncated fontSize="sm">
          {profession}
        </Text>

        <Text mt={2} color="pink.500" fontSize="sm" fontWeight="bold">
          {currency} {price.toLocaleString()}
        </Text>
      </Box>
    </PseudoBox>
  );
};

export default CelebrityCard;
