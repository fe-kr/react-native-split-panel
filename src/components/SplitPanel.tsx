import { Children, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import type {
  CursorValue,
  GestureResponderEvent,
  LayoutChangeEvent,
  LayoutRectangle,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { Resizer as DefaultResizer } from './Resizer';
import { convertDimensionValue, useResizerCursorValue, isNil } from '../utils';

type DimensionValue = number | `${number}%`;

export interface SplitPanelProps extends ViewProps {
  horizontal?: boolean;
  primary?: 'first' | 'last';
  allowResize?: boolean;
  size?: DimensionValue;
  defaultSize?: DimensionValue;
  minSize?: DimensionValue;
  maxSize?: DimensionValue;
  step?: DimensionValue;
  paneStyle?: ViewStyle;
  pane1Style?: ViewStyle;
  pane2Style?: ViewStyle;
  resizerStyle?: ViewStyle;
  resizer?: React.ComponentType<ViewProps>;
  onChange?: (e: GestureResponderEvent, size: number) => void;
  onResizeStarted?: (e: GestureResponderEvent, size: number) => void;
  onResizeFinished?: (e: GestureResponderEvent, size: number) => void;
}

export const SplitPanel = ({
  horizontal,
  allowResize = true,
  children,
  resizer: Resizer = DefaultResizer,
  primary = 'first',
  style: containerStyle,
  onLayout,
  onResizeStarted,
  onChange,
  onResizeFinished,
  defaultSize = '50%',
  size: sizeProp,
  minSize: minSizeProp = 0,
  maxSize: maxSizeProp,
  step: stepProp,
  paneStyle = styles.pane,
  pane1Style,
  pane2Style,
  resizerStyle,
  testID,
  ...props
}: SplitPanelProps) => {
  const [paneSize, setPaneSize] = useState<number>(null!);
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const startRectRef = useRef<LayoutRectangle | null>(null);
  const containerRectRef = useRef<LayoutRectangle | null>(null);
  const resizerRectRef = useRef<LayoutRectangle | null>(null);
  const prevPaneSizeRef = useRef<number | null>(null);

  const resizeAxis = horizontal ? 'x' : 'y';
  const resizeProp = horizontal ? 'width' : 'height';

  const [firstChild, ...lastChild] = Children.toArray(children);

  const containerSizeProp = containerRectRef.current?.[resizeProp] ?? 0;
  const resizerSizeProp = resizerRectRef.current?.[resizeProp] ?? 0;
  const containerSize = containerSizeProp - resizerSizeProp;
  const prevPaneSize = prevPaneSizeRef.current;

  const resizeStyle = { [resizeProp]: paneSize ?? defaultSize, flex: -1 };
  const step = convertDimensionValue(stepProp ?? null, containerSize);
  const minSize = convertDimensionValue(minSizeProp, containerSize)!;
  const size = convertDimensionValue(sizeProp ?? null, containerSize);
  const maxSize = convertDimensionValue(
    maxSizeProp ?? containerSize,
    containerSize
  )!;

  const resizerCursor = useResizerCursorValue({ allowResize, horizontal });

  const calculatePaneSize = (offset: { x: number; y: number }) => {
    const coefficient = primary === 'last' ? -1 : 1;

    const calculatedSize =
      startRectRef.current![resizeProp] + coefficient * offset[resizeAxis];

    if (calculatedSize < minSize) return minSize;

    if (calculatedSize > maxSize) return maxSize;

    if (step) {
      const delta = Math.abs(calculatedSize - prevPaneSize!);

      return delta >= step
        ? Math.round(calculatedSize / step) * step
        : prevPaneSize!;
    }

    return calculatedSize;
  };

  const onInitPaneSize = () => {
    const containerSizeValue = containerRectRef.current?.[resizeProp] ?? 0;
    const resizerSizeValue = resizerRectRef.current?.[resizeProp] ?? 0;
    const contentSize = containerSizeValue - resizerSizeValue;

    const initialSize = convertDimensionValue(defaultSize, contentSize)!;

    setPaneSize(initialSize);
  };

  const onStartShouldSetResponder = () => allowResize;

  const onResponderGrant = (e: GestureResponderEvent) => {
    startRectRef.current = {
      width: 0,
      height: 0,
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
      [resizeProp]: paneSize,
    };

    setIsDragging(true);

    onResizeStarted?.(e, paneSize);
  };

  const onResponderMove = (e: GestureResponderEvent) => {
    const { x, y } = startRectRef.current!;

    const calculatedSize = calculatePaneSize({
      x: e.nativeEvent.pageX - x,
      y: e.nativeEvent.pageY - y,
    });

    if (prevPaneSize === calculatedSize) return;

    prevPaneSizeRef.current = calculatedSize;

    setPaneSize(calculatedSize);

    onChange?.(e, calculatedSize);
  };

  const onResponderRelease = (e: GestureResponderEvent) => {
    const { x, y } = startRectRef.current!;

    const calculatedSize = calculatePaneSize({
      x: e.nativeEvent.pageX - x,
      y: e.nativeEvent.pageY - y,
    });

    onResizeFinished?.(e, calculatedSize);

    setIsDragging(false);

    startRectRef.current = null;
  };

  const onContainerLayout = (e: LayoutChangeEvent) => {
    onLayout?.(e);

    containerRectRef.current = e.nativeEvent.layout;

    if (!isMounted) {
      onInitPaneSize();
    }

    setIsMounted(true);
  };

  useEffect(() => {
    if (isNil(size)) return;

    setPaneSize(size);
  }, [size]);

  return (
    <View
      {...props}
      onLayout={onContainerLayout}
      style={[
        styles.container,
        horizontal && styles.rowContainer,
        isDragging && styles.disabled,
        containerStyle,
      ]}
      testID={testID}
      pointerEvents={isDragging ? 'box-none' : 'auto'}
    >
      <View
        testID={testID && `${testID}-pane1`}
        style={[paneStyle, pane1Style, primary === 'first' && resizeStyle]}
      >
        {firstChild}
      </View>

      <Resizer
        style={[
          horizontal ? styles.fullHeight : styles.rowContainer,
          { cursor: resizerCursor as CursorValue },
          isDragging && styles.active,
          resizerStyle,
        ]}
        testID={testID && `${testID}-resizer`}
        onStartShouldSetResponder={onStartShouldSetResponder}
        onResponderGrant={onResponderGrant}
        onResponderMove={onResponderMove}
        onResponderRelease={onResponderRelease}
        onLayout={(e) => (resizerRectRef.current = e.nativeEvent.layout)}
      />

      <View
        testID={testID && `${testID}-pane2`}
        style={[paneStyle, pane2Style, primary === 'last' && resizeStyle]}
      >
        {lastChild}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  pane: {
    flex: 1,
  },
  active: {
    opacity: 0.75,
  },
  fullHeight: {
    height: '100%',
  },
  disabled: {
    userSelect: 'none',
  } as ViewStyle,
});
