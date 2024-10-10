export enum PLATFORM {
  GITHUB = 1,
  YOUTUBE = 2,
  X = 3,
  LINKEDIN = 4,
  TWITTER = 5,
  MEDIUM = 6,
}

export const PLATFORM_LABELS = {
  [PLATFORM.GITHUB]: "GitHub",
  [PLATFORM.YOUTUBE]: "YouTube",
  [PLATFORM.X]: "X",
  [PLATFORM.LINKEDIN]: "LinkedIn",
  [PLATFORM.TWITTER]: "Twitter",
  [PLATFORM.MEDIUM]: "Medium",
};

export const PLATFORM_LIST = Object.values(PLATFORM)
  .filter((x) => typeof x === "number")
  .map((platform) => ({
    value: platform,
    label: PLATFORM_LABELS[platform],
  }));

export const PLATFORM_COLORS = {
  [PLATFORM.GITHUB]: { bg: "#24292e", text: "white" },
  [PLATFORM.YOUTUBE]: { bg: "#FF0000", text: "white" },
  [PLATFORM.X]: { bg: "#000000", text: "white" },
  [PLATFORM.LINKEDIN]: { bg: "#0077B5", text: "white" },
  [PLATFORM.TWITTER]: { bg: "#1DA1F2", text: "white" },
  [PLATFORM.MEDIUM]: { bg: "#000000", text: "white" },
};
