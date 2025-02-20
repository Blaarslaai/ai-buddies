import { ReflowAuth } from "@reflowhq/auth-next";

export default function getAuth(): ReflowAuth {
  return new ReflowAuth({
    projectID: 213565547,
    secret: "69d7a60b2320c1f17a0063355cf3bccb",
    testMode: true,
  });
}
