import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  switchFormEdit: Boolean;
  switchFormCreate: Boolean;
  switchFormDelete: Boolean;
  form: FormGroup;

  constructor(private Auth: AuthService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      empresa: ['', []],
      puesto: ['', []],
      tareas: ['', []],
      fechaInicio: ['', []],
      fechaFin: ['', []],
      presente: ['', []],
    });
  }

  public get isOnLine(): boolean {
    return this.Auth.logIn;
  }

  ngOnInit(): void {}
  public showModal(typeModal: string) {
    switch (typeModal) {
      case 'create':
        this.switchFormCreate = true;
        break;
      case 'edit':
        this.switchFormEdit = true;
        break;
      case 'delete':
        this.switchFormDelete = true;
        break;
    }
  }

  public closeModal() {
    this.switchFormCreate = false;
    this.switchFormEdit = false;
    this.switchFormDelete = false;
  }

  public handleSubmit($event: any) {
    let fecha = $event.target[1].value;

    //convertir la fecha a formato dd/mm/yyyy
    let fechaInicio =
      fecha.substring(8, 10) +
      '/' +
      fecha.substring(6, 7) +
      '/' +
      fecha.substring(0, 4);

    alert(
      `
      empresa: ${$event.target[0].value}
      fecha de inicio: ${fechaInicio}
      Presente: ${$event.target[3].checked}
      `
    );
    $event.target.reset();
    this.closeModal();
  }
}
