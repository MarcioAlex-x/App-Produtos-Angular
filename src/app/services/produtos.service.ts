import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';
import { IProdutos } from '../interfaces/IProduto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private apiUrl = 'http://localhost:8080/api/produtos';

  constructor(private http: HttpClient) { }

  getProdutoData() {
    return this.http.get<any>(this.apiUrl).pipe(
      tap(data => console.log('Dados recebidos:', data)),
      catchError(error => {
        console.error('Erro ao receber dados:', error);
        throw error;
      })
    );
  }

  cadastroProduto(produto: IProdutos) {
    return this.http.post<IProdutos>(this.apiUrl, produto)
  }

  getProduto(id:number){
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IProdutos>(url);
  }

  excluirProduto(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  atualizarProduto(id: number, produto: IProdutos) {
    return this.http.put<IProdutos>(`${this.apiUrl}/${id}`, produto);
  }
  
  
}
