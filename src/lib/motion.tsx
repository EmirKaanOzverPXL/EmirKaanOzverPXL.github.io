import React, { useState, useEffect, CSSProperties } from "react";
import { cn } from "./utils";

// Define the MotionProps type (adjust as needed)
interface MotionProps {
	children?: React.ReactNode;
	initial?: {
		opacity?: number;
		x?: number;
		y?: number;
		scale?: number;
	};
	animate?: {
		opacity?: number;
		x?: number;
		y?: number;
		scale?: number;
	};
	transition?: {
		duration?: number;
		delay?: number;
		type?: "spring" | "tween"; // Example types
	};
	whileHover?: {
		scale?: number;
		opacity?: number;
		// Add other hover properties if needed
	};
	className?: string;
	// Allow any other standard HTML attributes
	[key: string]: unknown;
}

// Reusable hook for motion logic
const useMotion = ({
	initial,
	animate,
	transition,
	whileHover,
}: MotionProps) => {
	const [isAnimated, setIsAnimated] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	// Initial animation on mount
	useEffect(() => {
		// Use a minimal timeout to allow the initial state to render first
		const timer = setTimeout(() => {
			setIsAnimated(true);
		}, 10); // Small delay ensures transition occurs

		return () => clearTimeout(timer);
	}, []);

	// Generate styles based on animation states
	const getStyles = (): CSSProperties => {
		const styles: CSSProperties = {};
		let transform = ""; // Accumulate transforms

		// Determine base state (initial) and target state (animate)
		const baseState = initial;
		const targetState = animate;

		// Apply initial styles if not animated yet
		if (baseState && !isAnimated) {
			if (baseState.opacity !== undefined) styles.opacity = baseState.opacity;
			if (baseState.x !== undefined)
				transform += ` translateX(${baseState.x}px)`;
			if (baseState.y !== undefined)
				transform += ` translateY(${baseState.y}px)`;
			if (baseState.scale !== undefined)
				transform += ` scale(${baseState.scale})`;
		}

		// Apply animate styles if animated
		if (targetState && isAnimated) {
			if (targetState.opacity !== undefined)
				styles.opacity = targetState.opacity;
			if (targetState.x !== undefined)
				transform += ` translateX(${targetState.x}px)`;
			if (targetState.y !== undefined)
				transform += ` translateY(${targetState.y}px)`;
			if (targetState.scale !== undefined)
				transform += ` scale(${targetState.scale})`;
		}

		// Apply hover-specific styles if hovered and animated (overriding animate styles)
		if (whileHover && isHovered && isAnimated) {
			// Override opacity if defined in whileHover
			if (whileHover.opacity !== undefined) {
				styles.opacity = whileHover.opacity;
			}

			// Rebuild transform string considering hover overrides for defined properties
			let hoverTransform = "";
			// Get base transform values from the animated state
			const currentX = targetState?.x;
			const currentY = targetState?.y;
			const currentScale = targetState?.scale;

			// Apply hover scale if defined, otherwise use the current scale from animate state
			const scaleToUse = whileHover.scale ?? currentScale;

			// Construct the transform string, preserving non-hovered properties from animate state
			if (currentX !== undefined)
				hoverTransform += ` translateX(${currentX}px)`;
			if (currentY !== undefined)
				hoverTransform += ` translateY(${currentY}px)`;
			if (scaleToUse !== undefined) hoverTransform += ` scale(${scaleToUse})`;
			// Add other potential hover transforms here if whileHover type is extended (e.g., x, y)

			// Update the main transform string if hover effects were applied
			// Use the hoverTransform only if it contains hover-specific changes (scale or opacity)
			if (whileHover.scale !== undefined || whileHover.opacity !== undefined) {
				transform = hoverTransform;
			}
		}

		// Apply accumulated transforms
		if (transform) {
			styles.transform = transform.trim();
		}

		// Handle transition
		if (transition) {
			// Determine which properties are being animated to apply transition selectively
			const animatedProperties = new Set<string>();
			// Check potential changes in opacity based on initial, animate, and whileHover states
			if (
				initial?.opacity !== undefined ||
				animate?.opacity !== undefined ||
				(isHovered && whileHover?.opacity !== undefined)
			) {
				animatedProperties.add("opacity");
			}
			// Check potential changes in transform (x, y, scale) based on initial, animate, and whileHover states
			if (
				initial?.x !== undefined ||
				animate?.x !== undefined ||
				initial?.y !== undefined ||
				animate?.y !== undefined ||
				initial?.scale !== undefined ||
				animate?.scale !== undefined ||
				(isHovered && whileHover?.scale !== undefined)
			) {
				animatedProperties.add("transform");
			}

			if (animatedProperties.size > 0) {
				styles.transitionProperty = Array.from(animatedProperties).join(", ");
				styles.transitionDuration = `${transition.duration ?? 0.3}s`;

				if (transition.delay) {
					styles.transitionDelay = `${transition.delay}s`;
				}

				styles.transitionTimingFunction =
					transition.type === "spring"
						? "cubic-bezier(0.34, 1.56, 0.64, 1)" // Example spring curve
						: "ease-out"; // Default tween curve
			}
		} else if (isAnimated && (animate || (isHovered && whileHover))) {
			// Apply a default transition if none is specified and animation/hover targets exist
			// Determine properties potentially changing for default transition
			const propsToTransition = [];
			if (
				animate?.opacity !== undefined ||
				(isHovered && whileHover?.opacity !== undefined)
			) {
				// Check if opacity actually changes from initial state
				if (
					initial?.opacity !==
					(isHovered && whileHover?.opacity !== undefined
						? whileHover.opacity
						: animate?.opacity)
				) {
					propsToTransition.push("opacity");
				}
			}
			if (
				animate?.x !== undefined ||
				animate?.y !== undefined ||
				animate?.scale !== undefined ||
				(isHovered && whileHover?.scale !== undefined)
			) {
				// Check if transform actually changes from initial state
				const targetX = animate?.x;
				const targetY = animate?.y;
				const targetScale =
					isHovered && whileHover?.scale !== undefined
						? whileHover.scale
						: animate?.scale;
				if (
					initial?.x !== targetX ||
					initial?.y !== targetY ||
					initial?.scale !== targetScale
				) {
					propsToTransition.push("transform");
				}
			}

			if (propsToTransition.length > 0) {
				styles.transitionProperty = propsToTransition.join(", "); // Be more specific than 'all'
				styles.transitionDuration = "0.3s";
				styles.transitionTimingFunction = "ease-out";
			}
		}

		return styles;
	};

	const styles = getStyles();

	const motionProps = {
		onMouseEnter: () => whileHover && setIsHovered(true),
		onMouseLeave: () => whileHover && setIsHovered(false),
	};

	return { styles, motionProps };
};

