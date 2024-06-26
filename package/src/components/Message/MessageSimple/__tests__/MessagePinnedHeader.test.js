import React from 'react';

import { cleanup, render, screen, waitFor } from '@testing-library/react-native';

import { ThemeProvider } from '../../../../contexts/themeContext/ThemeContext';
import { defaultTheme } from '../../../../contexts/themeContext/utils/theme';
import {
  generateMessage,
  generateStaticMessage,
} from '../../../../mock-builders/generator/message';
import { generateStaticUser } from '../../../../mock-builders/generator/user';
import { MessagePinnedHeader } from '../MessagePinnedHeader';

afterEach(cleanup);

describe('MessagePinnedHeader', () => {
  it('should render message pinned', async () => {
    const staticUser = generateStaticUser(0);
    const message = generateMessage({
      user: { ...staticUser, image: undefined },
    });
    render(
      <ThemeProvider style={defaultTheme}>
        <MessagePinnedHeader alignment='right' message={message} />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('message-pinned')).toBeTruthy();
    });

    screen.rerender(
      <ThemeProvider style={defaultTheme}>
        <MessagePinnedHeader alignment='right' message={message} />
      </ThemeProvider>,
    );

    const staticMessage = generateStaticMessage('hi', {
      user: staticUser,
    });

    screen.rerender(
      <ThemeProvider style={defaultTheme}>
        <MessagePinnedHeader alignment='left' message={staticMessage} />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('message-pinned')).toBeTruthy();
      expect(screen.toJSON()).toMatchSnapshot();
    });
  });
});
