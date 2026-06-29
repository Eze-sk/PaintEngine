import { CardWrapper } from "@components/layout/CardWrapper";

interface TypeProps {
  className?: string;
}

export default function Footer({ className }: TypeProps) {
  return (
    <CardWrapper
      shadingStyle="linear"
      variant="cream"
      tag="footer"
      className={`w-full py-1 flex items-center ${className}`}
    >
      <span className="text-sm px-3 border-shaded-left">v1.2</span>
      <span className="text-sm px-3">second data</span>
    </CardWrapper>
  );
}
