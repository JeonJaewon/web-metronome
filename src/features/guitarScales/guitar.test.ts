import { describe, expect, it } from "vitest";
import { FRET_COUNT, POSITION_WIDTH, clampFretPosition } from "./guitar";

const MAX_POSITION = FRET_COUNT - POSITION_WIDTH;

describe("clampFretPosition", () => {
  it("0 미만이면 0으로 보정한다", () => {
    expect(clampFretPosition(-1)).toBe(0);
    expect(clampFretPosition(-100)).toBe(0);
  });

  it("최댓값(FRET_COUNT - POSITION_WIDTH) 초과면 최댓값으로 보정한다", () => {
    expect(clampFretPosition(MAX_POSITION + 1)).toBe(MAX_POSITION);
    expect(clampFretPosition(999)).toBe(MAX_POSITION);
  });

  it("정수가 아닌 값은 반올림 후 보정한다", () => {
    expect(clampFretPosition(3.4)).toBe(3);
    expect(clampFretPosition(3.6)).toBe(4);
  });

  it("범위 내 정수는 그대로 반환한다", () => {
    expect(clampFretPosition(0)).toBe(0);
    expect(clampFretPosition(MAX_POSITION)).toBe(MAX_POSITION);
    expect(clampFretPosition(5)).toBe(5);
  });
});
