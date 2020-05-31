import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>Você realmente deseja realizar esta ação?</h2>
    <mat-dialog-content class="mat-typography">
      <p>Esta ação não terá volta</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial color="warn">Excluir</button>
    </mat-dialog-actions>
  `,
  styles: [
  ]
})
export class ConfirmDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
