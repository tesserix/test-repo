export interface NavItem {
  label: string
  href: string
  icon?: string
}

export interface FooterSection {
  title: string
  links: NavItem[]
}

export interface SiteConfig {
  name: string
  description: string
  navigation: NavItem[]
  footer: FooterSection[]
}