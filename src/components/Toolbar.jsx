import PropTypes from 'prop-types';
import styled from 'styled-components';
import customEditor from '../utils/customEditor';
import FontSizeTool from './FontSizeTool';
import ColorPickerTool from './ColorPickerTool';
import BlockTypeTool from './BlockTypeTool';
import LinkTool from './LinkTool';

const ToolbarContainer = styled.div`
  padding: 0 5.5px;
  border: 1px solid var(--left-border-color);
  border-radius: 5px;
  width: fit-content;
  height: 40px;
  display: flex;
  align-items: center;
`;

const Vl = styled.div`
  border-left: 1px solid var(--left-border-color);
  height: 100%;
  margin: 0 5.5px;
`;

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px !important;
  height: 100%;
  cursor: pointer;
  span {
    font-size: 20px;
    color: ${(props) => (props.active ? 'black' : '#CECECE')};
    &:hover {
      color: black;
    }
  }
`;

const Toolbar = ({
  editor, fontSize, color, alignment, link, blockTypes, blockType,
}) => (
  <ToolbarContainer>
    <BlockTypeTool
      onChange={({ value }) => {
        customEditor.toggleBlockType(editor, value);
      }}
      blockTypes={blockTypes}
      blockType={blockType}
    />
    <Vl />
    <LinkTool
      value={link}
      onChange={(newLink) => {
        customEditor.toggleLinkMark(editor, newLink);
      }}
    />
    <Vl />
    <ButtonContainer
      type="button"
      onClick={(e) => {
        e.preventDefault();
        customEditor.toggleMark(editor, 'bold');
      }}
      active={customEditor.isMarkActive(editor, 'bold')}
    >
      <span className="material-icons">
        format_bold
      </span>
    </ButtonContainer>
    <ButtonContainer
      type="button"
      onClick={(e) => {
        e.preventDefault();
        customEditor.toggleMark(editor, 'italic');
      }}
      active={customEditor.isMarkActive(editor, 'italic')}
    >
      <span className="material-icons">
        format_italic
      </span>
    </ButtonContainer>
    <ButtonContainer
      type="button"
      onClick={(e) => {
        e.preventDefault();
        customEditor.toggleMark(editor, 'underlined');
      }}
      active={customEditor.isMarkActive(editor, 'underlined')}
    >
      <span className="material-icons">
        format_underlined
      </span>
    </ButtonContainer>
    <Vl />
    <FontSizeTool editor={editor} fontSize={fontSize} />
    <ColorPickerTool
      color={color}
      onChange={(newColor) => {
        const colorFormated = `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a})`;
        customEditor.toggleColorMark(editor, colorFormated);
      }}
    />
    <Vl />
    <ButtonContainer
      type="button"
      onClick={(e) => {
        e.preventDefault();
        customEditor.setAlignment(editor, 'left');
      }}
      active={alignment === 'left'}
    >
      <span className="material-icons">
        format_align_left
      </span>
    </ButtonContainer>
    <ButtonContainer
      type="button"
      onClick={(e) => {
        e.preventDefault();
        customEditor.setAlignment(editor, 'center');
      }}
      active={alignment === 'center'}
    >
      <span className="material-icons">
        format_align_center
      </span>
    </ButtonContainer>
    <ButtonContainer
      type="button"
      onClick={(e) => {
        e.preventDefault();
        customEditor.setAlignment(editor, 'right');
      }}
      active={alignment === 'right'}
    >
      <span className="material-icons">
        format_align_right
      </span>
    </ButtonContainer>
    <ButtonContainer
      type="button"
      onClick={(e) => {
        e.preventDefault();
        customEditor.setAlignment(editor, 'justify');
      }}
      active={alignment === 'justify'}
    >
      <span className="material-icons">
        format_align_justify
      </span>
    </ButtonContainer>
  </ToolbarContainer>
);

Toolbar.propTypes = {
  editor: PropTypes.objectOf(PropTypes.any).isRequired,
  fontSize: PropTypes.number.isRequired,
  color: PropTypes.objectOf(PropTypes.any).isRequired,
  alignment: PropTypes.string.isRequired,
  link: PropTypes.string,
  blockTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  blockType: PropTypes.string,
};

Toolbar.defaultProps = {
  blockType: '',
  link: '',
};

export default Toolbar;
