/* eslint-disable jsx-a11y/control-has-associated-label */

import {
  useCallback, useEffect, useRef, useState,
} from 'preact/hooks';
import PropTypes from 'prop-types';
import { RgbaColorPicker } from 'react-colorful';
import styled from 'styled-components';
import useClickOutside from '../utils/useClickOutside';

const PickerContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  .swatch {
    width: 20px;
    height: 20px;
    border-radius: 3px;
    border: 1px solid var(--left-border-color);
    cursor: pointer;
  }

  .popover {
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    border-radius: 9px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    z-index: 999999999;
  }
`;

const ColorPickerTool = ({ color, onChange }) => {
  const [value, setValue] = useState();

  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  useEffect(() => {
    setValue(color);
  }, [isOpen]);

  const backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

  return (
    <PickerContainer>
      <button
        type="button"
        className="swatch"
        style={{ backgroundColor }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className="popover" ref={popover}>
          <RgbaColorPicker
            color={value}
            onChange={onChange}
          />
        </div>
      )}
    </PickerContainer>
  );
};

ColorPickerTool.propTypes = {
  color: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ColorPickerTool;
