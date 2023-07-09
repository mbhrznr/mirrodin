const onchange = jest.fn();
const addEventListener = jest.fn();
const removeEventListener = jest.fn();

export default function mockMatchMedia(
  matches: boolean,
  overrides?: Partial<Window["matchMedia"]>
) {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange,
    addEventListener,
    removeEventListener,
    ...overrides,
  }));
}
