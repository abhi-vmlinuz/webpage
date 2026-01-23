import type React from "react"
import "./shiny-button.css"

interface ShinyButtonProps {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    href?: string
}

export function ShinyButton({ children, onClick, className = "", href }: ShinyButtonProps) {
    if (href) {
        return (
            <a href={href} className={`shiny-cta ${className}`}>
                <span>{children}</span>
            </a>
        );
    }

    return (
        <button className={`shiny-cta ${className}`} onClick={onClick}>
            <span>{children}</span>
        </button>
    );
}
