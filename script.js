
  function allowDrop(event) {
    event.preventDefault();
  }

  // Drag function with bounds check
  function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
  }

  // Drop function to handle images moving between divs
  function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggedImage = document.getElementById(data);
    
    var container = event.target;
    if (container.classList.contains('container')) {
      container = container;  // This is a valid container div
    }

    // Calculate the position of the drop event and place the image accordingly, while respecting container bounds
    var offsetX = event.clientX - container.offsetLeft;
    var offsetY = event.clientY - container.offsetTop;
    
    // Ensure the image stays within the container's boundaries
    var maxX = container.offsetWidth - draggedImage.offsetWidth;
    var maxY = container.offsetHeight - draggedImage.offsetHeight;

    draggedImage.style.position = "absolute";
    draggedImage.style.left = Math.min(maxX, Math.max(0, offsetX - draggedImage.width / 2)) + "px"; // Horizontal bound check
    draggedImage.style.top = Math.min(maxY, Math.max(0, offsetY - draggedImage.height / 2)) + "px"; // Vertical bound check
    
    // Append the image to the new container
    container.appendChild(draggedImage);
  }

  // Highlight the image on mouseover and remove highlight on mouseout
  var images = document.querySelectorAll('img');

  images.forEach(image => {
    image.addEventListener('mouseover', function() {
      image.classList.add('highlight');  // Add highlight class when cursor hovers
    });

    image.addEventListener('mouseout', function() {
      image.classList.remove('highlight');  // Remove highlight when cursor leaves
    });

    // Add resize handle to each image
    var resizeHandle = document.createElement('div');
    resizeHandle.classList.add('resize-handle');
    image.appendChild(resizeHandle);

    // Resize the image by clicking and dragging the bottom-right corner
    var isResizing = false;

    resizeHandle.addEventListener('mousedown', function(e) {
      e.stopPropagation(); // Prevent the mouse down from affecting other events
      isResizing = true;

      var initialX = e.clientX;
      var initialY = e.clientY;
      var initialWidth = image.offsetWidth;
      var initialHeight = image.offsetHeight;
      var container = image.parentElement; // Image's parent is the container div

      // Mouse move event to resize the image
      function onMouseMove(event) {
        if (isResizing) {
          var widthChange = event.clientX - initialX;
          var heightChange = event.clientY - initialY;

          // Update image dimensions based on mouse movement
          var newWidth = initialWidth + widthChange;
          var newHeight = initialHeight + heightChange;

          // Ensure the image doesn't overflow the container bounds
          var maxWidth = container.offsetWidth;
          var maxHeight = container.offsetHeight;

          // Set new dimensions
          image.style.width = Math.min(newWidth, maxWidth) + "px";
          image.style.height = Math.min(newHeight, maxHeight) + "px";
        }
      }

      // Mouse up event to stop resizing
      function onMouseUp() {
        isResizing = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  });
