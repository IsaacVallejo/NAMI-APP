import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  private apiUrl =
    'https://gth-mcp-server.pages.dev/mcp';

  constructor(
    private http: HttpClient
  ) {}

  searchNearbyFacilities(
    city: string,
    state: string,
    limit: number = 10
  ) {
    const requestBody = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'search_facilities',
        arguments: {
          city: city,
          state: state,
          limit: limit
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

  reverseGeocode(
    latitude: number,
    longitude: number
  ) {
    const url =
      `https://api.bigdatacloud.net/data/reverse-geocode-client` +
      `?latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&localityLanguage=en`;

    return this.http.get<any>(
      url
    );
  }
}