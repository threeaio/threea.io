import { createStore } from "solid-js/store";

export interface LandingPage {
  totalContentHeight: number;
  totalWidth: number;
  screenHeight: number;
  progress: number;
  currentSection: number;
  velocity: number;
  scrollDirection: 1 | -1;
}

const initialState: LandingPage = {
  totalContentHeight: 0,
  screenHeight: 0,
  totalWidth: 0,
  progress: 0,
  currentSection: 0,
  velocity: 0,
  scrollDirection: 1,
};

const setupLandingPage = (initialState: LandingPage) => {
  const [landingPageState, setLandingPageState] =
    createStore<LandingPage>(initialState);

  const setTotalContentHeight = (height: number) => {
    setLandingPageState("totalContentHeight", height);
  };

  const setScreenHeight = (height: number) => {
    setLandingPageState("screenHeight", height);
  };

  const setTotalWidth = (width: number) => {
    setLandingPageState("totalWidth", width);
  };

  const setProgress = (scollPos: number) => {
    setLandingPageState("progress", scollPos);
  };

  const setScrollDirection = (dir: -1 | 1) => {
    setLandingPageState("scrollDirection", dir);
  };

  const setVelocity = (scollSpeed: number) => {
    setLandingPageState("velocity", scollSpeed);
  };

  return [
    {
      landingPageState,
    },
    {
      setTotalContentHeight,
      setTotalWidth,
      setScreenHeight,
      setProgress,
      setVelocity,
      setScrollDirection,
    },
  ] as const;
};

type LandingPageStateType = ReturnType<typeof setupLandingPage>;
export const fromLandingPageState: LandingPageStateType =
  setupLandingPage(initialState);
