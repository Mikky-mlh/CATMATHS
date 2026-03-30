import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { TopicPage } from './pages/TopicPage';
import { CheatSheet } from './pages/CheatSheet';
import { CustomTest } from './pages/CustomTest';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="topic/:topicId" element={<TopicPage />} />
          <Route path="cheat-sheet" element={<CheatSheet />} />
          <Route path="custom-test" element={<CustomTest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
