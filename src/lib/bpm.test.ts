import { describe, expect, it } from "vitest";
import { MAX_BPM, MIN_BPM, clampBpm, secondsPerBeat } from "./bpm";

describe("clampBpm", () => {
  it("정수가 아닌 값은 반올림한다", () => {
    expect(clampBpm(120.4)).toBe(120);
    expect(clampBpm(120.6)).toBe(121);
  });

  it("최솟값 미만이면 최솟값으로 보정한다", () => {
    expect(clampBpm(MIN_BPM - 10)).toBe(MIN_BPM);
  });

  it("최댓값 초과면 최댓값으로 보정한다", () => {
    expect(clampBpm(MAX_BPM + 10)).toBe(MAX_BPM);
  });
});

describe("secondsPerBeat", () => {
  it("60 / bpm 을 반환한다", () => {
    expect(secondsPerBeat(60)).toBe(1);
    expect(secondsPerBeat(120)).toBe(0.5);
  });
});
