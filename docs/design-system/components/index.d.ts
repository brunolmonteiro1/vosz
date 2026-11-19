import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Aparência. `primary` roxo cheio; `secondary` contorno roxo; `accent` magenta com texto roxo-escuro. Padrão: `primary`. */
  variant?: 'primary' | 'secondary' | 'accent';
  /** Tamanho. Padrão: `md` (44px de altura); `lg` tem 56px. */
  size?: 'md' | 'lg';
  /** Se informado, o botão é renderizado como link `<a>`. */
  href?: string;
  /** Rótulo do botão: um verbo de ação curto. */
  children: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;

export interface CardProps {
  /** Aparência. `default` branco com borda; `tint` fundo roxo-claro; `destaque` fundo roxo com texto branco. */
  variant?: 'default' | 'tint' | 'destaque';
  /** Linha curta acima do título (data, categoria). */
  eyebrow?: React.ReactNode;
  /** Título do cartão. */
  title?: React.ReactNode;
  /** Texto do cartão. */
  children?: React.ReactNode;
  /** Ações ou etiquetas no rodapé (Button, Tag). */
  footer?: React.ReactNode;
  className?: string;
}
export declare function Card(props: CardProps): JSX.Element;

export interface TagProps {
  /** Aparência. `roxo` suave (padrão); `magenta` suave; `solido` roxo cheio com texto branco. */
  variant?: 'roxo' | 'magenta' | 'solido';
  /** Rótulo: uma ou duas palavras. */
  children: React.ReactNode;
  className?: string;
}
export declare function Tag(props: TagProps): JSX.Element;
