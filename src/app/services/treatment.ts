import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  private apiUrl = 'https://gth-mcp-server.pages.dev/mcp';

  constructor(private http: HttpClient) {}

  searchNearbyFacilities(zipCode: string, radius: number = 10) {

    const requestBody = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'search_facilities',
        arguments: {
          zip: zipCode,
          radius_miles: radius
        }
      }
    };

    return this.http.post<any>(
      this.apiUrl,
      requestBody
    );
  }

  getAvailableTools() {

    const requestBody = {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/list'
    };

  return this.http.post<any>(
    this.apiUrl,
    requestBody
    );
  }

}