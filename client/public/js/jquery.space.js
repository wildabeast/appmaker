/**
 * @return {number}
 */
$.space = {}

// http://stackoverflow.com/questions/13303040/javascript-dependency-list
$.space.resolve = function (dependencies, root){
  var nodes={};
  var nodeCount=0;
  var ready=[];
  var output=[];

  // build the graph
  function add(element){
     nodeCount++;
     nodes[element]={needs:[], neededBy:[], name: element};
     if(dependencies[element]){
       dependencies[element].forEach(function(dependency){
         if(!nodes[dependency]) add(dependency);
         nodes[element].needs.push(nodes[dependency]);
         nodes[dependency].neededBy.push(nodes[element]);
       });
     }
     if(!nodes[element].needs.length) ready.push(nodes[element]);
  }

  if(root){
    add(root)
  } else {
     for (element in dependencies){
       if(!nodes[element]) add(element);
    }
  }


  //sort the graph
  while(ready.length){
    var dependency = ready.pop();
    output.push(dependency.name);
    dependency.neededBy.forEach(function(element){
      element.needs = element.needs.filter(function(x){return x!=dependency})
      if(!element.needs.length) ready.push(element)
    })
  }

  //error-check
  if(output.length != nodeCount){
    throw "circular dependency detected"
  }

  return output;
}

$.space.update = function () {
  
  if (!$('div[type=space]').length)
    return true
  
  // todo: resolve correct linear order from directed acyclic graph
  // todo: add cycle detection and escape from any infinite loop.
  
  // Resolve the correct order
  var spaces = {}
  var ends = {}
  $('div[type=space]').each(function () {

    var origin = $(this).attr('origin')
    var end = $(this).attr('end')
    if (!spaces[end])
      spaces[end] = []
    spaces[end].push(origin)
    ends[end] = $(this)
    
   
  })
  spaces = $.space.resolve(spaces)
  
  // A call without a selector updates space blocks
  spaces.forEach(function (element, index, array) {
    
    // If not an end
    if (!ends[element])
      return true
    
    var space = ends[element]
    
    var origin = $('#' + space.attr('origin'))
    var end = $('#' + space.attr('end'))
    var width = space.attr('width')
    var height = space.attr('height')
    
    if (width) {
      var spaceWidth = parseFloat(width)
      var originWidth = origin.width()
      var originLeft = origin.position().left
      var newChildLeft = originLeft + originWidth + spaceWidth
      end.css('left', newChildLeft)
      
      space.css({
        'left' : originLeft + originWidth,
        'width' : width
      })
    }
    
    if (height) {
      var spaceHeight = parseFloat(height)
      var originHeight = origin.height()
      var originTop = origin.position().top
      var newChildTop = originTop + originHeight + spaceHeight
      end.css('top', newChildTop)
      space.css({
        'top' : originTop + originHeight,
        'height' : height,
        'width' : origin.width()
      })
    }
    
  })
}

$(document).ready($.space.update)
