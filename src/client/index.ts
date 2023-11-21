import App from '@components/App';
import '@client/global.css';
import test from '@shared/test';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

function main() {
    test();

    ReactDOM.createRoot(document.getElementById('app')!).render(React.createElement(App));
}

main();
