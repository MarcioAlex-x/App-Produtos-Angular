import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProdutos } from 'src/app/interfaces/IProduto';
import { ProdutosService } from 'src/app/services/produtos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})

export class CadastroProdutoComponent implements OnInit {
  
  form!: FormGroup;

  constructor(private ProodutoService: ProdutosService, private router: ActivatedRoute, private formBuilder: FormBuilder, private rout: Router ) { 
    
  }

  ngOnInit(): void {
    this.createForm();
  
  }

  onSubmit(): void{
    this.cadastrar()
  }

  createForm(data?: IProdutos): void {
    this.form = this.formBuilder.group({
      codigoBarras: new FormControl(data ? data.codigoBarras : null, [Validators.required]),
      nome: new FormControl(data ? data.nome : null, [Validators.required]),
      preco: new FormControl(data ? data.preco : null, [Validators.required])
    })
  }

  cadastrar():void{
    this.ProodutoService.cadastroProduto(this.form.getRawValue()).subscribe((res)=>{
      Swal.fire('Sucesso','Produto cadastrado com sucesso','success')
      this.form.reset()
      this.rout.navigate(['/produtos'])
    },(error)=>{
      Swal.fire('Erro', 'Não foi possível cadastrar o produto','error')
    });
  }
}
