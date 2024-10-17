import { describe, expect, it } from "vitest";
import { reMap } from "~/_util/generic.functions";

describe("Generic Functions", () => {
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
  });
});
