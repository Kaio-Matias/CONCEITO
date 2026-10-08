import {
  Clock, EyeOff, Lock, FileText, BarChart3, Wallet, Users, Landmark, HandCoins, ShieldCheck,
  BadgeCheck, Smartphone, Monitor, Workflow, Check, Minus, ArrowRight, ArrowUpRight, Plus,
  Mail, Phone, Instagram, Menu, X, LogIn, Star, Quote, type LucideProps,
} from 'lucide-react'

/** Logo do WhatsApp (marca), no mesmo formato dos ícones lucide. */
function WhatsApp({ size = 24, ...props }: LucideProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" {...(props as object)}>
      <path d="M16.04 3C9.4 3 4 8.38 4 15.01c0 2.12.56 4.19 1.62 6.01L4 29l8.2-1.58a12.03 12.03 0 0 0 3.84.62C22.68 28.04 28 22.64 28 16.01 28 9.37 22.68 3 16.04 3Zm0 22.04c-1.2 0-2.38-.2-3.5-.6l-.5-.18-4.86.94.97-4.73-.2-.5a9.96 9.96 0 0 1-1.56-5.35c0-5.5 4.5-9.97 10.05-9.97 5.53 0 9.98 4.47 9.98 9.97 0 5.5-4.45 10.42-9.98 10.42Zm5.5-7.4c-.3-.15-1.78-.88-2.06-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.94 1.18-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.6.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.48.7.3 1.26.48 1.7.62.72.23 1.37.2 1.88.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  )
}

const MAP = {
  clock: Clock, 'eye-off': EyeOff, lock: Lock, 'file-text': FileText, 'bar-chart': BarChart3,
  wallet: Wallet, users: Users, landmark: Landmark, 'hand-coins': HandCoins,
  'shield-check': ShieldCheck, badge: BadgeCheck, smartphone: Smartphone, monitor: Monitor,
  workflow: Workflow, check: Check, minus: Minus, arrow: ArrowRight, 'arrow-up-right': ArrowUpRight,
  plus: Plus, whatsapp: WhatsApp, mail: Mail, phone: Phone, instagram: Instagram,
  menu: Menu, close: X, login: LogIn, star: Star, quote: Quote,
}

export type IconName = keyof typeof MAP

export function Icon({ name, ...props }: { name: IconName | string } & LucideProps) {
  const C = MAP[name as IconName] ?? Check
  return <C aria-hidden="true" strokeWidth={1.75} {...props} />
}
