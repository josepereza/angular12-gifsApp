import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface'

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[] = []
  private _resultados: Gif[] = []
  //  private _resultados:Array<Gif>=[]
  private apiKey = 'XH5h5U83xh4m3xWBcok9ofoLlz0wv6q8'
  private url = "https://api.giphy.com/v1/gifs"
  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    // if(localStorage.getItem('historial')){
    //   this._historial=JSON.parse(localStorage.getItem('historial')!)
    // }

  }
  get resultados() {
    return this._resultados
  }
  get historial() {
    return this._historial
  }
  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query)
      .set('offset', '0')
      .set('rating', 'g')
      .set('lang', 'en')


    if (this._historial.includes(query)) {
    
      this.http.get<SearchGifsResponse>(`${this.url}/search`, { params })
        .subscribe((data) => {
          this._resultados = data.data
        })
      return
    }
    this._historial.unshift(query)
    this._historial = this._historial.splice(0, 6)
    localStorage.setItem('historial', JSON.stringify(this._historial));
    this.http.get<SearchGifsResponse>(`${this.url}/search`, { params: params })
      .subscribe((data) => {
        this._resultados = data.data

      })
  }

  // listarGifs(){
  //  return this.http.get('https://api.giphy.com/v1/gifs/search?api_key=XH5h5U83xh4m3xWBcok9ofoLlz0wv6q8&q=barcelona&limit=25&offset=0&rating=g&lang=en')
  // }
}
