import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [MatDialogModule, MatButtonModule, NgIf],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {

  message!: string; //will get value later
  title!: string; //will get value later
  type!: string; //will get value later

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {
    this.message = data.message;
    this.title = data.title;
    this.type = data.type;
  }

  confirmClick(clicked: boolean) {
    this.dialogRef.close(clicked)
  }


}
