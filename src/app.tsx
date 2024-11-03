import { Router, Route } from "@solidjs/router";
import { Suspense } from "solid-js";
import "~/app.css";

import DashboardLayout from '~/routes/dashboard/layout';
import DashboardPage from '~/routes/dashboard/index';
import CustomersPage from '~/routes/dashboard/customers';
import InvoicesPage from '~/routes/dashboard/invoices';

export default function App() {
  return (
    <Router
      root={props => (
        <Suspense>{props.children}</Suspense>
      )}
    >
      <Route path="/dashboard" component={DashboardLayout}>
        <Route path="/" component={DashboardPage} />          
        <Route path="/customers" component={CustomersPage} /> 
        <Route path="/invoices" component={InvoicesPage} /> 
      </Route>
    </Router>
  );
}
