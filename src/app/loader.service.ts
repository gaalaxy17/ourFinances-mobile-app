import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading;
  private alert;

  constructor(public loadingController: LoadingController, public alertController: AlertController) { }

  public showLoader(){
    this.loadingController.create({
      message: 'Aguarde...'
    }).then((overlay)=>{
      this.loading = overlay;
      this.loading.present();
    })
  }

  public dismissLoader(){
    this.loading.dismiss();
  }

  public showAlert(messageText){
    this.alertController.create({
      header: 'Erro',
      message: messageText,
      buttons: ['OK'],
      animated: true
    }).then((alert)=>{
      this.alert = alert;
      this.alert.present();
    })
  }

  public showAlertSucess(messageText){
    this.alertController.create({
      header: 'Sucesso',
      message: messageText,
      buttons: ['OK'],
      animated: true
    }).then((alert)=>{
      this.alert = alert;
      this.alert.present();
    })
  }

}
