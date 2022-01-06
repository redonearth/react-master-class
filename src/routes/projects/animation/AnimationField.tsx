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
  flex-direction: column;
  align-items: center;
`;

const BoxContainer = styled.div`
  padding-block: 10rem;
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

const Svg = styled.svg`
  width: 300px;
  height: 300px;

  path {
    stroke: rgb(97, 219, 251);
    stroke-width: 2;
  }
`;

const svgVariants: Variants = {
  start: {
    pathLength: 0,
    fill: 'rgba(255, 255, 255, 0)',
  },
  end: {
    pathLength: 1,
    fill: 'rgba(97, 219, 251, 1)',
    transition: {
      default: {
        duration: 5,
      },
      fill: {
        duration: 2,
        delay: 2,
      },
    },
  },
};

const ToyotaSvg = styled(Svg)`
  width: 500px;

  path {
    stroke: rgb(235, 10, 30);
    stroke-width: 0.1;
  }
`;

const toyotaSvgVariants: Variants = {
  start: {
    pathLength: 0,
    fill: 'rgba(255, 255, 255, 0)',
  },
  end: {
    pathLength: 1,
    fill: 'rgba(235, 10, 30, 1)',
    transition: {
      default: {
        duration: 5,
      },
      fill: {
        duration: 2,
        delay: 2,
      },
    },
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
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 2]);
  return (
    <Wrapper>
      <BoxContainer>
        <GridBox variants={gridBoxVariants} initial="start" animate="end">
          <Circle variants={circleVarients} />
          <Circle variants={circleVarients} />
          <Circle variants={circleVarients} />
          <Circle variants={circleVarients} />
        </GridBox>
      </BoxContainer>

      <BoxContainer>
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
      </BoxContainer>

      <BoxContainer>
        <Box
          style={{ x, rotateZ, background: gradient, scale }}
          drag="x"
          dragSnapToOrigin
        />
      </BoxContainer>

      <BoxContainer>
        <Svg
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <motion.path
            variants={svgVariants}
            initial="start"
            animate="end"
            d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z"
          ></motion.path>
        </Svg>
        <ToyotaSvg
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 15 15"
        >
          <motion.path
            variants={toyotaSvgVariants}
            initial="start"
            animate="end"
            d="M7.19,9.49C6.39,9,5.8,7.25,5.8,5.18V5h0C3.56,4.61,1.94,3.64,1.9,2.5h0A3.65,3.65,0,0,0,1,4.82C1,7.29,3.75,9.31,7.18,9.49ZM0,5C0,2.24,3.44,0,7.68,0s7.67,2.24,7.67,5-3.43,5-7.67,5S0,7.76,0,5ZM7.68.72c.81,0,1.51,1.24,1.77,3h0c1.59-.24,2.7-.82,2.7-1.48,0-.89-2-1.62-4.47-1.62S3.2,1.32,3.2,2.21c0,.66,1.11,1.23,2.7,1.48h0C6.16,2,6.86.72,7.68.72Zm.49,8.77c3.44-.18,6.15-2.2,6.15-4.67a3.71,3.71,0,0,0-.86-2.31h0c0,1.14-1.66,2.1-3.9,2.45h0v.23C9.55,7.25,9,9,8.16,9.49ZM7.68,3.82c.35,0,.71,0,1.06,0h0c-.17-1.11-.58-1.89-1.06-1.89s-.9.78-1.07,1.89h0c.35,0,.71,0,1.07,0Zm0,4.11c.61,0,1.11-1.28,1.14-2.89h0A12.51,12.51,0,0,1,6.53,5h0C6.56,6.65,7.06,7.93,7.68,7.93Z"
          />
        </ToyotaSvg>
      </BoxContainer>
    </Wrapper>
  );
}

export default AnimationField;
