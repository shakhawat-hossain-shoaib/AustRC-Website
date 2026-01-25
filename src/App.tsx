import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ActivitiesPage } from './components/ActivitiesPage';
import { GoverningPanelPage } from './components/GoverningPanelPage';
import { ResearchProjectsPage } from './components/ResearchProjectsPage';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { AboutPage } from './components/AboutPage';
import { EnthusiastAcquisitionPage } from './components/EnthusiastAcquisitionPage';
import { DevelopersPage } from './components/DevelopersPage';
import { AppDownloadPage } from './components/AppDownloadPage';
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
    <div className="relative min-h-screen bg-black overflow-x-hidden">
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
        {/* Dynamic Route for Governing Panel (Hall of Fame, Semesters) */}
        <Route path="/governing-panel/:panelId" element={<GoverningPanelPage />} />

        <Route path="/developers" element={<DevelopersPage />} />
        <Route path="/get-app" element={<AppDownloadPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAboutPage && <Footer theme="dark" />}
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