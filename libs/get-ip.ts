import { headers } from "next/headers";

export function getIp() {
  const forwardedFor = headers().get("x-forwareded-for");
  const realIP = headers().get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIP) {
    return realIP.trim();
  }

  return null;
}
