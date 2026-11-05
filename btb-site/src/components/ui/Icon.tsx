import {
  ArrowLeftRight, Award, BookOpen, BrainCircuit, Briefcase, Building2, ChartLine, ClipboardCheck, Compass, Cpu, DoorOpen,
  FileText, Flag, Gavel, Globe, GraduationCap, Handshake, HeartHandshake, Landmark, Leaf, Lightbulb, Link2, Map, MapPin,
  Megaphone, MessagesSquare, Network, Radar, Rocket, Route, Scale, Search, Share2, ShieldCheck, Sparkles, Sprout,
  TrendingUp, Users, Wrench, type LucideIcon,
} from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  ArrowLeftRight, Award, BookOpen, BrainCircuit, Briefcase, Building2, ChartLine, ClipboardCheck, Compass, Cpu, DoorOpen,
  FileText, Flag, Gavel, Globe, GraduationCap, Handshake, HeartHandshake, Landmark, Leaf, Lightbulb, Link2, Map, MapPin,
  Megaphone, MessagesSquare, Network, Radar, Rocket, Route, Scale, Search, Share2, ShieldCheck, Sparkles, Sprout,
  TrendingUp, Users, Wrench,
}

export function Icon({ name, className, strokeWidth = 1.5 }: { name: string; className?: string; strokeWidth?: number }) {
  const C = icons[name] ?? Sparkles
  return <C className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}
