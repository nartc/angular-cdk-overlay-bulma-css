import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicDialogContentDirective } from './dynamic-dialog-content.directive';
import { DynamicDialogComponent } from './dynamic-dialog.component';
import { DynamicDialogService } from './dynamic-dialog.service';


@NgModule({
  declarations: [DynamicDialogContentDirective, DynamicDialogComponent],
  imports: [
    CommonModule,
    OverlayModule
  ],
  providers: [DynamicDialogService],
  exports: [DynamicDialogComponent],
  entryComponents: [DynamicDialogComponent]
})
export class DynamicDialogModule {
}
