import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';
import { ProfileFeatureStoreSelectors, RootStoreState } from 'src/app/root-store';
import { Store, select } from '@ngrx/store';
import { filter, skipWhile  } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})

// PENDING.. WAITING THE APIS
export class CreateEventComponent implements OnInit {

  // default
  baseUrl = environment.baseUrl;

  // profile
  profile$: Observable<ProfileModel>;

  // form
  eventForm: FormGroup;
  nameEvent: string;
  minDate = new Date(Date.now());
  dateStartEvent: string;
  dateEndEvent: string;
  minEndDate = this.minDate;
  visibility: string;
  adminGroup: string[];
  introduction: string;
  newEvent: any;

  // add animation
  imageSrc: string;
  filePath: any;
  imgURL: any;
  imgPath: String;
  imgShowed = true;
  imgCoverShowed = true;
  imgcoverURL: any;

  constructor(
    private store$: Store<RootStoreState.State>,
  ) {}

  ngOnInit() {

    // to select the profile
    this.profile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      skipWhile(val => val == null),
      filter(value => value !== undefined),
    )

    // event form 
    this.eventForm = new FormGroup({
      nameEvent: new FormControl(this.nameEvent, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25)
      ]),
      dateStartEvent: new FormControl(this.dateStartEvent, Validators.required),
      dateEndEvent: new FormControl(this.dateStartEvent, Validators.required),
      visibility: new FormControl(this.visibility, Validators.required),
      adminGroup: new FormControl(this.adminGroup, Validators.required),
      introduction: new FormControl(this.introduction, Validators.required)
    })

  }

  get f() {
    return this.eventForm.controls;
  }

  // preview of the publications event
  previewPublication(files: any) {

    if (files.length === 0) return null

    // get the file
    const reader = new FileReader();
    this.filePath = files;
    reader.readAsDataURL(files[0]);

    reader.onload = _event => {
      this.imgURL = reader.result;
      this.imgPath = files[0].name;
      this.imgShowed = false;
    }

  }

  // previw of the cover of the group
  previewCover(files: any) {
    if (files.length === 0) {
      return;
    }

    // get the file
    const reader = new FileReader();
    this.filePath = files;
    reader.readAsDataURL(files[0]);

    reader.onload = _event => {
      this.imgcoverURL = reader.result;
      this.imgPath = files[0].name;
      this.imgCoverShowed = false;
    };
  }

  onSubmit() {
    this.newEvent = {
      nameEvent : this.eventForm.get('nameEvent').value,
      dateStartEvent: this.eventForm.get('dateStartEvent').value,
      dateEndEvent: this.eventForm.get('dateEndEvent').value,
      visibility: this.eventForm.get('visibility').value,
      adminGroup: this.eventForm.get('adminGroup').value,
      introduction: this.eventForm.get('dateStartEvent').value,
    }

  }

}
