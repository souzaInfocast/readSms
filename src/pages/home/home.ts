import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
declare var SMS:any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public platform:Platform,public rest:RestProvider) {

  }

  ionViewDidEnter()
{
  let url;
  if(!this.platform.is('mobileweb'))
  {
    this.platform.ready().then((readySource) => {

      if(SMS) SMS.startWatch(()=>{
                 console.log('watching started');
              }, Error=>{
             console.log('failed to start watching');
         });

        document.addEventListener('onSMSArrive', (e:any)=>{
             var sms = e.data;
             console.log(sms);
             let formData = {
               smsBody:sms.body
             };

            this.rest.post('/api/ativacao-sms/input-sms',formData,data=>{
              console.log(data)
            })
            localStorage.setItem('sms',sms);
             });

          });
  }

}
}
