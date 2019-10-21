import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import {TestDialogComponent} from './components/test-dialog/test-dialog.component';
import {DynamicDialogModule} from './dynamic-dialog/dynamic-dialog.module';

@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule, FormsModule, DynamicDialogModule ],
  declarations: [ AppComponent, HelloComponent, TestDialogComponent ],
  bootstrap:    [ AppComponent ],
  entryComponents: [TestDialogComponent]
})
export class AppModule { }
