import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ProdutosService } from './services/produtos.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { EditarProdutoComponent } from './pages/editar-produto/editar-produto.component';
import { CurrencyMaskModule } from "ng2-currency-mask";



const routes: Routes = [
  {path:'produtos', component: ProdutosComponent},
  {path:'' , component: HomeComponent},
  {path:'cadastrar' , component: CadastroProdutoComponent},
  {path: 'produtos/edit/:id', component: EditarProdutoComponent}
  
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProdutosComponent,
    HomeComponent,
    CadastroProdutoComponent,
    EditarProdutoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule, 
    ReactiveFormsModule,
    CurrencyMaskModule
  ],
  providers: [ProdutosService],
  bootstrap: [AppComponent]

})
export class AppModule { }
