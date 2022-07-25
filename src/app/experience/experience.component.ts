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
  resourceToDelete: [String, number | null];
  resourceToEdit: Experience;
  resourceToCreate: any = {
    id: null,
    position: '',
    company: '',
    dateStart: '',
    dateEnd: '',
    tasks: '',
  };
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

  public showCreateModal() {
    this.switchFormCreate = true;
  }

  public showDeleteModal(categoryResource: String, idResource: number | null) {
    this.switchFormDelete = true;
    this.resourceToDelete = [categoryResource, idResource];
  }

  public showEditModal(experience: Experience) {
    this.resourceToEdit = experience;
    this.switchFormEdit = true;
  }

  public closeModal() {
    this.switchFormCreate = false;
    this.switchFormEdit = false;
    this.switchFormDelete = false;
  }

  public convertDate(date: string): string {
    if (date == 'Presente') {
      return date;
    }
    return new Date(date).toLocaleDateString();
  }

  public isPresent(date: string): any {
    return date == 'Presente' ? true : null;
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

  public handleDelete() {
    console.log(this.resourceToDelete);
    this.ajax.deleteResource(
      this.resourceToDelete[0],
      this.resourceToDelete[1]
    );
    this.experiences = this.experiences.filter(
      (experience) => experience.id !== this.resourceToDelete[1]
    );
    this.closeModal();
  }

  public handleEdit($event: any) {
    let form = $event.target.parentElement.parentElement;
    this.resourceToEdit.id = form.id;
    this.resourceToEdit.position = form.position.value;
    this.resourceToEdit.company = form.company.value;
    this.resourceToEdit.dateStart = form.dateStart.value;
    this.resourceToEdit.dateEnd = form.dateEnd.value;
    this.resourceToEdit.tasks = form.tasks.value;

    this.ajax.editResource(
      'experiences',
      this.resourceToEdit.id,
      this.resourceToEdit
    );
  }

  public handleCreate($event: any) {
    $event.preventDefault();
    let form = $event.target.parentElement.parentElement;

    this.resourceToCreate.id = null;
    this.resourceToCreate.position = form.position.value;
    this.resourceToCreate.company = form.company.value;
    this.resourceToCreate.dateStart = form.dateStart.value;
    this.resourceToCreate.dateEnd = form.now.checked
      ? 'Presente'
      : form.dateEnd.value;
    this.resourceToCreate.tasks = form.tasks.value;

    form.reset();

    this.ajax.createResource('experiences', this.resourceToCreate);
    this.experiences.push(this.resourceToCreate);

    this.closeModal();
  }
}
