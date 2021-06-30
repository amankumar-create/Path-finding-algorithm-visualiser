var INF = 1000000;
var marked = [];
var distance = [];
var p=[];
function dijkstra(){
    findBtn.disabled = true;   
    createMaze.disabled = true;
     for(let i=0; i<rows; ++i){
         marked[i] = [];
         distance[i] = [];
         p[i]= [];
        for(let j =0; j<cols; ++j){
            marked[i][j] = false;
            distance[i][j] = INF;

            p[i][j] =-1;
        }
    }
     distance[starting_cell_coord[0]][starting_cell_coord[1]] = 0;
    
    for(let l =0; l<rows; ++l){
        var completed = false;
        for(let k=0; k<cols;++k){
            var min = [-1,-1];
            var changed = false;

            for(let i =0; i<rows; ++i){          
                for(let j =0; j<cols; ++j){
                    if(!marked[i][j] && ((min[0] ==-1 && min[1]==-1) || distance[i][j]<distance[min[0]][min[1]])){
                        min = [i,j];
                    }
                }               
            }
            //console.log("min = "+min[0] +" "+min[1]);
            if(distance[min[0]][min[1]]==INF){
                break;
            }
            marked[min[0]][min[1]] =true;
            if(min[0]>0 && cells[min[0]-1][min[1]].id!="obstacle"){
                if(distance[min[0]-1][min[1]]>distance[min[0]][min[1]]+1){
                    distance[min[0]-1][min[1]] =distance[min[0]][min[1]]+1;
                    p[min[0]-1][min[1]] = [min[0], min[1]];
                    changed = true;
                    //cells[min[0]-1][min[1]].className = "visitedcell";
                    order_of_traversal.push([min[0]-1, min[1]]);
                }
            }
            if(min[1]>0 && cells[min[0]][min[1]-1].id!="obstacle"){
                if(distance[min[0]][min[1]-1]>distance[min[0]][min[1]]+1){
                    distance[min[0] ][min[1]-1] =distance[min[0]][min[1]]+1;
                    p[min[0] ][min[1]-1] = [min[0], min[1]];
                    changed = true;
                   // cells[min[0]][min[1]-1].className = "visitedcell";
                    order_of_traversal.push([min[0] , min[1]-1]);
                }
            }
            if(min[0]<rows-1  && cells[min[0]+1][min[1]].id!="obstacle"){
                if(distance[min[0]+1][min[1]]>distance[min[0]][min[1]]+1){
                    distance[min[0]+1][min[1]] =distance[min[0]][min[1]]+1;
                    p[min[0]+1][min[1]] = [min[0], min[1]];
                    changed = true;
                    //cells[min[0]+1][min[1]].className = "visitedcell";
                    order_of_traversal.push([min[0]+1, min[1]]);
                
                }
            }
            if(min[1]<cols-1  && cells[min[0]][min[1]+1].id!="obstacle"){
                if(distance[min[0] ][min[1]+1]>distance[min[0]][min[1]]+1){
                    distance[min[0] ][min[1]+1] =distance[min[0]][min[1]]+1;
                    p[min[0] ][min[1]+1] = [min[0], min[1]];
                    changed = true;
                    //cells[min[0]][min[1]+1].className = "visitedcell";
                    order_of_traversal.push([min[0], min[1]+1]);

                
                }
            } 
            if(marked[destination_cell_coord[0]][destination_cell_coord[1]]){
                completed =true;
                break;
            }     

        } 
        if(completed){
            break;
        }


    }  
    console.log(p[destination_cell_coord[0]][destination_cell_coord[1]]);
    for(var i = destination_cell_coord; !(i[0]==starting_cell_coord[0] && i[1]==starting_cell_coord[1]) ; i=p[i[0]][i[1]]){
        //console.log("i0= "+i[0]+", i1= "+i[1]);
        shortest_path.unshift([i[0],i[1]]);
    }
    anim_vis(true);

}
async function anim_vis(anim){
     
    var pre =1;
    for(var pair of order_of_traversal){

 
        if(pre%10==0){
             
                await sleep(1);
            
        }
        if(distance[pair[0]][pair[1]]<distance[destination_cell_coord[0]][destination_cell_coord[1]]-1)
        {
            cells[pair[0]][pair[1]].className= "visitedcell";
        }
        else if(distance[pair[0]][pair[1]]==distance[destination_cell_coord[0]][destination_cell_coord[1]]-1){
           cells[pair[0]][pair[1]].className= "boundaryvisitedcell";
        }
        ++pre;
     
        
    }
    animate_path(anim);
    

}