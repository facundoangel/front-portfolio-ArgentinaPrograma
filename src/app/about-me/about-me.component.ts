import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent implements OnInit {
  switchFormPhoto: Boolean;
  switchFormDescrip: Boolean;
  formPhoto: FormGroup;
  formDescrip: FormGroup;

  constructor(private Auth: AuthService, private formBuilder: FormBuilder) {
    this.formPhoto = this.formBuilder.group({
      url: ['', []],
    });
    this.formDescrip = this.formBuilder.group({
      descrip: ['', []],
    });
  }

  public get isOnLine(): boolean {
    return this.Auth.logIn;
  }

  ngOnInit(): void {}

  public showModalPhoto() {
    this.switchFormPhoto = true;
  }

  public closeModalPhoto() {
    this.switchFormPhoto = false;
  }

  public showModalDescrip() {
    this.switchFormDescrip = true;
  }

  public closeModalDescrip() {
    this.switchFormDescrip = false;
  }

  public handleSubmitPhoto($event: any) {
    alert(`url de imagen: ${$event.target[0].value}`);
    $event.target.reset();
    this.closeModalPhoto();
  }

  public handleSubmitDescrip($event: any) {
    alert(`Descripción: ${$event.target[0].value}`);
    $event.target.reset();
    this.closeModalDescrip();
  }
}
