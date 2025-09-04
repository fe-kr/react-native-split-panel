import { Platform } from 'react-native';

type CursorValue = 'auto' | 'not-allowed' | 'col-resize' | 'row-resize';

export const useResizerCursorValue = ({
  allowResize,
  horizontal,
}: {
  allowResize?: boolean;
  horizontal?: boolean;
}): CursorValue => {
  if (Platform.OS !== 'web') return 'auto';

  if (!allowResize) {
    return 'not-allowed';
  }

  return horizontal ? 'col-resize' : 'row-resize';
};
