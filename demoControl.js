

// Variables and Constants
<<<<<<< HEAD

var layout;
var runningChola = false;

// Initial Layout on opening the page
var cy = cytoscape({
    container: document.getElementById('cy')
});

function updateCy(contents)
{
  cy.startBatch();
  cy.style().clear();
  cy.remove('nodes');
  cy.remove('edges');

  cy.json({elements: JSON.parse(contents)});

  cy.style()
      .selector('node').style({
          'background-color': '#ad1a66',
          'opacity': 0.75
          //'label': "data(id)"
      })
      .selector('node:selected').style({
          'border-color': 'black',
          'border-width': '3px'
      })
      .selector('node:parent').style({
          'background-opacity': 0.333,
          'padding': 10
      })
      .selector('edge').style({
          'width': 3,
          'line-color': '#ad1a66',
          'edge-distances': 'node-position',
          'line-cap': 'round',
          'targetEndpoint': 'outside-to-node',
          'sourceEndpoint': 'outside-to-node',
          'curve-style': 'straight'
      })
      .selector('edge:selected').style({
          'width': 3,
          'line-color': 'black',
          'edge-distances': 'node-position',
          'line-cap': 'round'
      })
      .update();

  cy.endBatch();
  cy.layout({
      name: 'random',
      animate: false
    }).run();
}

