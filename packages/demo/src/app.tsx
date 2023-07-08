import { LiveProvider, LiveEditor, LivePreview, LiveError } from "react-live";

import styled from 'styled-components';

import * as Arco from "@arco-design/web-react"
import "@arco-design/web-react/dist/css/arco.css";


// 公共作用域
const scope = {
  ...Arco,
  styled,
};

// const code = `
// function handleClick() {
//   console.log("Hi there!");
// }
// const HelloWorld = () => (
//   <button onClick={handleClick}>
//     Hello World
//   </button>
// );
// render(<HelloWorld />);
// `.trim();

interface ILiveProps {
  code: string,
  myScope?: Record<string, any>
}

export const DemoApp = ({ code, myScope }: ILiveProps) => {
  // const renderCodeString = `render(${code})`
  const renderScope = {
    ...scope,
    ...myScope
  }
  console.log("🚀 ~ file: app.tsx:38 ~ DemoApp ~ renderScope:", renderScope)
  return (
    <div>
      <LiveProvider code={code} scope={renderScope} noInline
        transformCode={(codeString: string) => {
          console.log("🚀 ~ file: app.tsx:43 ~ DemoApp ~ codeString:", codeString)
          return codeString
        }}
      >
        <div className="grid lg:grid-cols-2 gap-4">
          <LiveEditor className="font-mono" />
          <LivePreview />
        </div>
        <LiveError className="text-red-800 bg-red-100 mt-2" />
      </LiveProvider>
    </div>
  );
};
