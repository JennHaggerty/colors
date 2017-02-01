import { Component } from '@angular/core';
import { Tier } from './shared/models/tier';

@Component({
  selector: 'my-app',
  template: `
  	<header>
  		This is an educational guide on colors from the pigment spectrum.
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
          <!-- If there is no active tier -->
          <div *ngIf="!activeTier" style="width:80%;height:100%;display:inline;position:relative">
            <div>
              <h2>Choose a Tier</h2>
              <small>Select a color tier from the menu to see what colors are included and how they are created.</small>
            </div>
          </div>
          <!-- Tier title and description -->
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
                <div class="front" [style.background-color]="color.colorHex1">
                  <div class="frontDiv">
                    {{ color.colorName}}
                  </div>
                </div>
                <div class="back" [ngSwitch]="activeTier.tierName">
                  <!-- back content -->
                  <div *ngSwitchCase="'Primary'" [style.background-color]="color.colorHex2">
                    <div class="backDiv">
                      {{ color.colorName }} cannot be created by mixing two colors.
                    </div>
                  </div>
                  <div *ngSwitchCase="'Complementary'" [style.background-color]="color.colorHex2">
                    <div class="backDiv">
                      {{ color.mix2 }}
                    </div>
                  </div>
                  <div *ngSwitchDefault [style.background-color]="color.colorHex2">
                    <div class="backDiv">
                      {{ color.colorName }} is made with {{ color.mix1 }} and {{ color.mix2 }}.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </body>

    

  `,
  styles: [`

    .glyphicon-hand-left, .glyphicon-hand-right {
      font-size: 40px;
      content-align: center;
    }

    /* entire container, keeps perspective */
    .flip-container {
      perspective: 1000px;
      display: inline-block;
      margin-right: 5px;
    }
    /* flip the pane when hovered */
    .flip-container:hover .flipper, .flip-container.hover .flipper {
      transform: rotateY(180deg);
    }

    .flip-container, .front, .back {
      width: 175px;
      height: 175px;
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
      color: white;
      backface-visibility: hidden;
      position: absolute;
      top: 0;
      left: 0;
    }

    /* front pane, placed above back */
    .front {
      font-size: 18px;
      text-transform: uppercase;
      z-index: 2;
      /* for firefox 31 */
      transform: rotateY(0deg);
    }

    /* back, initially hidden pane */
    .back {
      transform: rotateY(180deg);
      font-size: 14px;
    }

    .backDiv {
      width: 175px;
      height: 175px;
    }

    /*.frontDiv {
      margin-top: 5px;
    }*/

    .colors-list li {
      cursor: pointer;
    }

    .nav {
      width: 40px;
      transition: width 1s ease-in-out;
    }

    .btn {
      -webkit-box-shadow: 0px 0px 0px;
      box-shadow: 0px 0px 0px;
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
      'description': "A set of colors that can be combined to make a useful range of colors. Note: These colors may not be created by combining any two colors.",
      'colors': [
        {colorName: 'Red', colorHex1: '#EF3340', colorHex2: '#EF3340', mix1: null, mix2: null},
        {colorName: 'Blue', colorHex1: '#10069F', colorHex2: '#10069F', mix1: null, mix2: null},
        {colorName: 'Yellow', colorHex1: '#F7E300', colorHex2: '#F7E300', mix1: null, mix2: null}
      ]
    },
    {
      'tierName': "Secondary",
      'description': "A color made by mixing two primary colors",
      'colors': [
        {colorName: 'Purple', colorHex1: '#4E008E', colorHex2: '#4E008E', mix1: 'Blue', mix2: 'Red'},
        {colorName: 'Orange', colorHex1: '#FE5000', colorHex2: '#FE5000', mix1: 'Red', mix2: 'Yellow'},
        {colorName: 'Green', colorHex1: '#00AB84', colorHex2: '#00AB84', mix1: 'Blue', mix2: 'Yellow'}
      ]
    },
    {
      'tierName': "Tertiary",
      'description': "A color made by mixing full saturation of one primary color with half saturation of another primary color and none of a third primary color.",
      'colors': [
        {colorName: 'Vermilion', colorHex1: '#E53000', colorHex2: '#E53000', mix1: 'Red', mix2: 'Orange'},
        {colorName: 'Amber', colorHex1: '#FF9400', colorHex2: '#FF9400', mix1: 'Orange', mix2: 'Yellow'},
        {colorName: 'Chartreuse', colorHex1: '#B6CC00', colorHex2: '#B6CC00', mix1: 'Yellow', mix2: 'Green'},
        {colorName: 'Teal', colorHex1: '#00BFCC', colorHex2: '#00BFCC', mix1: 'Green', mix2: 'Blue'},
        {colorName: 'Violet', colorHex1: '#8800FF', colorHex2: '#8800FF', mix1: 'Blue', mix2: 'Purple'},
        {colorName: 'Magenta', colorHex1: '#FF00AD', colorHex2: '#FF00AD', mix1: 'Purple', mix2: 'Red'}
      ]
    },
    {
      'tierName': "Cool",
      'description': "Cool colors are made with blue, green, purple, or some combination of these.",
      'colors': [
        {colorName: 'Blue', colorHex1:'#10069F', colorHex2: '#FFFFFF', mix1: null, mix2: null},
        {colorName: 'Purple', colorHex1: '#4E008E', colorHex2: '#4E008E', mix1: 'Blue', mix2: 'Red'},
        {colorName: 'Green', colorHex1: '#00AB84', colorHex2: '#00AB84', mix1: 'Blue', mix2: 'Yellow'},
        {colorName: 'Teal', colorHex1: '#00BFCC', colorHex2: '#00BFCC', mix1: 'Green', mix2: 'Blue'},
        {colorName: 'Violet', colorHex1: '#8800FF', colorHex2: '#8800FF', mix1: 'Blue', mix2: 'Purple'},
        {colorName: 'Magenta', colorHex1: '#FF00AD', colorHex2: '#FF00AD', mix1: 'Purple', mix2: 'Red'},
        {colorName: 'Chartreuse ', colorHex1: '#7fff00', colorHex2: '#7fff00', mix1: 'Yellow', mix2: 'Green'}
      ]
    },
    {
      'tierName': "Warm",
      'description': "Warm colors are made with red, yellow, orange, or some combination of these.",
      'colors': [
        {colorName: 'Red', colorHex1: '#EF3340', colorHex2: '#FFFFFF', mix1: null, mix2: null},
        {colorName: 'Yellow', colorHex1: '#F7E300', colorHex2: '#FFFFFF', mix1: null, mix2: null},
        {colorName: 'Orange', colorHex1: '#FE5000', colorHex2: '#FE5000', mix1: 'Red', mix2: 'Yellow'},
        {colorName: 'Vermilion', colorHex1: '#E53000', colorHex2: '#E53000', mix1: 'Red', mix2: 'Orange'},
        {colorName: 'Amber', colorHex1: '#FF9400', colorHex2: '#FF9400', mix1: 'Orange', mix2: 'Yellow'},
        {colorName: 'Magenta', colorHex1: '#FF00AD', colorHex2: '#FF00AD', mix1: 'Purple', mix2: 'Red'},
        {colorName: 'Chartreuse ', colorHex1: '#7fff00', colorHex2: '#7fff00', mix1: 'Yellow', mix2: 'Green'}
      ]
    },
    {
      'tierName': "Complementary",
      'description': "Pairs of colors which, when combined, cancel each other out producing a neutral-scale color like grey or brown.",
      'colors': [
        {colorName: 'Red', colorHex1: '#EF3340', colorHex2: '#00AB84', mix1: 'Red', mix2: 'Green',},
        {colorName: 'Yellow', colorHex1: '#F7E300', colorHex2: '#4E008E', mix1: 'Yellow', mix2: 'Purple'},
        {colorName: 'Blue', colorHex1: '#10069F', colorHex2: '#FE5000', mix1: 'Blue', mix2: 'Orange'}
      ]
    }
  ];
  
  activeTier;

  selectTier(tier) {
    this.activeTier = tier;
    console.log(this.activeTier);
  };

}