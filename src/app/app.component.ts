import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'encript-and-decript';

  encriptForm!: FormGroup;
  EnteredData:any = {};

  constructor(private formbuillder: FormBuilder){
    this.encriptForm = this.formbuillder.group({
      encriptValue: [''],
      encriptKey: ['']
    });
  }

  onSubmit(type:number) {
    const valueToDecrypt = this.encriptForm?.value?.encriptValue?.trim();
    const valueToKey = this.encriptForm?.value?.encriptKey?.trim();
    if (type == 1) {
      if (valueToDecrypt) {
        this.EnteredData = {
          BeforeEncript: valueToDecrypt,
          Key:valueToKey,
          AfterEncript: CryptoJS.AES.encrypt(valueToDecrypt, valueToKey).toString(),
        };
      } else {
        console.error('No value to encrypt.');
      }
    } else if (type == 2) {
      
      if (valueToDecrypt) {
        const decryptedBytes = CryptoJS.AES.decrypt(valueToDecrypt, valueToKey);
        const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8); // Convert to UTF-8 string
        this.EnteredData = {
          BeforeEncript: valueToDecrypt,
          Key:valueToKey,
          AfterEncript: decryptedText,
        };
      } else {
        console.error('No value to decrypt.');
      }
    }
    setTimeout(() => {
      this.encriptForm.reset();
    }, 100);
  }
}
