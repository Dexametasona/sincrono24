import { DatabaseService } from './../../services/database.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [{ title: '', cols: 1, rows: 1 },];
      }
      return [{ title: '', cols: 2, rows: 1 }];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private DB:DatabaseService, private route:Router) {}
  form= new FormGroup({
    passFormControl:new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
    userFormControl:new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  data:any[]=[]
  
  validar(){
    this.DB.getBD().subscribe(res=>{
      for (let i of res){
        this.data.push({user:i.username, pass:i.email})
      }
    })
    for(let i of this.data){
      if(i.user==this.form.get('userFormControl')?.value && i.pass==this.form.get('passFormControl')?.value){
        localStorage.setItem('status','true')
        this.form.reset()
        Swal.fire({
          icon:'success',
          title:'Registro exitoso',
          heightAuto:false
        })
        this.route.navigate(['/home'])
        break
      }else{
        localStorage.setItem('status','false')
        Swal.fire({
          icon:'error',
          text:'Usuario o contraseña no encontrado',
          heightAuto:false
        })
      }
    }
  }
}
