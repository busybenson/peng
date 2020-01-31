import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Image,
  Stack,
  Text
} from "@chakra-ui/core";
import React, { useContext, useState } from "react";
import { AppContext } from "../authentication/AppProvider";
import { useRouterDisclosure } from "../authentication/AppRouter";
import { root_url, useGetSeachResults } from "../celebrity-ui/hooks";
import AutoComplete from "../form-elements/AutoComplete";
import { useScrollYPosition, useMedia } from "../utils/hooks";

export const logoUrl = root_url + "/static/images/PENG_PINK.png";

const iconProps = {
  size: "16px",
  name: "search",
  color: "pink.400"
};
const inputProps = {
  placeholder: "Type a celeb...",
  fontSize: "md",
  size: "md",
  focusBorderColor: "pink.400"
};

const stickyWrapperProps = hideBorder => ({
  top: 0,
  bg: "white",
  zIndex: "sticky",
  position: "sticky",
  borderBottomWidth: hideBorder ? "none" : "2xs",
  borderColor: "gray.200"
});

const Navigation = ({
  children,
  hideAutoComplete = false,
  hideLoginButton = false,
  hideSignupButton = false,
  hideBorder = false,
  logo = logoUrl,
  wrapperProps = { maxW: ["100%", "100%", "100%", "1152px"], mx: "auto" },
  ...rest
}) => {
  const { useAuthDisclosure } = useContext(AppContext);
  const [query, setQuery] = useState("");
  const { data, hasData } = useGetSeachResults(query);
  const { desktopDisplay, mobileDisplay } = useScrollYPosition(700, 850, true);
  const { onOpen } = useAuthDisclosure();
  const {
    isOpen: isDrawerOpen,
    onClose: onDrawerClose,
    onOpen: onDrawerOpen
  } = useRouterDisclosure("/login");
  const isMobile = useMedia("(max-width: 420px)");
  let displayThreshold = isMobile ? mobileDisplay : desktopDisplay;

  let suggestions = data || [];

  const handleChange = value => {
    setQuery(value);
  };
  const handleLogoClick = () => {
    let openDrawer = isMobile && !hideLoginButton && !hideSignupButton;
    if (openDrawer) {
      onDrawerOpen();
    }
  };

  return (
    <>
      <Box {...stickyWrapperProps(hideBorder)}>
        <Box {...wrapperProps}>
          <Flex
            py={3}
            px={[5, 6]}
            align="center"
            justify="space-between"
            {...rest}
          >
            <Stack
              isInline
              align="center"
              spacing={5}
              w={["100%", "75%", "80%", "60%"]}
              transition="all 2s ease-in-out"
            >
              <Box
                cursor="pointer"
                maxWidth={[128, 168]}
                onClick={handleLogoClick}
              >
                <Image src={logo} w="100%" h="100%" objectFit="cover" />
              </Box>
              {!hideAutoComplete &&
                (displayThreshold ? (
                  <AutoComplete
                    hasLoadedData={hasData}
                    onChange={handleChange}
                    options={suggestions}
                    {...{ iconProps, inputProps }}
                  />
                ) : (
                  <Box py={5} w="100%" />
                ))}
            </Stack>
            {children ? (
              children
            ) : (
              <Stack d={["none", "block"]} isInline align="center" spacing={5}>
                {!hideLoginButton && (
                  <Button
                    onClick={() => onOpen("login")}
                    variant="link"
                    size="md"
                    variantColor="pink"
                  >
                    Log in
                  </Button>
                )}
                {!hideSignupButton && (
                  <Button
                    onClick={() => onOpen("signup")}
                    variant="link"
                    size="md"
                    variantColor="pink"
                  >
                    Sign up
                  </Button>
                )}
              </Stack>
            )}
          </Flex>
        </Box>
      </Box>
      <Drawer
        size="xs"
        isOpen={isDrawerOpen}
        placement="left"
        onClose={onDrawerClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Login or Signup</DrawerHeader>

          <DrawerBody>
            <Stack fontSize="lg" color="pink.400">
              {!hideLoginButton && (
                <Stack
                  pb={3}
                  borderBottomWidth="2xs"
                  onClick={() => onOpen("login")}
                  justify="space-between"
                  isInline
                  align="center"
                >
                  <Text>Log in</Text>
                  <Icon name="chevron-right" size="32px" />
                </Stack>
              )}
              {!hideSignupButton && (
                <Stack
                  pb={3}
                  borderBottomWidth="2xs"
                  onClick={() => onOpen("signup")}
                  justify="space-between"
                  isInline
                  align="center"
                >
                  <Text>Sign up</Text>
                  <Icon name="chevron-right" size="32px" />
                </Stack>
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navigation;
