import PropTypes from 'prop-types';
import styled from 'styled-components';
import customEditor from '../utils/customEditor';

const Container = styled.div`
  display: flex;
  align-items: center;
  .material-icons {
    font-size: 20px;
  }
  .tool-icon {
    margin-right: 10px;
  }
`;

const InputsContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--left-border-color);
  height: 20px;
  margin-right: 10px;
  border-radius: 3px;
`;

const ButtonContainer = styled.button`
  height: inherit;
  cursor: pointer;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 15px;
  font-size: 14px;
`;

const FontSizeTool = ({ editor, fontSize }) => (
  <Container>
    <span className="material-icons tool-icon">
      text_fields
    </span>
    <InputsContainer>
      <ButtonContainer
        type="button"
        onClick={() => customEditor.decreaseFontSize(editor)}
        style={{
          borderRight: '1px solid var(--left-border-color)',
        }}
      >
        <span className="material-icons">
          remove
        </span>
      </ButtonContainer>
      <TextContainer>
        {fontSize}
      </TextContainer>
      <ButtonContainer
        type="button"
        onClick={() => customEditor.increaseFontSize(editor)}
        style={{
          borderLeft: '1px solid var(--left-border-color)',
        }}
      >
        <span className="material-icons">
          add
        </span>
      </ButtonContainer>
    </InputsContainer>
  </Container>
);

FontSizeTool.propTypes = {
  editor: PropTypes.objectOf(PropTypes.any).isRequired,
  fontSize: PropTypes.number.isRequired,
};

export default FontSizeTool;
