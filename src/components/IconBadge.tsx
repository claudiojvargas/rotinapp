import { Bed, BriefcaseBusiness, CheckCircle2, ChefHat, Coffee, Gamepad2, Heart, Laptop, ListChecks, Moon, PawPrint, ShowerHead, Sparkles, Sunrise, Utensils } from 'lucide-react';

const icons = { sunrise: Sunrise, paw: PawPrint, coffee: Coffee, list: ListChecks, briefcase: BriefcaseBusiness, laptop: Laptop, 'circle-check': CheckCircle2, sparkles: Sparkles, gamepad: Gamepad2, shower: ShowerHead, 'cooking-pot': ChefHat, utensils: Utensils, heart: Heart, moon: Moon, bed: Bed };

export const iconOptions = [
  ['sunrise', 'Amanhecer'], ['coffee', 'Café'], ['briefcase', 'Trabalho'], ['laptop', 'Computador'],
  ['paw', 'Animais'], ['utensils', 'Refeição'], ['heart', 'Juntos'], ['gamepad', 'Lazer'],
  ['sparkles', 'Livre'], ['moon', 'Noite'], ['bed', 'Dormir']
] as const;

export function IconBadge({ name, active = false }: { name?: string; active?: boolean }) {
  const Icon = icons[name as keyof typeof icons] ?? Sparkles;
  return <span className={`icon-badge ${active ? 'active' : ''}`} aria-hidden="true"><Icon size={19} strokeWidth={1.8} /></span>;
}

