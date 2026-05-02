import { describe, expect, it } from "vitest";
import { tempoName } from "./tempoName";

describe("tempoName", () => {
  it("최저 임계값(40)에서 Grave를 반환한다", () => {
    expect(tempoName(40)).toBe("Grave");
  });

  it("구간 경계 직전에는 이전 라벨을 유지한다", () => {
    expect(tempoName(49)).toBe("Grave");
    expect(tempoName(59)).toBe("Largo");
    expect(tempoName(71)).toBe("Lento");
  });

  it("구간 경계값에서 새 라벨로 전환된다", () => {
    expect(tempoName(50)).toBe("Largo");
    expect(tempoName(60)).toBe("Lento");
    expect(tempoName(72)).toBe("Adagio");
    expect(tempoName(86)).toBe("Andante");
    expect(tempoName(108)).toBe("Moderato");
    expect(tempoName(120)).toBe("Allegro");
    expect(tempoName(156)).toBe("Vivace");
    expect(tempoName(176)).toBe("Presto");
    expect(tempoName(200)).toBe("Prestissimo");
  });

  it("최고 라벨 이상에서는 Prestissimo를 유지한다", () => {
    expect(tempoName(240)).toBe("Prestissimo");
    expect(tempoName(9999)).toBe("Prestissimo");
  });
});
