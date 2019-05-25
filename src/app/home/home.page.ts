// tslint:disable: no-string-literal

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from '../../environments/environment';
import { LoaderService } from '../loader.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(
    public router: Router,
    public httpClient: HttpClient,
    public formBuilder: FormBuilder,
    public Loader: LoaderService,
    public storage: Storage
  ) {}

  form: FormGroup;

  ngOnInit(){

    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ionViewWillEnter(){

    this.storage.get('dsUser').then((username)=>{
      if(username){
        this.router.navigateByUrl('/dashboard');
      }
    }).catch(()=>{
      console.log('Username is not set');
    })

    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  postCredentials(){

    return new Promise((resolve,reject)=>{
      const usernameFieldValue = this.form.value.username;
      const password = this.form.value.password;
      let passwordHash = null;


      this.httpClient.get('https://api.hashify.net/hash/md4/hex?value=' + password).subscribe((data)=>{

      const field = 'Digest';
      passwordHash = data[field];

      }, (err) => {
        console.log(err);
      }, () => {

        const credentials = {
          username: usernameFieldValue,
          password: passwordHash
        };

        this.httpClient.post(environment.API_ENDPOINT + '/users/login',credentials)
        .subscribe((results)=>{
          resolve(results);
        },(err)=>{
          reject(err);
        });

      });

    });
  }

  authenticateLogin(){

    if(!this.form.value.username || !this.form.value.password){
      this.Loader.showAlert('Usuário ou senha invalidos!');
    }
    else{
      this.Loader.showLoader();

      this.postCredentials().then((results)=>{

        this.storage.set('cdUser', results['cdUser']);
        this.storage.set('dsUser', results['dsUser']);
        this.storage.set('tpUser', results['tpUser']);
        this.storage.set('nmUser', results['nmUser']);

        this.Loader.dismissLoader();
        this.router.navigateByUrl('dashboard');
      }).catch((fail)=>{
        this.Loader.dismissLoader();
        this.Loader.showAlert('Usuário ou senha invalidos!');
      })
    }

    


  }



}
