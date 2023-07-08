// @ts-nocheck

import { parse } from '@babel/parser';
import generate from '@babel/generator';
import {transform } from '@babel/standalone';
// import { parse, transform, generate } from '@babel/standalone';
console.log("🚀 ~ file: parse-code.tsx:8 ~ process:", process)
export default function parseComponentCode(code) {

  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'tsx', 'typescript']
  });
  console.log("🚀 ~ file: parse-code.tsx:13 ~ parseComponentCode ~ ast:", ast)

  // const object = transform(code, {
  //   presets: ['env', 'react', 'typescript']
  // })
  
  
  const imports = [];
  const exports = [];
  const exportsDefault = []
  let codeBody = '';

  ast.program.body.forEach(node => {
    if (node.type === 'ImportDeclaration') {
      imports.push(generate(node).code);
    } else if (node.type === 'ExportNamedDeclaration') {
      exports.push(generate(node).code)
    } else if (node.type === 'ExportDefaultDeclaration') {
      exportsDefault.push({
        sourceCode: generate(node).code,
        name: node.declaration.name,
      })
    } else {
      codeBody += generate(node).code + '\n';
    }
  });

  const result = {
    imports,
    exports,
    body:codeBody,
    exportsDefault
  }
  console.log("🚀 ~ file: parse-code.tsx:44 ~ parseComponentCode ~ result:", result)

  return result;

}


const testCode = `
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
  }
];

const App = () => {
  return <Table columns={columns} data={data} />;
};

export default App;
`
// parseComponentCode(testCode)


