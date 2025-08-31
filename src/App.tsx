import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuestProvider } from "./contexts/QuestContext";
import WelcomePage from "./pages/WelcomePage";
import HeartPuzzlePage from "./pages/HeartPuzzlePage";
import MemoryMatchPage from "./pages/MemoryMatchPage";
import BalloonPopPage from "./pages/BalloonPopPage";
import FinalSurprisePage from "./pages/FinalSurprisePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <QuestProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/heart-puzzle" element={<HeartPuzzlePage />} />
            <Route path="/memory-match" element={<MemoryMatchPage />} />
            <Route path="/balloon-pop" element={<BalloonPopPage />} />
            <Route path="/final-surprise" element={<FinalSurprisePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QuestProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
