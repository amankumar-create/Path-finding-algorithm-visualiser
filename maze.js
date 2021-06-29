var is_visited = [];


function create_maze(){
    is_visited = [];
    for(let i=0 ; i<rows; ++i){
        is_visited[i] = [];
      for(let j =0 ;j<cols; ++j){
            cells[i][j].id = "obstacle";
            is_visited[i][j] = false;
      }
    }
    dfs(starting_cell_coord[0],starting_cell_coord[1]);
    cells[destination_cell_coord[0]][destination_cell_coord[1]].className = "destinationcell";

}
function dfs(i,j){
     is_visited[i][j] = true;
     cells[i][j].removeAttribute("id");
     var unvisited_nbrs = getUnvisitedNbrs(i,j);
     for(pair of unvisited_nbrs){
        var p,q;
        if(!is_visited[pair[0]][pair[1]]){
          p = (pair[0]+i)/2;
          q = (pair[1]+j)/2;
          cells[p][q].removeAttribute("id");
          is_visited[p][q] = true;
          dfs(pair[0], pair[1]);
        }
     }
}
function getUnvisitedNbrs(i,j){
    var unvisited_nbrs = [];
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
   unvisited_nbrs =  shuffle(unvisited_nbrs);
   return unvisited_nbrs;
}
function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

     
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
function erase_maze(){
    for(let i=0 ; i<rows; ++i){
         
      for(let j =0 ;j<cols; ++j){
            cells[i][j].removeAttribute("id");
             
      }
    }
}
