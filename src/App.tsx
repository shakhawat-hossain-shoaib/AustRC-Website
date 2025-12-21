import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ActivitiesPage } from './components/ActivitiesPage';
import { GoverningPanelHallOfFame } from './components/GoverningPanelHallOfFame';
import { GoverningPanelSemester } from './components/GoverningPanelSemester';
import { ResearchProjectsPage } from './components/ResearchProjectsPage';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { AboutPage } from './components/AboutPage';
import { EnthusiastAcquisitionPage } from './components/EnthusiastAcquisitionPage';
import { Footer } from './components/Footer';
import { CursorGlow } from './components/CursorGlow';

// Sub-Pages
import { EventsPage } from './components/activities/EventsPage';
import { AchievementsPage } from './components/activities/AchievementsPage';
import { SocialActivitiesPage } from './components/activities/SocialActivitiesPage';
import { EducationalActivitiesPage } from './components/activities/EducationalActivitiesPage';
import { EventWebsitePage } from './components/activities/EventWebsitePage';

// ✅ THIS IMPORT IS VITAL
import { ActivityDetailPage } from './components/activities/ActivityDetailPage';

function AppContent() {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

  return (
    <div className="min-h-screen bg-black">
      <CursorGlow />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/events" element={<EventsPage />} />
        <Route path="/activities/achievements" element={<AchievementsPage />} />
        <Route path="/activities/social-activities" element={<SocialActivitiesPage />} />
        <Route path="/activities/educational-activities" element={<EducationalActivitiesPage />} />
        <Route path="/activities/event-website" element={<EventWebsitePage />} />

        {/* ✅ THE DYNAMIC ROUTE FOR DETAIL PAGES */}
        <Route path="/activity/:category/:id" element={<ActivityDetailPage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/enthusiast-acquisition" element={<EnthusiastAcquisitionPage />} />
        <Route path="/research-projects" element={<ResearchProjectsPage />} />
        <Route path="/research-projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="/governing-panel/hall-of-fame" element={<GoverningPanelHallOfFame />} />
        <Route path="/governing-panel/fall-2024" element={<GoverningPanelSemester semester="Fall" year="2024" />} />
        <Route path="/governing-panel/spring-2024" element={<GoverningPanelSemester semester="Spring" year="2024" />} />
        <Route path="/governing-panel/fall-2023" element={<GoverningPanelSemester semester="Fall" year="2023" />} />
        <Route path="/governing-panel/spring-2023" element={<GoverningPanelSemester semester="Spring" year="2023" />} />
        <Route path="/governing-panel/fall-2022" element={<GoverningPanelSemester semester="Fall" year="2022" />} />
        <Route path="/governing-panel/spring-2022" element={<GoverningPanelSemester semester="Spring" year="2022" />} />
        <Route path="/governing-panel/fall-2021" element={<GoverningPanelSemester semester="Fall" year="2021" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer theme={isAboutPage ? 'light' : 'dark'} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}