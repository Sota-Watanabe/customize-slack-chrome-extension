export const ConfigOptionsKey = ["scrollAutoRead"] as const;

export type ConfigOptions = {
  [key in typeof ConfigOptionsKey[number]]?: boolean;
};
