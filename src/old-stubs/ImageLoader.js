import React, { Component, useEffect, useState } from "react";

const _loaded = {};

export function ImageLoader({ ...props }) {
  const placeholderSrc = (width, height) =>
    `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`;

  let [loaded, setLoaded] = useState(false);
  let [src, setSrc] = useState(""); //placeholderSrc(290, 290))

  useEffect(() => {
    if (!!props.src && !loaded) {
      setSrc(props.src);
    }
  });

  let { className, loadedClassName, loadingClassName } = props;

  className = `${className} ${loaded ? loadedClassName : loadingClassName}`;

  return (
    <img
      src={src}
      data-src={props.src}
      onError={event =>
        event.target.setAttribute("src", placeholderSrc(290, 290))
      }
      alt={props.alt}
      onClick={props.onClick}
      onLoad={() => setLoaded(true)}
      className={className}
    />
  );
}

ImageLoader.defaultProps = {
  className: "",
  loadingClassName: "img-loading",
  loadedClassName: "img-loaded"
};

export default ImageLoader;