// MotionDiv Component
export const MotionDiv = ({
	children,
	initial,
	animate,
	transition,
	whileHover,
	className,
	...props
}: MotionProps) => {
	const { styles, motionProps } = useMotion({
		initial,
		animate,
		transition,
		whileHover,
	});

	return (
		<div className={cn(className)} style={styles} {...motionProps} {...props}>
			{children}
		</div>
	);
};

// MotionH1 Component
export const MotionH1 = ({
	children,
	initial,
	animate,
	transition,
	whileHover,
	className,
	...props
}: MotionProps) => {
	const { styles, motionProps } = useMotion({
		initial,
		animate,
		transition,
		whileHover,
	});

	return (
		<h1 className={cn(className)} style={styles} {...motionProps} {...props}>
			{children}
		</h1>
	);
};

// MotionH2 Component
export const MotionH2 = ({
	children,
	initial,
	animate,
	transition,
	whileHover,
	className,
	...props
}: MotionProps) => {
	const { styles, motionProps } = useMotion({
		initial,
		animate,
		transition,
		whileHover,
	});

	return (
		<h2 className={cn(className)} style={styles} {...motionProps} {...props}>
			{children}
		</h2>
	);
};

// MotionP Component
export const MotionP = ({
	children,
	initial,
	animate,
	transition,
	whileHover, // Added whileHover for consistency, even if not used in original 'p'
	className,
	...props
}: MotionProps) => {
	const { styles, motionProps } = useMotion({
		initial,
		animate,
		transition,
		whileHover, // Pass whileHover to the hook
	});

	// Note: The original 'p' didn't have hover effects, but the hook supports it.
	// If you strictly want 'p' to ignore hover, you could omit passing whileHover
	// to useMotion or omit the {...motionProps} spread on the <p> element.
	// Keeping it for consistency with other motion components.

	return (
		<p className={cn(className)} style={styles} {...motionProps} {...props}>
			{children}
		</p>
	);
};

// Example of how to potentially create other motion components easily
// export const MotionButton = (props: MotionProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
//  const { children, initial, animate, transition, whileHover, className, ...rest } = props;
//  const { styles, motionProps } = useMotion({ initial, animate, transition, whileHover });
//  return (
//      <button className={cn(className)} style={styles} {...motionProps} {...rest}>
//          {children}
//      </button>
//  );
// };
