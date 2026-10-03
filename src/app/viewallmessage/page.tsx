import type { Metadata } from "next";
import { MessageList } from "./MessageList";

export const metadata: Metadata = {
  title: "Messages",
  robots: { index: false, follow: false },
};

export default function MessagesPage() {
  return <MessageList />;
}
