import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
  Variants,
} from 'framer-motion';
import { useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const GridBox = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.2);
`;

const Circle = styled(motion.div)`
  place-self: center;
  background-color: white;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const gridBoxVariants: Variants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const circleVarients: Variants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};

const boxVariants: Variants = {
  hover: {
    scale: 1.5,
    rotateZ: 90,
  },
  click: {
    scale: 1,
    borderRadius: '100px',
  },
};

function AnimationField() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 0, 800],
    [
      'linear-gradient(135deg, rgb(0, 127, 238), rgb(0, 83, 238))',
      'linear-gradient(135deg, rgb(255, 234, 78), rgb(244, 209, 69))',
      'linear-gradient(135deg, rgb(238, 63, 0), rgb(238, 120, 118))',
    ]
  );
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
  return (
    <Wrapper>
      <GridBox variants={gridBoxVariants} initial="start" animate="end">
        <Circle variants={circleVarients} />
        <Circle variants={circleVarients} />
        <Circle variants={circleVarients} />
        <Circle variants={circleVarients} />
      </GridBox>
      <BiggerBox ref={biggerBoxRef}>
        <Box
          drag
          dragSnapToOrigin
          dragElastic={0.5}
          dragConstraints={biggerBoxRef}
          variants={boxVariants}
          whileHover="hover"
          whileTap="click"
        />
      </BiggerBox>
      <Box
        style={{ x, rotateZ, background: gradient, scale }}
        drag="x"
        dragSnapToOrigin
      />
    </Wrapper>
  );
}

export default AnimationField;
