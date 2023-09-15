import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SelectNetworkComponent } from './components/select-network/select-network.component';
import { TransferCryptoComponent } from './components/transfer-crypto/transfer-crypto.component';

import { Web3Service } from './web3.service';
import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SelectNetworkComponent,
    TransferCryptoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TypeaheadModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [ApiService, Web3Service],
  bootstrap: [AppComponent],
})
export class AppModule {}
