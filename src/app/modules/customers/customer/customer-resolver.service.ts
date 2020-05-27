import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

/* Essa classe assegura que sempre que um cliente é visitado ele esteja carregado no estado */
@Injectable({
  providedIn: 'root'
})
export class CustomerResolverService implements Resolve<void>{

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    return undefined;
  }
}
