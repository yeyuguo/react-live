import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { DemoApp } from "./app";
import MyRenderComponent from './render-code'

import parseComponentCode from './parse-code'



const code = `
function handleClick() {
  console.log("Hi there!");
}
const HelloWorld = () => (
  <button onClick={handleClick}>
    Hello World
  </button>
);
render(<HelloWorld />);
`.trim();



const codeStyle = `
const headerProps = {text: '测试文本'}
const Header = styled.div\`
  color: palevioletred;
  font-size: 18px;
\`

render(<Header>{headerProps.text}</Header>)
`


const arcoCode = `
render(<Button type="primary">Hello Arco</Button>)
`

const arcoTable = `const columns: TableColumnProps[] = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];
const data = [
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com',
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
  },
  {
    key: '4',
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com',
  },
  {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
];



render(<Table columns={columns} data={data} />)
`


const renderImportCode = `
// ast 移除
import React from 'react';
import { Table, TableColumnProps } from '@arco-design/web-react';

const columns: TableColumnProps[] = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];
const data = [
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com',
  },
];

// ast 移除
const App = () => {
  return <Table columns={columns} data={data} />;
};

export default App

`
const removeImportExport = parseComponentCode(renderImportCode)
const renderCode = `${removeImportExport.body}
render(<App />)
`
console.log("🚀 ~ file: main.tsx:146 ~ renderCode:", renderCode)
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DemoApp code={renderCode} />
  </React.StrictMode>
);
