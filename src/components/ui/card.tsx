import { HTMLAttributes, forwardRef } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", hover = true, clickable = false, onClick, children, ...props }, ref) => {
    const baseStyles = "boxy-card bg-white/80 dark:bg-gray-800/80 border-2 border-purple-200/50 dark:border-purple-800/50 backdrop-blur-sm";
    const hoverStyles = hover ? "hover:-translate-y-1 hover:shadow-xl hover:scale-105" : "";
    const clickStyles = clickable ? "cursor-pointer" : "";

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${hoverStyles} ${clickStyles} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={`p-6 border-b-2 border-purple-200/50 dark:border-purple-800/50 ${className}`}>{children}</div>;
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardBody({ children, className = "" }: CardBodyProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return <div className={`p-6 border-t-2 border-purple-200/50 dark:border-purple-800/50 ${className}`}>{children}</div>;
}
