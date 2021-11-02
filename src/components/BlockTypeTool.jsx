import Select, { components } from 'react-select';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'preact/hooks';

const Container = styled.div`
  background-color: inherit !important;
  border: 0;
  height: 100%;
  cursor: pointer;
  .basic-single {
    height: 100%;
    .select__control {
      height: 100%;
      min-height: inherit;
      border: 0;
      &:hover {
        border-color: red;
      }
    }
    .select__indicators {
      display: flex;
      align-items: center;
    }
    .select__value-container {
      width: 85px;
      padding: 0px 5px;
    }
    .select__indicator-separator {
      display: none;
    }
    .select__indicator {
      padding: 0;
      margin-right: 2px;
    }
    .select__single-value, select__input {
      font-size: 14px;
    }
    .select__menu {
      width: 106px;
    }
  }
`;

const style = {
  control: (base) => ({
    ...base,
    border: 0,
    // This line disable the blue border
    boxShadow: 'none',
  }),
  option: (styles, {
    isFocused, isSelected,
  }) => {
    let backgroundColor = 'inherit';
    if (isSelected) backgroundColor = '#e0e0e0';
    else if (isFocused) backgroundColor = '#e0e0e0';

    return {
      ...styles,
      fontSize: '14px',
      backgroundColor,
      color: 'black',
      cursor: 'pointer',
    };
  },
};

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <span className="material-icons" style={{ fontSize: '20px' }}>
      arrow_drop_down
    </span>
  </components.DropdownIndicator>
);

const BlockTypeTool = ({ onChange, blockTypes, blockType }) => {
  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    const option = blockTypes.find(({ value }) => value === blockType);
    setSelectedOption(option);
  }, [blockType]);

  return (
    <Container>
      <Select
        value={selectedOption}
        className="basic-single"
        classNamePrefix="select"
        defaultValue={blockTypes[0]}
        isSearchable
        name="blocks"
        options={blockTypes}
        styles={style}
        components={{ DropdownIndicator }}
        onChange={onChange}
      />
    </Container>
  );
};

BlockTypeTool.propTypes = {
  onChange: PropTypes.func.isRequired,
  blockTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  blockType: PropTypes.string,
};

BlockTypeTool.defaultProps = {
  blockType: '',
};

export default BlockTypeTool;
