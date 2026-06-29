import type { IconType } from "react-icons";
import { SiGithub, SiX, SiZenn, SiKaggle } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { FiMail, FiSun, FiMoon, FiExternalLink, FiChevronDown } from "react-icons/fi";
import type { IconKey } from "@/lib/data";

// 公式ブランドロゴ（simple-icons / Font Awesome）
const brandMap: Record<IconKey, IconType> = {
  github: SiGithub,
  x: SiX,
  zenn: SiZenn,
  kaggle: SiKaggle,
  linkedin: FaLinkedinIn,
  mail: FiMail,
};

export function Icon({
  name,
  size = 20,
  className,
}: {
  name: IconKey;
  size?: number;
  className?: string;
}) {
  const C = brandMap[name];
  return <C size={size} className={className} />;
}

export const SunIcon = FiSun;
export const MoonIcon = FiMoon;
export const ExternalIcon = FiExternalLink;
export const ChevronIcon = FiChevronDown;
