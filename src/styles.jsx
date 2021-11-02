import styled from 'styled-components';

const GlobalStyles = styled.div`
  font-family: 'Open Sans', sans-serif;

  button {
    text-align: inherit;
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;

    background: transparent;

    color: inherit;
    font: inherit;

    line-height: normal;

    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;

    -webkit-appearance: none;
  }

  /* Remove excess padding and border in Firefox 4+ */
  &::-moz-focus-inner {
      border: 0;
      padding: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
