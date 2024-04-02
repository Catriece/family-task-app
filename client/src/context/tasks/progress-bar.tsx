import { Box, Text, Progress } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { useTask } from "./task-context";
import { descendingOrder } from "../../functions/compare-functions";

const ProgressBar = () => {
  let data: any = useLoaderData();
  const tasks: any = data.get("tasks").data.sort(descendingOrder);

  const { taskCount } = useTask();
  return (
    <Box mb={4} mt={1} w={"100%"}>
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
