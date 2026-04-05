export interface AppConfig {
  modelName: string;
  endpointUrl: string;
}

export const config: AppConfig = {
  modelName: process.env.MODEL_NAME ?? "unknown",
  endpointUrl: process.env.ENDPOINT_URL ?? "unknown",
};
