import React from "react";
import CelebritySearch from "../celebrity-ui/CelebritySearch";
import JumboTron from "./JumboTron";
import PageWrapper from "./PageWrapper";

const HomePage = () => {
  return (
    <PageWrapper>
      <JumboTron />
      <CelebritySearch />
    </PageWrapper>
  );
};

export default HomePage;
