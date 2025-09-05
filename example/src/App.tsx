import { StyleSheet, Text, View } from 'react-native';
import { SplitPanel } from 'react-native-split-panel';

export default function App() {
  return (
    <View style={styles.wrapper}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 20,
    padding: 10,
    width: '100%',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  pane: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  pane1: {
    backgroundColor: 'coral',
  },
  pane2: {
    backgroundColor: 'aquamarine',
  },
});
