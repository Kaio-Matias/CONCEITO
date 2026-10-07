import {
  Clock, EyeOff, Lock, FileText, BarChart3, Wallet, Users, Landmark, HandCoins, ShieldCheck,
  BadgeCheck, Smartphone, Monitor, Workflow, Check, Minus, ArrowRight, ArrowUpRight, Plus,
  MessageCircle, Mail, Phone, Instagram, Menu, X, LogIn, Star, Quote, type LucideProps,
} from 'lucide-react'

const MAP = {
  clock: Clock, 'eye-off': EyeOff, lock: Lock, 'file-text': FileText, 'bar-chart': BarChart3,
  wallet: Wallet, users: Users, landmark: Landmark, 'hand-coins': HandCoins,
  'shield-check': ShieldCheck, badge: BadgeCheck, smartphone: Smartphone, monitor: Monitor,
  workflow: Workflow, check: Check, minus: Minus, arrow: ArrowRight, 'arrow-up-right': ArrowUpRight,
  plus: Plus, whatsapp: MessageCircle, mail: Mail, phone: Phone, instagram: Instagram,
  menu: Menu, close: X, login: LogIn, star: Star, quote: Quote,
}

export type IconName = keyof typeof MAP

export function Icon({ name, ...props }: { name: IconName | string } & LucideProps) {
  const C = MAP[name as IconName] ?? Check
  return <C strokeWidth={1.75} aria-hidden="true" {...props} />
}
