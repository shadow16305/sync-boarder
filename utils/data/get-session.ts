"use server";

import { auth } from "../../lib/auth";

export default async function getSession() {
  return await auth();
}
