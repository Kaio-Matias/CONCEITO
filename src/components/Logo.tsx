export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="var(--blue)" />
      <path d="M43 23a14 14 0 1 0 0 18" fill="none" stroke="#fff" strokeWidth="6.5" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#topo" className="logo" aria-label="Conceito Business — início">
      <img src={light ? '/logos/logo-01.png' : '/logos/logo-02.png'} alt="Conceito Business" height={40} />
    </a>
  )
}
