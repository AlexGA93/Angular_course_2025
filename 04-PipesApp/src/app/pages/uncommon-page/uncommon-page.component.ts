import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { Client } from '../../interfaces/general.interface';
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';

const client1: Client = {
  name: 'Fernando',
  gender: 'male',
  age: 35,
  address: 'Ottawa, Canada',
};

const client2: Client = {
  name: 'Maria',
  gender: 'female',
  age: 25,
  address: 'Paris, France',
};

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, KeyValuePipe, TitleCasePipe, AsyncPipe],
  templateUrl: './uncommon-page.component.html'
})

export class UncommonPageComponent {
  client = signal<Client>(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };

  changeClient() {
    if(this.client() === client1) {
      this.client.set(client2);
      return;
    }

    this.client.set(client1);

    console.log(`Client changed to: ${this.client().name}`);
    
  }

  // * i18nPlural
  clients = signal(['Fernando', 'Maria', 'Juan', 'Ana', 'Luis']);
  clientsMap = signal({
    '=0': 'no tenemos clientes esperando.',
    '=1': 'tenemos un cliente esperando.',
    other: 'tenemos # clientes esperando.',
  });

    deleteClient() {
      this.clients.update((prev) => prev.slice(1));
  }

  // * keyValuePipe
  profile = signal({
    name: 'Maria',
    gender: 'female',
    age: 25,
    address: 'Paris, France',
  });

  // asyncPipe
  promiseValue = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      resolve('Async Pipe Value');
      console.log('Promesa finalziada');
      
    }, 3000);
  });

  myObservableTimer = interval(2000).pipe(
    map((value) => value+1),
    tap((value) => console.log('Timer value:', value))
  );
}

