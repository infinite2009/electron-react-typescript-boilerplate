import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import DevPage from '@/views/dev-page';


import './styles/mixin.less';

export default function App() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={DevPage} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    );
}
