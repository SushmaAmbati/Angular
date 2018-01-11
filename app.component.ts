import { Component } from '@angular/core';

import { DataService } from './app.dataservice';
import { Country } from './app.country';
import { State } from './app.state';
import {forEach} from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  selectedCountry: Country = new Country(0, 'India');
   countries: Country[];
  states: State[];

  constructor(private _dataService: DataService) {
    this.countries = this._dataService.getCountries();
  }

  onSelect(countryid) {
    this.states = this._dataService.getStates()
      .filter((item) => item.countryid === countryid);
  }
  // onSelectState(stateid) {
  //   this.states = this._dataService.getStates()
  //     .filter((item) => item.id === stateid ? item.countryid : null);
  // }

}
