import { Component } from '@angular/core';
import { Tier } from './shared/models/tier';

@Component({
  selector: 'my-app',
  template: `
  	<header>
  		This is a guide on colors.
  	</header>

    <body>

      <div class="row">

        <div class="col-sm-4">

          <div id="nav" style="inline-block;position:relative">
            <button type="button" class="btn btn-default" data-toggle="collapse" data-target="#tiers">
              <span class="glyphicon glyphicon-menu-hamburger"></span>
            </button>

            <div *ngIf="tiers" id="tiers" class="collapse">
              <ul class="list-group tiers-list"> 
                <li class="list-group-item" 
                  *ngFor="let tier of tiers"
                  (click)="selectTier(tier)"
                  [class.active]="tier === activeTier">
                  {{ tier.tierName }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-sm-8">
          <!-- Tier title and -->
          <div *ngIf="activeTier" style="width:80%;height:100%;display:inline;position:relative">
            <div>
              <h2> {{ activeTier.tierName }} </h2>
              <small> {{ activeTier.description }} </small>
            </div>

            <!-- Color Squares -->

            <div class="flip-container" *ngFor="let color of activeTier.colors" ontouchstart="this.classList.toggle('hover');">
              <ul class="list-colors" 
              (click)="selectColor(color)"
              [class.active]="color === activeColor"></ul>

              <div class="flipper">
                <!-- front content -->
                <div class="front" [style.background-color]="color.colorHex">
                  {{ color.colorName}}
                  </div>
                  <div class="back" [style.background-color]="color.colorHex">
                    <!-- back content -->
                      This color is made with {{ color.mix1 }} and {{ color.mix2 }}.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    </body>

    <footer class="text-center">
    	Copyright 2017.
    </footer>

    

  `,
  styles: [`

    /* entire container, keeps perspective */
    .flip-container {
      perspective: 1000px;
      display: inline-block;
      margin-right: 10px;
    }
      /* flip the pane when hovered */
      .flip-container:hover .flipper, .flip-container.hover .flipper {
        transform: rotateY(180deg);
      }

    .flip-container, .front, .back {

      width: 150px;
      height: 150px;
      text-align: center;
    }

    /* flip speed goes here */
    .flipper {
      transition: 0.6s;
      transform-style: preserve-3d;

      position: relative;
    }

    /* hide back of pane during swap */
    .front, .back {
      backface-visibility: hidden;
      position: absolute;
      top: 0;
      left: 0;
    }

    /* front pane, placed above back */
    .front {
      z-index: 2;
      /* for firefox 31 */
      transform: rotateY(0deg);
    }

    /* back, initially hidden pane */
    .back {
      transform: rotateY(180deg);
    }

    .colors-list li {
      cursor: pointer;
    }

    .nav {
      width: 40px;
      transition: width 1s ease-in-out;
    }

    .button-element {
      border: 1px solid black;
      opacity: 1;
      padding: 10px;
    }
  `]
})
export class AppComponent {
    tiers: Tier[] =[
        {
          'tierName': "Primary",
          'description': "A set of colors that can be combined to make a useful range of colors.",
          'colors': [
            {colorName: 'Red', colorHex: '#EF3340', mix1: null, mix2: null, label: 'Primary'},
            {colorName: 'Blue', colorHex: '#10069F', mix1: null, mix2: null, label: 'Primary'},
            {colorName: 'Yellow', colorHex: '#F7E300', mix1: null, mix2: null, label: 'Primary'}
          ]
        },
        {
          'tierName': "Secondary",
          'description': "A color made by mixing two primary colors",
          'colors': [
            {colorName: 'Purple', colorHex: '#4E008E', mix1: 'Blue', mix2: 'Red', label: 'Secondary'},
            {colorName: 'Orange', colorHex: '#FE5000', mix1: 'Red', mix2: 'Yellow', label: 'Secondary'},
            {colorName: 'Green', colorHex: '#00AB84', mix1: 'Blue', mix2: 'Yellow', label: 'Secondary'}
          ]
        },
        {
          'tierName': "Tertiary",
          'description': "A color made by mixing full saturation of one primary color with half saturation of another primary color and none of a third primary color.",
          'colors': [
            {colorName: 'Vermilion', colorHex: '#F9633B', mix1: 'Red', mix2: 'Orange', label: 'Tertiary'},
            {colorName: 'Amber', colorHex: '#FAB75A', mix1: 'Orange', mix2: 'Yellow', label: 'Tertiary'},
            {colorName: 'Chartreuse', colorHex: '#B5BF50', mix1: 'Yellow', mix2: 'Green', label: 'Tertiary'},
            {colorName: 'Teal', colorHex: '#478589', mix1: 'Green', mix2: 'Blue', label: 'Tertiary'},
            {colorName: 'Violet', colorHex: '#BF9BDE', mix1: 'Blue', mix2: 'Purple', label: 'Tertiary'},
            {colorName: 'Magenta', colorHex: '#F1B2DC', mix1: 'Purple', mix2: 'Red', label: 'Tertiary'}
          ]
        }
  ];
  
  activeTier;
  activeColor;

  selectTier(tier) {
    this.activeTier = tier;
    console.log(this.activeTier);
  };

}