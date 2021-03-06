/*  

https://jqueryui.com/draggable/


It is said when a mouse button is clicked it goes
through at least 3 events onmousedown onmouseup, 
next the mousemove event is fired once the mouse moves then 
the click event ends this where the nearest element is
clicked 

 window.addEventListener("click", event => {
    let dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = (event.pageX - 4) + "px";
    dot.style.top = (event.pageY - 4) + "px";
    document.body.appendChild(dot);
  });

https://eloquentjavascript.net/15_event.html
Event handlers make it possible to detect and react to events happening in our web page. The addEventListener method is used to register such a handler.

Each event has a type ("keydown", "focus", and so on) that identifies it. Most events are called on a specific DOM element and then propagate to that element’s ancestors, allowing handlers associated with those elements to handle them.

When an event handler is called, it is passed an event object with additional information about the event. This object also has methods that allow us to stop further propagation (stopPropagation) and prevent the browser’s default handling of the event (preventDefault).

Pressing a key fires "keydown" and "keyup" events. Pressing a mouse button fires "mousedown", "mouseup", and "click" events. Moving the mouse fires "mousemove" events. Touchscreen interaction will result in "touchstart", "touchmove", and "touchend" events.

Scrolling can be detected with the "scroll" event, and focus changes can be detected with the "focus" and "blur" events. When the document finishes loading, a "load" event fires on the window.



Refactor with  using classes see if bugs leaves 

if not 

To drag the element we can use position:fixed, it makes coordinates easier to manage. At the end we should switch it back to position:absolute to lay the element into the document.

When coordinates are at window top/bottom, we use window.scrollTo to scroll it.

More details in the code, in comments.





*/

  let currentDroppable = null;
  let droppableBelow = null;
  
  
  /*TODO: MAKE  a universal function that does this based off the variable 
  **BUG:On first mouse down The arrow must first move before mouse up happens 
  ** As long as this is done first time there is no bug after that. 
  */
  //var inputs = null;
  //inputs = document.getElementsByTagName("img");
  //console.log(inputs.name);
  
  
  
    /* 1 dollar chip 
       Other function that requires a double click and
       mouse down drag currently obsolete
    */
    
    function oneclick(e){
      //var ff=e.value();
      var f = e.getAttribute("value");
      console.log(f);
    
    
    
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
      ball.ondragstart = function() {
        return false;
      };
      }
    
  
  /*    
      These mousedown functions work with bugs in it
  *** Solutions
      See if refactoring the code works
        ** Try refactorting with it in classes
      See if turning it into a action handler or window.addEventHandler(); works
       window.addEventListener("click", () => {
      console.log("You knocked?");
    });
      Maybe try it in jquery or another language instead
      Make it a php project and see it works then
  */
  
  
  
  
  /* 1 dollar chip */
  
  
  chip1.onmousedown = function(event) { // (1) start the process
    
    // Can place in moveAt()
    let shiftX = event.clientX - chip1.getBoundingClientRect().left;
    let shiftY = event.clientY - chip1.getBoundingClientRect().top;
      // (2) prepare to moving: make absolute and on top by z-index
     
      chip1.style.position = 'absolute';
      chip1.style.zIndex = 1000;
      // move it out of any current parents directly into body
      // to make it positioned relative to the body
      document.body.append(chip1);
      //document.getElementsByClassName('red').style.backgroundColor = "purple";
      // ...and put that absolutely positioned ball under the pointer
      // centers the ball at (pageX, pageY) coordinates
      function moveAt(pageX, pageY) {
        chip1.style.left = pageX - chip1.offsetWidth / 2 + 'px';
        chip1.style.top = pageY - chip1.offsetHeight / 2 + 'px';
        // Shrink for handle usages
        chip1.style.height = '20px';
        chip1.style.width = '20px';
  /* TODO: if user presses esc while moving reset it */
  
      }
      moveAt(event.pageX, event.pageY);
      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
        chip1.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        chip1.hidden = false;
  
        if (!elemBelow) return;
  
         droppableBelow = elemBelow.closest('.droppable');
        
  
  
      }
      
    
      
     
    
      // (3) move the ball on mousemove
      document.addEventListener('mousemove', onMouseMove);
    
      // (4) drop the ball, remove unneeded handlers
      chip1.onmouseup = function() {
  // VAlue of the chip entering the dropable area
        var chp2=document.getElementById('chip1').getAttribute('value');
  //console.log(product+'hi');
        if (currentDroppable != droppableBelow) {
          if (currentDroppable) { // null when we were not over a droppable before this event
            leaveDroppable(currentDroppable,chp2);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable) { // null if we're not coming over a droppable now
            // (maybe just left the droppable)
            enterDroppable(currentDroppable);
          }
        }
        document.removeEventListener('mousemove', onMouseMove);
        chip1.onmouseup = null;
         //document.getElementsByClassName('.red').style.backgroundColor = "purple";
      };
    
    };
  
  
  
  /* 5 dollar chip */
  
  
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
  // VAlue of the chip entering the dropable area
          var chp2=document.getElementById('chip2').getAttribute('value');
  //console.log(product+'hi');
          if (currentDroppable != droppableBelow) {
            if (currentDroppable) { // null when we were not over a droppable before this event
              leaveDroppable(currentDroppable,chp2);
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
  
  
  
  /* 10 dollar chip */
  
  
  chip3.onmousedown = function(event) { // (1) start the process
    
      // Can place in moveAt()
      let shiftX = event.clientX - chip3.getBoundingClientRect().left;
      let shiftY = event.clientY - chip3.getBoundingClientRect().top;
        // (2) prepare to moving: make absolute and on top by z-index
       
        chip3.style.position = 'absolute';
        chip3.style.zIndex = 1000;
        // move it out of any current parents directly into body
        // to make it positioned relative to the body
        document.body.append(chip3);
        //document.getElementsByClassName('red').style.backgroundColor = "purple";
        // ...and put that absolutely positioned ball under the pointer
        // centers the ball at (pageX, pageY) coordinates
        function moveAt(pageX, pageY) {
          chip3.style.left = pageX - chip3.offsetWidth / 2 + 'px';
          chip3.style.top = pageY - chip3.offsetHeight / 2 + 'px';
          // Shrink for handle usages
          chip3.style.height = '20px';
          chip3.style.width = '20px';
    /* TODO: if user presses esc while moving reset it */
    
        }
        moveAt(event.pageX, event.pageY);
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
          chip3.hidden = true;
          let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
          chip3.hidden = false;
    
          if (!elemBelow) return;
    
           droppableBelow = elemBelow.closest('.droppable');
          
    
    
        }
        
      
        
       
      
        // (3) move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // (4) drop the ball, remove unneeded handlers
        chip3.onmouseup = function() {
  // VAlue of the chip entering the dropable area
          var chp2=document.getElementById('chip3').getAttribute('value');
  //console.log(product+'hi');
          if (currentDroppable != droppableBelow) {
            if (currentDroppable) { // null when we were not over a droppable before this event
              leaveDroppable(currentDroppable,chp2);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) { // null if we're not coming over a droppable now
              // (maybe just left the droppable)
              enterDroppable(currentDroppable);
            }
          }
          document.removeEventListener('mousemove', onMouseMove);
          chip3.onmouseup = null;
           //document.getElementsByClassName('.red').style.backgroundColor = "purple";
        };
      
      };
  
  
  
      /* 20 dollar chip */
  
  
  chip4.onmousedown = function(event) { // (1) start the process
    
    // Can place in moveAt()
    let shiftX = event.clientX - chip4.getBoundingClientRect().left;
    let shiftY = event.clientY - chip4.getBoundingClientRect().top;
      // (2) prepare to moving: make absolute and on top by z-index
     
      chip4.style.position = 'absolute';
      chip4.style.zIndex = 1000;
      // move it out of any current parents directly into body
      // to make it positioned relative to the body
      document.body.append(chip4);
      //document.getElementsByClassName('red').style.backgroundColor = "purple";
      // ...and put that absolutely positioned ball under the pointer
      // centers the ball at (pageX, pageY) coordinates
      function moveAt(pageX, pageY) {
        chip4.style.left = pageX - chip4.offsetWidth / 2 + 'px';
        chip4.style.top = pageY - chip4.offsetHeight / 2 + 'px';
        // Shrink for handle usages
        chip4.style.height = '20px';
        chip4.style.width = '20px';
  /* TODO: if user presses esc while moving reset it */
  
      }
      moveAt(event.pageX, event.pageY);
      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
        chip4.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        chip4.hidden = false;
  
        if (!elemBelow) return;
  
         droppableBelow = elemBelow.closest('.droppable');
        
  
  
      }
      
    
      
     
    
      // (3) move the ball on mousemove
      document.addEventListener('mousemove', onMouseMove);
    
      // (4) drop the ball, remove unneeded handlers
      chip4.onmouseup = function() {
  // VAlue of the chip entering the dropable area
        var chp2=document.getElementById('chip4').getAttribute('value');
  //console.log(product+'hi');
        if (currentDroppable != droppableBelow) {
          if (currentDroppable) { // null when we were not over a droppable before this event
            leaveDroppable(currentDroppable,chp2);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable) { // null if we're not coming over a droppable now
            // (maybe just left the droppable)
            enterDroppable(currentDroppable);
          }
        }
        document.removeEventListener('mousemove', onMouseMove);
        chip4.onmouseup = null;
         //document.getElementsByClassName('.red').style.backgroundColor = "purple";
      };
    
    };
  
  
  
      /* 50 dollar chip */
  
  
  chip5.onmousedown = function(event) { // (1) start the process
    
    // Can place in moveAt()
    let shiftX = event.clientX - chip5.getBoundingClientRect().left;
    let shiftY = event.clientY - chip5.getBoundingClientRect().top;
      // (2) prepare to moving: make absolute and on top by z-index
     
      chip5.style.position = 'absolute';
      chip5.style.zIndex = 1000;
      // move it out of any current parents directly into body
      // to make it positioned relative to the body
      document.body.append(chip5);
      //document.getElementsByClassName('red').style.backgroundColor = "purple";
      // ...and put that absolutely positioned ball under the pointer
      // centers the ball at (pageX, pageY) coordinates
      function moveAt(pageX, pageY) {
        chip5.style.left = pageX - chip5.offsetWidth / 2 + 'px';
        chip5.style.top = pageY - chip5.offsetHeight / 2 + 'px';
        // Shrink for handle usages
        chip5.style.height = '20px';
        chip5.style.width = '20px';
  /* TODO: if user presses esc while moving reset it */
  
      }
      moveAt(event.pageX, event.pageY);
      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
        chip5.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        chip5.hidden = false;
  
        if (!elemBelow) return;
  
         droppableBelow = elemBelow.closest('.droppable');
        
  
  
      }
      
    
      
     
    
      // (3) move the ball on mousemove
      document.addEventListener('mousemove', onMouseMove);
    
      // (4) drop the ball, remove unneeded handlers
      chip5.onmouseup = function() {
  // VAlue of the chip entering the dropable area
        var chp2=document.getElementById('chip5').getAttribute('value');
  //console.log(product+'hi');
        if (currentDroppable != droppableBelow) {
          if (currentDroppable) { // null when we were not over a droppable before this event
            leaveDroppable(currentDroppable,chp2);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable) { // null if we're not coming over a droppable now
            // (maybe just left the droppable)
            enterDroppable(currentDroppable);
          }
        }
        document.removeEventListener('mousemove', onMouseMove);
        chip5.onmouseup = null;
         //document.getElementsByClassName('.red').style.backgroundColor = "purple";
      };
    
    };
  
  
  
  
     /* 100 dollar chip */
  
  
     chip6.onmousedown = function(event) { // (1) start the process
    
      // Can place in moveAt()
      let shiftX = event.clientX - chip6.getBoundingClientRect().left;
      let shiftY = event.clientY - chip6.getBoundingClientRect().top;
        // (2) prepare to moving: make absolute and on top by z-index
       
        chip6.style.position = 'absolute';
        chip6.style.zIndex = 1000;
        // move it out of any current parents directly into body
        // to make it positioned relative to the body
        document.body.append(chip6);
        //document.getElementsByClassName('red').style.backgroundColor = "purple";
        // ...and put that absolutely positioned ball under the pointer
        // centers the ball at (pageX, pageY) coordinates
        function moveAt(pageX, pageY) {
          chip6.style.left = pageX - chip6.offsetWidth / 2 + 'px';
          chip6.style.top = pageY - chip6.offsetHeight / 2 + 'px';
          // Shrink for handle usages
          chip6.style.height = '20px';
          chip6.style.width = '20px';
    /* TODO: if user presses esc while moving reset it */
    
        }
        moveAt(event.pageX, event.pageY);
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
          chip6.hidden = true;
          let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
          chip6.hidden = false;
    
          if (!elemBelow) return;
    
           droppableBelow = elemBelow.closest('.droppable');
          
    
    
        }
        
      
        
       
      
        // (3) move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // (4) drop the ball, remove unneeded handlers
        chip6.onmouseup = function() {
    // VAlue of the chip entering the dropable area
          var chp2=document.getElementById('chip6').getAttribute('value');
    //console.log(product+'hi');
          if (currentDroppable != droppableBelow) {
            if (currentDroppable) { // null when we were not over a droppable before this event
              leaveDroppable(currentDroppable,chp2);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) { // null if we're not coming over a droppable now
              // (maybe just left the droppable)
              enterDroppable(currentDroppable);
            }
          }
          document.removeEventListener('mousemove', onMouseMove);
          chip6.onmouseup = null;
           //document.getElementsByClassName('.red').style.backgroundColor = "purple";
        };
      
      };
  
  
  
    
  
  
  
  // 1 dollar 
  chip1.ondragstart = function(){
    return false;
  }
  
  // 5 dollar
    chip2.ondragstart = function() {
      return false;
    };
    // 10 dollar
    chip3.ondragstart = function() {
      return false;
    };
    // 20 dollar
    chip4.ondragstart = function() {
      return false;
    };
    //50 dollar
    chip5.ondragstart = function() {
      return false;
    };
    // 100 dollar
    chip6.ondragstart = function() {
      return false;
    };
    
  
  
  
    function enterDroppable(elem) {
      elem.style.background = 'pink';
      
    }
  
    function leaveDroppable(elem,val) {
  
    // ToDO: minus the val from the player stack
     // alert('yowie'+val+'yodal');
      elem.style.background = 'purple';
      console.log(val);
      var f = document.getElementById('score');
  f.append(val);
  //document.getElementById('score').innerHTML += val;
  
    
    
    
    }
  
    
      //document.getElementById("div.parent > div#numCon > div.playerArea.player-row > div.child.child-3 > div.score").innerHTML = val;
    
