export enum TipoContato {
  Telefone = 'Telefone',
  Email = 'Email',
  Whatsapp = 'Whatsapp',
}

export class Contato {
  tipo: TipoContato | undefined;
  valor: string | undefined;
}
