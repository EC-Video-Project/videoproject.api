import { GetParameterCommand } from "@aws-sdk/client-ssm";
import { createSsmClient } from "src/awsClients/ssm";

// this might be inefficient if we are getting lots of parameters at once (creating lots of one-off clients)

export const getSsmParameter = async (
  Name: string,
  WithDecryption?: boolean
): Promise<string> => {
  const client = createSsmClient();
  const command = new GetParameterCommand({ Name, WithDecryption });
  const response = await client.send(command);
  return response.Parameter.Value ?? "";
};
