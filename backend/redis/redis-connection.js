import { createClient } from "redis";

export const client = createClient({
  url: process.env.REDIS_URL,
});

if (!client.isOpen) {
  await client.connect();
  console.log("Connected to Redis");
}