document.addEventListener('DOMContentLoaded', function()
{
  /*
   *  deleting a node on "Delete" key press
   */

  if (runningChola == true)
      return;

  function getKey(e)
  {
    if (e.keyCode == 46)
    {
      for (let i = 0; i < cyArray.length; i++)
      {
        let obj = cyArray[i];
        obj.remove(obj.$(":selected"));
      }
    }
  }
  document.onkeyup = getKey;
=======
const sampleGraphs = document.getElementById("sampleGraphs");
var steps = [];
var layout;
var ranChola = false; 

// Clear Selections/Options at start
document.getElementById("outputGraphs").selectedIndex = -1;
document.getElementById("outputGraphs").disabled = true;
document.getElementById("outputGraphs").style.visibility = "hidden";
document.getElementById("stepLabel").style.visibility = "hidden";
document.getElementById("stepGraphs").style.visibility = "hidden";

document.getElementById("cy").style.display = "none";
document.getElementById("cyHD").style.display = "none";
document.getElementById("cyChains").style.display = "none";
document.getElementById("cyHDConstraint").style.display = "none";
document.getElementById("cyTrees").style.display = "none";




// Initial Layout on opening the page
var cy = cytoscape({
    container: document.getElementById('cy'),
    layout: {
      name: 'cose-bilkent',
      animate: false
    }
});


var cyHD = cytoscape({
  container: document.getElementById('cyHD'),
  layout: {
    name: 'cose-bilkent',
    animate: false
  }
});

var cyChains = cytoscape({
  container: document.getElementById('cyChains'),
  layout: {
    name: 'cose-bilkent',
    animate: false
  }
});

var cyHDConstraint = cytoscape({
  container: document.getElementById('cyHDConstraint'),
  layout: {
    name: 'cose-bilkent',
    animate: false
  }
});

var cyTrees = cytoscape({
  container: document.getElementById('cyTrees'),
  layout: {
    name: 'cose-bilkent',
    animate: false
  }
});

var cyfinal = cytoscape({
  container: document.getElementById('cyfinal'),
  layout: {
    name: 'cose-bilkent',
    animate: false
  }
});
     
// Sample File Changer
document.getElementById("outputGraphs").addEventListener("change",function() 
{
    cyfinal.startBatch();
    cyfinal.style().clear();
    cyfinal.remove('edges');
    cyfinal.remove('nodes');

    let index = outputGraphs.value;
    cyfinal.add(JSON.parse(steps[index - 1])); 
    
    cyfinal.nodes().forEach(function(node)
    {
        node.data('width', node.width());
        node.data('height', node.height());
    });

    cyfinal.style()
            .selector('node').style({
                'background-color': '#ad1a66',
                'opacity': 0.75,
                'label': "data(id)"
            })
            .selector('node:selected').style({
                'border-color': 'black',
                'border-width': '3px'
            })
            .selector('node:parent').style({
                'background-opacity': 0.333,
                'padding': 10
            })
            .selector('edge').style({
                'width': 3,
                'line-color': '#ad1a66',
                'edge-distances': 'node-position',
                'line-cap': 'round',
                'targetEndpoint': 'outside-to-node',
                'sourceEndpoint': 'outside-to-node',
                'curve-style': 'straight'
            })
            .selector('edge:selected').style({
                'width': 3,
                'line-color': 'black',
                'edge-distances': 'node-position',
                'line-cap': 'round'
            })
            .update();

    if (index == 6)
    {
      for (let k = 0; k < layout.options.compoundEdgeBends.length; k++)
      {
        let edge = layout.options.compoundEdgeBends[k][0];
        for (let i = 0; i < cyfinal.edges().length; i++)
        {
          let cyEdge = cyfinal.edges()[i];
          if (edge.id() == cyEdge.id())
          {
            let relativePos1 = layout.options.compoundEdgeBends[k][1];
            cyEdge.style({ 'source-endpoint': + relativePos1.x + "% "+ +relativePos1.y + '%' });
            let relativePos2 = layout.options.compoundEdgeBends[k][2];
            cyEdge.style({ 'target-endpoint': + relativePos2.x + "% "+ +relativePos2.y + '%' });  
          }
        }
      }   
    
      for (let k = 0; k < layout.options.normalEdgeBends.length; k++)
      {
          let edge = layout.options.normalEdgeBends[k][0];
          for (let i = 0; i < cyfinal.edges().length; i++)
          {
            let cyEdge = cyfinal.edges()[i];
            if (edge.id() == cyEdge.id())
            {
              
              cyEdge.css("curve-style", "segments");
              cyEdge.css("segment-weights", layout.options.normalEdgeBends[k][1]);
              cyEdge.css("segment-distances", layout.options.normalEdgeBends[k][2]);
            }
          }

      }
    }

    cyfinal.endBatch();
});


//var cyFinal;
var cyArray = [cy, cyHD, cyChains, cyHDConstraint, cyTrees, cyfinal];

function createCyObjects(contents)
{
  for (let i = 0; i < cyArray.length; i++)
  {
    let obj = cyArray[i];
    obj.startBatch();
    obj.style().clear();
    obj.remove('nodes');
    obj.remove('edges');

    obj.json({elements: JSON.parse(contents)});

    obj.style()
        .selector('node').style({
            'background-color': '#ad1a66',
            'opacity': 0.75,
            'label': "data(id)"
        })
        .selector('node:selected').style({
            'border-color': 'black',
            'border-width': '3px'
        })
        .selector('node:parent').style({
            'background-opacity': 0.333,
            'padding': 10
        })
        .selector('edge').style({
            'width': 3,
            'line-color': '#ad1a66',
            'edge-distances': 'node-position',
            'line-cap': 'round',
            'targetEndpoint': 'outside-to-node',
            'sourceEndpoint': 'outside-to-node',
            'curve-style': 'straight'
        })
        .selector('edge:selected').style({
            'width': 3,
            'line-color': 'black',
            'edge-distances': 'node-position',
            'line-cap': 'round'
        })
        .update();
    
    obj.endBatch();
    obj.layout({
        name: 'cose-bilkent',
        animate: false
      }).run();
  }

  for (let i = 0; i < cyArray.length - 1; i++)
  {
    let obj = cyArray[i];
    var allNodes = obj.nodes();
    for (let i = 0; i < allNodes.length; i++)
    {
      allNodes[i].css("display", "none");
    }
  }
};

document.getElementById("stepGraphs").addEventListener("click", function(){
    if (!ranChola)
      return;

    document.getElementById("outputGraphs").selectedIndex = 5;
    document.getElementById("outputGraphs").style.visibility = "visible";
    document.getElementById("stepLabel").style.visibility = "visible";

    steps = [];
    steps[0] = JSON.stringify(cy.json().elements);
    steps[1] = JSON.stringify(cyHD.json().elements);
    steps[2] = JSON.stringify(cyHDConstraint.json().elements);
    steps[3] = JSON.stringify(cyChains.json().elements);
    steps[4] = JSON.stringify(cyTrees.json().elements);
    steps[5] = JSON.stringify(cyfinal.json().elements);


    

    document.getElementById("outputGraphs").disabled = false;
    
>>>>>>> 87b82d68aad27ca2205e5ff1513e0132bd5760c9
});

document.getElementById('importGraphML-input').addEventListener('change', function (evt) 
{
<<<<<<< HEAD
    if (runningChola == true)
      return;
=======
    document.getElementById("outputGraphs").disabled = true;
>>>>>>> 87b82d68aad27ca2205e5ff1513e0132bd5760c9

    let files = evt.target.files;
    let fileExtension = files[0].name.split('.').pop();
    let reader = new FileReader();
    let contents;
    reader.readAsText(files[0]);
    reader.onload = function (event) {
        // Contents is a string of the graphml
        contents = event.target.result;

        // Update Cytoscape
<<<<<<< HEAD
        updateCy(contents);
        
    };

=======
        createCyObjects(contents);
        
    };

    ranChola = false;
    document.getElementById("outputGraphs").style.visibility = "hidden";
    document.getElementById("stepGraphs").style.visibility = "hidden";
    document.getElementById("stepLabel").style.visibility = "hidden";
>>>>>>> 87b82d68aad27ca2205e5ff1513e0132bd5760c9

});

document.getElementById("cholaLayoutButton").addEventListener("click", function(){
  //some edge types may have been changed to segments
  //so we convert them back to the original type haystack

<<<<<<< HEAD
    runningChola = true

    console.clear();

    console.log("applying chola")

    let start = performance.now();

    var allEdges = cy.edges();
=======
  //{
    ranChola = false;
    let start = performance.now();

    var allEdges = cyfinal.edges();
>>>>>>> 87b82d68aad27ca2205e5ff1513e0132bd5760c9
    for (let i = 0; i < allEdges.length; i++)
    {
      allEdges[i].css("curve-style", "straight");
      allEdges[i].css("targetEndpoint", "outside-to-node");
      allEdges[i].css("sourceEndpoint", "outside-to-node");
    }

<<<<<<< HEAD
    layout = null;
    layout = cy.layout({
=======
    for (let i = 0; i < cyArray.length; i++)
    {
      let obj = cyArray[i];
      var allNodes = obj.nodes();
      for (let i = 0; i < allNodes.length; i++)
      {
        allNodes[i].css("display", "element");
      }
    }

    layout = null;
    layout = cyfinal.layout({
>>>>>>> 87b82d68aad27ca2205e5ff1513e0132bd5760c9
      name: 'chola',
      animate: 'end',
      animationEasing: 'ease-out',
      animationDuration: 1000,
<<<<<<< HEAD
=======
      randomize: true
>>>>>>> 87b82d68aad27ca2205e5ff1513e0132bd5760c9
    });

    layout.run();

<<<<<<< HEAD
    /*
    * now this code should send pack the data of cy into json and send it to the python server.
    */

    // var jsonData = cy.json()

    // //now this jsonData has to be sent to the python server
    // fetch('/tsm/', {
    //   method: "POST",
    //   body: JSON.stringify(jsonData)
    // })
    // .then(response => response.json())
    // .then(result => 
    //     {
    //       console.log(result);
    //       console.log("Evaluating data")
    //       let end = performance.now();
    //       evaluate(end - start);

    //       runningChola = false
    //     }
    //   )  

});

document.getElementById("cose").addEventListener("click", function()
{
  //some edge types may have been changed to segments
  //so we convert them back to the original type haystack

    if (runningChola == true)
      return;

    let obj = cy;
=======
    ranChola = true;

    let end = performance.now();
    evaluate(end - start);

    
    document.getElementById("stepGraphs").style.visibility = "visible";
    document.getElementById("outputGraphs").style.visibility = "hidden";
    document.getElementById("stepLabel").style.visibility = "hidden";
    

});

document.getElementById("cose").addEventListener("click", function(){
  //some edge types may have been changed to segments
  //so we convert them back to the original type haystack
  ranChola = false;
  document.getElementById("outputGraphs").style.visibility = "hidden";
  document.getElementById("outputGraphs").disabled = true;
  document.getElementById("stepGraphs").style.visibility = "hidden";
  document.getElementById("stepLabel").style.visibility = "hidden";

  for (let i = 1; i < cyArray.length; i++)
  {
    let obj = cyArray[i];
    var allNodes = obj.nodes();
    for (let i = 0; i < allNodes.length; i++)
    {
      allNodes[i].css("display", "none");
    }
  }

  for (let i = 0; i < cyArray.length; i++)
  {
    let obj = cyArray[i];
>>>>>>> 87b82d68aad27ca2205e5ff1513e0132bd5760c9
    var allEdges = obj.edges();
    for (let i = 0; i < allEdges.length; i++)
    {
      allEdges[i].css("curve-style", "straight");
      allEdges[i].css("targetEndpoint", "outside-to-node");
      allEdges[i].css("sourceEndpoint", "outside-to-node");
    }

    var layout2 = obj.layout({
      name: 'cose-bilkent',
      animate: true,
      animationDuration: 1000,
      animationEasing: 'ease-out'
    });

    layout2.run();
<<<<<<< HEAD
    console.log("ran cose")
});


document.getElementById("randomize").addEventListener("click", function()
{
  //some edge types may have been changed to segments
  //so we convert them back to the original type haystack

  if (runningChola == true)
      return;

  var allEdges = cy.edges();
=======


  }
});



document.getElementById("randomize").addEventListener("click", function(){
  //some edge types may have been changed to segments
  //so we convert them back to the original type haystack
  ranChola = false;
  document.getElementById("outputGraphs").style.visibility = "hidden";
  document.getElementById("stepGraphs").style.visibility = "hidden";
  document.getElementById("stepLabel").style.visibility = "hidden";
  for (let i = 1; i < cyArray.length; i++)
  {
    let obj = cyArray[i];
    var allNodes = obj.nodes();
    for (let i = 0; i < allNodes.length; i++)
    {
      allNodes[i].css("display", "none");
    }
  }

  var allEdges = cyfinal.edges();
>>>>>>> 87b82d68aad27ca2205e5ff1513e0132bd5760c9
  for (let i = 0; i < allEdges.length; i++)
  {
    allEdges[i].css("curve-style", "straight");
    allEdges[i].css("targetEndpoint", "outside-to-node");
    allEdges[i].css("sourceEndpoint", "outside-to-node");
  }

<<<<<<< HEAD
  var layout2 = cy.layout({
=======
  var layout2 = cyfinal.layout({
>>>>>>> 87b82d68aad27ca2205e5ff1513e0132bd5760c9
    name: 'random',
    animate: true,
    animationDuration: 1000,
    animationEasing: 'ease-out'
  });
  layout2.run();
});


<<<<<<< HEAD
function evaluate(layoutTime)
{
    let evaluate = true;
    let graphProperties;
    if(evaluate)
      graphProperties = cy.layvo("get").generalProperties();

    console.log("in evaluate")


    document.getElementById("layoutTime").innerHTML = evaluate ? Math.round(layoutTime * 10 ) / 10 + " ms" : "-"; 

    document.getElementById("numberOfEdgeCrosses").innerHTML = evaluate ? graphProperties.numberOfEdgeCrosses : "-";

    document.getElementById("numberOfNodeOverlaps").innerHTML = evaluate ? graphProperties.numberOfNodeOverlaps : "-";

    document.getElementById("averageEdgeLength").innerHTML = evaluate ? Math.round(graphProperties.averageEdgeLength * 10 ) / 10 : "-";

    document.getElementById("totalArea").innerHTML = evaluate ? Math.round(graphProperties.totalArea * 10 ) / 10 : "-";

}
=======
function evaluate(layoutTime){
    let evaluate = true;
    let graphProperties;
    if(evaluate)
      graphProperties = cyfinal.layvo("get").generalProperties();
    //document.getElementById("numOfNodes").innerHTML = cy.nodes().length;
    //document.getElementById("numOfEdges").innerHTML = cy.edges().length;
    console.log("layout time");
    document.getElementById("layoutTime").innerHTML = evaluate ? Math.round(layoutTime * 10 ) / 10 + " ms" : "-"; 
    console.log(Math.round(layoutTime * 10 ) / 10);
    document.getElementById("numberOfEdgeCrosses").innerHTML = evaluate ? graphProperties.numberOfEdgeCrosses : "-";
    console.log(Math.round(layoutTime * 10 ) / 10);
    document.getElementById("numberOfNodeOverlaps").innerHTML = evaluate ? graphProperties.numberOfNodeOverlaps : "-";
    console.log(graphProperties.numberOfNodeOverlaps);
    document.getElementById("averageEdgeLength").innerHTML = evaluate ? Math.round(graphProperties.averageEdgeLength * 10 ) / 10 : "-";
    console.log(Math.round(graphProperties.averageEdgeLength * 10 ) / 10);
    document.getElementById("totalArea").innerHTML = evaluate ? Math.round(graphProperties.totalArea * 10 ) / 10 : "-";
    console.log(Math.round(graphProperties.totalArea * 10 ) / 10);
}
>>>>>>> 87b82d68aad27ca2205e5ff1513e0132bd5760c9
