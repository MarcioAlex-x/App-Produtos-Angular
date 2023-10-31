import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProdutos } from 'src/app/interfaces/IProduto';
import { ProdutosService } from 'src/app/services/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {

  form!: FormGroup;
  produtoId!: number;

  constructor(private produtoService: ProdutosService, private ActivatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router){}

  ngOnInit(): void {
    this.produtoId = this.ActivatedRoute.snapshot.params['id'];
    this.createForm();
    this.loadProdutoData();
  }

  onSubmit(): void{
    this.atualizarProduto();
  }

  // atualizarProduto

  createForm(data?: IProdutos): void {
    this.form = this.formBuilder.group({
      codigoBarras: new FormControl(data ? data.codigoBarras : null, [Validators.required]),
      nome: new FormControl(data ? data.nome : null, [Validators.required]),
      preco: new FormControl(data ? data.preco : null, [Validators.required])
    })
  }

  loadProdutoData():void{
    this.produtoService.getProduto(this.produtoId).subscribe((data:IProdutos)=>{
      this.form.patchValue(data);
    });
  }

  atualizarProduto(): void {
    this.produtoService.atualizarProduto(this.produtoId, this.form.getRawValue()).subscribe(
      (res) => {
        Swal.fire('Sucesso', 'Produto atualizado com sucesso', 'success');
        this.router.navigate(['/produtos']);
      },
      (error) => {
        Swal.fire('Erro', 'Não foi possível atualizar o produto', 'error');
      }
    );
  }

}
