import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from './users.service';
import { AuthService } from './login/auth.service';
import { Usuario } from './login/usuario';
import { ConsultaApiService } from '../livros/consulta-api.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  botaoEditar: boolean | string | null= false;
  user: any;
  nomeUsuario: string = '';
  usuarioLogado: Usuario | any = '';

  isActive: string = 'info'
  feedbacks: any;
  livrosFavoritos: any;
  livroFeedback: any = [];
  indexLivro: number = 0

  constructor(private userService: UsersService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private consultaApi: ConsultaApiService) {
    this.route.params.subscribe((params: any) => {
      this.nomeUsuario = params.nomeUsuario
      this.user = this.userService.getUser(this.nomeUsuario)


      this.usuarioLogado = localStorage.getItem('usuario')
      this.usuarioLogado = JSON.parse(this.usuarioLogado)?.usuario
      if(this.nomeUsuario == this.usuarioLogado){
        this.botaoEditar = localStorage.getItem('mostrarMenu')
      }else{
        this.botaoEditar = false
      }
    })
   }

   getFavoritos(){
    this.isActive = 'fav'
    this.livrosFavoritos = []
    for(let livroF of this.user.livrosFavoritos){
      this.consultaApi.calloutServiceOnly(livroF).subscribe((livro) => {
        this.livrosFavoritos.push(livro)
        console.log(this.livrosFavoritos)
      })
    }
   }

   getFeedbacks(){
    this.isActive = 'feed'
    this.feedbacks = this.userService.getFeedbackByUser(this.user.usuario)
    this.livroFeedback.shift()
    for(let feedback of this.feedbacks){
      this.consultaApi.calloutServiceOnly(feedback.livroId).subscribe((livroFeedback: any) => {
        let livros: any = [];
        this.livroFeedback.push(livroFeedback)
        for(let livro of this.livroFeedback){
          delete livro.etag
          delete livro.kind
          delete livro.saleInfo
          delete livro.selfLink
          delete livro.accessInfo


          for(let i = 0; i <= this.livroFeedback.length; i++){
            for(let index = -1; index <= i; index++){
              if(this.livroFeedback[i]?.id == this.livroFeedback[index]?.id && i != index){
                this.livroFeedback.splice(i, 1)
              }
            }
          }
          console.log(this.livroFeedback)
        }
      })
    }


  }

  ngOnInit(): void {
    this.authService.mostrarMenuEmitter.subscribe(v => {
      if(this.nomeUsuario == this.usuarioLogado){
        this.botaoEditar = v
      }else{
        this.botaoEditar = false
      }
    })
    if(this.nomeUsuario != this.usuarioLogado){
      this.botaoEditar = false
    }else{
      this.botaoEditar = localStorage.getItem('userAutenticated')
    }
  }



}
