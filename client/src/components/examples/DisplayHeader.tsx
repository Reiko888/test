import DisplayHeader from '../DisplayHeader';
import { Router, Route } from 'wouter';

export default function DisplayHeaderExample() {
  return (
    <Router>
      <DisplayHeader />
      <Route path="/killer-perks">
        <div className="p-8 text-center text-muted-foreground">Killer Perks Page</div>
      </Route>
    </Router>
  );
}
