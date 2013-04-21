module("Grid")

test("Grid", function() {

  ok(Grid)
  var grid = new Grid()
  equal(grid.radius, 7, 'default radius')
  ok(grid.points instanceof Object, 'object instance')
  grid.addPoints('body')
  var p1 = '0.0'
  var p2 = $('body').center() + '.' + $('body').middle()
  var p3 = $('body').right() + '.' + $('body').bottom()
  ok(grid.points[p1], 'top left point okay')
  ok(grid.points[p2], 'middle center point okay')
  ok(grid.points[p3], 'bottom right point okay')
  
  var fake_block = $('<div id="fake_block" class="block">hi</div>')
  fake_block.css({
    position : 'absolute',
    'top' : '100px',
    'left' : '100px',
    'width' : '100px',
    'height' : '100px'
  })
  $('body').append(fake_block)
  grid.addPoints('#fake_block')
  var p1 = '100.100'
  var p2 = '150.150'
  var p3 = '200.200'
  ok(grid.points[p1], 'top left point okay')
  ok(grid.points[p2], 'middle center point okay')
  ok(grid.points[p3], 'bottom right point okay')
  
  
  grid.points = {}
  
  $('#container').css({
    'width' : '600px',
    'height' : '600px',
  })
  grid.create()
  
  $('#container').css({
    'width' : '100%',
    'height' : '100%',
  })
  grid.points = {}
  grid.create()
  
  grid.points = {}
  grid.addPoints('body')
  var points = []
  points.push({
    x : 3,
    y : 3
  })
  var change = grid.getDelta(points)
  equal(change.x, -3)
  equal(change.y, -3)
  
  
  var points = []
  points.push({
    x : -3,
    y : -2
  })
  var change = grid.getDelta(points)
  equal(change.x, 3)
  equal(change.y, 2)
  
  
  var points = []
  points.push({
    x : 6,
    y : 2
  })
  var change = grid.getDelta(points)
  equal(change.x, -6)
  equal(change.y, -2)
  
  
  grid.addPoints('#fake_block')
  var points = []
  points.push({
    x : 6,
    y : 2
  })
  var change = grid.getDelta(points)
  equal(change.x, -6)
  equal(change.y, -2)
  
  grid.draw()
  
  var points = []
  points.push({
    x : 8,
    y : 2
  }, {
    x : 101,
    y: 101
  },  {
      x : 200,
      y: 101
    })
  var change = grid.getDelta(points)
  equal(change.x, 0)
  equal(change.y, -1)
  
  
  fake_block.remove()

})


