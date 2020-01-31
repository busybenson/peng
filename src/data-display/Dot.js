import { Text } from "@chakra-ui/core";
import React from "react";

const Dot = React.forwardRef(({ spacing, ...rest }, ref) => {
  return (
    <Text ref={ref} as="span" px={spacing} lineHeight="none" {...rest}>
      ·
    </Text>
  );
});

export default Dot;
