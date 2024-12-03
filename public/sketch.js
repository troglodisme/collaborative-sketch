// Client-side script
var socket;
let colorPicker;

function setup() {
  createCanvas(400, 400);
  background(0);

  // Create a color picker
  colorPicker = createColorPicker('#ff0000');
  colorPicker.position(10, height + 10);

  // Connect to the socket server
  socket = io.connect(window.location.origin);

  // Handle incoming 'mouse' events
  socket.on('mouse', function (data) {
    fill(data.color);
    noStroke();
    ellipse(data.x, data.y, 20, 20);
  });
}

function mouseDragged() {
  // Draw on the canvas
  fill(colorPicker.color());
  noStroke();
  ellipse(mouseX, mouseY, 20, 20);

  // Send drawing data to the server
  sendmouse(mouseX, mouseY, colorPicker.color().toString());
}

function sendmouse(xpos, ypos, color) {
  var data = {
    x: xpos,
    y: ypos,
    color: color
  };
  socket.emit('mouse', data);
}