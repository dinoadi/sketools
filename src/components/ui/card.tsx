import type { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = "", hover = true, clickable = false, onClick }: CardProps) {
  const baseStyles = "boxy-card bg-surface border border-border";
  const hoverStyles = hover ? "hover:-translate-y-1 hover:shadow-lg" : "";
  const clickableStyles = clickable ? "cursor-pointer" : "";
  
  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${clickableStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={`p-6 border-b border-border ${className}`}>{children}</div>;
}

export interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className = "" }: CardBodyProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return <div className={`p-6 border-t border-border ${className}`}>{children}</div>;
}
