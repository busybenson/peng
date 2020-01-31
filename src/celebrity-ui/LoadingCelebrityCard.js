import React from "react";
import ContentLoader from "react-content-loader";

const LoadingCard = () => (
  <ContentLoader
    speed={1}
    width="100%"
    height="100%"
    viewBox="0 0 400 475"
    backgroundColor="#e2e2e2"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="3" rx="2" ry="2" width="100%" height="400" />
    <rect x="0" y="420" rx="2" ry="2" width="240" height="16" />
    <rect x="0" y="448" rx="2" ry="2" width="200" height="12" />
    <rect x="0" y="480" rx="2" ry="2" width="120" height="14" />
  </ContentLoader>
);

export default LoadingCard;
