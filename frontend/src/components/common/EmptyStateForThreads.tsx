import { Box, Flex, Text } from "@radix-ui/themes";

export const EmptyStateForThreads = () => {
    return (
      <Box className={"py-2 px-6"}>
        <Flex direction="column" gap="2">
          <Text size="3">
            <strong>No data here</strong>
          </Text>
          <Flex direction="column" gap="1">
            <Text as="span" size="2">
              Threads are a way to keep conversations organized and focused. You
              can create a thread by replying to a message.
            </Text>
            <Text as="span" size="2">
              You can also start a thread by clicking on the{" "}
              <strong>Create Thread</strong> button on any message.
            </Text>
          </Flex>
        </Flex>
      </Box>
    );
  };