// @refresh reset
import {
  Box,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import CategoryGrid from "./CelebrityGrid";
import { useGetCelebrities } from "./hooks";

const tabProps = {
  mb: [0, 3],
  width: ["auto", "auto", "auto", "100%"],
  display: "inline-block",
  mr: [3, 5, 5, 0],
  bg: "gray.100",
  textTransform: "capitalize",
  _focus: { outline: "none" },
  _selected: { color: "white", bg: "pink.500" }
};

const tabListProps = {
  alignSelf: "flex-start",
  whiteSpace: "nowrap",
  flexDirection: ["row", "row", "row", "column"],
  width: ["500px", "100%", "100%", "192px"],
  pr: [0, 0, 0, 8],
  pb: [2, 0, 0, 0],
  pt: [2, 2, 2, 0]
};

const tabListWrapper = {
  position: "sticky",
  top: ["64px", "64px", "64px", "64px"],
  bg: "white",
  zIndex: 1,
  overflowX: "scroll",
  overflowY: "hidden"
};

const tabsProps = {
  display: "flex",
  flexDirection: ["column", "column", "column", "row"],
  variant: "soft-rounded",
  variantColor: "pink"
};

const leastPrice = array =>
  array.sort((a, b) => {
    if (a.price > b.price) return 1;
    if (a.price < b.price) return -1;
    return 0;
  });

const highestPrice = array =>
  array.sort((a, b) => {
    if (a.price < b.price) return 1;
    if (a.price > b.price) return -1;
    return 0;
  });

const alphabetical = array => {
  return array.sort((a, b) => {
    if (a.nickname < b.nickname) return -1;
    if (a.nickname > b.nickname) return 1;
    return 0;
  });
};

const filterCelebrities = (data, filter) => {
  let activeCelebs = data.filter(({ status }) => status === "A");
  if (filter === "Least prices") return leastPrice(activeCelebs);
  if (filter === "Highest prices") return highestPrice(activeCelebs);
  if (filter === "Alphabetical") return alphabetical(activeCelebs);
  return activeCelebs;
};

const TabContent = ({ label, count }) => (
  <Stack isInline align="center" spacing={1}>
    <Text>{label}</Text>
    <Text opacity="0.6">&middot;</Text>
    <Text fontWeight="normal" opacity="0.6">
      {count}
    </Text>
  </Stack>
);

const CategoryDetails = ({ history, filter, displayCategories }) => {
  let match = useRouteMatch("/c/:slug");

  let defaultIndex = displayCategories.findIndex(
    category => category.slug === match.params.slug
  );

  if (defaultIndex < 0) {
    defaultIndex = 0;
  }
  const [currentCategory, setCurrentCategory] = useState(
    displayCategories[defaultIndex]
  );
  const [data, setData] = useState([]);
  let finalData = filterCelebrities(data, filter);

  const {
    data: celebrities,
    hasData: isLoading,
    error: isError
  } = useGetCelebrities({
    isDependent: true,
    category: currentCategory.slug
  });

  useEffect(() => {
    setData(celebrities || []);
  }, [celebrities, currentCategory]);

  ///////////////////////////

  function setTabIndex(index) {
    let _currentCategory = displayCategories[index];
    setCurrentCategory(_currentCategory);
    history.push("/c/" + _currentCategory.slug);
  }

  //////////////////////////

  return (
    <Tabs
      {...tabsProps}
      defaultIndex={defaultIndex}
      onChange={index => setTabIndex(index)}
    >
      <Box {...tabListWrapper}>
        <TabList {...tabListProps}>
          {displayCategories.map(({ label, count }, index) => (
            <Tab key={index} {...tabProps}>
              <TabContent {...{ label, count }} />
            </Tab>
          ))}
        </TabList>
      </Box>

      <TabPanels flex={1}>
        {displayCategories.map((_, index) => (
          <TabPanel key={index}>
            <CategoryGrid data={finalData} {...{ isLoading, isError }} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default CategoryDetails;
