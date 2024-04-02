import { Box, Text, Progress } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { useTask } from "./task-context";
import { descendingOrder } from "../../functions/compare-functions";
import mediaQueries from "../../components/constants";

const ProgressBar = () => {
  const { ISLARGERTHAN525 } = mediaQueries();

  let data: any = useLoaderData();
  const tasks: any = data.get("tasks").data.sort(descendingOrder);

  const { taskCount } = useTask();
  return (
    <Box mb={4} mt={1} w={ISLARGERTHAN525 ? "80%" : "100%"}>
      <Text
        fontSize={"xl"}
        sx={{ textAlign: "left" }}
      >{`Completed: ${taskCount}/${tasks.length}`}</Text>
      <Progress
        borderRadius={12}
        value={(taskCount / tasks.length) * 100}
        size={"lg"}
      />
    </Box>
  );
};

export default ProgressBar;
