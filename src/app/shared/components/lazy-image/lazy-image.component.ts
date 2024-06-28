import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit {
  ngOnInit(): void {
    if (!this.urlImage) {
      throw new Error('Attribute urlImage is required');
    }
    if (!this.titleImage) {
      throw new Error('Attribute titleImage is required');
    }
  }

  public hasLoader: boolean = false;

  @Input()
  public urlImage!: string;

  @Input()
  public titleImage: string = '';

  onLoad() {
    setTimeout(() => {
      this.hasLoader = true;
    }, 1000);
  }

}
