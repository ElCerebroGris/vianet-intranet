import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdministracaoComponent } from './components/administracao/administracao.component';
import { PainelComponent } from './components/painel/painel.component';
import { PessoasComponent } from './components/pessoas/pessoas.component';
import { ProcessosComponent } from './components/processos/processos.component';
import { ArquivosComponent } from './components/arquivos/arquivos.component';

const routes: Routes = [
  {
    path: '',
    component: PainelComponent,
  },
  {
    path: 'admin',
    component: AdministracaoComponent,
  },
  {
    path: 'pessoas',
    component: PessoasComponent,
  },
  {
    path: 'processos',
    component: ProcessosComponent,
  },
  {
    path: 'arquivos',
    component: ArquivosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
