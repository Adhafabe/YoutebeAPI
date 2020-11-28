import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private youtubeUrl = 'https://youtube.googleapis.com/youtube/v3';
  private apikey = 'AIzaSyB7hTMc7P0W4INFWKBQI66D1ZwhqldRf7g';
  private playList = 'PLU8oAlHdN5BmpIQGDSHo5e1r4ZYWQ8m4B';
  private nextPageToken = '';

  constructor(private http: HttpClient) { }

  getList() {
    const url = `${this.youtubeUrl}/playlistItems`;

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '10')
      .set('playlistId', this.playList)
      .set('key', this.apikey)
      .set('pageToken', this.nextPageToken)

    return this.http.get<YoutubeResponse>(url, { params })
      .pipe(
        map(resp => {
          this.nextPageToken = resp.nextPageToken;
          return resp.items;
        }),
        map(items => {
          return items.map( video => video.snippet);
        })
    );
  }

}
