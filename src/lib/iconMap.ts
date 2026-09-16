import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  CircleCheck,
  CloudRainWind,
  Droplets,
  ExternalLink,
  Fan,
  Globe,
  Hammer,
  HardHat,
  Mail,
  MapPin,
  Menu,
  MoveHorizontal,
  PanelTop,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TriangleAlert,
  Users,
  Wind,
  Wrench,
  X,
} from 'lucide-react'

/**
 * Maps icon keys stored in company.config.json to Lucide components.
 * Add new icons here when a client config introduces a new key.
 */
const icons: Record<string, LucideIcon> = {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  CircleCheck,
  CloudRainWind,
  Droplets,
  ExternalLink,
  Fan,
  Globe,
  Hammer,
  HardHat,
  Mail,
  MapPin,
  Menu,
  MoveHorizontal,
  PanelTop,
  PhoneCall,
  Roof: PanelTop,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TriangleAlert,
  Users,
  Wind,
  Wrench,
  X,
}

export function getIcon(name?: string | null): LucideIcon {
  if (!name) return Wrench
  return icons[name] ?? Wrench
}