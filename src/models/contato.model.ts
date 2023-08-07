export enum TipoContato {
  Telefone = 'Telefone',
  Email = 'Email',
  Whatsapp = 'Whatsapp',
}

export class Contato {
  tipoContato: TipoContato;
  valor: string;
}
