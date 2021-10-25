import { Endereco } from "../Geral/Endereco";
import { TipoUsuario } from "./TipoUsuario";

export class Usuario implements Shared.IEntity {
  id!: string;
  nome!: string;
  cpf!: string;
  datacriacao!: Date;
  ativo!: boolean;
  email!: string;
  telefone!: string;
  endereco!: Endereco;
  datanascimento!: Date;
  tipo!: TipoUsuario;
  senha!: string;

  constructor(model?: Usuario) {
    if (!model) return;
    this.id = model.id;
    this.nome = model.nome;
    this.cpf = model.cpf;
    this.datacriacao = model.datacriacao;
    this.ativo = model.ativo;
    this.email = model.email;
    this.telefone = model.telefone;
    this.endereco = model.endereco;
    this.datanascimento = model.datanascimento;
    this.tipo = model.tipo;
    this.senha = model.senha;
  }
}
