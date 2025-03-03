import { UpperCasePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [UpperCasePipe],
  templateUrl: './hero.component.html',
  styles: ``
})
export class HeroComponent {
  public name = signal('Ironman');
  public age = signal(45);

  // only read signal
  public heroDesc = computed(() => {
    const desc:string = `${this.name()} - ${this.age()}`;
    
    return desc;
  });

  public capitalize = computed(() => this.name().toUpperCase());

  public getHeroDescription(): string {
    return `${this.name()} - ${this.age()}`;
  }

  public changeHero():void {
    this.name.set("Spiderman");
    this.age.set(22);
  }

  public resetForm(): void {
    this.name.set("Ironman");
    this.age.set(45);
  }

  public chageAge():void {
    this.age.set(60);
    // this.age.update(() => 60);
  }
}
