import { Component, OnInit } from '@angular/core';
import { Boule } from './boule';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css']

})
export class AppComponent implements OnInit {
	nbreBoules = 8;
	max_weight:number;// = Math.floor((Math.random() * this.nbreBoules) + 1);
	boules:Boule[] = [];
	iterations:number;
	boule_max_weight:number;
	selectedBoule:Boule;
	ngOnInit(): void {
		this.remplir_tab();
		this.reset();
	}
	onSelect(boule:Boule):void{
		this.selectedBoule = boule;
	}
	find():void{
		var plateau1 = 0;
		var plateau2 = 0;
		var jeton = this.nbreBoules;
		var init = 0;
		var it = 0;
		var moitie = (jeton + init)/2;
		do{
			it++;
			for(var i = init; i < moitie; i++)
				plateau1 += this.boules[i].weight;
			for(var i = moitie; i < jeton; i++)
				plateau2 += this.boules[i].weight;
			if(plateau1 < plateau2){
				init = moitie;
			}
			else{
				jeton = moitie;
			}
			moitie = (jeton + init)/2;
			plateau1 = 0;
			plateau2 = 0;
		}while((jeton - init) > 1);
		this.boule_max_weight = init + 1;
		this.iterations = it;
	}

	remplir_tab(){
		for(var i = 0;i < this.nbreBoules; i++){
			this.boules[i] = {id: i + 1, weight: 10};
		}
	}
	reset():void{
		this.boule_max_weight = 0;
		this.selectedBoule = null;
		this.max_weight = Math.floor((Math.random() * this.nbreBoules) + 1);
		this.boules[this.max_weight - 1].weight = 15;
		for(var i = 0; i < this.nbreBoules; i++){
			if((this.max_weight - 1) != i)
				this.boules[i].weight = 10;
		}
	}
}