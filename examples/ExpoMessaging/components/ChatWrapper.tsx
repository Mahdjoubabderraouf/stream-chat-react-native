import React, { PropsWithChildren } from 'react';
import { Chat, OverlayProvider, Streami18n } from 'stream-chat-expo';
import { useChatClient } from '../hooks/useChatClient';
import { AuthProgressLoader } from './AuthProgressLoader';
import { StreamChatGenerics } from '../types';
import { STREAM_API_KEY, user, userToken } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const streami18n = new Streami18n({
  language: 'en',
});

export const ChatWrapper = ({ children }: PropsWithChildren<{}>) => {
  const { bottom } = useSafeAreaInsets();
  const chatClient = useChatClient({
    apiKey: STREAM_API_KEY,
    userData: user,
    tokenOrProvider: userToken,
  });

  if (!chatClient) {
    return <AuthProgressLoader />;
  }

  return (
    <OverlayProvider<StreamChatGenerics> bottomInset={bottom} i18nInstance={streami18n}>
      <Chat client={chatClient} i18nInstance={streami18n} enableOfflineSupport={true}>
        {children}
      </Chat>
    </OverlayProvider>
  );
};
