import bold from '../../images/bold.svg';
import italic from '../../images/italic.svg';
import underline from '../../images/underline.svg';
import strikethrough from '../../images/strikethrough.svg';
import monospace from '../../images/monospace.svg';
import fontSize from '../../images/font-size.svg';
import indent from '../../images/indent.svg';
import outdent from '../../images/outdent.svg';
import ordered from '../../images/list-ordered.svg';
import unordered from '../../images/list-unordered.svg';
import left from '../../images/align-left.svg';
import center from '../../images/align-center.svg';
import right from '../../images/align-right.svg';
import justify from '../../images/align-justify.svg';
import color from '../../images/color.svg';
import eraser from '../../images/eraser.svg';
import link from '../../images/link.svg';
import unlink from '../../images/unlink.svg';
import emoji from '../../images/emoji.svg';
import embedded from '../../images/embedded.svg';
import image from '../../images/image.svg';
import undo from '../../images/undo.svg';
import redo from '../../images/redo.svg';
import subscript from '../../images/subscript.svg';
import superscript from '../../images/superscript.svg';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import React from 'react';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import WebIcon from '@material-ui/icons/Web';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import UndoOutlinedIcon from '@material-ui/icons/UndoOutlined';
import RedoOutlinedIcon from '@material-ui/icons/RedoOutlined';
import CodeOutlinedIcon from '@material-ui/icons/CodeOutlined';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined';

