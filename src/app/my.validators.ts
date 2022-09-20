import { FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

export class MyValidators {
  static restricktedEmails(control: FormControl): ValidationErrors | null {
    const restrictedArr = ['d@mail.ru', 'd@yandex.ru'];
    //control.value - это тот mail что пишем в поле FormControll = email
    if (restrictedArr.includes(control.value)) {
      return { 'restricktedEmail' : true}
    }
    return null
  }

  // simple examle async validator
  static uniqEmail(control: AbstractControl): Promise<any> | Observable<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        control.value === 'async@mail.ru' ? resolve({ 'uniqEmail': true }) : resolve(null)
      }, 1000);
    })
  }
}
