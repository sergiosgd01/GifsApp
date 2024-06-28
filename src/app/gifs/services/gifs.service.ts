import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'JDxgGrB1IALKPamlFWlsQuZWzncdmHpM';
  private urlService: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
    this.searchTag(this._tagsHistory[0] || '');
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  organizeTagsHistory(tag: string): void {
    tag = tag.trim().toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((t) => t !== tag);
    }

    this._tagsHistory.unshift(tag);

    if (this._tagsHistory.length === 10) {
      this._tagsHistory.pop();
    }

    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    const history = localStorage.getItem('history');

    if (history) {
      this._tagsHistory = JSON.parse(history);
    }
  }

  searchTag(tag: string): void {

    if (this._tagsHistory.length === 10) {
      this._tagsHistory.pop();
    }

    this.organizeTagsHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10');

    this.http.get<SearchResponse>(`${this.urlService}/search?`, { params }).
      subscribe((resp) => {

        this.gifsList = resp.data;
      });
  }
}
