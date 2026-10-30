import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { DocumentService } from '../../../core/services/document-service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-form',
  imports: [],
  templateUrl: './upload-form.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './upload-form.css',
  standalone: true,
})
export class UploadForm {
  documentService = inject(DocumentService);
  router = inject(Router);

  selectedFile = signal<File | null>(null);
  previewUrl = signal<string | null>(null);
  isLoading = signal(false);
  errorMessage = signal('');

  selectFile(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.errorMessage.set('Selecciona una imagen válida (.png, .jpg, .jpeg)');
        return;
      }
      this.errorMessage.set('');
      this.selectedFile.set(file);
      this.previewUrl.set(URL.createObjectURL(file));
    }
  }

  extractHtml(event: Event) {
    event.preventDefault();

    if (!this.selectedFile()) {
      console.error('no file selected');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const formData = new FormData();
    formData.append('file', this.selectedFile()!);

    this.documentService.getHtml(formData)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: data => {
          if (!data) {
            this.errorMessage.set('Error al procesar la imagen con la IA');
            return;
          }

          const response = data.htmlContent;

          if (!response) {
            this.errorMessage.set('Error al procesar la imagen con la IA');
            return;
          }

          this.router.navigate(['/download'], { state: { htmlContent: response } }).then(() => {});
        },
        error: error => {
          this.errorMessage.set(error?error?.message || error?.message : 'Problemas de conexión con el servicio');
        }
    })
  }
}
