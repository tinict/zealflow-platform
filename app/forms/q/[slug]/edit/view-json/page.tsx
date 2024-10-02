"use client";

import { useState } from 'react';
import ReactJson from 'react-json-view';

export default function Page({ ...props }) {
  const { jsonData } = props;
  const [json, setJson] = useState(jsonData);

  const handlePaste = (e: any) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('Text');

    try {
      const parsedJson = JSON.parse(pastedData);
      setJson(parsedJson);
    } catch (error) {
      alert('Invalid JSON format');
    }
  };

  return (
    <section className="col-span-12 xl:col-span-6 lg:col-span-8 md:col-span-10 sm:col-span-12 md:col-start-2 sm:col-start-0 lg:col-start-3 xl:col-start-4 col-start-1">
      <div
        onPaste={handlePaste}
        contentEditable="true"
        suppressContentEditableWarning={true}
        className='h-full w-full bg-black'
      >
        <ReactJson
          src={json}
          onEdit={(edit) => setJson(edit.updated_src)}
          onAdd={(edit) => setJson(edit.updated_src)}
          onDelete={(edit) => setJson(edit.updated_src)}
          theme="twilight"
          enableClipboard={true}
        />
      </div>
    </section>
  );
};
