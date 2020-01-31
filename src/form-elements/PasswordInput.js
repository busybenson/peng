import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/core";
import React, { useState } from "react";

const PasswordInput = ({ ...rest }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md" {...rest}>
      <Input pr="5rem" type={show ? "text" : "password"} {...rest} />
      <InputRightElement width="5rem" zIndex="base">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;

PasswordInput.defaultProps = {
  placeholder: "Type a secure password"
};
