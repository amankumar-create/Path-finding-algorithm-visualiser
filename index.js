var grid = document.getElementById("grid");
var rows = (screen.height-100)/10;
var cols= (screen.width )/10;
rows = Math.ceil(rows);
cols = Math.ceil(cols);
var draw_enabled =false;
var starting_cell_selected = false;
var destination_cell_selected = false;
var starting_cell_coord = [5,5];
var destination_cell_coord = [30,30];


var findBtn = document.getElementById("find");

var cells = [];

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
            listen_events(i,j);


            
      }
      grid.appendChild(row);

}

cells[5][5].className = "startingcell";
cells[30][30].className = "destinationcell";

 
var destination_cell = document.getElementsByClassName("destinationcell");
var starting_cell  = document.getElementsByClassName("startingcell");

grid.addEventListener("mousedown", function(){
      draw_enabled =true;
      starting_cell  = document.getElementsByClassName("startingcell");
      destination_cell = document.getElementsByClassName("destinationcell");
       
       
});
grid.addEventListener("mouseup", function(){
      draw_enabled =false;
});

function listen_events(i,j){
      cells[i][j].addEventListener("mouseover", function (){
             
            if(!starting_cell_selected && !destination_cell_selected){
                  grid.style.cursor ="cell";
            }
            if(cells[i][j].className=="startingcell"||cells.className=="destinationcell"){
                  cells[i][j].style.cursor = "grab";
            }
            if(starting_cell_selected){ 
                   cells[i][j].style.cursor = "grabbing";
                  if(cells[i][j].className!="destinationcell"){
                       
                       erase_visited();
                       erase_path();
                       starting_cell[0].className = "cell";
                       cells[i][j].className = "startingcell";
                       starting_cell_coord = [i,j];
                  
                       bfs(false);
                 }
             //console.log("current startingcell = "+i+" "+j);
             
                   
            }
            else if(destination_cell_selected){ 
                  cells[i][j].style.cursor = "grabbing";
                  cells[destination_cell_coord[0]][destination_cell_coord[1]].className = "cell";
                  if(cells[i][j].id!="obstacle"){
                   erase_visited();
                  erase_path();
                  //console.log(cells[i][j].className);
                  cells[i][j].className = "destinationcell";
                  destination_cell_coord = [i,j];
                  
                  bfs(false);
                  }
                  //console.log("current destinationcell = "+i+" "+j);
                  
               }
               else{ 
             
                  if(draw_enabled)
                        if(cells[i][j].className!=="startingcell" && cells[i][j].className!=="destinationcell"){
                            cells[i][j].id ="obstacle";
                            if(cells[i][j].className == 'pathcell'){
                              erase_visited();
                              //console.log("visited_erased");
                              erase_path();
                              //console.log("path erased");
                              bfs(false);
                              //console.log("bfs  ");
                            }
                        }
               }  
            });


            cells[i][j].addEventListener("mousedown",function(){  
               if(cells[i][j]==starting_cell[0]){
                  starting_cell_selected =true;
                  grid.style.cursor = "grabbing";
               }
               else if(cells[i][j]==destination_cell[0]){
                     destination_cell_selected =true;
                      grid.style.cursor = "grabbing";
               }
              
            });
            cells[i][j].addEventListener("mouseup",function(){
               if(cells[i][j]==starting_cell[0]){
                  starting_cell_selected =false;
                  cells[i][j].className = "startingcell";
                  starting_cell_coord = [i,j];
                  grid.style.cursor = "grab";
                    
               }
               if(cells[i][j]==destination_cell[0]){
                  destination_cell_selected =false;
                  cells[i][j].className = "destinationcell";
                  destination_cell_coord = [i,j];
                   grid.style.cursor = "grab";

               }
            });
            
}
 
findBtn.addEventListener("click", function(){
      erase_visited();
      erase_path();  
      //bfs(true);
      dijkstra();
});
function erase_visited(){
     
      for(var i=0; i<order_of_traversal.length-1; ++i){

          
            cells[order_of_traversal[i][0]][order_of_traversal[i][1]].className = "cell";
     
      }
      order_of_traversal = []
}
function erase_path(){
      var pathcells = document.getElementsByClassName("pathcell");
      for(var i=0; i<shortest_path.length-1; ++i){
       
          cells[shortest_path[i][0]][shortest_path[i][1]].className = "cell";
     
      }
      shortest_path = [];
}
 
var cell_color=cells[0][0].style.backgroundColor;
 
var dropBtn = document.getElementById('dropBtn');
var algo1 = document.getElementById('a1');
var algo2 = document.getElementById('a2');

//choosing algorithm -----------------------------------------------------------------------
var algo = 1;
algo1.addEventListener("click", function () {
    algo = 1;
    dropBtn.innerHTML = "Breadth First Search";

});
algo2.addEventListener("click", function () {
    algo = 2;
    dropBtn.innerHTML = "Dijkstra's Algorithm";
});