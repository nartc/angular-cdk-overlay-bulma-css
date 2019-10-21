import {
  animateChild,
  AnimationEvent,
  group,
  query,
  transition,
  trigger,
  useAnimation
} from "@angular/animations";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  Type,
  ViewChild
} from "@angular/core";
import { fadeIn, fadeOut, zoomIn, zoomOut } from "ng-animate";
import { DynamicDialogContentDirective } from "./dynamic-dialog-content.directive";
import { AnimationState, DynamicDialogRef } from "./dynamic-dialog-ref";
import { DynamicDialogConfig } from "./dynamic-dialog.config";

const ESCAPE = "Escape";

@Component({
  selector: "app-dynamic-dialog",
  template: `
    <div
      class="modal is-active"
      style="padding-left: 1rem; padding-right: 1rem"
      [@animation]="{
        value: animationState,
        params: {
          timing: dialogConfig.containerAnimationTiming,
          delayChild: dialogConfig.animationChildDelay
        }
      }"
      (@animation.start)="animationStateChanged.emit($event)"
      (@animation.done)="animationStateChanged.emit($event)"
    >
      <div class="modal-background" (click)="onModalBackgroundClick()"></div>
      <div
        class="modal-card"
        [@zoom]="{
          value: animationState == 'enter' ? 'in' : 'out',
          params: { timing: dialogConfig.contentAnimationTiming }
        }"
      >
        <header class="modal-card-head">
          <p class="modal-card-title">{{ dialogConfig.header }}</p>
          <button
            class="delete"
            aria-label="close"
            *ngIf="dialogConfig.closable"
            (click)="onCloseClick()"
          ></button>
        </header>
        <section class="modal-card-body">
          <ng-template appDynamicDialogContent></ng-template>
        </section>
      </div>
    </div>
  `,
  styles: [],
  animations: [
    trigger("zoom", [
      transition(
        "* => in",
        useAnimation(zoomIn, { params: { timing: "{{timing}}" } })
      ),
      transition(
        "* => out",
        useAnimation(zoomOut, { params: { timing: "{{timing}}" } })
      )
    ]),
    trigger("animation", [
      transition(
        `* => ${AnimationState.Enter}`,
        group([
          useAnimation(fadeIn, { params: { timing: "{{timing}}" } }),
          query("@zoom", [animateChild({ delay: "{{delayChild}}" })])
        ])
      ),
      transition(
        `* => ${AnimationState.Leave}`,
        group([
          useAnimation(fadeOut, { params: { timing: "{{timing}}" } }),
          query("@zoom", [animateChild({ delay: "{{delayChild}}" })])
        ])
      )
    ])
  ]
})
export class DynamicDialogComponent implements AfterViewInit, OnDestroy {
  animationState: AnimationState = AnimationState.Enter;
  animationStateChanged: EventEmitter<AnimationEvent> = new EventEmitter<
    AnimationEvent
  >();
  childComponentType: Type<any>;

  @ViewChild(DynamicDialogContentDirective, { static: false })
  contentInsertionPoint: DynamicDialogContentDirective;

  private componentRef: ComponentRef<any>;

  constructor(
    public readonly dialogConfig: DynamicDialogConfig,
    private readonly dialogRef: DynamicDialogRef,
    private readonly cfr: ComponentFactoryResolver,
    private readonly cdr: ChangeDetectorRef
  ) {}

  @HostListener("document:keydown", ["$event"])
  private handleKeydown(event: KeyboardEvent) {
    if (event.key === ESCAPE) {
      this.dialogRef.close();
    }
  }

  ngAfterViewInit(): void {
    this.loadContentComponent(this.childComponentType);
    this.cdr.detectChanges();
  }

  private loadContentComponent(componentType: Type<any>) {
    const factory = this.cfr.resolveComponentFactory(componentType);
    const vcr = this.contentInsertionPoint.viewContainerRef;
    vcr.clear();

    this.componentRef = vcr.createComponent(factory);
  }

  startExitAnimation() {
    this.animationState = AnimationState.Leave;
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onCloseClick() {
    this.dialogRef.close();
  }

  onModalBackgroundClick() {
    this.dialogRef.close();
  }
}
