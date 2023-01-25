import { DatabaseService } from './../../services/database.service';
import { Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';


export interface modelUser{
  id:string
  nombre:string,
  usuario:string,
  email:string,
  localizacion:string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {return [{title: 'Card 1', cols: 1, rows: 1 }];}
      return [{ title: 'Card 1', cols: 2, rows: 1 }]
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private db:DatabaseService, private route:Router) {}
    data:modelUser[]=[]
    displayedColumns: string[] = ['id', 'nombre', 'usuario', 'email', 'localizacion', 'accion'];
    status=false

    mostrar(){
      this.status=!this.status
    }
    
    detalles(id:string):void{
      this.route.navigate(['/detail', id])
    }
    ngOnInit(): void {
      this.db.getBD().subscribe(res=>{
        for (let i of res){
          this.data.push({
              id:String(i.id),
              nombre:i.name,
              usuario:i.username,
              email:i.email,
              localizacion:`Ca. ${i.address.street}, suite ${i.address.suite}, ciudad ${i.address.city} y cod postal ${i.address.zipcode}`
            })
        }
      })
    }
}
