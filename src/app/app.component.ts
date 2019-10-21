import { Component } from '@angular/core';
import { DynamicDialogConfig } from './dynamic-dialog/dynamic-dialog.config';
import { DynamicDialogService } from './dynamic-dialog/dynamic-dialog.service';
import {TestDialogComponent} from './components/test-dialog/test-dialog.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  constructor(private readonly dynamicDialogService: DynamicDialogService) {
  }

  showOverlay() {
    const dialogConfig = new DynamicDialogConfig();
    dialogConfig.header = TestDialogComponent.name;
    const ref = this.dynamicDialogService.open<string>(TestDialogComponent, dialogConfig);
    ref.afterClosed.subscribe(data => {
      console.log('close', data);
    });
  }
}
