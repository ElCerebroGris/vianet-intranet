import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AdministracaoComponent } from './components/administracao/administracao.component';
import { PainelComponent } from './components/painel/painel.component';
import { PessoasComponent } from './components/pessoas/pessoas.component';
import { ProcessosComponent } from './components/processos/processos.component';
import { ArquivosComponent } from './components/arquivos/arquivos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdministracaoComponent,
    PainelComponent,
    PessoasComponent,
    ProcessosComponent,
    ArquivosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
