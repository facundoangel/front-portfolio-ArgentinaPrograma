import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourceAjaxService } from '../services/resources-ajax.service';
import { Experience } from '../interfaces/experience';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  switchFormEdit: Boolean;
  switchFormCreate: Boolean;
  switchFormDelete: Boolean;
  experiences: Experience[];
  form: FormGroup;

  constructor(
    private Auth: AuthService,
    private formBuilder: FormBuilder,
    private ajax: ResourceAjaxService
  ) {
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

  ngOnInit(): void {
    this.getExperiences();
  }

  public getExperiences(): void {
    this.ajax.getExperiences().subscribe((data) => {
      this.experiences = data;
    });
  }

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
