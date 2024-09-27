import "server-only" // クライアント側での利用を防ぎます。

import { db } from "@/server/db";

export const getUsersDTO = async () => {
  // 必要なフィールドのみ取得します。
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    }
  });

  return users;
}