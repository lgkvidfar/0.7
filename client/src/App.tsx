import React from 'react';
import { name } from './config';

function App() {
    return <h1>Hello RET!!!{process.env.NAME}</h1>;
}

export default App;
