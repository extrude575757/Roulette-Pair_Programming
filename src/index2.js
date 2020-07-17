
let currentDroppable = null;
let droppableBelow = null;


/*TODO: MAKE  a universal function that does this based off the variable 
**BUG:On first mouse down The arrow must first move before mouse up happens 
** As long as this is done first time there is no bug after that. 
*/

ball.onmousedown = function(event) { // (1) start the process
  
  // Can place in moveAt()
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;
    // (2) prepare to moving: make absolute and on top by z-index
   
    ball.style.position = 'absolute';
    ball.style.zIndex = 1000;
    // move it out of any current parents directly into body
    // to make it positioned relative to the body
    document.body.append(ball);
    //document.getElementsByClassName('red').style.backgroundColor = "purple";
    // ...and put that absolutely positioned ball under the pointer
    // centers the ball at (pageX, pageY) coordinates
    function moveAt(pageX, pageY) {
      ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
      ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
      // Shrink for handle usages
      ball.style.height = '20px';
      ball.style.width = '20px';
/* TODO: if user presses esc while moving reset it */

    }
    moveAt(event.pageX, event.pageY);
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
      ball.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      ball.hidden = false;

      if (!elemBelow) return;

       droppableBelow = elemBelow.closest('.droppable');
      


    }
    
  
    
   
  
    // (3) move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // (4) drop the ball, remove unneeded handlers
    ball.onmouseup = function() {
      if (currentDroppable != droppableBelow) {
        if (currentDroppable) { // null when we were not over a droppable before this event
          leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) { // null if we're not coming over a droppable now
          // (maybe just left the droppable)
          enterDroppable(currentDroppable);
        }
      }
      document.removeEventListener('mousemove', onMouseMove);
      ball.onmouseup = null;
       //document.getElementsByClassName('.red').style.backgroundColor = "purple";
    };
  
  };


  chip2.onmousedown = function(event) { // (1) start the process
  
    // Can place in moveAt()
    let shiftX = event.clientX - chip2.getBoundingClientRect().left;
    let shiftY = event.clientY - chip2.getBoundingClientRect().top;
      // (2) prepare to moving: make absolute and on top by z-index
     
      chip2.style.position = 'absolute';
      chip2.style.zIndex = 1000;
      // move it out of any current parents directly into body
      // to make it positioned relative to the body
      document.body.append(chip2);
      //document.getElementsByClassName('red').style.backgroundColor = "purple";
      // ...and put that absolutely positioned ball under the pointer
      // centers the ball at (pageX, pageY) coordinates
      function moveAt(pageX, pageY) {
        chip2.style.left = pageX - chip2.offsetWidth / 2 + 'px';
        chip2.style.top = pageY - chip2.offsetHeight / 2 + 'px';
        // Shrink for handle usages
        chip2.style.height = '20px';
        chip2.style.width = '20px';
  /* TODO: if user presses esc while moving reset it */
  
      }
      moveAt(event.pageX, event.pageY);
      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
        chip2.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        chip2.hidden = false;
  
        if (!elemBelow) return;
  
         droppableBelow = elemBelow.closest('.droppable');
        
  
  
      }
      
    
      
     
    
      // (3) move the ball on mousemove
      document.addEventListener('mousemove', onMouseMove);
    
      // (4) drop the ball, remove unneeded handlers
      chip2.onmouseup = function() {
        if (currentDroppable != droppableBelow) {
          if (currentDroppable) { // null when we were not over a droppable before this event
            leaveDroppable(currentDroppable);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable) { // null if we're not coming over a droppable now
            // (maybe just left the droppable)
            enterDroppable(currentDroppable);
          }
        }
        document.removeEventListener('mousemove', onMouseMove);
        chip2.onmouseup = null;
         //document.getElementsByClassName('.red').style.backgroundColor = "purple";
      };
    
    };



  function enterDroppable(elem) {
    elem.style.background = 'pink';
  }

  function leaveDroppable(elem) {
    elem.style.background = 'purple';
  }
  ball.ondragstart = function() {
    return false;
  };
  chip2.ondragstart = function() {
    return false;
  };
  
  
export {ball};
