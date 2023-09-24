import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PaginatorModule } from 'primeng/paginator';
import { BadgeModule } from 'primeng/badge';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    ConfirmDialogModule,
    ToastModule,
    MessagesModule,
    PasswordModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    TabViewModule,
    CardModule,
    ScrollPanelModule,
    PaginatorModule,
    BadgeModule,
    ProgressSpinnerModule
  ],
  exports: [
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    ConfirmDialogModule,
    ToastModule,
    MessagesModule,
    PasswordModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    TabViewModule,
    CardModule,
    ScrollPanelModule,
    PaginatorModule,
    BadgeModule,
    ProgressSpinnerModule
  ],
})
export class PimeNgModule {}
