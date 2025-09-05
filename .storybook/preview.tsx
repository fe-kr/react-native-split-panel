import type { Preview } from '@storybook/react-native-web-vite';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={styles.wrapper}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    actions: { argTypesRegex: '^on.*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    padding: 10,
    boxSizing: 'border-box',
  },
} as const;

export default preview;
