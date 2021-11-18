import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

interface DummyProps {
  text: string;
  active?: boolean;
}

function Dummy({ text, active = false }: DummyProps) {
  return <H1>{text}</H1>;
}

function App() {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(event.currentTarget);
  };

  return (
    <Container>
      <Dummy text="hello" active />
      <button onClick={onClick}>Click me</button>
    </Container>
  );
}

export default App;
