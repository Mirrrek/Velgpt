import App from '@components/App';
import ErrorLayout from '@components/layouts/ErrorLayout';
import '@client/global.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

function main() {
    const errorBoundary = React.createElement(ErrorBoundary, { fallback: React.createElement(ErrorLayout) }, React.createElement(App));
    ReactDOM.createRoot(document.getElementById('app')!).render(errorBoundary);
}

main();
