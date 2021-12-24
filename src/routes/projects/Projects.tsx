import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { isDarkAtom, isGradientAtom } from '../../atoms';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BtnGroup = styled.div`
  display: flex;
`;

const ToggleBtn = styled.button`
  cursor: pointer;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 5px;
  transition: all 0.3s;
`;

const ToggleGradientBtn = styled(ToggleBtn)`
  background: transparent;
  color: ${(props) => props.theme.textColor};
  border: 1px solid ${(props) => props.theme.accentColor};
  &:hover {
    background: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.cardBgColor};
  }
`;

const ToggleDarkBtn = styled(ToggleBtn)`
  background: transparent;
  color: ${(props) => props.theme.accentColor};
  border: 1px solid ${(props) => props.theme.accentColor};
  &:hover {
    background: ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.textColor};
  }
`;

const ProjectList = styled.ul``;

const Project = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  font-size: 18px;
  font-weight: 700;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 36px;
  color: ${(props) => props.theme.accentColor};
  margin-top: 15px;
`;

function Projects() {
  const gradientAtom = useRecoilValue(isGradientAtom);
  const setGradientAtom = useSetRecoilState(isGradientAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleGradientAtom = () => setGradientAtom((prev) => !prev);
  const toggleDarkAtom = () => {
    if (!gradientAtom) setDarkAtom((prev) => !prev);
  };
  return (
    <Container>
      <Helmet>
        <title>리액트 마스터 클래스</title>
      </Helmet>
      <Header>
        <Title>프로젝트</Title>
        <BtnGroup>
          <ToggleGradientBtn onClick={toggleGradientAtom}>
            Gradient {gradientAtom ? 'On' : 'Off'}
          </ToggleGradientBtn>
          {!gradientAtom && (
            <ToggleDarkBtn onClick={toggleDarkAtom}>Toggle Mode</ToggleDarkBtn>
          )}
        </BtnGroup>
      </Header>

      <ProjectList>
        <Project>
          <Link to="/crypto">Crypto</Link>
        </Project>
        <Project>
          <Link to="/to-do">To Do List</Link>
        </Project>
        <Project>
          <Link to="/kanban">Kanban</Link>
        </Project>
        <Project>
          <Link to="/animation">Animation</Link>
        </Project>
      </ProjectList>
    </Container>
  );
}

export default Projects;
