import React from 'react'
import { Route, Switch } from "react-router-dom";
import Cadastro from './pages/Cadastro';
import ChangePassword from './pages/ChangePassword';
import Login from './pages/Login';
import Loja from './pages/Loja';
import Produtos from './pages/Produtos';
import Teste from './pages/Teste';

const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={Loja} />
            <Route path='/cadastro' component={Cadastro} />
            <Route path='/login' component={Login} />
            <Route path='/teste' component={Teste} />
            <Route path='/produtos/:produto' component={Produtos} />
            <Route path='/trocarSenha/:token' component={ChangePassword} />
        </Switch>
    )
}

export default Routes