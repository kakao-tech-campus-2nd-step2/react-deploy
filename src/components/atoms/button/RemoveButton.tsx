import styled from '@emotion/styled';
import { backgroundColors, textColors } from '@styles/colors';

const RemoveButton = styled.div`
  background-color: ${backgroundColors.badgePrimary};
  color: ${textColors.inset};
  position: absolute;
  top: 2px;
  left: 2px;
  width: 30px;
  height: 30px;
  z-index: 2;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default RemoveButton;
