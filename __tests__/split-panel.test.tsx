import {
  render,
  screen,
  fireEvent,
  getRandomInteger,
  getRandomColor,
  getRandomRectangle,
} from './utils';

import { SplitPanel } from '../src';

const testID = 'split-panel';

const testIDs = {
  pane1: `${testID}-pane1`,
  resizer: `${testID}-resizer`,
  pane2: `${testID}-pane2`,
};

describe(SplitPanel.name, () => {
  it('should match snapshot', () => {
    render(<SplitPanel testID={testID} />);

    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should render horizontal layout when horizontal=true', () => {
    const size = getRandomInteger();

    render(<SplitPanel testID={testID} horizontal defaultSize={size} />);

    expect(screen.getByTestId(testID)).toHaveStyle({ flexDirection: 'row' });
    expect(screen.getByTestId(testIDs.pane1)).toHaveStyle({ width: size });
  });

  it('should disable resizing when allowResize=false', () => {
    const mock = jest.fn();

    render(
      <SplitPanel testID={testID} allowResize={false} onResizeStarted={mock} />
    );

    const resizer = screen.getByTestId(testIDs.resizer);

    fireEvent(resizer, 'onResponderGrant', {});

    expect(mock).not.toHaveBeenCalled();
  });

  it('should respect primary="last"', () => {
    const size = getRandomInteger();

    render(<SplitPanel testID={testID} primary="last" defaultSize={size} />);

    expect(screen.getByTestId(testIDs.pane2)).toHaveStyle({ height: size });
  });

  it('should apply controlled size', () => {
    const size = getRandomInteger();

    render(<SplitPanel testID={testID} size={size} />);

    expect(screen.getByTestId(testIDs.pane1)).toHaveStyle({ height: size });
  });

  it('should apply defaultSize', () => {
    const size = getRandomInteger();

    render(<SplitPanel testID={testID} defaultSize={size} />);

    expect(screen.getByTestId(testIDs.pane1)).toHaveStyle({ height: size });
  });

  it('should apply relative defaultSize', () => {
    const defaultSize = '20%';
    const containerRect = { height: 100 };

    render(<SplitPanel testID={testID} defaultSize={defaultSize} />);

    fireEvent(screen.getByTestId(testID), 'layout', {
      layout: containerRect,
    });
    fireEvent(screen.getByTestId(testIDs.resizer), 'layout', {
      layout: getRandomRectangle(),
    });

    expect(screen.getByTestId(testIDs.pane1)).toHaveStyle({
      height: containerRect.height / 5,
    });
  });

  it('should respect minSize', () => {
    const minSize = getRandomInteger(1, 50);

    render(<SplitPanel testID={testID} minSize={minSize} />);

    const resizer = screen.getByTestId(testIDs.resizer);

    fireEvent(resizer, 'onResponderGrant', { pageY: 100 });
    fireEvent(resizer, 'onResponderMove', { pageY: 0 });

    expect(screen.getByTestId(testIDs.pane1)).toHaveStyle({ height: minSize });
  });

  it('should respect maxSize', () => {
    const maxSize = getRandomInteger(0, 50);

    render(<SplitPanel testID={testID} maxSize={maxSize} />);

    const resizer = screen.getByTestId(testIDs.resizer);

    fireEvent(resizer, 'onResponderGrant', { pageY: 0 });
    fireEvent(resizer, 'onResponderMove', { pageY: 100 });

    expect(screen.getByTestId(testIDs.pane1)).toHaveStyle({ height: maxSize });
  });

  it('should resize between minSize and maxSize', () => {
    const minSize = getRandomInteger(0, 50);
    const size = getRandomInteger(50, 100);
    const maxSize = getRandomInteger(100, 150);

    render(<SplitPanel testID={testID} minSize={minSize} maxSize={maxSize} />);

    const resizer = screen.getByTestId(testIDs.resizer);

    fireEvent(resizer, 'onResponderGrant', { pageY: 0 });
    fireEvent(resizer, 'onResponderMove', { pageY: size });

    expect(screen.getByTestId(testIDs.pane1)).toHaveStyle({ height: size });
  });

  it('should resize in step increments', () => {
    const step = getRandomInteger(0, 50);

    render(<SplitPanel testID={testID} step={step} maxSize={100} />);

    const resizer = screen.getByTestId(testIDs.resizer);

    fireEvent(resizer, 'onResponderGrant', { pageY: 0 });
    fireEvent(resizer, 'onResponderMove', { pageY: step + 1 });

    expect(screen.getByTestId(testIDs.pane1)).toHaveStyle({ height: step });
  });

  it('should apply pane styles', () => {
    const paneStyle = { backgroundColor: getRandomColor() };

    render(<SplitPanel testID={testID} paneStyle={paneStyle} />);

    expect(screen.getByTestId(testIDs.pane1)).toHaveStyle(paneStyle);
    expect(screen.getByTestId(testIDs.pane2)).toHaveStyle(paneStyle);
  });

  it('should apply resizer styles', () => {
    const resizerStyle = { backgroundColor: getRandomColor() };

    render(<SplitPanel testID={testID} resizerStyle={resizerStyle} />);

    expect(screen.getByTestId(testIDs.resizer)).toHaveStyle(resizerStyle);
  });

  it('should render custom resizer component', () => {
    const CustomResizer = () => null;

    render(<SplitPanel testID={testID} resizer={CustomResizer} />);

    expect(screen.UNSAFE_getByType(CustomResizer)).toBeTruthy();
  });

  it('should call onResizeStarted at start resize', () => {
    const onResizeStarted = jest.fn();

    render(<SplitPanel testID={testID} onResizeStarted={onResizeStarted} />);

    const resizer = screen.getByTestId(testIDs.resizer);

    fireEvent(resizer, 'onResponderGrant', {});

    expect(onResizeStarted).toHaveBeenCalled();
  });

  it('should call onChange during resize', () => {
    const onChange = jest.fn();

    render(<SplitPanel testID={testID} onChange={onChange} />);

    const resizer = screen.getByTestId(testIDs.resizer);

    fireEvent(resizer, 'onResponderGrant', { pageY: 0 });
    fireEvent(resizer, 'onResponderMove', { pageY: getRandomInteger() });

    expect(onChange).toHaveBeenCalled();
  });

  it('should call onResizeFinished at end', () => {
    const onResizeFinished = jest.fn();

    render(<SplitPanel testID={testID} onResizeFinished={onResizeFinished} />);
    const resizer = screen.getByTestId(testIDs.resizer);

    fireEvent(resizer, 'onResponderGrant', { pageY: 0 });
    fireEvent(resizer, 'onResponderRelease', { pageY: getRandomInteger() });

    expect(onResizeFinished).toHaveBeenCalled();
  });
});
