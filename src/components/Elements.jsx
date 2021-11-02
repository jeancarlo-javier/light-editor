/* eslint-disable react/prop-types */

const Elements = (props) => {
  const { element } = props;

  const style = {
    fontSize: element.fontSize ? `${element.fontSize}px` : '',
    textAlign: element.alignment ? `${element.alignment}` : '',
  };

  switch (element.type) {
    case 'h1':
      return (
        <h1 className=".heading-lg" {...props.attributes} style={style}>
          {props.children}
        </h1>
      );
    case 'h2':
      return (
        <h2 className=".heading-md" {...props.attributes} style={style}>
          {props.children}
        </h2>
      );
    case 'h3':
      return (
        <h3 className=".heading-sm" {...props.attributes} style={style}>
          {props.children}
        </h3>
      );
    case 'h4':
      return (
        <h4 className=".heading-xs" {...props.attributes} style={style}>
          {props.children}
        </h4>
      );
    case 'h5':
      return (
        <h5 className=".heading-2xs" {...props.attributes} style={style}>
          {props.children}
        </h5>
      );
    case 'h6':
      return (
        <h6 className=".heading-3xs" {...props.attributes} style={style}>
          {props.children}
        </h6>
      );
    case 'ul':
      return (
        <ul {...props.attributes} style={style}>
          {props.children}
        </ul>
      );
    case 'li':
      return (
        <li {...props.attributes} style={style}>
          {props.children}
        </li>
      );
    case 'ol':
      return (
        <ol {...props.attributes} style={style}>
          {props.children}
        </ol>
      );
    default:
      return (
        <p {...props.attributes} style={style}>
          {props.children}
        </p>
      );
  }
};

export default Elements;
