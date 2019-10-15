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

Vue.component('banmen',{
    template: '<g> <entrance v-if="playing" v-for="(c,j) in board[0]" :j="j" @drop="shoot"></entrance>'+
	' <g v-for="(row,i) in board">'+
	'<maru v-for="(c,j) in row" :i="i" :j="j" :state="board[i][j]" ></maru>'+
	'</g>'+
	'</g>',
    data: function(){
	return {board:board,player:1,playing:true};
	
    },
    methods:{
	shoot(j){
	    for(let i=board.length-1; i>=0; i--){
		if(board[i][j]==0){
		    board[i].splice(j,1,this.player);
		    if(this.hantei(this.player)){
			this.playing=false;
			break;
		    }
		    
		    if(this.player==1){
			this.player=2;
			
		    }
		    else  if(this.player==2){
			
			this.player=1;	
		    }			
		    break;
		}
	    }
	}
	,
	hantei(player){
	    for(let j=0; j<7; j++){
		for(let i=0; i<3; i++){
		    let flag=true;
		    for(let k=0; k<4; k++){
			console.log([i,j,k]);
			if(board[i+k][j]!=this.player){
			    flag=false;
			    break;
			}
			
		    }
		    if (flag==true){
			return true;
		    }
		}
	    }
	    for(let i=0; i<6; i++){
		for(let j=0; j<4; j++){
		    let flag=true;
		    for(let k=0; k<4; k++){
			console.log([i,j,k]);
			if(board[i][j+k]!=this.player){
			    flag=false;
			    break;
			}			
		    }
		    if (flag==true){
			return true;
		    }
		}
	    }
	    for(let j=0; j<4; j++){
		for(let i=0; i<3; i++){
		    let flag=true;
		    for(let k=1; k<4; k++){
			console.log([i,j,k]);
			if(board[i+k][j+k]!=this.player){
			    flag=false;
			    break;
			}			
		    }
		    if (flag==true){
			return true;
		    }
		}
	    }
	    return false;
	}	
    }    
})

app=new Vue({
    el:"#board",
    data:{
	board: board,
	player: 1,
    }
});
