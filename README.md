# React Native Split Panel
[![npm version](https://img.shields.io/npm/v/react-native-split-panel.svg)](https://www.npmjs.com/package/react-native-split-panel)
[![Storybook](https://img.shields.io/badge/Storybook-Live%20Demo-ff4785?logo=storybook&logoColor=white)](https://fe-kr.github.io/react-native-split-panel/)

A flexible, resizable split panel component for React Native.

Supports both horizontal and vertical layouts, customizable panes, and drag-to-resize functionality.

---

## Features

- **Horizontal or vertical** split layouts
- **Primary pane control** (`first` or `last`)
- **Resizable panes** with drag handle
- **Min/Max size constraints**
- **Customizable styles** for panes and resizer
- **Lightweight & performant** — no native dependencies

---

## Installation

```sh
npm install react-native-split-panel
# or
yarn add react-native-split-panel
```

## Usage

```tsx
import { View, Text } from 'react-native';
import { SplitPanel } from 'react-native-split-panel';

export default function App() {
  return (
    <SplitPanel
      style={styles.container}
      onChange={(_, size) => console.log(`Resized to: ${size}`)}
      paneStyle={styles.pane}
      pane1Style={styles.pane1}
      pane2Style={styles.pane2}
    >
      <Text>Pane 1 Content</Text>

      <Text>Pane 2 Content</Text>
    </SplitPanel>
  );
}
```

---

## Props

| Prop               | Type                                               | Default          | Description                                                               |
| ------------------ | -------------------------------------------------- | ---------------- | ------------------------------------------------------------------------- |
| `horizontal`       | `boolean`                                          | `false`          | If `true`, panes are arranged side-by-side; otherwise stacked vertically. |
| `primary`          | `'first'` \| `'last'`                              | `'first'`        | Which pane is considered the primary (resized) pane.                      |
| `allowResize`      | `boolean`                                          | `true`           | Enables or disables resizing.                                             |
| `size`             | `DimensionValue`                                   | `-`              | Controlled size of the primary pane.                                      |
| `defaultSize`      | `DimensionValue`                                   | `50%`            | Initial size of the primary pane.                          |
| `minSize`          | `DimensionValue`                                   | `0`              | Minimum size of the primary pane.                                         |
| `maxSize`          | `DimensionValue`                                   | `-`              | Maximum size of the primary pane.                                         |
| `step`             | `DimensionValue`                                   | `-`              | Step size for resizing.                                                   |
| `paneStyle`        | `ViewStyle`                                        | `flex: 1`        | Style applied to both panes.                                              |
| `pane1Style`       | `ViewStyle`                                        | `-`              | Style applied to the first pane.                                          |
| `pane2Style`       | `ViewStyle`                                        | `-`              | Style applied to the second pane.                                         |
| `resizerStyle`     | `ViewStyle`                                        | `-`              | Style applied to the resizer handle.                                      |
| `resizer`          | `React.ComponentType<ViewProps>`                   | `DefaultResizer` | Custom resizer component.                                                 |
| `onChange`         | `(e: Event, size: number) => void` | `-`              | Called when the pane size changes.                                        |
| `onResizeStarted`  | `(e: Event, size: number) => void` | `-`              | Called when resizing starts.                                              |
| `onResizeFinished` | `(e: Event, size: number) => void` | `-`              | Called when resizing ends.                                                |

---

## Notes
- **Controlled mode**: Pass size and update it in onChange.

- **Uncontrolled mode**: Use defaultSize and let the component manage state.

- **Supported platform**: Android, IOS, Web.

---

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
