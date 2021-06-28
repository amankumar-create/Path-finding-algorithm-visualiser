var shortest_path = [];
var c_delay;
 var dist =[];
 var order_of_traversal = [];
 function sleep(milisec) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('')
    }, milisec);
  })
}
 function bfs(anim){
    c_delay =0; 
    var q = new Queue();
    var parent= [];
    var visited =[];
    dist = [];
    order_of_traversal = [];
    for(let i=0; i<rows; ++i){
        visited[i] = [];
        parent[i]=[];
        dist[i]=[];
        for(let j =0; j<cols; ++j){
            visited[i][j] = false;
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
        
        q.popb();
        
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
        return;
    }
    for(var i = destination_cell_coord; !(i[0]==starting_cell_coord[0] && i[1]==starting_cell_coord[1]) ; i=parent[i[0]][i[1]]){
        //console.log("i0= "+i[0]+", i1= "+i[1]);
        
        shortest_path.unshift([i[0],i[1]]);
    }
     
     
    
    var path_length = shortest_path.length;
    animate_visited(anim);
    //console.log("shortest_path ki length = " + shortest_path.length+ " "+shortest_path[path_length-1][0]+", "+shortest_path[path_length-1][1]);
    
        
}
async function animate_visited(anim){
    var pre =0;
    for(var pair of order_of_traversal){

 
        if(anim){
            if(dist[pair[0]][pair[1]]-pre > 0)
            {await sleep(10);
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
 
}
