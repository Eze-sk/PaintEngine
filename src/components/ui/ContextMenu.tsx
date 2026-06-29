import ConditionalWrapper from "@components/ConditionalWrapper";
import { CardWrapper } from "@components/layout/CardWrapper";
import type React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Checkbox from "./Checkbox";
import type { TypeTooltip } from "./Tooltip";
import Tooltip from "./Tooltip";

export type TypeListMenu = {
	label: string;
	shortcut?: string;
	icon?: React.ReactNode;
	hasCheckbox?: boolean;
	clickEvent?: () => void;
	tooltip?: TypeTooltip;
}[];

interface TypeProps {
	className?: string;
	children?: React.ReactNode;
	activationEvent: "leftClick" | "rightClick";
	position: "respectFather" | "respectMouse";
	list?: TypeListMenu;
}

export default function ContextMenu({
	className,
	activationEvent,
	position,
	list,
	children,
}: TypeProps) {
	const [open, setOpen] = useState(false);
	const [rawCoords, setRawCoords] = useState({ top: 0, left: 0 });
	const [coords, setCoords] = useState({ top: 0, left: 0 });

	const triggerRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLUListElement>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleTrigger = (e: React.MouseEvent) => {
		if (activationEvent === "leftClick" && e.type !== "click") return;
		if (activationEvent === "rightClick" && e.type !== "contextmenu") return;

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}

		if (activationEvent === "rightClick") {
			e.preventDefault();
		}

		if (position === "respectMouse") {
			setCoords({ top: e.clientY, left: e.clientX });
		} else if (position === "respectFather" && triggerRef.current) {
			const rect = triggerRef.current.getBoundingClientRect();
			setRawCoords({
				top: rect.bottom + 4,
				left: rect.left,
			});
		}

		setOpen(true);
	};

	const handleMouseEnter = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	const handleMouseLeave = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			setOpen(false);
		}, 500);
	};

	useLayoutEffect(() => {
		if (!open || !menuRef.current) return;

		const menuRect = menuRef.current.getBoundingClientRect();
		const menuWidth = menuRect.width;
		const menuHeight = menuRect.height;

		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		let finalLeft = rawCoords.left;
		let finalTop = rawCoords.top;

		const triggerRect = triggerRef.current?.getBoundingClientRect();

		if (rawCoords.left + menuWidth > windowWidth) {
			if (position === "respectMouse") {
				finalLeft = windowWidth - menuWidth - 10;
			} else {
				finalLeft = triggerRect
					? triggerRect.right - menuWidth
					: windowWidth - menuWidth - 10;
			}
		}

		if (rawCoords.top + menuHeight > windowHeight) {
			if (position === "respectMouse") {
				finalTop = windowHeight - menuHeight - 10;
			} else {
				finalTop = triggerRect
					? triggerRect.top - menuHeight - 4
					: windowHeight - menuHeight - 10;
			}
		}

		finalLeft = Math.max(10, finalLeft);
		finalTop = Math.max(10, finalTop);

		setCoords({ top: finalTop, left: finalLeft });
	}, [open, rawCoords, position]);

	useEffect(() => {
		const closeMenu = (e: MouseEvent) => {
			const target = e.target as Node;

			if (
				triggerRef.current?.contains(target) ||
				menuRef.current?.contains(target)
			) {
				return;
			}

			setOpen(false);
		};

		document.addEventListener("click", closeMenu);
		document.addEventListener("contextmenu", closeMenu);

		return () => {
			document.removeEventListener("click", closeMenu);
			document.removeEventListener("contextmenu", closeMenu);
		};
	}, []);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	const menuStyle: React.CSSProperties = {
		position: "fixed",
		top: `${coords.top}px`,
		left: `${coords.left}px`,
		zIndex: 9999,
		visibility: coords.top === 0 ? "hidden" : "visible",
	};

	return (
		<>
			<button
				type="button"
				ref={triggerRef}
				className={className}
				onClick={activationEvent === "leftClick" ? handleTrigger : undefined}
				onContextMenu={
					activationEvent === "rightClick" ? handleTrigger : undefined
				}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				{children}
			</button>
			{createPortal(
				open && (
					<CardWrapper
						ref={menuRef}
						style={menuStyle}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						shadingStyle="square"
						tag="ul"
						className="flex gap-1 p-2 rounded-sm"
					>
						<div className="w-8 border-shaded-left" />
						<div className="flex flex-col gap-2">
							{list?.map((it) => (
								<ConditionalWrapper
									key={it.label}
									condition={it.tooltip !== undefined}
									wrapper={(children) => {
										if (!it.tooltip) return <>{children}</>;

										return (
											<Tooltip
												title={it.tooltip.title}
												subtitle={it.tooltip.subtitle}
											>
												{children}
											</Tooltip>
										);
									}}
								>
									<li className="relative flex items-center hover-card z-3">
										{it.hasCheckbox && (
											<Checkbox label={it.label} className="-left-8.5" />
										)}
										<button
											type="button"
											onClick={it.clickEvent}
											className="min-w-50 flex justify-between items-center cursor-pointer"
										>
											<div>
												{it.icon}
												{it.label}
											</div>
											<span>{it.shortcut}</span>
										</button>
									</li>
								</ConditionalWrapper>
							))}
						</div>
					</CardWrapper>
				),
				document.body,
			)}
		</>
	);
}
