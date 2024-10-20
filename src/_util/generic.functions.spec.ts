import { describe, expect, it } from "vitest";
import {
  clamp,
  isShapeOutsideViewport,
  reMap,
} from "~/_util/generic.functions";
import { Simple2D } from "~/_util/types";

describe("Generic Functions", () => {
  describe("clamp", () => {
    it("return clamped value", () => {
      expect(clamp(0.2, 0.3, 0)).toBe(0.2);
    });
  });

  describe("reMap - maps a value from one range to another", () => {
    it("should remap to a new range - simple min", () => {
      expect(reMap(0, 100, 50, 80, 0)).toBe(50);
    });
    it("should remap to a new range - simple max", () => {
      expect(reMap(0, 100, 50, 80, 100)).toBe(80);
    });
    it("should remap to a new range - simple middle ", () => {
      expect(reMap(0, 100, 50, 100, 50)).toBe(75);
    });
    it("should remap to a new range - out of range - beyond", () => {
      expect(reMap(0, 100, 50, 100, 110)).toBe(100);
    });
    it("should remap to a new range - out of range - below", () => {
      expect(reMap(0, 100, 50, 100, -20)).toBe(50);
    });
    it("should handle reversed ranges - min", () => {
      expect(reMap(0, 100, 100, 50, 0)).toBe(100);
    });
    it("should handle reversed ranges - max", () => {
      expect(reMap(0, 100, 100, 50, 100)).toBe(50);
    });
    it("should handle reversed ranges - mid", () => {
      expect(reMap(0, 100, 1000, 0, 75)).toBe(250);
    });

    it("should handle special case", () => {
      expect(reMap(0.2, 0.3, 0, 1, 0)).toBe(0);
      expect(reMap(0.2, 0.3, 0, 1, 0.2)).toBe(0);
      expect(reMap(0.2, 0.3, 0, 1, 0.25)).toBe(0.5);
      expect(reMap(0.2, 0.3, 0, 1, 0.3)).toBe(1);
    });
  });

  describe("isShapeOutsideRect - check if a polygon is inside a rect", () => {
    const rectW = 100;
    const rectH = 100;

    it("should work for all points inside", () => {
      const shapeInside: Simple2D[] = [
        { x: 20, y: 20 },
        { x: 80, y: 20 },
        { x: 80, y: 80 },
        { x: 20, y: 80 },
      ];
      const res = isShapeOutsideViewport(rectW, rectH, shapeInside);
      expect(res).toBe(false);
    });

    it("should work for some points inside", () => {
      const shapeInside: Simple2D[] = [
        { x: 20, y: 20 },
        { x: 180, y: 20 },
        { x: 180, y: 80 },
        { x: 20, y: 80 },
      ];
      const res = isShapeOutsideViewport(rectW, rectH, shapeInside);
      expect(res).toBe(false);
    });

    it("should work shape completely outside", () => {
      const shapeInside: Simple2D[] = [
        { x: 120, y: 120 },
        { x: 180, y: 180 },
        { x: 180, y: 180 },
        { x: 120, y: 120 },
      ];
      const res = isShapeOutsideViewport(rectW, rectH, shapeInside);
      expect(res).toBe(true);
    });

    it("should work for no point inside but shape is crossing", () => {
      const shapeInside: Simple2D[] = [
        { x: 50, y: -50 },
        { x: 150, y: 50 },
        { x: 250, y: -100 },
        { x: 50, y: -100 },
      ];
      const res = isShapeOutsideViewport(rectW, rectH, shapeInside);
      expect(res).toBe(false);
    });
  });
});
