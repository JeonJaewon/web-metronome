import { describe, expect, it } from "vitest";
import {
  buildScale,
  degreeOf,
  noteToPitchClass,
  pitchClass,
} from "./scale";

describe("pitchClass", () => {
  it("0~11 범위는 그대로 둔다", () => {
    expect(pitchClass(0)).toBe(0);
    expect(pitchClass(11)).toBe(11);
  });

  it("12 이상은 12로 모듈로 한다", () => {
    expect(pitchClass(12)).toBe(0);
    expect(pitchClass(13)).toBe(1);
    expect(pitchClass(25)).toBe(1);
  });

  it("음수도 0~11 범위로 정규화한다", () => {
    expect(pitchClass(-1)).toBe(11);
    expect(pitchClass(-12)).toBe(0);
    expect(pitchClass(-13)).toBe(11);
  });
});

describe("buildScale", () => {
  it("C Major 스케일은 C D E F G A B 음을 가진다", () => {
    const scale = buildScale("C", "Major");
    expect(scale.notes).toEqual(["C", "D", "E", "F", "G", "A", "B"]);
  });

  it("A Minor Pentatonic 스케일은 A C D E G 음을 가진다", () => {
    const scale = buildScale("A", "MinorPentatonic");
    expect(scale.notes).toEqual(["A", "C", "D", "E", "G"]);
  });

  it("E Blues 스케일은 정의된 도수를 그대로 노출한다", () => {
    const scale = buildScale("E", "Blues");
    expect(scale.definition.degrees).toEqual([
      "1",
      "b3",
      "4",
      "b5",
      "5",
      "b7",
    ]);
    expect(scale.notes).toEqual(["E", "G", "A", "A#", "B", "D"]);
  });

  it("루트와 타입 메타데이터를 보존한다", () => {
    const scale = buildScale("G", "Major");
    expect(scale.root).toBe("G");
    expect(scale.type).toBe("Major");
  });
});

describe("degreeOf", () => {
  it("스케일에 포함된 음은 도수를 반환한다", () => {
    const cMajor = buildScale("C", "Major");
    expect(degreeOf(cMajor, noteToPitchClass("C"))).toBe("1");
    expect(degreeOf(cMajor, noteToPitchClass("E"))).toBe("3");
    expect(degreeOf(cMajor, noteToPitchClass("B"))).toBe("7");
  });

  it("스케일에 없는 음은 null을 반환한다", () => {
    const cMajor = buildScale("C", "Major");
    expect(degreeOf(cMajor, noteToPitchClass("C#"))).toBeNull();
    expect(degreeOf(cMajor, noteToPitchClass("F#"))).toBeNull();
  });

  it("루트가 C가 아니어도 도수를 정확히 매핑한다", () => {
    const aMinor = buildScale("A", "Minor");
    expect(degreeOf(aMinor, noteToPitchClass("A"))).toBe("1");
    expect(degreeOf(aMinor, noteToPitchClass("C"))).toBe("b3");
    expect(degreeOf(aMinor, noteToPitchClass("G"))).toBe("b7");
    expect(degreeOf(aMinor, noteToPitchClass("C#"))).toBeNull();
  });
});
