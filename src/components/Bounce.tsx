import { useImperativeHandle, forwardRef, ReactNode, useState } from 'react';
import { useSpring, animated } from '@react-spring/web'

// Define the props for the Bounce component
interface BounceProps {
    children: ReactNode;
}

// Define the bounce function interface
export interface BounceHandle {
    bounce: () => void;
}

const AnimatedDiv = animated.div

// Create the Bounce component
const Bounce = forwardRef<BounceHandle, BounceProps>(({ children }, ref) => {
    const [scale, setScale] = useState(1)
    const bounceStyle = useSpring({
        transform: `scale(${scale})`,
        config: {
            mass: 1,
            tension: 800,
            friction: 10
        }
    })

    const bounce = () => {
        setScale(2)
        setTimeout(() => {
            setScale(1)
        }, 100)
    }

    // Expose the bounce function to the parent component
    useImperativeHandle(ref, () => ({
        bounce: bounce
    }));

    return <AnimatedDiv style={bounceStyle}>{children}</AnimatedDiv>;
});

export default Bounce;
