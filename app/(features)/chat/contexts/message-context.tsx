"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { jsonServerInstance } from "../api/axios";

const axios = jsonServerInstance;

const MessageContext = createContext(null);
const MessageDispatchContext = createContext(null);

const initialMessages = [
  {
    message_id: 0,
    channel_id: 0,
    user_id: 10,
    text: "自分用のチャット",
    timestamp: "2023-08-01T09:00:00",
    message_type: "text",
  },
  {
    message_id: 1,
    channel_id: 3,
    user_id: 1,
    text: "皆さん、新しいプロジェクトの提案を持ってきました。AIを用いた新しいウェブアプリケーションの開発です。興味がある方は参加してください！",
    timestamp: "2023-08-01T09:00:00",
    message_type: "text",
  },
  {
    message_id: 2,
    channel_id: 3,
    user_id: 2,
    text: "興味あります！具体的にはどんなアプリケーションを考えていますか？",
    timestamp: "2023-08-01T09:00:00",
    message_type: "text",
  },
  {
    message_id: 3,
    channel_id: 3,
    user_id: 1,
    text: "顧客の購買履歴や検索履歴を基に、AIが次に購入する商品を予測するアプリケーションです。",
    timestamp: "2023-08-01T09:00:00",
    message_type: "text",
  },
  {
    message_id: 4,
    channel_id: 3,
    user_id: 2,
    text: "それは面白そうですね。データの取得はどのように行う予定ですか？",
    timestamp: "2023-08-01T09:00:00",
    message_type: "text",
  },
  {
    message_id: 5,
    channel_id: 3,
    user_id: 1,
    text: "既存のECサイトとのAPI連携を考えています。",
    timestamp: "2023-08-01T09:00:00",
    message_type: "text",
  },
  {
    message_id: 6,
    channel_id: 3,
    user_id: 2,
    text: "皆さん、先日のアプリの開発に関して、フレームワークの選定を始めたいと思います。候補としては、DjangoやFlask、FastAPIなどが考えられますが、意見を聞かせてください。",
    timestamp: "2023-08-10T09:00:00",
    message_type: "text",
  },
  {
    message_id: 7,
    channel_id: 3,
    user_id: 2,
    text: "個人的にはFastAPIの方が開発速度が速く、非同期処理も得意なのでおすすめです。",
    timestamp: "2023-08-10T09:00:00",
    message_type: "text",
  },
  {
    message_id: 8,
    channel_id: 3,
    user_id: 2,
    text: "私もFastAPIに一票です。最近のトレンドも考慮すると、このフレームワークが良いと思います。",
    timestamp: "2023-08-10T09:00:00",
    message_type: "text",
  },
  {
    message_id: 9,
    channel_id: 3,
    user_id: 2,
    text: "了解しました。FastAPIでの開発を進めていきましょう。",
    timestamp: "2023-08-10T09:00:00",
    message_type: "text",
  },
  {
    message_id: 10,
    channel_id: 3,
    user_id: 2,
    text: "アプリのデザインに関して、フロントエンドのライブラリやフレームワークの選定を行いたいと思います。ReactやVue、Angularなどが考えられますが、どれが良いと思いますか？",
    timestamp: "2023-08-20T09:00:00",
    message_type: "text",
  },
  {
    message_id: 11,
    channel_id: 3,
    user_id: 2,
    text: "UIの動的な変更が多いのであればReactが良いと思います。",
    timestamp: "2023-08-20T09:00:00",
    message_type: "text",
  },
  {
    message_id: 12,
    channel_id: 3,
    user_id: 2,
    text: "私もReactが使いやすいと感じます。公式のドキュメントも充実しているので、サポートも受けやすいと思います。",
    timestamp: "2023-08-20T09:00:00",
    message_type: "text",
  },
  {
    message_id: 13,
    channel_id: 3,
    user_id: 2,
    text: "それでは、Reactを使用して進めていきますね。",
    timestamp: "2023-08-20T09:00:00",
    message_type: "text",
  },
  {
    message_id: 14,
    channel_id: 3,
    user_id: 1,
    text: "皆さん、今月の進捗はどうでしょうか？",
    timestamp: "2023-08-31T09:00:00",
    message_type: "text",
  },
  {
    message_id: 15,
    channel_id: 3,
    user_id: 2,
    text: "FastAPIでのバックエンドの基盤はほぼ完成しました。あとは、フロントエンドとの連携を強化する必要があります。",
    timestamp: "2023-08-31T09:00:00",
    message_type: "text",
  },
  {
    message_id: 16,
    channel_id: 3,
    user_id: 2,
    text: "Reactの部分も大体の機能は実装できました。ただ、いくつかのバグがあるので、それを修正する必要があります。",
    timestamp: "2023-08-31T09:00:00",
    message_type: "text",
  },
  {
    message_id: 17,
    channel_id: 3,
    user_id: 1,
    text: "了解しました。来月も引き続き頑張っていきましょう！",
    timestamp: "2023-08-31T09:00:00",
    message_type: "text",
  },
  {
    message_id: 18,
    channel_id: 1,
    user_id: 1,
    text: "佐藤のチャンネル",
    timestamp: "2023-08-31T09:00:00",
    message_type: "text",
  },
  {
    message_id: 19,
    channel_id: 2,
    user_id: 2,
    text: "田中のチャンネル",
    timestamp: "2023-08-31T09:00:00",
    message_type: "text",
  },
  {
    message_id: 20,
    channel_id: 2,
    user_id: 6,
    text: "こんにちは、田中さん。今日の天気はどうですか？",
    timestamp: "2023-08-31T09:05:00",
    message_type: "text",
  },
  {
    message_id: 21,
    channel_id: 2,
    user_id: 2,
    text: "Richardさん、こんにちは。今日は晴れてとてもいい天気ですよ。",
    timestamp: "2023-08-31T09:10:00",
    message_type: "text",
  },
  {
    message_id: 22,
    channel_id: 2,
    user_id: 6,
    text: "それは良かったです。私のところは少し曇っています。",
    timestamp: "2023-08-31T09:15:00",
    message_type: "text",
  },
  {
    message_id: 23,
    channel_id: 2,
    user_id: 2,
    text: "そうですか。でも、曇りの日も落ち着いていていいですよね。",
    timestamp: "2023-08-31T09:20:00",
    message_type: "text",
  },
  {
    message_id: 24,
    channel_id: 2,
    user_id: 6,
    text: "確かにそうですね。今日の仕事はどうですか？",
    timestamp: "2023-08-31T09:25:00",
    message_type: "text",
  },
  {
    message_id: 25,
    channel_id: 2,
    user_id: 2,
    text: "順調に進んでいます。Richardさんの方はどうですか？",
    timestamp: "2023-08-31T09:30:00",
    message_type: "text",
  },
  {
    message_id: 26,
    channel_id: 2,
    user_id: 6,
    text: "私も順調です。最近新しいプロジェクトを始めました。",
    timestamp: "2023-08-31T09:35:00",
    message_type: "text",
  },
  {
    message_id: 27,
    channel_id: 2,
    user_id: 2,
    text: "それは興味深いですね。何のプロジェクトですか？",
    timestamp: "2023-08-31T09:40:00",
    message_type: "text",
  },
  {
    message_id: 28,
    channel_id: 2,
    user_id: 6,
    text: "新しいAI技術を開発しています。とても楽しいです。",
    timestamp: "2023-08-31T09:45:00",
    message_type: "text",
  },
  {
    message_id: 29,
    channel_id: 2,
    user_id: 2,
    text: "それはすごいですね。成功を祈っています。",
    timestamp: "2023-08-31T09:50:00",
    message_type: "text",
  },
  {
    message_id: 30,
    channel_id: 2,
    user_id: 6,
    text: "ありがとうございます。田中さんも頑張ってください。",
    timestamp: "2023-08-31T09:55:00",
    message_type: "text",
  },
  {
    message_id: 31,
    channel_id: 2,
    user_id: 2,
    text: "はい、ありがとうございます。また話しましょう。",
    timestamp: "2023-08-31T10:00:00",
    message_type: "text",
  },
];

const messageReducer = (messages, action) => {
  switch (action.type) {
    case "message/init":
      return [...action.messages];

    case "message/add":
      return [...messages, action.message];

    default:
      return messages;
  }
};

const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, initialMessages);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // const response = await axios.get("/messages");
        // dispatch({ type: "message/init", messages: response.data });
      } catch (error) {
        console.error(error);
      }
    };
    // fetchMessages();
  }, []);

  return (
    <MessageContext.Provider value={state}>
      <MessageDispatchContext.Provider value={dispatch}>{children}</MessageDispatchContext.Provider>
    </MessageContext.Provider>
  );
};

const useMessages = () => useContext(MessageContext);
const useDispatchMessages = () => useContext(MessageDispatchContext);

export { useMessages, useDispatchMessages, MessageProvider };
