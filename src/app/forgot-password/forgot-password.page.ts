import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../loader.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form: FormGroup;

  constructor(public formBuilder: FormBuilder,public httpClient: HttpClient,public loaderService: LoaderService,public router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ''
    });
  }

  ionViewWillEnter(){
    this.form = this.formBuilder.group({
      email: ''
    });
  }

  recuperarSenha(){

    this.loaderService.showLoader();

    var emailInputField = this.form.value.email;

    this.httpClient.post(environment.API_ENDPOINT + '/users/recuperar/email',{ email:emailInputField },{}).subscribe((results)=>{
      console.log(results);
      this.loaderService.dismissLoader();
      this.loaderService.showAlertSucess('Pronto! A sua senha deve chegar no seu email cadastrado em alguns minutos... Lembre-se de verificar a caixa de SPAM!');
      this.router.navigateByUrl('/home');
    },(err)=>{
      this.loaderService.dismissLoader();
      this.loaderService.showAlert(err.error);
    });
  }

}
