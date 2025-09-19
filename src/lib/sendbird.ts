"use client";
import SendbirdChat, { GroupChannelModule, type UserUpdateParams } from "@sendbird/chat";
import type { GroupChannel } from "@sendbird/chat/groupChannel";

let sbPromise: Promise<SendbirdChat> | null = null;

export async function getSendbird(userId: string, nickname?: string) {
  if (!sbPromise) {
    const appId = process.env.NEXT_PUBLIC_SENDBIRD_APP_ID;
    if (!appId) throw new Error("Missing NEXT_PUBLIC_SENDBIRD_APP_ID");
    sbPromise = SendbirdChat.init({
      appId,
      modules: [new GroupChannelModule()],
    });
  }
  const sb = await sbPromise;
  if (!sb.currentUser || sb.currentUser.userId !== userId) {
    await sb.connect(userId);
    if (nickname && sb.currentUser?.nickname !== nickname) {
      const params: UserUpdateParams = { nickname };
      await sb.updateCurrentUserInfo(params);
    }
  }
  return sb;
}

export async function getGlobalGroupChannel(): Promise<GroupChannel> {
  const url = process.env.NEXT_PUBLIC_SENDBIRD_GROUP_CHANNEL_URL;
  if (!url) throw new Error("Missing NEXT_PUBLIC_SENDBIRD_GROUP_CHANNEL_URL");
  const sb = await sbPromise;
  if (!sb) throw new Error("Sendbird not initialized");
  const gc = await sb.groupChannel.getChannel(url);
  return gc;
}
