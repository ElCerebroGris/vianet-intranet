import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AdministracaoComponent } from './components/administracao/administracao.component';
import { PainelComponent } from './components/painel/painel.component';
import { PessoasComponent } from './components/pessoas/pessoas.component';
import { ProcessosComponent } from './components/processos/processos.component';
import { ArquivosComponent } from './components/arquivos/arquivos.component';
import { EspacoComponent } from './components/espaco/espaco.component';
import { ProjectosComponent } from './components/projectos/projectos.component';
import { ProcessosNovoComponent } from './components/processos/processos-novo/processos-novo.component';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptor } from './helpers/JwtInterceptor';
import { GeneralService } from './services/general.service';
import { AuthGuard } from './helpers/auth.guard';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NoticiaisComponent } from './components/noticiais/noticiais.component';
import { NoticiaAddComponent } from './components/noticiais/noticia-add/noticia-add.component';
import { PessoasAddComponent } from './components/administracao/pessoas-add/pessoas-add.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdministracaoComponent,
    PainelComponent,
    PessoasComponent,
    ProcessosComponent,
    ArquivosComponent,
    EspacoComponent,
    ProjectosComponent,
    ProcessosNovoComponent,
    LoginComponent,
    NoticiaisComponent,
    NoticiaAddComponent,
    PessoasAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard, GeneralService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
