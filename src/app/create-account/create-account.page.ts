import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { LoaderService } from '../loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  form: FormGroup;

  newUser: Object;

  constructor(
    public formBuilder: FormBuilder,
    public httpClient: HttpClient,
    public loaderService: LoaderService,
    public router: Router
  ) { }

  ngOnInit() {
    
    this.form = this.formBuilder.group({
      username: '',
      password: '',
      email: '',
      fullName: '',
      type: ''
    });
  }

  async cadastrar(){

    this.loaderService.showLoader();

    let passwordHash = null;

    let password = this.form.value.password;

    await this.httpClient.get('https://api.hashify.net/hash/md4/hex?value=' + password).subscribe((results)=>{
      passwordHash = results['Digest'];
    },(err) => {
      console.log(err);
    },() => {
      this.newUser = {
        username: this.form.value.username,
        password: passwordHash,
        email: this.form.value.email,
        fullName: this.form.value.fullName,
        type: this.form.value.type
      };
  
      this.httpClient.post(environment.API_ENDPOINT + '/users/cadastrar',this.newUser,{}).subscribe((results)=>{
        console.log(results);
        this.loaderService.dismissLoader();
        this.loaderService.showAlertSucess('Usuário cadastrado com sucesso!');
        this.router.navigateByUrl('/home');
      },(err)=>{
        console.log(err);
        this.loaderService.dismissLoader();
        this.loaderService.showAlert(err.error);
      })
    })

    
  }

  

}
