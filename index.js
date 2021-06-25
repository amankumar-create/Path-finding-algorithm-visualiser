var grid = document.getElementById("grid");
var rows = (screen.height-150)/10;

var cols= (screen.width-100)/10;
rows = Math.ceil(rows);
cols = Math.ceil(cols);
console.log(rows+" "+cols);
var findBtn = document.getElementById("find");
var cells = [];
var starting_cell_selected = false;
var destination_cell_selected = false;
for(let i=0 ; i<rows; ++i){
	cells[i] = [];
	var row = document.createElement('div');
	row.className = "row";
	row.style.height = 10 + 'px';
	row.style.width = screen.width + 'px';
	for(let j =0 ;j<cols; ++j){
		var cell = document.createElement('div');
		cell.className = "cell";
		cell.style.width = 10+'px';
		cell.style.height = 10+'px';
		row.appendChild(cell);
		cells[i][j] = cell;
		cells[i][j].addEventListener("mouseover", function (){
               console.log("row = "+i + ",col = "+j);
                if(starting_cell_selected){ 
                   starting_cell[0].className = "cell";
                   cells[i][j].className = "startingcell";
                   //console.log("current startingcell = "+i+" "+j);
                   
                   
               }
               else if(destination_cell_selected){ 
               	 destination_cell[0].className = "cell";
                   cells[i][j].className = "destinationcell";
                   //console.log("current destinationcell = "+i+" "+j);
                   
                   
               }
               else{ 
                  if(draw_enabled)
                  	if(cells[i][j].className!=="startingcell" && cells[i][j].className!=="destinationcell")
                            cells[i][j].style.backgroundColor= "#000000";
               }  
		});


		cells[i][j].addEventListener("mousedown",function(){  
               if(cells[i][j]==starting_cell[0]){
               	starting_cell_selected =true;
                   console.log("current startingcell = "+i+" "+j);


               }
               else if(cells[i][j]==destination_cell[0]){
                     destination_cell_selected =true;
                     console.log("destinationcell selected= "+i+" "+j);
               }
              
		});
		cells[i][j].addEventListener("mouseup",function(){
               if(cells[i][j]==starting_cell[0]){
               	starting_cell_selected =false;
               	cells[i][j].className = "startingcell";
               	starting_cell_coord = [i,j];
                    
               }
               if(cells[i][j]==destination_cell[0]){
               	destination_cell_selected =false;
               	cells[i][j].className = "destinationcell";
               	destination_cell_coord = [i,j];

               }
		});
		


		
	}
	grid.appendChild(row);

}
var draw_enabled =false;
cells[5][5].className = "startingcell";
cells[50][20].className = "destinationcell";
var starting_cell_coord = [5,5];
var destination_cell_coord = [50,20];
//cells[3][2].className = "startingcell";
var destination_cell = document.getElementsByClassName("destinationcell");
var starting_cell  = document.getElementsByClassName("startingcell");

grid.addEventListener("mousedown", function(){
      draw_enabled =true;
      starting_cell  = document.getElementsByClassName("startingcell");
      destination_cell = document.getElementsByClassName("destinationcell");
      //console.log(starting_cell[0]);
      //console.log(destination_cell[0]);

       
});
grid.addEventListener("mouseup", function(){
      draw_enabled =false;
});


 
console.log(starting_cell[0]);
findBtn.addEventListener("click", function(){
  
  erase_path();  
  bfs()
});
function erase_path(){
      var pathcells = document.getElementsByClassName("pathcell");
      for(var i=0; i<shortest_path.length-1; ++i){
       
          cells[shortest_path[i][0]][shortest_path[i][1]].className = "cell";
     
      }
      shortest_path = [];
}











cells[rows-1][cols-1].style.backgroundColor = "#000000";
var cell_color=cells[0][0].style.backgroundColor;
console.log(document.getElementsByClassName('cell')[0].getAttribute('backgroundColor'));
