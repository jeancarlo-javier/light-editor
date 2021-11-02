import {
  useCallback, useEffect, useRef, useState,
} from 'preact/hooks';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useClickOutside from '../utils/useClickOutside';

const ButtonContainer = styled.button`
  position: relative;
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

const PopOver = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  z-index: 999999999;
  width: 90vw;
  max-width: 307px;
  left: -7px;
`;

const InputStyled = styled.input`
  width: 100%;
  padding: 0;
  margin: 0;
  border-radius: 5px;
  border: 1px solid var(--left-border-color);
  padding: 10px 36px 10px 10px;
  background: white;
  &:focus {
    outline:0;
  }
`;

const DoneButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 8px !important;
  cursor: pointer;
  &:hover {
    span {
      color: black;
    }
  }
  span {
    color: #CECECE;
    font-size: 20px;
  }
`;

const InputText = ({ link, setLink }) => {
  const el = useRef(null);

  useEffect(() => {
    el?.current?.focus();
  }, [el]);

  return (
    <InputStyled
      ref={el}
      id="le-link-input"
      value={link}
      onChange={(e) => setLink(e.target.value)}
      type="text"
      placeholder="Insert a link"
    />
  );
};

InputText.propTypes = {
  link: PropTypes.string,
  setLink: PropTypes.func.isRequired,
};

InputText.defaultProps = {
  link: '',
};

const LinkTool = ({ value, onChange }) => {
  const popover = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [link, setLink] = useState('');
  const [modified, setModified] = useState(false);

  useEffect(() => {
    setLink(value);
  }, [value]);

  const close = useCallback(() => {
    setIsOpen(false);
    setLink('');
    setModified(false);
  }, []);

  useClickOutside(popover, close);

  const deleteLink = !modified && link !== '';

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!deleteLink) {
      onChange(link);

      // Reset
      setIsOpen(false);
      setLink('');
      setModified(false);
    } else {
      setLink('');
    }
  };

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <ButtonContainer
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="material-icons">
          link
        </span>
      </ButtonContainer>

      {isOpen && (
        <PopOver ref={popover}>
          <form onSubmit={onSubmitHandler}>
            <InputText
              setLink={(val) => {
                setLink(val);
                setModified(true);
              }}
              link={link}
            />
            <DoneButton
              type="submit"
            >
              <span className="material-icons">
                {deleteLink ? 'close' : 'done'}
              </span>
            </DoneButton>
          </form>
        </PopOver>
      )}
    </div>
  );
};

LinkTool.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

LinkTool.defaultProps = {
  value: '',
};

export default LinkTool;
