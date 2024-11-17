import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from 'src/app/codono.service';


@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss'],
})
export class DocumentUploadComponent implements OnInit {

  fileSelected: boolean = false;
  fileName: string = '';
  frontFileSelected: boolean = false;
  backFileSelected: boolean = false;
  selfieFileSelected: boolean = false;

  selfieFileName: string = null;
  frontFileName: string = null;
  backFileName: string = null;

  documentType: string = null;
  idNumber: string = null;

  frontSideBase64: string = null;
  backSideBase64: string = null;
  selfieBase64: string = null;
  frontUploadUrl: any;
  backUploadUrl: any;
  selfieUploadUrl: any;

  agreeToTOS: boolean = false;
  agreeToCorrectInfo: boolean = false;
  agreeForIndividual: boolean = false;
  errorMessage: string = null;


  constructor(private location: Location, private exchangeProvider: ExchangeProvider, private nav: NavController, private alertController: AlertController, private loadingCtrl: LoadingController
  ) { }

  back() {
    this.location.back();
  }

  setSelectedDocument(type: string) {
    this.documentType = type;
    console.log(this.documentType);

  }

  async handleImageUpload(type, base64) {
    const alert = await this.loadingCtrl.create({
      message: 'Uploading image',
    });

    await alert.present();
    await this.exchangeProvider.ImageUpload(type, base64).subscribe(async (res: any) => {
      console.log(JSON.stringify(res));

      console.log(res?.data.path, 55);
      if (type == 'front') {
        this.frontUploadUrl = res?.data.path
      } else if (type == 'back') {
        this.backUploadUrl = res?.data.path
      } else if (type == 'selfie') {
        this.selfieUploadUrl = res?.data.path
      }

      if (res?.data?.path) {
        await this.exchangeProvider.presentToast(`Successfully saved the image`)
      } else {
        await this.exchangeProvider.presentToast(`Something went wrong. Please reupload`)
        this.clearImageData(type)
      }
      await alert.dismiss();
      return
    },
      async (error) => {
        console.log(error);
        this.exchangeProvider.presentToast("Something went wrong when uploading")
        this.clearImageData(type)
        await alert.dismiss();
        return
      }
    )
  }

  ngOnInit() {
  }

  clearImageData(side: any) {
    if (side == 'front') {
      this.frontFileSelected = false
      this.frontSideBase64 = null
      this.frontFileName = null
    } else if (side == 'back') {
      this.backFileSelected = false
      this.backFileName = null
      this.backSideBase64 = null
    } else if (side == 'selfie') {
      this.selfieFileSelected = false
      this.selfieFileName = null
      this.selfieBase64 = null
    }

  }
  onFileSelected(event: Event, side: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        this.fileSelected = true;
        this.fileName = file.name;

        const reader = new FileReader();
        reader.onload = () => {
          if (side == 'front') {
            this.frontSideBase64 = reader.result as string;
            console.log(this.frontSideBase64);
            this.handleImageUpload('front', this.frontSideBase64)
          } else if (side == 'back') {
            this.backSideBase64 = reader.result as string;
            console.log(this.backSideBase64);
            this.handleImageUpload('back', this.backSideBase64)
          } else if (side == 'selfie') {
            this.selfieBase64 = reader.result as string;
            console.log(this.selfieBase64);
            this.handleImageUpload('selfie', this.selfieBase64)
          } else {
            console.log("Something went wrong!");

          }
        };
        reader.readAsDataURL(file);
        this.setFileDetails(side, file?.name)
      } else {
        switch (side) {
          case 'front':
            this.frontFileSelected = false;
            this.frontFileName = '';
            break;
          case 'back':
            this.backFileSelected = false;
            this.backFileName = '';
            break;
          case 'selfie':
            this.selfieFileSelected = false;
            this.selfieFileName = '';
            break;
          default:
            break;
        }
      }
    } else {
      this.fileSelected = false;
      this.fileName = '';
    }
  }

  setFileDetails(side: string, fileName: string) {
    switch (side) {
      case 'front':
        this.frontFileSelected = true;
        this.frontFileName = fileName;
        break;
      case 'back':
        this.backFileSelected = true;
        this.backFileName = fileName;
        break;
      case 'selfie':
        this.selfieFileSelected = true;
        this.selfieFileName = fileName;
        break;
      default:
        break;
    }
  }

  handleVerify() {
    console.log(this.documentType, this.idNumber, this.agreeForIndividual, this.agreeToCorrectInfo, this.agreeToTOS, this.frontUploadUrl, this.backUploadUrl, this.selfieUploadUrl);

    let missingFields: string[] = [];

    if (!this.documentType) {
      missingFields.push('Document Type');
    }
    if (!this.idNumber) {
      missingFields.push('ID Number');
    }
    if (!this.agreeForIndividual) {
      missingFields.push('Agreement for Individual');
    }
    if (!this.agreeToCorrectInfo) {
      missingFields.push('Agreement to Correct Info');
    }
    if (!this.agreeToTOS) {
      missingFields.push('Agreement to Terms of Service');
    }
    if (!this.frontUploadUrl) {
      if (this.frontFileSelected || this.frontSideBase64) {
        missingFields.push('Reupload front side of document');
      } else {
        missingFields.push('Front Document Upload');
      }
    }
    if (!this.backUploadUrl) {
      if (this.backFileSelected || this.backSideBase64) {
        missingFields.push('Reupload back side of document');
      } else {
        missingFields.push('Back Document Upload');
      }
    }
    if (!this.selfieUploadUrl) {
      if (this.selfieFileSelected || this.selfieBase64) {
        missingFields.push('Reupload selfie');
      } else {
        missingFields.push('Selfie Upload');
      }
    }

    if (missingFields.length === 0) {
      this.errorMessage = null;
      this.exchangeProvider.docupload(this.documentType, this.idNumber, this.frontUploadUrl, this.backUploadUrl, this.selfieUploadUrl).subscribe((res: any) => {
        console.log(res)
        if (res.status === 1) {
          this.nav.navigateRoot('auth/kyc-status');
        } else {
          this.errorMessage = "Something went wrong.";
        }
      })
    } else {
      this.errorMessage = `Please fill out the following fields: ${missingFields.join(', ')}`;
    }
  }

  async takePicture(side: string, source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: source,
      });

      const imageUrl = image.webPath;
      console.log("🚀 ~ DocumentUploadComponent ~ takePicture ~ imageUrl:", imageUrl);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      let base64 = await this.blobToBase64(blob);
      console.log("🚀 ~ DocumentUploadComponent ~ takePicture ~ base64:", base64)
      await this.handleImageUpload(side, base64);
      this.setFileDetails(side, 'Image Captured');
    } catch (error) {
      console.error('Camera error: ', error);
    }
  }

  blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob); // This will encode the Blob as base64
    });
  }



  async presentChoiceAlert(side: string) {
    const alert = await this.alertController.create({
      header: 'Choose',
      message: 'Do you want to take a photo or select one from the gallery?',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.takePicture(side, CameraSource.Camera);
          }
        },
        {
          text: 'Gallery',
          handler: () => {
            this.takePicture(side, CameraSource.Photos);
            return
          }
        }
      ]
    });

    await alert.present();
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
