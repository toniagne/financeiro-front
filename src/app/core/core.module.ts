// Anglar
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Layout Directives
// Services
import {
  ContentAnimateDirective,
  FirstLetterPipe,
  GetObjectPipe,
  HeaderDirective,
  JoinPipe,
  MenuDirective,
  OffcanvasDirective,
  SafePipe,
  ScrollTopDirective,
  SparklineChartDirective,
  StickyDirective,
  TabClickEventDirective,
  TimeElapsedPipe,
  ToggleDirective
} from './_base/layout';
import { ActivePipe } from './_base/layout/pipes/active.pipe';
import { DocumentsPipe } from './_base/layout/pipes/documents.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    // directives
    ScrollTopDirective,
    HeaderDirective,
    OffcanvasDirective,
    ToggleDirective,
    MenuDirective,
    TabClickEventDirective,
    SparklineChartDirective,
    ContentAnimateDirective,
    StickyDirective,
    // pipes
    TimeElapsedPipe,
    JoinPipe,
    GetObjectPipe,
    SafePipe,
    FirstLetterPipe,
    ActivePipe,
    DocumentsPipe,
  ],
    exports: [
        // directives
        ScrollTopDirective,
        HeaderDirective,
        OffcanvasDirective,
        ToggleDirective,
        MenuDirective,
        TabClickEventDirective,
        SparklineChartDirective,
        ContentAnimateDirective,
        StickyDirective,
        // pipes
        TimeElapsedPipe,
        JoinPipe,
        GetObjectPipe,
        SafePipe,
        FirstLetterPipe,
        ActivePipe,
        DocumentsPipe,
    ],
  providers: []
})
export class CoreModule {
}
