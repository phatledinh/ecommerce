import React from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const CKEditorWrapper = ({ value, onChange, placeholder }) => {
    return (
        <div className="ckeditor-wrapper">
            <CKEditor
                editor={ClassicEditor}
                data={value || ""}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
                config={{
                    placeholder: placeholder,
                    toolbar: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "link",
                        "bulletedList",
                        "numberedList",
                        "blockQuote",
                        "insertTable",
                        "undo",
                        "redo",
                    ],
                }}
            />
        </div>
    );
};

export default CKEditorWrapper;
