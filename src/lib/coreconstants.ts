export enum PLATFORM {
  GITHUB = "github",
  YOUTUBE = "youtube",
  X = "x",
  LINKEDIN = "linkedin",
  MEDIUM = "medium",
}

export const PLATFORM_LABELS = {
  [PLATFORM.GITHUB]: "GitHub",
  [PLATFORM.YOUTUBE]: "YouTube",
  [PLATFORM.X]: "X",
  [PLATFORM.LINKEDIN]: "LinkedIn",
  [PLATFORM.MEDIUM]: "Medium",
};

export const PLATFORM_LIST = Object.values(PLATFORM)
  .filter((x) => typeof x === "string")
  .map((platform) => ({
    value: platform,
    label: PLATFORM_LABELS[platform],
  }));

export const PLATFORM_COLORS = {
  [PLATFORM.GITHUB]: { bg: "#30363D", text: "white" },
  [PLATFORM.YOUTUBE]: { bg: "#FF0000", text: "white" },
  [PLATFORM.X]: { bg: "#000000", text: "white" },
  [PLATFORM.LINKEDIN]: { bg: "#0a66c2", text: "white" },
  [PLATFORM.MEDIUM]: { bg: "#000000", text: "white" },
};

export const MAX_LINKS_FALLBACK = 3;
