import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    //em um aplicação da vida real, mandaríamos para algum servidor de log de erros
    //ao invés de simplesmente exibir no console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      //Um erro no cliente ou rede aconteceu.
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      //O backend retornou um código de insucesso.
      //O corpo da resposta pode conter dicas do que deu errado.
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
