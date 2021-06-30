var shortest_path = [];  //stores the shortest path 
 
var dist =[];
var order_of_traversal = []; //it stores the coordinates of cells in non decreasing order of their distance from starting cell which is later used in visualising the level order visiting of cells
function sleep(milisec) {
 return new Promise(resolve => {
   setTimeout(() => {
     resolve('');
   }, milisec);
 });
}
function bfs(anim){
    findBtn.disabled = true;   
    createMaze.disabled = true;
 
    var q = new Queue();           // creating a queue  
    var parent= [];                // stores the coordinates of parent cell of a cell 
    var visited =[];               //stores if the cell at some coordinate is visited or not
    dist = []; 
    order_of_traversal = [];
    for(let i=0; i<rows; ++i){
        visited[i] = [];
        parent[i]=[];
        dist[i]=[];
        for(let j =0; j<cols; ++j){
            visited[i][j] = false;       // initially all the cells are unvisited 
        }
    }
    
    dist[starting_cell_coord[0]][starting_cell_coord[1]] = 0;
    q.pushf(starting_cell_coord);
     
  
    visited[starting_cell_coord[0]][starting_cell_coord[1]] =true;
    while(!q.isEmpty() && !visited[destination_cell_coord[0]][destination_cell_coord[1]]){
     
        var curr = q.front();
        // console.log(curr);
        var i=curr[0];
        var j = curr[1];
        
        q.popb(); // popping the front element out of queue
        //pushing the unvisited neighbours of current cell to queue if it is not a obstacle and setting the current cell at the parent of that cell
        if(i>0){
            if(!(visited[i-1][j]) &&  (cells[i-1][j].id!="obstacle")){
                // console.log("bgcolor = "+cells[i-1][j].style.backgroundColor);
                q.pushf([i-1,j]);
                visited[i-1][j] = true;
                parent[i-1][j] = [i,j];
                dist[i-1][j] = dist[i][j]+1;
                order_of_traversal.push([i-1,j]);
                
            }
            
        }
        if(j>0){
            if(!(visited[i][j-1]) &&  (cells[i][j-1].id!="obstacle"))
            { 
              //console.log("bgcolor = "+cells[i][j-1].style.backgroundColor);
              q.pushf([i,j-1]);
              visited[i][j-1] = true;
              parent[i][j-1] = [i,j];
              dist[i][j-1] = dist[i][j]+1;
              order_of_traversal.push([i,j-1]);
            }
        }
        if(i<rows-1){
            if(!(visited[i+1][j]) &&  (cells[i+1][j].id!="obstacle")){
                // console.log("bgcolor = "+cells[i+1][j].style.backgroundColor);
                q.pushf([i+1,j]);
                visited[i+1][j] =true;
                parent[i+1][j] = [i,j];
                dist[i+1][j] = dist[i][j]+1;
                order_of_traversal.push([i+1,j]);
                      
            }
    
        }
        if(j<cols-1){
            if(!(visited[i][j+1]) && (cells[i][j+1].id!="obstacle")){
                // console.log("bgcolor = "+cells[i][j+1].style.backgroundColor);
                q.pushf([i,j+1]);
                visited[i][j+1] =true;
                parent[i][j+1] = [i,j];
                dist[i][j+1] = dist[i][j]+1;
                order_of_traversal.push([i,j+1]);
                        
            }
        }
       
    
    }
    if(!visited[destination_cell_coord[0]][destination_cell_coord[1]]){
        return;       // if destination cell is never visited return as there is no possible path to destination
    }
    for(var i = destination_cell_coord; !(i[0]==starting_cell_coord[0] && i[1]==starting_cell_coord[1]) ; i=parent[i[0]][i[1]]){
        //console.log("i0= "+i[0]+", i1= "+i[1]);
        shortest_path.unshift([i[0],i[1]]); // generating the path array by backtracking 
    }
     
    animate_visited(anim); //animation part
    
}
async function animate_visited(anim){
    var pre =0;
    for(var pair of order_of_traversal){

 
        if(anim){
            if(dist[pair[0]][pair[1]]-pre > 0)
            {
                await sleep(10);
            }

        }
         if(dist[pair[0]][pair[1]]<dist[destination_cell_coord[0]][destination_cell_coord[1]]-1)
         {cells[pair[0]][pair[1]].className= "visitedcell";}
         else if(dist[pair[0]][pair[1]]==dist[destination_cell_coord[0]][destination_cell_coord[1]]-1){
            cells[pair[0]][pair[1]].className= "boundaryvisitedcell";
         }
         pre = dist[pair[0]][pair[1]];
        

    }
    animate_path(anim);

}
async function animate_path(anim){
      
    for(var i=0; i<shortest_path.length-1; ++i){
        if(anim)
        {
           await sleep(10);
        }
        //console.log("path");
        cells[shortest_path[i][0]][shortest_path[i][1]].className= "pathcell";
           
     
    }
    cells[destination_cell_coord[0]][destination_cell_coord[1]].className = "destinationcell";
     findBtn.disabled =false;
    createMaze.disabled =false;
 
}
