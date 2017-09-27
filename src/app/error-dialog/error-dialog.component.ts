import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {
  constructor(
    @Inject(MD_DIALOG_DATA) public data : any
  ) { }

  ngOnInit() {
  }

}
