export interface CustomUser {
  name: string;
  email: string;
}

export interface Product {
  id: string;
  meal: string;
  price: number;
  img: string;
  instructions?: string;
  category?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface UserState {
  user: CustomUser | null;
}

export interface MenuPageProps {
  user: CustomUser | null;
}

export type ThemeMode = 'light' | 'dark';

export interface AppTheme {
  text: string;
  accent: string;
  muted: string;
  border: string;
  accentHover?: string;
}

export interface ThemeContextProps {
  theme: ThemeMode;
  toggleTheme: () => void;
}

export interface HeaderProps {
  cartCount: number;
  user: CustomUser | null;
}

export interface CartProps {
  user: CustomUser | null;
}

export interface TooltipProps {
  text: string;
  children: React.ReactNode;
  component?: React.ElementType;
}

export type CardMode = 'menu' | 'order';

export interface CardProps {
  product: Product | CartItem;
  mode: CardMode;
  user?: CustomUser | null;
}

export interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface HomeProps {
  user: CustomUser | null;
}
