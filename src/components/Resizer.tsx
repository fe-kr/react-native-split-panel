import { StyleSheet, View, type ViewProps } from 'react-native';

export const Resizer = ({ style, onLayout, ...props }: ViewProps) => {
  return (
    <View onLayout={onLayout} style={styles.wrapper}>
      <View {...props} style={[styles.container, style]}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 4,
  },
  container: {
    boxSizing: 'border-box',
    flexDirection: 'column',
    gap: 4,
    borderRadius: 6,
    minHeight: 12,
    minWidth: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#c0c0c0',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#666666',
  },
});
