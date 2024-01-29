import { LuPencilLine, LuPlus } from "react-icons/lu";

import { useState, useRef, useEffect } from "react";
import { Avatar, Box, Button, Flex, HStack, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useChannels } from "../contexts/channel-context";
import { ColorModeSwitcher } from "./right-sidenav/color-mode-switch";
import { useChat } from "../contexts/chat-context";

export function RightSideNav() {
  const { channels } = useChat();
  const { id: channel_id } = useParams();

  const channel = channels?.find((channel) => channel.id == channel_id);

  const [overview, setOverview] = useState("概要を入力");
  const [toggleOverview, setToggleOverview] = useState(false);

  const overviewRef = useRef(null);
  useEffect(() => {
    toggleOverview
      ? setTimeout(() => {
          overviewRef.current?.focus();
        }, 0)
      : "";
  }, [toggleOverview]);

  useEffect(() => {
    setOverview(channel?.overview);
  }, [channel?.overview]);

  return (
    <Box m={1} maxH={"calc(100dvh - 40px)"}>
      <Box h={"40dvh"}>
        <HStack p={1} h={"12"} justify={"space-between"} borderBottom={"1px solid"} borderColor={"gray.400"}>
          <Text>概要</Text>
          <Button
            color={"blackalpha.700"}
            p={0}
            onClick={() => {
              setToggleOverview((prev) => !prev);
            }}
          >
            <LuPencilLine size="24px" />
          </Button>
        </HStack>
        <Flex w={"100%"} h={"80%"}>
          <Box flex={1} pt={4}>
            {toggleOverview ? (
              // `編集中`
              <Textarea
                bgColor={"white"}
                value={overview}
                p={1}
                h={"100%"}
                ref={overviewRef}
                onChange={(e) => setOverview(e.target.value)}
                resize={"none"}
              />
            ) : (
              <Text pl={2}>{overview}</Text>
            )}
          </Box>
        </Flex>
      </Box>
      <Box>
        <HStack p={1} h={12} justify={"space-between"} borderBottom={"1px solid"} borderColor={"gray.400"}>
          <Text>タスク</Text>
          <LuPlus size="24px" />
        </HStack>
        <HStack p={3} pl={2} mt={2} bgColor={"white"}>
          <Box w={"100%"} overflow={"auto"}>
            ここにタスク
          </Box>
          <Button colorScheme={"blue"} size={"sm"}>
            完了
          </Button>
        </HStack>
      </Box>
      <ColorModeSwitcher />
    </Box>
  );
}
