import { Contato } from './contato.model';

export class Pessoa {
  id: number | undefined;
  nome: string | undefined;
  contatos: Contato[] | undefined;
}
