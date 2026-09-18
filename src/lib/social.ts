/**
 * Social Link Types
 * Discriminated union for type-safe social link handling.
 * - External links MUST have href
 * - Modal links (QQ, Email) have modal property instead of href
 */

type SocialLinkBase = {
  label: string;
  icon?: string;
  imgSrc?: string;
};

type QqLink = SocialLinkBase & {
  modal: "qq";
  href?: never;
};

type EmailLink = SocialLinkBase & {
  modal: "email";
  href?: never;
};

type ExternalLink = SocialLinkBase & {
  href: string;
  modal?: never;
};

export type SocialLink = QqLink | EmailLink | ExternalLink;

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "BiliBili", href: "https://space.bilibili.com/1157704322", icon: "simple-icons:bilibili" },
  { label: "Bluesky", href: "https://bsky.app/profile/mknn.jp", icon: "simple-icons:bluesky" },
  {
    label: "Discord",
    href: "https://discord.com/channels/@me/257326164996128770",
    icon: "simple-icons:discord",
  },
  { label: "Email", icon: "lucide:mail", modal: "email" },
  { label: "GitHub", href: "https://github.com/mknnjp", icon: "simple-icons:github" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mknn.jp/",
    icon: "simple-icons:instagram",
  },
  { label: "QQ", icon: "simple-icons:tencentqq", modal: "qq" },
  {
    label: "Spotify",
    href: "https://open.spotify.com/user/sheeptech",
    icon: "simple-icons:spotify",
  },
  {
    label: "Steam",
    href: "https://steamcommunity.com/id/mknnjp/",
    icon: "simple-icons:steam",
  },
  { label: "Telegram", href: "https://t.me/mknnjp", icon: "simple-icons:telegram" },
  {
    label: "Threads",
    href: "https://www.threads.net/@mknn.jp",
    icon: "simple-icons:threads",
  },
  {
    label: "VRChat",
    href: "https://vrchat.com/home/user/usr_d23319bc-086d-45e8-83ff-fb9ecb026d1f",
    imgSrc: "/VRC.svg",
  },
  { label: "X", href: "https://x.com/mknnjp", icon: "simple-icons:x" },
];
