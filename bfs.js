var shortest_path = [];
function bfs(anim){
    var q = new Queue();
    var parent= [];
    var visited =[];
    var dist = [];
    for(let i=0; i<rows; ++i){
        visited[i] = [];
        parent[i]=[];
        for(let j =0; j<cols; ++j){
            visited[i][j] = false;
        }
    }
    q.pushf(starting_cell_coord);
    if(q.isEmpty) console.log("empty");
    var p =0;
    visited[starting_cell_coord[0]][starting_cell_coord[1]] =true;
    while(!q.isEmpty() && !visited[destination_cell_coord[0]][destination_cell_coord[1]]){
     
        var curr = q.front();
        // console.log(curr);
        var i=curr[0];
        var j = curr[1];
        
        q.popb();
        
        if(i>0){
            if(!(visited[i-1][j]) &&  (cells[i-1][j].style.backgroundColor==cell_color)){
                // console.log("bgcolor = "+cells[i-1][j].style.backgroundColor);
                q.pushf([i-1,j]);
                visited[i-1][j] = true;
                parent[i-1][j] = [i,j];
                
            }
            
        }
        if(j>0){
            if(!(visited[i][j-1]) &&  (cells[i][j-1].style.backgroundColor==cell_color))
            { 
              //console.log("bgcolor = "+cells[i][j-1].style.backgroundColor);
              q.pushf([i,j-1]);
              visited[i][j-1] = true;
              parent[i][j-1] = [i,j];
            }
        }
        if(i<rows-1){
            if(!(visited[i+1][j]) &&  (cells[i+1][j].style.backgroundColor==cell_color)){
                // console.log("bgcolor = "+cells[i+1][j].style.backgroundColor);
                q.pushf([i+1,j]);
                visited[i+1][j] =true;
                parent[i+1][j] = [i,j];
                      
            }
    
        }
        if(j<cols-1){
            if(!(visited[i][j+1]) && (cells[i][j+1].style.backgroundColor==cell_color)){
                // console.log("bgcolor = "+cells[i][j+1].style.backgroundColor);
                q.pushf([i,j+1]);
                visited[i][j+1] =true;
                parent[i][j+1] = [i,j];
                        
            }
        }
        ++p;
    
    }
    if(!visited[destination_cell_coord[0]][destination_cell_coord[1]]){
        return;
    }
    for(var i = destination_cell_coord; !(i[0]==starting_cell_coord[0] && i[1]==starting_cell_coord[1]) ; i=parent[i[0]][i[1]]){
        //console.log("i0= "+i[0]+", i1= "+i[1]);

        shortest_path.unshift([i[0],i[1]]);
    }
    var path_length = shortest_path.length;
    //console.log("shortest_path ki length = " + shortest_path.length+ " "+shortest_path[path_length-1][0]+", "+shortest_path[path_length-1][1]);
    for(var i=0; i<shortest_path.length-1; ++i){
          if(anim)
          animate(shortest_path[i][0],shortest_path[i][1], i);
          else{
              cells[shortest_path[i][0]][shortest_path[i][1]].className = "pathcell";
          }
     
    }
        
}

function animate(r, c, i){
    setTimeout(() => {
       cells[r][c].className = "pathcell";
      }, 50 * i);
}