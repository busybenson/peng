import {
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useTheme
} from "@chakra-ui/core";
import React, { useState } from "react";
import { useGetSeachResults } from "../celebrity-ui/hooks";
import Autocomplete from "../form-elements/AutoComplete";
import { useTranslation } from "react-i18next";

const centerVericalProps = {
  justifyContent: "center",
  justify: "center",
  direction: "column"
};

const JumboTron = ({
  homepageImage = "https://img.pngio.com/celebrities-hd-png-transparent-celebrities-hdpng-images-pluspng-celebrity-png-900_908.png"
}) => {
  const theme = useTheme();
  const [query, setQuery] = useState("");
  const { data, hasData } = useGetSeachResults(query);
  const { t, i18n } = useTranslation();

  let suggestions = data || [];

  const handleChange = value => {
    setQuery(value);
  };
  return (
    <Flex
      w="100vw"
      borderBottomWidth="2xs"
      {...centerVericalProps}
      h={["auto", "auto", "auto", "75vh"]}
    >
      <Box maxW={["100%", "100%", "100%", "1152px"]} mx="auto">
        <Flex
          direction={[
            "column-reverse",
            "column-reverse",
            "column-reverse",
            "row"
          ]}
          w="100%"
        >
          <Flex
            flex={1}
            w={["100%", "100%", "100%", "80%"]}
            mb={[20, 20, 20, 0]}
            pl={[5, 6, 6, 8]}
            pr={[5, 6, 6, 0]}
            {...centerVericalProps}
          >
            <Box pt={[10, 10, 10, 0]} pr={[0, 0, 0, 6]}>
              <Stack mb={[6, 8, 8, 10]}>
                <Heading lineHeight="shorter" size="2xl">
                  Get{" "}
                  <span style={{ color: `${theme.colors.pink["500"]}` }}>
                    Tiwa Savage
                  </span>{" "}
                  to sing you a birthday song
                </Heading>

                <Text fontSize="2xl">{t("Home.book")}</Text>
              </Stack>

              <Autocomplete
                hasLoadedData={hasData}
                onChange={handleChange}
                options={suggestions}
              />
            </Box>
          </Flex>
          <Box
            flex={1}
            h={["240px", "400px", "480px", "75vh"]}
            w={["100%", "100%", "100%", "20%"]}
          >
            <Image
              h="100%"
              w="100%"
              objectFit={["contain", "contain", "contain", "cover"]}
              objectPosition={["center", "center", "center", "right"]}
              src={homepageImage}
            />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default JumboTron;
