import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QuestionsProvider } from './contexts/QuestionsContext.tsx';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <QuestionsProvider>
    <App />
  </QuestionsProvider>
);