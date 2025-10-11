import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Menu from "@/pages/Menu";
import SurvivorPerks from "@/pages/SurvivorPerks";
import KillerPerks from "@/pages/KillerPerks";
import Maps from "@/pages/Maps";
import Killers from "@/pages/Killers";
import Controller from "@/pages/Controller";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Menu} />
      <Route path="/survivor-perks" component={SurvivorPerks} />
      <Route path="/killer-perks" component={KillerPerks} />
      <Route path="/maps" component={Maps} />
      <Route path="/killers" component={Killers} />
      <Route path="/control" component={Controller} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
