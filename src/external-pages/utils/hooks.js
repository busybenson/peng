import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchData = url => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);
  return { data, isLoading, isError };
};

///////////////////////////////////

const isBrowser = typeof window !== `undefined`;

function getScrollPosition() {
  return isBrowser
    ? { x: window.pageXOffset, y: window.pageYOffset }
    : { x: 0, y: 0 };
}

///////////////////////////////////

function useScrollPosition() {
  const [position, setScrollPosition] = useState(getScrollPosition());

  useEffect(() => {
    let requestRunning = null;
    function handleScroll() {
      if (isBrowser && requestRunning === null) {
        requestRunning = window.requestAnimationFrame(() => {
          setScrollPosition(getScrollPosition());
          requestRunning = null;
        });
      }
    }

    if (isBrowser) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return position;
}

///////////////////////////////////

export function useScrollYPosition(
  desktopThreshold,
  mobileThreshold,
  isStrict = true
) {
  const { y } = useScrollPosition();
  let [desktopDisplay, setDesktopDisplay] = useState(false);
  let [mobileDisplay, setMobileDisplay] = useState(false);

  useEffect(() => {
    if (isStrict) {
      if (y > desktopThreshold) setDesktopDisplay(true);
      if (y < desktopThreshold) setDesktopDisplay(false);
      if (y > mobileThreshold) setMobileDisplay(true);
      if (y < mobileThreshold) setMobileDisplay(false);
    } else {
      if (y > desktopThreshold) setDesktopDisplay(true);
      if (y > mobileThreshold) setMobileDisplay(true);
    }
  }, [y, isStrict, desktopThreshold, mobileThreshold]);

  return { desktopDisplay, mobileDisplay };
}

///////////////////////////////////

const isServer = typeof window === "undefined";
function defaultMatch(query) {
  if (isServer) {
    return undefined;
  }
  return window.matchMedia(query).matches;
}

export const useMedia = query => {
  let [matches, setMatches] = useState(defaultMatch(query));

  useEffect(() => {
    if (!isServer) {
      let media = window.matchMedia(query);
      let listener = () => setMatches(media.matches);
      media.addListener(listener);
      listener();
      return () => media.removeListener(listener);
    }
  }, [query]);

  return matches;
};

///////////////////////////////////
