export class Utilizador {
  uuid?: string;
  username?: string;
  email?: string;
  password?: string;
  owner: boolean = false
  isActivo?: boolean;
  token?: string;
  tipo_user: number = 0
  permissions!: string[];
  roles!: string[];
  areaId!: number;
}
