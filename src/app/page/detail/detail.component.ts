import { User } from './../../interfaces/user';
import { DatabaseService } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [{ title: 'Card 1', cols: 1, rows: 1 }];
      }
      return [{ title: this.id, cols: 2, rows: 1 }];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private route:Router, private router:ActivatedRoute, private db:DatabaseService) {}
  id!:string|null;
  user!:User
  
  back(){
    this.route.navigate(['/home'])
  }
  ngOnInit(): void {
    this.id=this.router.snapshot.paramMap.get('id')
    this.db.getBD().subscribe(res=>{
      for (let i of res){
        if(i.id==Number(this.id)){
          this.user={
            name:i.name,
            phone:i.phone,
            website:i.website,
          }
          break
        }
      }
    })
  }
}
