import { createPortal } from "react-dom";
import { CardWrapper } from "@components/layout/CardWrapper";
import { useState, useRef } from "react";

export interface TypeTooltip {
  title: string;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  list?: string[];
  keyboardShortcut?: string;
}

interface TypeProps extends TypeTooltip {
  children: React.ReactNode;
}

export default function Tooltip({ children }: TypeProps) {
  const [open, setOpen] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  return (
    <>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
      {createPortal(
        <>
          {open && (
            <CardWrapper
              tag="div"
              gradientStyle="square"
              variant="cream"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              A
            </CardWrapper>
          )}
        </>,
        document.body,
      )}
    </>
  );
}
