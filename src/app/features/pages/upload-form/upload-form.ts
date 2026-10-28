import { Component, input, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-form',
  imports: [],
  templateUrl: './upload-form.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './upload-form.css',
})
export class UploadForm {
  apiBaseUrl = input('');
  htmlExtracted = output<string>();

  selectedFile = signal<File | null>(null);
  previewUrl = signal<string | null>(null);
  isLoading = signal(false);
  errorMessage = signal('');

  handleFileChange(event: any) {
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

  async handleSubmit(event: Event) {
    event.preventDefault();

    if (!this.selectedFile()) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const formData = new FormData();
    formData.append('file', this.selectedFile()!);

    try {
      const response = await fetch(`${this.apiBaseUrl}/preview`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        this.errorMessage.set('Error al procesar la imagen con la IA.');
        return;
      }

      const data = await response.json();
      if (data.html) {
        this.htmlExtracted.emit(data.html);
      }
    } catch (error: any) {
      this.errorMessage.set(error?.message || 'Problemas de conexión con el servicio');
    } finally {
      this.isLoading.set(false);
    }
  }
}
