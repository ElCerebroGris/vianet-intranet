import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdministracaoComponent } from './components/administracao/administracao.component';
import { PainelComponent } from './components/painel/painel.component';
import { PessoasComponent } from './components/pessoas/pessoas.component';
import { ProcessosComponent } from './components/processos/processos.component';
import { ArquivosComponent } from './components/arquivos/arquivos.component';
import { EspacoComponent } from './components/espaco/espaco.component';
import { ProjectosComponent } from './components/projectos/projectos.component';
import { ProcessosNovoComponent } from './components/processos/processos-novo/processos-novo.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { NoticiaisComponent } from './components/noticiais/noticiais.component';
import { NoticiaAddComponent } from './components/noticiais/noticia-add/noticia-add.component';
import { PessoasAddComponent } from './components/administracao/pessoas-add/pessoas-add.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'processos'
  },
  {
    path: 'painel',
    component: PainelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdministracaoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/pessoas-add',
    component: PessoasAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pessoas',
    component: PessoasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'processos',
    component: ProcessosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'processo-novo',
    component: ProcessosNovoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'arquivos/:idProcesso',
    component: ArquivosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'espaco',
    component: EspacoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projectos',
    component: ProjectosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'noticias',
    component: NoticiaisComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'noticia-novo',
    component: NoticiaAddComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
