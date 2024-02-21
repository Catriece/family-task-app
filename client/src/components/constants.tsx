import { useMediaQuery } from "@chakra-ui/react";

// Screen Size Media Queries
const mediaQueries = () => {
  const [ISLARGERTHAN800] = useMediaQuery("(min-width: 800px)");
  const [ISLARGERTHAN550] = useMediaQuery("(min-width: 550px)");
  const [ISSMALLERTHAN300] = useMediaQuery("(max-width: 300px)");

  return { ISLARGERTHAN550, ISLARGERTHAN800, ISSMALLERTHAN300 };
};

export default mediaQueries;
