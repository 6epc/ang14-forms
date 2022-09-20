import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { MyValidators } from './my.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('dima', [Validators.required, Validators.minLength(3)]),
      email: new FormControl(
        '',
        [Validators.required, Validators.email, MyValidators.restricktedEmails],
        [MyValidators.uniqEmail]
      ),
      password: new FormControl('111', [Validators.required, Validators.minLength(3)]),

      //address
      address: new FormGroup({
        country: new FormControl('ru'),
        city: new FormControl('Москва', Validators.required)
      }),

      //skills
      skills: new FormArray([])
    })
  }

  get name() { return this.form.get('name')!; }
  get email() { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }
  get skills() {
    return this.form.get('skills') as FormArray;
  }

  setCapital() {
    const cityMap: { [key: string]: string } = {
      ru: 'Москва',
      ua: 'Киев',
      by: 'Минск'
    }
    const cityKey = this.form.get('address.country')?.value;
    const city = cityMap[cityKey];
    this.form.patchValue({ address: { city } });
  }

  addSkill() {
    const control = new FormControl('', Validators.required);
    // (<FormArray>this.form.get('skills')).push(control);
    this.skills.push(control);
  }

  submit() {
    if (this.form.valid) {
      const formData = { ...this.form.value };
      console.log(formData);
      this.form.reset();
    }
  }
}

