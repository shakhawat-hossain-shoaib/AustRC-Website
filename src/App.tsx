import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ActivitiesPage } from './components/ActivitiesPage';
import { GoverningPanelPage } from './components/GoverningPanelPage';
import { HallOfFamePage } from './components/HallOfFamePage';
import { ResearchProjectsPage } from './components/ResearchProjectsPage';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { AboutPage } from './components/AboutPage';
import { EnthusiastAcquisitionPage } from './components/EnthusiastAcquisitionPage';
import { DevelopersPage } from './components/DevelopersPage';
import { AppDownloadPage } from './components/AppDownloadPage';
import { Footer } from './components/Footer';
import { CursorGlow } from './components/CursorGlow';
import { ContactPage } from './components/ContactPage';
import { FindAustrcIdPage } from './components/FindAustrcIdPage';
import NoticesPage from './components/NoticesPage';
// Sub-Pages
import { EventsPage } from './components/activities/EventsPage';
import { AchievementsPage } from './components/activities/AchievementsPage';
import { SocialActivitiesPage } from './components/activities/SocialActivitiesPage';
import { EducationalActivitiesPage } from './components/activities/EducationalActivitiesPage';
import { EventWebsitePage } from './components/activities/EventWebsitePage';
import { EventDetailPage } from './components/activities/EventDetailPage';
import { AchievementDetailPage } from './components/activities/AchievementDetailPage';

// ✅ THIS IMPORT IS VITAL
import { ActivityDetailPage } from './components/activities/ActivityDetailPage';
import { CollaborationsPage } from './components/CollaborationsPage';
import { SponsorsPage } from './components/SponsorsPage';


// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <ScrollToTop />
      <CursorGlow />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/events" element={<EventsPage />} />
        <Route path="/activities/events/:eventSlug" element={<EventDetailPage />} />
        <Route path="/activities/achievements" element={<AchievementsPage />} />
        <Route
          path="/activities/social-activities"
          element={<SocialActivitiesPage />}
        />
        <Route
          path="/activities/educational-activities"
          element={<EducationalActivitiesPage />}
        />
        <Route
          path="/activities/event-website"
          element={<EventWebsitePage />}
        />
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="/collaborations" element={<CollaborationsPage />} />
        <Route path="/activities/achievements/:achievementSlug" element={<AchievementDetailPage />} />
        <Route path="/activities/social-activities" element={<SocialActivitiesPage />} />
        <Route path="/activities/educational-activities" element={<EducationalActivitiesPage />} />
        <Route path="/activities/event-website" element={<EventWebsitePage />} />
        <Route path="/notices" element={<NoticesPage />} />
        {/* ✅ THE DYNAMIC ROUTE FOR DETAIL PAGES */}
        <Route
          path="/activity/:category/:id"
          element={<ActivityDetailPage />}
        />

        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/enthusiast-acquisition"
          element={<EnthusiastAcquisitionPage />}
        />
        <Route path="/research-projects" element={<ResearchProjectsPage />} />
        <Route
          path="/research-projects/:projectSlug"
          element={<ProjectDetailPage />}
        />
        {/* Hall of Fame Route */}
        <Route path="/hall-of-fame" element={<HallOfFamePage />} />
        {/* Dynamic Route for Governing Panel (Semesters) */}
        <Route
          path="/governing-panel/:panelId"
          element={<GoverningPanelPage />}
        />

        <Route path="/developers" element={<DevelopersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/get-app" element={<AppDownloadPage />} />
        <Route path="/find-austrc-id" element={<FindAustrcIdPage />} />
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