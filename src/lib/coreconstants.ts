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
