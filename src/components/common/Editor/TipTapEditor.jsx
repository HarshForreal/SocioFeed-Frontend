import React, { useEffect } from 'react';
import Highlight from '@tiptap/extension-highlight';
import Heading from '@tiptap/extension-heading';
import { EditorContent, mergeAttributes, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';
import TextAlign from '@tiptap/extension-text-align';

const TextEditor = ({ content, onChange, editable }) => {
  const isEditable = editable ?? true;

  const editor = useEditor({
    editable: isEditable,
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-gray-300 pl-4 italic',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-3',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-3',
          },
        },
      }),
      TextAlign.configure({
        types: ['paragraph'],
      }),
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: {},
      }).extend({
        renderHTML({ node, HTMLAttributes }) {
          const level = node.attrs.level;
          const classMap = {
            1: 'text-3xl font-bold mb-3',
            2: 'text-2xl font-semibold mb-2',
            3: 'text-xl font-medium mb-1',
          };
          return [
            'h' + level,
            mergeAttributes(HTMLAttributes, { class: classMap[level] }),
            0,
          ];
        },
      }),
      Highlight,
    ],
    content: content,
    editorProps: {
      attributes: {
        class: isEditable
          ? 'min-h-[156px] rounded-md bg-slate-50 py-2 px-3'
          : '',
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '');
    }
  }, [content, editor]);

  return (
    <div>
      {isEditable && <MenuBar editor={editor} />}
      <EditorContent
        editor={editor}
        className="custom-scrollbar overflow-auto min-h-[100px] max-h-[500px]"
      />
    </div>
  );
};

export default TextEditor;
