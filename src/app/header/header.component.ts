import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  switchForm: Boolean;
  form: FormGroup;

  constructor(private Auth: AuthService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      password: ['', []],
      mail: ['', []],
    });
  }

  ngOnInit(): void {
    this.switchForm = false;
  }

  public handleSession() {
    if (localStorage.getItem('token') !== null) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', 'true');
    }
  }

  public get isOnLine(): boolean {
    return this.Auth.logIn;
  }

  public showModal() {
    this.switchForm = true;
  }

  public closeModal() {
    this.switchForm = false;
  }

  public handleSubmit($event: any) {
    let usuario = $event.target[0].value;
    let contra = $event.target[1].value;
    alert(`usuario:${usuario} contraseña:${contra}`);
    if (contra == '1234') this.handleSession();
    $event.target.reset();
    this.closeModal();
  }
}
