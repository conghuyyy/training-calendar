import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TrainingCalendar from 'components/TrainingCalendar';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TrainingCalendar />
  </StrictMode>,
);
