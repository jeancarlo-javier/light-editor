import {
  useState, useMemo, useCallback, useEffect,
} from 'preact/hooks';
import 'material-icons/iconfont/material-icons.css';
import {
  createEditor,
} from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import Leaf from './components/Leaf';
import Elements from './components/Elements';
import Toolbar from './components/Toolbar';
import GlobalStyles from './styles';
import customEditor from './utils/customEditor';

const blockTypes = [
  { value: '', label: 'Paragraph' },
  { value: 'h1', label: 'Heading 1' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
  { value: 'h4', label: 'Heading 4' },
  { value: 'h5', label: 'Heading 5' },
];

const App = () => {
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);

  // Toolbar states
  const [fontSize, setFontSize] = useState(16);
  const [blockType, setBlockType] = useState('');
  const [link, setLink] = useState('');
  const [currentColor, setCurrentColor] = useState({
    r: 0, g: 0, b: 0, a: 1,
  });
  const [alignment, setAlignment] = useState('left');

  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [
        {
          text: 'A line of text isn a paragraph.',
        },
      ],
    },
  ]);

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const renderElement = useCallback((props) => <Elements {...props} />, []);

  const getDefaultValues = () => {
    // Font Size
    const newFontSizeCustom = customEditor.getFontSize(editor) || 0;
    setFontSize(newFontSizeCustom);
    // Font Size

    // Color
    let color = customEditor.getColor(editor);
    if (color) {
      color = color.replace(/[^\d,]/g, '').split(',');

      color = {
        r: parseInt(color[0], 10),
        g: parseInt(color[1], 10),
        b: parseInt(color[2], 10),
        a: parseInt(color[3], 10),
      };
    }

    if (color) setCurrentColor(color);
    else {
      setCurrentColor({
        r: 0, g: 0, b: 0, a: 1,
      });
    }
    // Color

    // Alignment
    const newAlignment = customEditor.getAlignment(editor);
    setAlignment(newAlignment);
    // Alignment

    // Link
    const newLink = customEditor.getLink(editor);
    setLink(newLink);
    // Link

    // Block Type
    const newBlockType = customEditor.getBlockType(editor);
    setBlockType(newBlockType);
    // Block Type
  };

  useEffect(() => {
    // console.log(currentColor);
  }, [currentColor]);

  return (
    <GlobalStyles
      className="light-editor"
      style={{
        '--left-border-color': '#E0E0E0',
      }}
    >
      <Toolbar
        editor={editor}
        fontSize={fontSize}
        color={currentColor}
        alignment={alignment}
        link={link}
        blockTypes={blockTypes}
        blockType={blockType}
      />
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => {
          getDefaultValues();
          setValue(newValue);
        }}
      >
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          style={{
            fontSize: '16px',
          }}
          onKeyDown={(event) => {
            if (!event.ctrlKey && !event.metaKey) {
              return null;
            }

            switch (event.key) {
              case 'b':
                event.preventDefault();
                customEditor.toggleMark(editor, 'bold');
                break;

              case 'i':
                event.preventDefault();
                customEditor.toggleMark(editor, 'italic');
                break;

              case 'u':
                event.preventDefault();
                customEditor.toggleMark(editor, 'underlined');
                break;

              default:
                break;
            }

            return null;
          }}
        />
      </Slate>
    </GlobalStyles>
  );
};

export default App;
