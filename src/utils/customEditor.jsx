import {
  Editor, Transforms,
} from 'slate';

const LIST_TYPES = ['ol', 'ul'];

const customEditor = {
  getFontSize(editor) {
    let fontSize = editor.children[editor.selection?.anchor.path[0]]?.fontSize;

    if (!fontSize) fontSize = 16;

    return fontSize;
  },

  isMarkActive(editor, format) {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  },

  toggleMark(editor, format) {
    const isActive = this.isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },

  isLinkMarkActive(editor) {
    const { link } = Editor.marks(editor);

    return link;
  },

  toggleLinkMark(editor, link) {
    if (!link) {
      Editor.removeMark(editor, 'link');
    } else {
      Editor.addMark(editor, 'link', link);
    }
  },

  getLink(editor) {
    const { link } = Editor.marks(editor);

    return link;
  },

  increaseFontSize(editor) {
    const fontSize = this.getFontSize(editor);

    Transforms.setNodes(
      editor,
      { fontSize: fontSize + 2 },
    );
  },

  decreaseFontSize(editor) {
    const fontSize = this.getFontSize(editor);

    Transforms.setNodes(
      editor,
      { fontSize: fontSize - 2 },
    );
  },

  getAlignment(editor) {
    let alignment = editor.children[editor.selection?.anchor.path[0]]?.alignment;

    if (!alignment) alignment = 'left';

    return alignment;
  },

  setAlignment(editor, align) {
    Transforms.setNodes(
      editor,
      { alignment: align },
    );
  },

  toggleBlockType(editor, block) {
    let type = '';
    if (block) type = block;

    const isList = LIST_TYPES.includes(block);

    if (isList) {
      // Transforms.removeNodes(editor, {
      //   match: n =>
      //     !Editor.isEditor(n) &&
      //     Element.isElement(n) &&
      //     LIST_TYPES.includes(n.type),
      //   split: true,
      // })

      const props = { type: 'li' };
      Transforms.wrapNodes(editor, block);
      Transforms.setNodes(editor, props);
    } else {
      // Font Sizes
      let fontSize = 0;
      switch (type) {
        case '':
          fontSize = 16;
          break;
        case 'h1':
          fontSize = 48;
          break;
        case 'h2':
          fontSize = 40;
          break;
        case 'h3':
          fontSize = 32;
          break;
        case 'h4':
          fontSize = 24;
          break;
        case 'h5':
          fontSize = 20;
          break;
        case 'h6':
          fontSize = 16;
          break;
        default:
          break;
      }

      Transforms.setNodes(
        editor,
        { type, fontSize },
        { match: (n) => Editor.isBlock(editor, n) },
      );
    }
  },

  getBlockType(editor) {
    const type = editor.children[editor.selection?.anchor.path[0]]?.type;

    return type;
  },

  getColor(editor) {
    const { color } = Editor.marks(editor);

    return color;
  },

  toggleColorMark(editor, val) {
    return Editor.addMark(editor, 'color', val);
  },
};

export default customEditor;
