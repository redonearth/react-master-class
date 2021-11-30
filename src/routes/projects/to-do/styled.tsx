import styled from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 0.9rem;
  opacity: 0.7;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
`;
