import { Component, ContentChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupValue: FormGroup;
  Errormessage: any;
  message: any = [];

  constructor(public fb: FormBuilder, private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.signupValue = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)]],
      confirmPassword: ['', [Validators.required]]
    },
      {
        validator: this.checkIfMatchingPasswords("password", "confirmPassword")
      });
  }


  checkIfMatchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value == confirmPassword.value) {
        return;
      } else {
        confirmPassword.setErrors({
          notEqualToPassword: true
        })
      }

    }
  }



  register() {
    this.authService.postSignup(this.signupValue.value).subscribe((res) => {
      this.message = res
      if (this.message) {
        alert(`${this.message.message}`)
        this.router.navigate(["/login"])
      }
    }, error => {
      this.Errormessage = error.error.message
      console.log(this.Errormessage);

    }

    )
  }

}
