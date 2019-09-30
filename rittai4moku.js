let board=[];
for(let i=0; i<6; i++){
    board.push([]);
    for(let j=0; j<7; j++){
	//board[i][j]=0;
	board[i].push(0)
    }
}
Vue.component('entrance',{
    template: '<rect @click="drop" :x="(j+1)*100" width="100" height="100"> </rect>',
    props: ["j"],
    methods:{
	drop:function(){
	    this.$emit("drop",this.j);
	    console.log(this.j);
	}
    }
    
})

Vue.component('maru',{
    template: '<g :transform="translate">'+
	'<rect width="100" height="100" fill="navy" stroke="black"> </rect>'+
	'<circle cx="50" cy="50" r="40" :fill="fillColor"></circle>'+
	'</g>',
    props: ["i","j","state"],
    computed: {
	translate: function(){
	    return 'translate('+ 100*(this.j+1) + ', ' + 100*(this.i+1) +')';
	},
	fillColor: function(){
	    if(this.state==0){
		return "white";
	    }
	    else if(this.state==1){
		return "yellow";
	    }
	    else if (this.state==2){
		return "red";
	    }
	}
    }
})

app=new Vue({
    el:"#board",
    data:{
	board: board,
    }
});
