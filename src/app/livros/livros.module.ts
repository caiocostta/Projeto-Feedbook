import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivrosComponent } from '../livros.component';
import { LivroDetalheComponent } from '../livro-detalhe/livro-detalhe.component';
import { LivroNaoEncontradoComponent } from '../livro-nao-encontrado/livro-nao-encontrado.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LivrosService } from '../livros/livros.service';



@NgModule({
  declarations: [
    LivrosComponent,
    LivroDetalheComponent,
    LivroNaoEncontradoComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers:[
    LivrosService
  ]
})
export class LivroModule { }
