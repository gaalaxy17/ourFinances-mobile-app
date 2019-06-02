import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../loader.service';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  form: FormGroup;
  photo: String;
  newUser: Object;

  constructor(
    public formBuilder: FormBuilder,
    public httpClient: HttpClient,
    public loaderService: LoaderService,
    public router: Router,
    public camera: Camera
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

  ionViewWillEnter(){
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

    this.newUser = {
      username: this.form.value.username,
      password: this.form.value.password,
      email: this.form.value.email,
      fullName: this.form.value.fullName,
      type: this.form.value.type,
      dsFoto: this.photo
    };
    this.httpClient.post(environment.API_ENDPOINT + '/users/cadastrar', this.newUser, {}).subscribe((results)=>{
      console.log(results);
      this.loaderService.dismissLoader();
      this.loaderService.showAlertSucess('Usuário cadastrado com sucesso!');
      this.router.navigateByUrl('/home');
    },(err)=>{
      console.log(err);
      this.loaderService.dismissLoader();
      this.loaderService.showAlert(err.error);
    })
    
  }

  getPicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options)
      .then((imageData)=>{
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.photo = base64Image;
        this.loaderService.showAlertSucess('Foto salva com sucesso!');
      }, (err) =>{
        console.log(err);
      }).catch((fail)=>{
        console.log(fail);
      })

  }

  

}
