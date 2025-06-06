import React from 'react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  CodeSquare,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  TextQuote,
} from 'lucide-react';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const options = [
    // {
    //   icon: <Heading1 size={16} />,
    //   onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    //   pressed: editor.isActive('heading', { level: 1 }),
    // },
    // {
    //   icon: <Heading2 size={16} />,
    //   onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    //   pressed: editor.isActive('heading', { level: 2 }),
    // },
    // {
    //   icon: <Heading3 size={16} />,
    //   onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    //   pressed: editor.isActive('heading', { level: 3 }),
    // },
    {
      icon: <Bold size={16} />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive('bold'),
    },
    {
      icon: <Italic size={16} />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive('italic'),
    },
    {
      icon: <Strikethrough size={16} />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive('strike'),
    },
    {
      icon: <AlignLeft size={16} />,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      pressed: editor.isActive({ textAlign: 'left' }),
    },
    {
      icon: <AlignCenter size={16} />,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      pressed: editor.isActive({ textAlign: 'center' }),
    },
    {
      icon: <AlignRight size={16} />,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      pressed: editor.isActive({ textAlign: 'right' }),
    },
    {
      icon: <TextQuote size={16} />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      pressed: editor.isActive('blockquote'),
    },
    {
      icon: <List size={16} />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive('bulletList'),
    },
    {
      icon: <ListOrdered size={16} />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive('orderedList'),
    },
    {
      icon: <Highlighter size={16} />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive('highlight'),
    },
  ];

  return (
    <div
      style={{
        backgroundColor: '#f8fafc',
        padding: '6px',
        marginBottom: '8px',
        borderRadius: '6px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        zIndex: 50,
      }}
    >
      {options.map((option, index) => (
        <ToggleButton
          key={index}
          value={index}
          selected={option.pressed}
          onClick={option.onClick}
          sx={{
            padding: '4px',
            borderRadius: '6px',
            backgroundColor: option.pressed ? '#1e293b' : 'white',
            color: option.pressed ? 'white' : '#1e293b',
            border: '1px solid #cbd5e1',
            minWidth: '32px',
            height: '32px',
            '&:hover': {
              backgroundColor: '#e2e8f0',
            },
          }}
        >
          {option.icon}
        </ToggleButton>
      ))}
    </div>
  );
};

export default MenuBar;
