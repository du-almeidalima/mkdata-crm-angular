export class User {
  constructor(
    public name: string,
    public id: string,
    public username: string,
    public tokenType: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  // Verificando se a sessão expirou
  get token(): string {
    if (!this._tokenExpirationDate || (new Date() > this._tokenExpirationDate)) {
      return null;
    }

    return this._token;
  }
}
