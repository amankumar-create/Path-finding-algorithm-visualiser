var is_visited = []; // is_visited[i][j] stores if the cell[i][j] is already visited in dfs traversal


function create_maze(){
    is_visited = [];
    for(let i=0 ; i<rows; ++i){
        is_visited[i] = [];
        for(let j =0 ;j<cols; ++j){
              cells[i][j].id = "obstacle"; // making whole grid black by making each cell an obstacle
              is_visited[i][j] = false;
        }
    }
    dfs(starting_cell_coord[0],starting_cell_coord[1]); 
    cells[destination_cell_coord[0]][destination_cell_coord[1]].removeAttribute("id"); 
    cells[destination_cell_coord[0]][destination_cell_coord[1]].className = "destinationcell";

}


//we will generate a maze using depth first search starting at the starting cell

function dfs(i,j){
     is_visited[i][j] = true;     //set the visited to true for current cell coordinates
     cells[i][j].removeAttribute("id"); //remove the obstacle at this cell (remove the id attribute of the current cell which was set to obstacle)
     var unvisited_nbrs = getUnvisitedNbrs(i,j); //find all the unvisited neighbours of current node in shuffled order
     for(pair of unvisited_nbrs){
        var p,q;
        if(!is_visited[pair[0]][pair[1]]){
          p = (pair[0]+i)/2;   // p
          q = (pair[1]+j)/2;   // and q are the coordinates of the coordinate which is between the current cell and its this neighbour 
          cells[p][q].removeAttribute("id");
          is_visited[p][q] = true;
          dfs(pair[0], pair[1]);   
        }
     }
}

//function to get unvisited neighbours of a cell
function getUnvisitedNbrs(i,j){
    var unvisited_nbrs = [];
    //unvisited neighbours of a cell are those cells which are at a distance of 2 
    if(i>1){
        if(!is_visited[i-2][j])
        unvisited_nbrs.unshift([i-2,j]);
    }
    if(j>1){
         if(!is_visited[i][j-2])
        unvisited_nbrs.unshift([i,j-2]);
      
    }
    if(i<rows-2){
         if(!is_visited[i+2][j])
        unvisited_nbrs.unshift([i+2,j]);


    }
    if(j<cols-2){
        if(!is_visited[i][j+2])
        unvisited_nbrs.unshift([i,j+2]);

    }
   unvisited_nbrs =  shuffle(unvisited_nbrs); //shuffle the array so that we get the neightbours in random order which is required condition for maze generation
   return unvisited_nbrs;
}

//funcction to shuffle the array
function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  //While there remain elements to shuffle...
  while (0 !== currentIndex) {

     
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
//function to erase maze
function erase_maze(){
    for(let i=0 ; i<rows; ++i){
         
      for(let j =0 ;j<cols; ++j){
            cells[i][j].removeAttribute("id");
             
      }
    }
}
