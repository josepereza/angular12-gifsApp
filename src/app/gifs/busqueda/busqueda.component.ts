import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
@ViewChild('textBuscar') texBuscar!:ElementRef<HTMLInputElement>

  constructor(private gifsService:GifsService) { }

  ngOnInit(): void {
  
  }
buscar(){
 
  const valor=this.texBuscar.nativeElement.value
  if (valor.trim().length===0){
    return
  }
 this.gifsService.buscarGifs(valor)
  this.texBuscar.nativeElement.value=''
}
}