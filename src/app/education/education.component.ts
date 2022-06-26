import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  switchForm: Boolean;
  form: FormGroup;
  constructor(private Auth: AuthService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nombre: ['', []],
      institucion: ['', []],
      titulo: ['', []],
      fechaInicio: ['', []],
      fechaFin: ['', []],
      presente: ['', []],
    });
  }

  public get isOnLine(): boolean {
    return this.Auth.logIn;
  }
  ngOnInit(): void {}

  public showModalEdit() {
    this.switchForm = true;
  }

  public closeModal() {
    this.switchForm = false;
  }

  public handleSubmit($event: any) {
    alert(`url de imagen: ${$event.target[0].value}`);
    $event.target.reset();
    this.closeModal();
  }
}
