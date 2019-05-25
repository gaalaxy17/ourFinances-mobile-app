import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoaderService } from '../loader.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage{

  public username: string;

  constructor(public storage: Storage,public router: Router,public loaderService: LoaderService) { }

  ionViewWillEnter(){
    this.loaderService.showLoader();
    setTimeout(()=>{
      this.loaderService.dismissLoader();
    },1000);
  }



  logOut(){
    this.storage.remove('cdUser').then(()=>{
      this.storage.remove('dsUser').then(()=>{
        this.storage.remove('tpUser').then(()=>{
          this.storage.remove('nmUser').then(()=>{
            this.router.navigateByUrl('/home');
          });
        });
      });
    });
  }

  refresh(e){
    setTimeout(()=>{
      e.target.complete();
    },1000);
  }

}
