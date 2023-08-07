import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Pessoa } from 'src/models/pessoa.model';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PessoaService } from 'src/services/pessoa.service';
import { Contato, TipoContato } from 'src/models/contato.model';

@Component({
  selector: 'app-pessoa-modal',
  templateUrl: './modal-pessoa.component.html',
  styleUrls: ['./modal-pessoa.component.css'],
})
export class ModalPessoaComponent {
  pessoa: Pessoa | null = null;
  formPessoa: FormGroup;

  constructor(
    private pessoaService: PessoaService,
    private modalService: ModalService,
    private formBuilder: FormBuilder
  ) {
    this.modalService.modalData$.subscribe((pessoa) => {
      this.pessoa = pessoa;
    });
  }

  ngOnInit() {
    this.formPessoa = this.formBuilder.group({
      id: this.formBuilder.control(this.pessoa?.id || null),
      nome: this.formBuilder.control(this.pessoa?.nome),
      contatos: this.formBuilder.array([]),
    });

    this.patch();
  }

  patch() {
    const control = <FormArray>this.formPessoa.get('contatos');
    this.pessoa?.contatos.forEach((x) => {
      control.push(this.patchValues(x.tipoContato, x.valor));
    });
  }

  patchValues(tipoContato: TipoContato, valor: string) {
    return this.formBuilder.group({
      tipoContato: [tipoContato],
      valor: [valor],
    });
  }

  fecharModal(): void {
    this.modalService.closeModal();
  }

  submit(data: any): void {
    if (!this.formPessoa.valid) {
      return;
    }

    if (!this.pessoa?.id) {
      this.pessoaService.criarPessoa(data).subscribe(() => {
        this.fecharModal();
      });
    } else {
      this.pessoaService
        .atualizarPessoa(this.pessoa?.id ?? 0, data)
        .subscribe(() => {
          this.fecharModal();
        });
    }
  }

  adicionarContato() {
    const control = <FormArray>this.formPessoa.get('contatos');
    control.push(this.patchValues(TipoContato.Telefone, ''));
  }

  get formContatos() {
    return <FormArray>this.formPessoa.get('contatos');
  }
}
