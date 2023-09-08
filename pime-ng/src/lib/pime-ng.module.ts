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
    FileUploadModule
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
    FileUploadModule
  ],
})
export class PimeNgModule {}
