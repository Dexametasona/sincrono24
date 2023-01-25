import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
        return [{ title: 'Card 1', cols: 1, rows: 1 },];
      }
      return [{ title: 'Card 1', cols: 2, rows: 1 }];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
  form=FormGroup({
    emailFormControl:new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]);
    passFormControl:passFormControl=new FormControl('', [Validators.required, Validators.minLength(4)])
  })
  
  
}
