/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import { SplitPanel } from '../src';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

type SplitPanel = typeof SplitPanel;
type Story = StoryObj<SplitPanel>;

export const Default = {
  name: 'Vertical Panel',
  args: {
    style: { flex: 1, width: '100%' },
    pane1Style: { backgroundColor: 'coral' },
    pane2Style: { backgroundColor: 'aquamarine' },
    paneStyle: {
      flex: 1,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    children: [<Text>1st</Text>, <Text>2nd</Text>],
  },
} satisfies Story;

export const Horizontal = {
  name: 'Horizontal Panel',
  args: {
    ...Default.args,
    horizontal: true,
  },
} satisfies Story;

export const Nested = {
  name: 'Nested Panel',
  args: {
    ...Default.args,
    pane2Style: undefined,
    children: [
      <Text key={1}>1st</Text>,
      <SplitPanel
        key={2}
        horizontal
        style={Default.args.style}
        paneStyle={Default.args.paneStyle}
        pane1Style={{ backgroundColor: 'violet' }}
        pane2Style={{ backgroundColor: 'lightblue' }}
      >
        <Text>2nd</Text>
        <Text>3rd</Text>
      </SplitPanel>,
    ],
  },
} satisfies Story;

export const Disallowed = {
  name: 'Disabled Panel',
  args: {
    ...Default.args,
    allowResize: false,
    children: <Text>allowResize: false</Text>,
  },
} satisfies Story;

export const Step = {
  name: 'With fixed step',
  args: {
    ...Default.args,
    step: '10%',
    children: <Text>step: 10%</Text>,
  },
} satisfies Story;

export const Limited = {
  name: 'With minSize and maxSize',
  args: {
    ...Default.args,
    minSize: '20%',
    maxSize: '80%',
    children: <Text>min: 20%; max: 80%</Text>,
  },
} satisfies Story;

export const CustomResizer = {
  name: 'With custom resizer',
  args: {
    ...Default.args,
    resizer: (props) => (
      <View
        {...props}
        style={{
          marginVertical: 4,
          marginHorizontal: 'auto',
          backgroundColor: '#666666',
          minWidth: 20,
          minHeight: 6,
        }}
      />
    ),
    children: <Text>Custom Resizer</Text>,
  },
} satisfies Story;

export const DefaultSize = {
  name: 'With default size',
  args: {
    ...Default.args,
    defaultSize: '20%',
    children: <Text>defaultSize: 20%</Text>,
  },
} satisfies Story;

export const ControlledSize = {
  name: 'With controlled size',
  args: {
    ...Default.args,
    size: '30%',
    children: <Text>size: 30%</Text>,
  },
} satisfies Story;

export default {
  title: 'React Native Split Panel',
  component: SplitPanel,
} satisfies Meta<SplitPanel>;
