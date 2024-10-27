export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type Simple2DTuple = [number, number];
export type Simple2D = { x: number; y: number };

export type Simple2DAndTuple = Simple2D & { tuple: Simple2DTuple };
export type Simple2DLine = [Simple2D, Simple2D];
export type SimpleCell = {
  row: number;
  col: number;
  points: [Simple2D, Simple2D, Simple2D, Simple2D];
};

export type ColorArray = [number, number, number, number];

export type AnimationTrigger =
  | PointerEvent
  | MouseEvent
  | KeyboardEvent
  | number
  | undefined;
