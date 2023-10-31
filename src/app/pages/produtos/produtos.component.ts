import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProdutos } from 'src/app/interfaces/IProduto';
import { ProdutosService } from 'src/app/services/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  dadosProduto: any;

  constructor(private ProodutoService: ProdutosService) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.ProodutoService.getProdutoData().subscribe((data) => {
      this.dadosProduto = data
    });
  }
  excluirProduto(id: number) {
    Swal.fire({
      title: 'Confirmação',
      text: 'Tem certeza que deseja excluir este produto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ProodutoService.excluirProduto(id).subscribe(
          () => {
            Swal.fire('Sucesso', 'Produto excluído com sucesso', 'success');
            this.carregarProdutos();
          },  (error) =>{
            console.log('Erro ao tenar excluir', error);
            Swal.fire('Erro', 'Não foi possível excluir o produto',)
          }
        );
      }
    });
  }
}
