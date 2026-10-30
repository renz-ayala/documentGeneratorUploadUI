import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Service()
export class DocumentService {
  private readonly http = inject(HttpClient);

  private readonly urlBase = signal(environment.apiUrl);

  getHtml(formData: FormData): Observable<{ documentTitle: string, htmlContent: string }> {
    return this.http.post<{ documentTitle: string; htmlContent: string }>(
      `${this.urlBase()}/preview`,
      formData
    );
  }
}
