import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {DataService} from '../app.dataservice';
import { Country } from '../app.country';
import { State } from '../app.state';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  private childUserForm: FormGroup;
  private address: FormGroup;
  private emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  private zipRegex = /^[1-9][0-9]{4}-[1-9][0-9]{3}$/;
  selectedCountry: Country = new Country(0, 'India');
  // selectedState: State = new State(5, 2, 'Gujarat')
  countries: Country[];
  states: State[];
  constructor(private formBuilder: FormBuilder, private _dataService: DataService) {
    this.countries = this._dataService.getCountries();
  }
  onSelect(countryid) {
    this.states = this._dataService.getStates()
      .filter((item) => item.countryid === countryid);
  }

  ngOnInit() {

    this.childUserForm = this.formBuilder.group({
      name: ['Sushma', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      email: ['sushma.ambati@outlook.com', [Validators.required,
        Validators.pattern(this.emailRegex)]],
      address: this.formBuilder.group({
        street: ['79 Antioch', [Validators.required]],
        city: ['Overland Park', [Validators.required]],
      //   // state: ['', [Validators.required]],
      //   // country: ['', [Validators.required]],
      zipCode: ['60244-4245', [Validators.required, Validators.pattern(this.zipRegex)]]
      })
    });
  }
  onSubmit() {
    console.log(this.childUserForm.value);
  }

// userForm = new FormGroup({
//   name: new FormControl(),
//   email: new FormControl(),
//   address: new FormGroup({
//     street: new FormControl(),
//     citys: new FormControl(),
//     zipCode: new FormControl()
//   })
// });
}

