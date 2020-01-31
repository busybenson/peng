import { Avatar, Box, Flex, Text } from "@chakra-ui/core";
import React from "react";

const Testimonial = ({
  picture,
  as = "span",
  firstName,
  lastName,
  comment,
  ...rest
}) => {
  let name = `${firstName} ${lastName}`;

  return (
    <Flex {...rest}>
      {picture && <Avatar src={picture} name={name} mr={4} />}

      <Box flex="1">
        <Text fontWeight="bold">{firstName}</Text>
        <Text as={as} opacity={0.8} lineHeight="short">
          "{comment}"
        </Text>
      </Box>
    </Flex>
  );
};

export default Testimonial;

Testimonial.defaultProps = {
  firstName: "Yetunde",
  picture: "https://uinames.com/api/photos/female/18.jpg",
  comment: "My video was so good! I loved it so much, She was fantastic!"
};
