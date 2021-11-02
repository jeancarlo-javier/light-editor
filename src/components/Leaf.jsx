const Leaf = (props) => {
  // Styles
  const styles = {};

  if (props.leaf.underlined) {
    styles.textDecoration = props.leaf.underlined ? 'underline' : '';
  }

  if (props.leaf.color) {
    styles.color = props.leaf.color;
  }
  // Styles

  let el = (
    <span {...props.attributes} style={styles}>
      {props.children}
    </span>
  );

  // Containers
  if (props.leaf.bold) {
    el = <strong>{el}</strong>;
  }

  if (props.leaf.italic) {
    el = <em>{el}</em>;
  }

  if (props.leaf.link) {
    el = <a href={props.leaf.link}>{el}</a>;
  }
  // Containers

  return el;
};

export default Leaf;