/**
* This is default toolbar configuration,
* whatever user passes in toolbar property is deeply merged with this to over-ride defaults.
*/
export default {
  options: [
    "inline",
    "blockType",
    "fontSize",
    "fontFamily",
    "list",
    "textAlign",
    "colorPicker",
    "link",
    "embedded",
    "emoji",
    "image",
    "remove",
    "history"
  ],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "monospace",
      "superscript",
      "subscript"
    ],
    bold: { icon: <FormatBoldIcon />, className: undefined, title: undefined },
    italic: { icon: <FormatItalicIcon />, className: undefined, title: undefined },
    underline: { icon: <FormatUnderlinedIcon />, className: undefined, title: undefined },
    strikethrough: {
      icon: <StrikethroughSIcon />,
      className: undefined,
      title: undefined
    },
    monospace: { icon: <CodeOutlinedIcon />, className: undefined, title: undefined },
    superscript: { icon: superscript, className: undefined, title: undefined },
    subscript: { icon: subscript, className: undefined, title: undefined }
  },
  blockType: {
    inDropdown: true,
    options: [
      "Normal",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "Blockquote",
      "Code"
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    title: undefined
  },
  fontSize: {
    icon: fontSize,
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    title: undefined
  },
  fontFamily: {
    options: [
      "Arial",
      "Georgia",
      "Impact",
      "Tahoma",
      "Times New Roman",
      "Verdana"
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    title: undefined
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["unordered", "ordered", "indent", "outdent"],
    unordered: { icon: unordered, className: undefined, title: undefined },
    ordered: { icon: ordered, className: undefined, title: undefined },
    indent: { icon: indent, className: undefined, title: undefined },
    outdent: { icon: outdent, className: undefined, title: undefined },
    title: undefined
  },
  textAlign: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["left", "center", "right", "justify"],
    left: { icon: left, className: undefined, title: undefined },
    center: { icon: center, className: undefined, title: undefined },
    right: { icon: right, className: undefined, title: undefined },
    justify: { icon: justify, className: undefined, title: undefined },
    title: undefined
  },
  colorPicker: {
    icon: <FormatColorFillIcon />,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    colors: [
      "rgb(97,189,109)",
      "rgb(26,188,156)",
      "rgb(84,172,210)",
      "rgb(44,130,201)",
      "rgb(147,101,184)",
      "rgb(71,85,119)",
      "rgb(204,204,204)",
      "rgb(65,168,95)",
      "rgb(0,168,133)",
      "rgb(61,142,185)",
      "rgb(41,105,176)",
      "rgb(85,57,130)",
      "rgb(40,50,78)",
      "rgb(0,0,0)",
      "rgb(247,218,100)",
      "rgb(251,160,38)",
      "rgb(235,107,86)",
      "rgb(226,80,65)",
      "rgb(163,143,132)",
      "rgb(239,239,239)",
      "rgb(255,255,255)",
      "rgb(250,197,28)",
      "rgb(243,121,52)",
      "rgb(209,72,65)",
      "rgb(184,49,47)",
      "rgb(124,112,107)",
      "rgb(209,213,216)"
    ],
    title: undefined
  },
  link: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: "_self",
    options: ["link", "unlink"],
    link: { icon: <LinkIcon />, className: undefined, title: undefined },
    unlink: { icon: <LinkOffIcon />, className: undefined, title: undefined },
    linkCallback: undefined
  },
  emoji: {
    icon: <InsertEmoticonIcon />,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    emojis: [
      "😀",
      "😁",
      "😂",
      "😃",
      "😉",
      "😋",
      "😎",
      "😍",
      "😗",
      "🤗",
      "🤔",
      "😣",
      "😫",
      "😴",
      "😌",
      "🤓",
      "😛",
      "😜",
      "😠",
      "😇",
      "😷",
      "😈",
      "👻",
      "😺",
      "😸",
      "😹",
      "😻",
      "😼",
      "😽",
      "🙀",
      "🙈",
      "🙉",
      "🙊",
      "👼",
      "👮",
      "🕵",
      "💂",
      "👳",
      "🎅",
      "👸",
      "👰",
      "👲",
      "🙍",
      "🙇",
      "🚶",
      "🏃",
      "💃",
      "⛷",
      "🏂",
      "🏌",
      "🏄",
      "🚣",
      "🏊",
      "⛹",
      "🏋",
      "🚴",
      "👫",
      "💪",
      "👈",
      "👉",
      "👆",
      "🖕",
      "👇",
      "🖖",
      "🤘",
      "🖐",
      "👌",
      "👍",
      "👎",
      "✊",
      "👊",
      "👏",
      "🙌",
      "🙏",
      "🐵",
      "🐶",
      "🐇",
      "🐥",
      "🐸",
      "🐌",
      "🐛",
      "🐜",
      "🐝",
      "🍉",
      "🍄",
      "🍔",
      "🍤",
      "🍨",
      "🍪",
      "🎂",
      "🍰",
      "🍾",
      "🍷",
      "🍸",
      "🍺",
      "🌍",
      "🚑",
      "⏰",
      "🌙",
      "🌝",
      "🌞",
      "⭐",
      "🌟",
      "🌠",
      "🌨",
      "🌩",
      "⛄",
      "🔥",
      "🎄",
      "🎈",
      "🎉",
      "🎊",
      "🎁",
      "🎗",
      "🏀",
      "🏈",
      "🎲",
      "🔇",
      "🔈",
      "📣",
      "🔔",
      "🎵",
      "🎷",
      "💰",
      "🖊",
      "📅",
      "✅",
      "❎",
      "💯"
    ],
    title: undefined
  },
  embedded: {
    icon: <WebIcon />,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    embedCallback: undefined,
    defaultSize: {
      height: "auto",
      width: "auto"
    },
    title: undefined
  },
  image: {
    icon: <ImageOutlinedIcon />,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    previewImage: false,
    alignmentEnabled: true,
    uploadCallback: undefined,
    inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: "auto",
      width: "auto"
    },
    title: undefined
  },
  remove: {
    icon: <DeleteSweepOutlinedIcon />,
    className: undefined,
    component: undefined,
    title: undefined
  },
  history: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["undo", "redo"],
    undo: { icon: <UndoOutlinedIcon />, className: undefined, title: undefined },
    redo: { icon: <RedoOutlinedIcon />, className: undefined, title: undefined },
    title: undefined
  }
};

/**
 * - add option property to color-picker, emoji.
 */
