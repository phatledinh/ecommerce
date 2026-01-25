// components/editor/TipTapEditor.jsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Heading3,
    Undo,
    Redo,
    Link,
    Image as ImageIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
} from "lucide-react";

const TipTapEditor = ({
    content,
    onChange,
    placeholder = "Nhập nội dung...",
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: placeholder,
            }),
        ],
        content: content || "",
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4",
            },
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded ${
                        editor.isActive("bold")
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100"
                    }`}
                    title="Bold"
                >
                    <Bold className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded ${
                        editor.isActive("italic")
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100"
                    }`}
                    title="Italic"
                >
                    <Italic className="w-4 h-4" />
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1"></div>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={`p-2 rounded ${
                        editor.isActive("heading", { level: 2 })
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100"
                    }`}
                    title="Heading 2"
                >
                    <Heading2 className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    className={`p-2 rounded ${
                        editor.isActive("heading", { level: 3 })
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100"
                    }`}
                    title="Heading 3"
                >
                    <Heading3 className="w-4 h-4" />
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1"></div>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={`p-2 rounded ${
                        editor.isActive("bulletList")
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100"
                    }`}
                    title="Bullet List"
                >
                    <List className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={`p-2 rounded ${
                        editor.isActive("orderedList")
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100"
                    }`}
                    title="Ordered List"
                >
                    <ListOrdered className="w-4 h-4" />
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1"></div>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().setTextAlign("left").run()
                    }
                    className={`p-2 rounded ${
                        editor.isActive({ textAlign: "left" })
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100"
                    }`}
                    title="Align Left"
                >
                    <AlignLeft className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().setTextAlign("center").run()
                    }
                    className={`p-2 rounded ${
                        editor.isActive({ textAlign: "center" })
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100"
                    }`}
                    title="Align Center"
                >
                    <AlignCenter className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().setTextAlign("right").run()
                    }
                    className={`p-2 rounded ${
                        editor.isActive({ textAlign: "right" })
                            ? "bg-blue-100 text-blue-600"
                            : "hover:bg-gray-100"
                    }`}
                    title="Align Right"
                >
                    <AlignRight className="w-4 h-4" />
                </button>

                <div className="flex-1"></div>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-30"
                    title="Undo"
                >
                    <Undo className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-30"
                    title="Redo"
                >
                    <Redo className="w-4 h-4" />
                </button>
            </div>

            {/* Editor content */}
            <EditorContent editor={editor} />
        </div>
    );
};

export default TipTapEditor;
