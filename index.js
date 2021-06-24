var grid = document.getElementById("grid");
var winWidth = screen.width;
var n= 100;
var findBtn = document.getElementById("find");
var cells = [];
for(let i=0 ; i<n; ++i){
	cells[i] = [];
	var row = document.createElement('div');
	row.className = "row";
	row.style.height = 10 + 'px';
	row.style.width = winWidth + 'px';
	for(let j =0 ;j<100; ++j){
		var cell = document.createElement('div');
		cell.className = "cell";
		cell.style.width = 10+'px';
		cell.style.height = 10+'px';
		row.appendChild(cell);
		cells[i][j] = cell;
		cells[i][j].addEventListener("mouseover", function (){
               console.log("row = "+i + ",col = "+j);
               if(draw_enabled)
               cells[i][j].style.backgroundColor= "#000000";
		});
		
	}
	grid.appendChild(row);

}
var draw_enabled =false;
grid.addEventListener("mousedown", function(){
      draw_enabled =true;
});
grid.addEventListener("mouseup", function(){
      draw_enabled =false;
});
var starting_cell = [2,3];
var destination_cell = [70,20];
cells[starting_cell[0]][starting_cell[1]].style.backgroundColor= "#ffbb00";
cells[destination_cell[0]][destination_cell[1]].style.backgroundColor = "#ffbb00";
console.log(starting_cell[0]);
findBtn.addEventListener("click", function(){  bfs()});
cells[99][99].style.backgroundColor = "#000000";
