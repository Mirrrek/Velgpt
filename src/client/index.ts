import App from '@components/App';
import '@client/global.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

function main() {
    ReactDOM.createRoot(document.getElementById('app')!).render(React.createElement(App));
}

main();
