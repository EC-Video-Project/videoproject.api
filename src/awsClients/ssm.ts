import { SSMClient } from "@aws-sdk/client-ssm";

export const createSsmClient = (): SSMClient => {
  return new SSMClient({});
};
