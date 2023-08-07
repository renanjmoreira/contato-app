import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/models/pessoa.model';
import { ModalService } from 'src/services/modal.service';
import { PessoaService } from 'src/services/pessoa.service';

@Component({
  selector: 'app-lista-pessoas',
  templateUrl: './lista-pessoas.component.html',
  styleUrls: ['./lista-pessoas.component.css'],
})
export class ListaPessoasComponent implements OnInit {
  pessoas: Pessoa[] = [];
  modalAberta = false;

  constructor(
    private pessoaService: PessoaService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.modalService.modalOpen$.subscribe((modalAberta) => {
      if (!modalAberta) {
        this.carregarPessoas();
      }
      this.modalAberta = modalAberta;
    });
  }

  abrirModal(pessoa?: Pessoa): void {
    this.modalService.openModal(pessoa);
  }

  carregarPessoas(): void {
    this.pessoaService.getPessoas().subscribe((pessoas: Pessoa[]) => {
      this.pessoas = pessoas;
    });
  }

  removerPessoa(id: number) {
    this.pessoaService.excluirPessoa(id).subscribe(() => {
      this.carregarPessoas();
    });
  }
}
