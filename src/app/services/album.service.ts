import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MoviesModel } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  URL: string = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get<MoviesModel[]>(this.URL + 'movie').pipe(map(res => res));
  }
  saveMovie(movie: MoviesModel): Observable<any> {
    return this.http.post<any>(this.URL + 'movie', movie).pipe(map(res => res));
  }

  updateMovie(movie: MoviesModel): Observable<any> {
    return this.http.post<any>(this.URL + 'movie/update', movie).pipe(map(res => res));
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.get<any>(this.URL + 'movie/delete/' + id).pipe(map(res => res));
  }
  
}
