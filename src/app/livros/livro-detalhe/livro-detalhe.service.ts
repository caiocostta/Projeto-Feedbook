import { Injectable } from '@angular/core';
import { UsersService } from 'src/app/user-info/users.service';

@Injectable({
  providedIn: 'root'
})
export class LivroDetalheService {

  indexComments: any = 0

  ngOnInit(){
    this.salvarComment()
  }

  constructor(private userService: UsersService) {
    this.salvarComment()
   }

   salvarComment(){
    this.indexComments = localStorage.getItem('indexComments')
    this.indexComments = Number(this.indexComments)
    for(let i = 1; i <= this.indexComments; i++){
      let comments: any = localStorage.getItem(`comments${i}`)
      comments = JSON.parse(comments)
      this.userService.feedbacks.push(comments)
      console.log(this.userService.feedbacks)
    }
   }

  mostrarMais(limiteCaracter: number | boolean, livro: any, limitado: boolean | number){
    if(limiteCaracter == 350){
      limiteCaracter = livro.description.lenght
    }else{
      limiteCaracter = 350
    }
    limitado = !limitado
    let retorno = [limiteCaracter, limitado]
    return retorno
  }

  estrelaDisplay: boolean[]= [false, false, false, false, false]

  mostrarEstrela(indice: number){
    this.estrelaDisplay[indice] = true
    for(let i = indice; i >= 0; --i){
      this.estrelaDisplay[i] = true;
    }
    return this.estrelaDisplay
  }

  esconderEstrela(indice: number){
    if(this.estrelaDisplay[indice] == true){
      if(this.estrelaDisplay[indice + 1] == false || indice == 4){
        this.estrelaDisplay[indice] = false
      }else{
        for(let i = indice + 1; i < 5; ++i){

          this.estrelaDisplay[i] = false;
        }
      }
    }else{
      this.estrelaDisplay[indice] = false
      for(let i = indice; i >= 0; --i){
        this.estrelaDisplay[i] = false;
      }
    }
    return this.estrelaDisplay
  }

  enviarFeedback(user: any, estrelas: boolean[], comment: string, dataAtual: string, livroId: string){
    this.indexComments++
    localStorage.setItem('indexComments', this.indexComments.toString())
    let obj = JSON.stringify({data: dataAtual, descricao: comment, livroId: livroId, userId: user.usuario, estrelas: estrelas})
    localStorage.setItem(`comments${this.indexComments}`, obj.toString())
    let dbComment: any = localStorage.getItem(`comments${this.indexComments}`)
    estrelas = JSON.parse(dbComment).estrelas
    this.userService.feedbacks.push({data: dataAtual, descricao: comment, livroId: livroId, userId: user.usuario, curtidas: 0, naoGostei: 0, estrelas: estrelas})
  }

}

