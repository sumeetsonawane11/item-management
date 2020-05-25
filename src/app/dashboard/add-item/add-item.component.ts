import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DashboardService } from '../service/dashboard.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

interface ItemType {
  name: string,
  value: string
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})

export class AddItemComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public isAddNewformVisible = true;
  public itemType: ItemType[] = [];
  public isLoading = false;
  public getItemSubs: Subscription;
  public isUserAuthenticated = false;
  public getErrorSubs: Subscription;
  constructor(private dashBoardService: DashboardService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.isUserAuthenticated = this.authService.getAuth();
    this.itemType = [
      { name: 'One', value: 'Hydrogen' },
      { name: 'two', value: 'Carbon' },
      { name: 'Three', value: 'Ocygen' }
    ];
    this.form = new FormGroup({
      'itemName': new FormControl(null, { validators: [Validators.required] }),
      'itemType': new FormControl(null, { validators: [Validators.required] }),
      'provider': new FormControl(null, { validators: [Validators.required] }),
      'qty': new FormControl(null, { validators: [Validators.required] }),
      'availableDate': new FormControl(null, { validators: [Validators.required] }),
      'location': new FormControl(null, { validators: [Validators.required] })
    });

    this.getItemSubs = this.dashBoardService.getItemCreatedHandler()
      .subscribe(() => {
        this.form.reset();
        this.removeValidators();
        this.isLoading = false;
        this.isAddNewformVisible = true;
      })


    this.getErrorSubs = this.dashBoardService.getErrorHandler()
      .subscribe((error) => {
        this.isLoading = false;
        this.isAddNewformVisible = true;
      })
  }

  private removeValidators() {
    this.form.controls.itemName.setErrors(null);
    this.form.controls.itemType.setErrors(null);
    this.form.controls.provider.setErrors(null);
    this.form.controls.availableDate.setErrors(null);
    this.form.controls.location.setErrors(null);
    this.form.controls.qty.setErrors(null);
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();
  }

  onAddNewItem() {
    if (this.form.invalid) return;
    const availableDate = this.form.value.availableDate.getTime();
    const itemObj = {
      name: this.form.value.itemName,
      type: this.form.value.itemType,
      provider: this.form.value.provider,
      availableDate: availableDate,
      qty: this.form.value.qty,
      location: this.form.value.location
    };
    this.isLoading = true;
    this.dashBoardService.CreateItem(itemObj);
  }

  ngOnDestroy() {
    this.getItemSubs.unsubscribe();
    this.getErrorSubs.unsubscribe();
  }
}
