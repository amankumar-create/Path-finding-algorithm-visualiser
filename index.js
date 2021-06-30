var grid = document.getElementById("grid");
var findBtn = document.getElementById("find");
var createMaze = document.getElementById("create_maze");

var rows = (screen.height -80)/15;
var cols= (screen.width )/15;
rows = Math.ceil(rows);
cols = Math.ceil(cols);
var draw_enabled =false;
var starting_cell_selected = false;
var destination_cell_selected = false;
var starting_cell_coord = [5,5];
var destination_cell_coord = [20,20];

var cells = [];
//populating the area with cells to create a grid of cells
for(let i=0 ; i<rows; ++i){
      cells[i] = [];
      var row = document.createElement('div');
      row.className = "row";
      row.style.height = 15 + 'px';
      row.style.width = screen.width + 'px';
      for(let j =0 ;j<cols; ++j){
            var cell = document.createElement('div');
            cell.className = "cell";
       
            row.appendChild(cell);
            cells[i][j] = cell;
            listen_events(i,j); // adding event listeners to the cell
   
      }
      grid.appendChild(row);

}

//default starting and destination cell
cells[5][5].className = "startingcell";
cells[20][20].className = "destinationcell";

 
var destination_cell = document.getElementsByClassName("destinationcell");
var starting_cell  = document.getElementsByClassName("startingcell");


grid.addEventListener("mousedown", function(){
      draw_enabled =true;   //when mouse button is pressed down inside grid the obstacle drawing is enabled
      starting_cell  = document.getElementsByClassName("startingcell");
      destination_cell = document.getElementsByClassName("destinationcell");
           
});


grid.addEventListener("mouseup", function(){
      draw_enabled =false;  //when mouse is released inside grid the obstacle drawing is disabled
});
//function to add event listeners to cells in a grid
function listen_events(i,j){
      cells[i][j].addEventListener("mouseover", function (){
             
            if(!starting_cell_selected && !destination_cell_selected){
                  grid.style.cursor ="cell";
            }
            if(cells[i][j].className=="startingcell"||cells.className=="destinationcell"){
                  cells[i][j].style.cursor = "grab";
            }
            if(starting_cell_selected){ //if starting cell is selected for being dragged
                   cells[i][j].style.cursor = "grabbing";
                  if(cells[i][j].className!="destinationcell"){
                       
                       erase_visited();
                       erase_path();
                       starting_cell[0].className = "cell";  //set the class of cell at starting cell coordinates to normal cell
                       cells[i][j].className = "startingcell"; //convert the cell on which mouse is over currently to new starting cell 
                       starting_cell_coord = [i,j];   // update starting cell coordinates
                        
                       bfs(false); // get new path for new starting cell through bfs
                 }
             
                   
            }
            else if(destination_cell_selected){ //if destination cell is selected for being dragged
                  cells[i][j].style.cursor = "grabbing";
                  cells[destination_cell_coord[0]][destination_cell_coord[1]].className = "cell"; //set the class of cell at destination coordinates to normal cell
                  if(cells[i][j].id!="obstacle"){ 
                        erase_visited();
                        erase_path();
                        //console.log(cells[i][j].className);
                        cells[i][j].className = "destinationcell"; //convert the cell on which mouse is over currently to new destination cell 
                        destination_cell_coord = [i,j];             // update destination cell coordinated
                        //console.log("current startingcell = "+i+" "+j);
                        
                        bfs(false); //get new path for new destination cell from bfs
                  }
                  //console.log("current destinationcell = "+i+" "+j);
                  
               }
               else{ 
             
                  if(draw_enabled) // if draw is enabled we will add or remove obstacles on mouse over event on any cell except starting and ending cell
                        if(cells[i][j].className!=="startingcell" && cells[i][j].className!=="destinationcell"){
                            if(!maze_drawn)cells[i][j].id ="obstacle";  // if maze is not already drawn we would want to add obstacles in arena  
                            else{
                              cells[i][j].removeAttribute("id");   // else if maze is already there we can remove some of the obstacles to have better visualisation
                            }
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
                  if(cells[i][j]==starting_cell[0]){  // if the cell is starting cell
                       starting_cell_selected =true;   // staring cell is set to be selected for dragging
                       grid.style.cursor = "grabbing"; 
                  }  
                  else if(cells[i][j]==destination_cell[0]){ //else if cell is destination cell 
                        destination_cell_selected =true  ; // destination cell is selected for dragging
                        grid.style.cursor = "grabbing";
                  }
                 
            });
            cells[i][j].addEventListener("mouseup",function(){
               if(cells[i][j]==starting_cell[0]){
                  starting_cell_selected =false; // starting cell is unselected 
                  cells[i][j].className = "startingcell";
                  starting_cell_coord = [i,j]; 
                  grid.style.cursor = "grab";
                    
               }
               if(cells[i][j]==destination_cell[0]){
                  destination_cell_selected =false; //destination cell is unselected 
                  cells[i][j].className = "destinationcell";
                  destination_cell_coord = [i,j];
                   grid.style.cursor = "grab";

               }
            });
            
}
var maze_drawn = false;
// handling click of create maze button  
createMaze.addEventListener("click", function(){
      erase_visited(); //erase visited cell if any
      erase_path();  //erase current path if any
      if(!maze_drawn){
           create_maze(); // if maze is not already drawn , draw the maze
           maze_drawn = true; 
           createMaze.innerHTML = "Erase Maze";            
      }
      else{
            erase_maze();  // if maze is already drawn erase it
            maze_drawn=false;
           createMaze.innerHTML = "Create Maze";            

      }
      cells[starting_cell_coord[0]][starting_cell_coord[1]].className = "startingcell";

});
// handle the click of find path button 
findBtn.addEventListener("click", function(){
      erase_visited(); //erases currently visited cells if any
      erase_path();   //erases current path if any
     
       
      if(algo==1){
            bfs(true); //if algorithm 1 was selected breadth first search is triggered
      }
      else{
            dijkstra(); //else dijkstra algo is triggered
      }
  
});
// function to erase the visited cells by changing them back to normal cells
function erase_visited(){
     
      for(var i=0; i<order_of_traversal.length-1; ++i){

          
            cells[order_of_traversal[i][0]][order_of_traversal[i][1]].className = "cell";
     
      }
      order_of_traversal = []
}

//function to erase the current path 
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

//choosing algorithm by click event listeners to the algo choosing dropdown menu items 
var algo = 1;
algo1.addEventListener("click", function () {
    algo = 1;
    dropBtn.innerHTML = "Breadth First Search";

});
algo2.addEventListener("click", function () {
    algo = 2;
    dropBtn.innerHTML = "Dijkstra's Algorithm";
});