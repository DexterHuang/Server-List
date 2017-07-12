import { InterfaceButton } from './../Model/InterfaceButton';
import { Component, OnInit } from '@angular/core';
import { MdDialogModule, MdDialogRef } from '@angular/material';
@Component({
  selector: 'app-custom-md-dialog',
  templateUrl: './custom-md-dialog.component.html',
  styleUrls: ['./custom-md-dialog.component.css']
})
export class CustomMdDialogComponent implements OnInit {
  title = 'Title';
  message = 'What do you want to say?'
  buttons: InterfaceButton[] = [];
  constructor(public dialogRef: MdDialogRef<CustomMdDialogComponent>) { }

  ngOnInit() {
  }

}
