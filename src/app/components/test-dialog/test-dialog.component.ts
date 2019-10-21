import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from '../../dynamic-dialog/dynamic-dialog-ref';
import { DynamicDialogConfig } from '../../dynamic-dialog/dynamic-dialog.config';

@Component({
  selector: 'app-test-dialog',
  templateUrl: './test-dialog.component.html',
})
export class TestDialogComponent implements OnInit {

  constructor(private readonly dialogRef: DynamicDialogRef<string>, private readonly dialogConfig: DynamicDialogConfig) {
  }

  ngOnInit() {
    // this.dialogConfig.header = this.constructor.name;
  }

  onClose() {
    this.dialogRef.close('close from test dialog');
  }
}
