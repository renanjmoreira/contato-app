import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa.model';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private baseUrl = 'https://localhost:7200/api/pessoa';

  constructor(private http: HttpClient) {}

  getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.baseUrl);
  }

  getPessoa(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.baseUrl}/${id}`);
  }

  criarPessoa(pessoa: Pessoa): Observable<any> {
    return this.http.post<any>(this.baseUrl, pessoa);
  }

  atualizarPessoa(id: number, pessoa: Pessoa): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, pessoa);
  }

  excluirPessoa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
