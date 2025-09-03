import React from "react";
import type { LucideIcon } from "lucide-react";
import {
  Search,
  Info,
  Shield,
  IdCard,
  FileText,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Phone,
  MapPin,
  Building2,
  User,
  Briefcase,
  Calendar,
  ClipboardList,
  PenLine,
  Folder,
  Hourglass,
  Laptop,
  Receipt,
  TrendingUp,
  Cake,
  Stethoscope,
  Globe,
  Mail,
  Euro,
  Camera,
  DoorOpen,
  Banknote,
  Wrench,
  CreditCard,
  RefreshCcw,
  BookOpen,
  Timer,
  Send
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  search: Search,
  info: Info,
  shield: Shield,
  "id-card": IdCard,
  document: FileText,
  help: HelpCircle,
  alert: AlertTriangle,
  check: CheckCircle2,
  phone: Phone,
  pin: MapPin,
  building: Building2,
  user: User,
  work: Briefcase,
  send: Send,
  calendar: Calendar,
  clipboard: ClipboardList,
  pen: PenLine,
  folder: Folder,
  hourglass: Hourglass,
  laptop: Laptop,
  receipt: Receipt,
  "trending-up": TrendingUp,
  cake: Cake,
  stethoscope: Stethoscope,
  globe: Globe,
  mail: Mail,
  euro: Euro,
  camera: Camera,
  "door-open": DoorOpen,
  banknote: Banknote,
  wrench: Wrench,
  "credit-card": CreditCard,
  repeat: RefreshCcw,
  book: BookOpen,
  timer: Timer,
};

type IconProps = {
  name?: string;
  className?: string;
  /** Accessible label for screen readers */
  label?: string;
};

export function Icon({ name, className, label }: IconProps) {
  const Cmp = (name && ICONS[name]) || ICONS.info; // fallback to info

  return (
    <Cmp
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    >
      {label ? <title>{label}</title> : null}
    </Cmp>
  );
}