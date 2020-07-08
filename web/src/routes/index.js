import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

import Encomendas from '../pages/Encomendas';
import CadEncomendas from '../pages/Encomendas/Cadastro';
import AltEncomendas from '../pages/Encomendas/Alteracao';

import Entregadores from '../pages/Entregadores';
import CadEntregadores from '../pages/Entregadores/Cadastro';
import AltEntregadores from '../pages/Entregadores/Alteracao';

import Destinatarios from '../pages/Destinatarios';
import CadDestinatarios from '../pages/Destinatarios/Cadastro';
import AltDestinatarios from '../pages/Destinatarios/Alteracao';

import Problemas from '../pages/Problemas';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/dashboard" isPrivate component={Dashboard} />

        <Route path="/encomendas" exact isPrivate component={Encomendas} />
        <Route
          path="/encomendas/cadastro"
          isPrivate
          exact
          component={CadEncomendas}
        />
        <Route
          path="/encomendas/alteracao/:id"
          isPrivate
          exact
          component={AltEncomendas}
        />

        <Route path="/entregadores" exact isPrivate component={Entregadores} />
        <Route
          path="/entregadores/cadastro"
          isPrivate
          exact
          component={CadEntregadores}
        />
        <Route
          path="/entregadores/alteracao/:id"
          isPrivate
          exact
          component={AltEntregadores}
        />

        <Route
          path="/destinatarios"
          exact
          isPrivate
          component={Destinatarios}
        />
        <Route
          path="/destinatarios/cadastro"
          exact
          isPrivate
          component={CadDestinatarios}
        />
        <Route
          path="/destinatarios/alteracao/:id"
          exact
          isPrivate
          component={AltDestinatarios}
        />

        <Route path="/problemas" isPrivate component={Problemas} />
      </Switch>
    </BrowserRouter>
  );
}
