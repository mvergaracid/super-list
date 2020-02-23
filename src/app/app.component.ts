import { Component } from '@angular/core';
import { AppService } from './app.service'
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'super-list';
  allSupers: any = []
  constructor(private superService: AppService) {
    this.allSupers = this.superService.getAllSupers()
    console.log('this.allSupers:', this.allSupers)
  }
  // public data: any = [
  //   { name: 'therichpost', email: 'therichpost@gmail.com', website: 'therichpost.com' },
  //   { name: 'therichpost', email: 'therichpost@gmail.com', website: 'therichpost.com' },
  //   { name: 'therichpost', email: 'therichpost@gmail.com', website: 'therichpost.com' },
  //   { name: 'therichpost', email: 'therichpost@gmail.com', website: 'therichpost.com' }
  // ]
  public data: any = []

  dtOptions: DataTables.Settings = {};
  dtSearchOptions: DataTables.SearchSettings = {};
  
  ngOnInit() {
    this.data = this.allSupers
    this.dtSearchOptions = {
      search : 'Batman'
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 100,
      processing: true,
      responsive: true,
      search: this.dtSearchOptions
    };
    this.superService.searchById(1)
      .subscribe(res => console.log(res))
  }

  clickHandler(data: any) {
    console.log(data)
    const index = _.findIndex(this.data, item => item.id === +data[0])
      this.data[index].clicked = !this.data[index].clicked
      this.superService.searchById(data[0])
        .subscribe(res => {
          this.data[index].detail = res
          console.log(res)
        },
        error => { console.log('error:', error) })
  }

  findInfo(data:any) {
    console.log(data)
    const index = _.findIndex(this.data, item => item.id === data.id)
    this.data[index].clicked = true
    this.superService.searchById(data.id)
        .subscribe(res => {
          this.data[index].detail = res
          console.log(res)
        },
        error => { 
          console.log('error:', error) 
          this.data[index].error_loading = `Error cargado información de ${this.data[index].name}`
        })
  }

  resetInfo(data: any) {
    console.log(data)
    const index = _.findIndex(this.data, item => item.id === data.id)
    if (index!== -1) {
      this.data[index].clicked = false
      this.data[index].detail = null
      this.data[index].error_loading = null
    }
  }
}
