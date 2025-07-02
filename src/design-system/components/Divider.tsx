import React from "react";

interface DividerProps {
    className?: string;
    marginY?: string; // e.g. 'my-2', 'my-4'
}

const Divider: React.FC<DividerProps> = ({ className = "", marginY = "my-2" }) => (
    <hr className={`w-full border-0 h-px bg-gray-light ${marginY} ${className}`} />
);

export default Divider; 