"use client";

import { Avatar, Box, Divider, HStack, Heading, Spacer, Text, VStack } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useMessages, useDispatchMessages } from "@/app/(features)/chat/contexts/message-context";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useChannels } from "../contexts/channel-context";
import { useUsers } from "../contexts/user-context";
import { useChat } from "../contexts/chat-context";

export function ChatMessage() {
  const { channels } = useChat();
  const { id: channel_id } = useParams();

  const channel = channels?.find((channel) => channel.id == channel_id);
  const messages = channel?.messages;

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <>
      <VStack p={1} h={"calc(100dvh - 240px)"} color={"black"}>
        {/* channel title */}
        <Heading
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          w={"100%"}
          h={"12"}
          size={"md"}
          bgColor={"white"}
          borderBottom={"1px solid"}
          borderColor={"gray.400"}
        >
          {channel?.name}
        </Heading>
        {/* messages */}
        <VStack overflowY={"scroll"} gap={1} h={"100%"} w={"100%"}>
          <Box marginTop={"auto"} w={"100%"}>
            {messages?.length > 0 ? (
              messages.map((message, i) => {
                // const user = users.find((user) => user.user_id === message.user_id);
                return (
                  <Box key={i} border={"1px solid"} borderColor={"gray.300"} rounded={"xl"} bgColor={"blue.50"}>
                    <HStack p={2} pb={0}>
                      <Avatar size={"sm"} name={message.user.name} />
                      <Box>{message.user.name}</Box>
                      <Spacer />
                      <Box>{message.created_at}</Box>
                    </HStack>
                    {/* message_text */}
                    <Box p={4}>
                      {message.type === "text" ? (
                        <Text>
                          {message.message.split("\n").map((line, i) => (
                            <span key={line}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </Text>
                      ) : message.type === "stamp" ? (
                        <Image src={message.text} alt="stamp" width={100} height={100} />
                      ) : (
                        <Text>{message.message}</Text>
                      )}
                    </Box>
                  </Box>
                );
              })
            ) : (
              <h1>読み込み中...</h1>
            )}
            <Box ref={messagesEndRef} />
          </Box>
        </VStack>
      </VStack>
    </>
  );
}
