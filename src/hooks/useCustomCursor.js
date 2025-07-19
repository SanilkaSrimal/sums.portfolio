import { useEffect, useRef } from 'react';

export const useCustomCursor = () => {
  const cursorRef = useRef();
  const cursorDotRef = useRef();

  useEffect(() => {
    // Create cursor elements
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    
    cursor.className = 'custom-cursor';
    cursorDot.className = 'custom-cursor-dot';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    cursorRef.current = cursor;
    cursorDotRef.current = cursorDot;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const updateCursor = () => {
      // Smooth cursor movement
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;

      cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
      cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;

      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      
      if (target.matches('[data-cursor="pointer"]') || 
          target.closest('[data-cursor="pointer"]')) {
        cursor.classList.add('cursor-hover');
        cursorDot.classList.add('cursor-hover');
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      
      if (target.matches('[data-cursor="pointer"]') || 
          target.closest('[data-cursor="pointer"]')) {
        cursor.classList.remove('cursor-hover');
        cursorDot.classList.remove('cursor-hover');
      }
    };

    const handleMouseDown = () => {
      cursor.classList.add('cursor-click');
      cursorDot.classList.add('cursor-click');
    };

    const handleMouseUp = () => {
      cursor.classList.remove('cursor-click');
      cursorDot.classList.remove('cursor-click');
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Start animation
    updateCursor();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      if (cursor && cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
      if (cursorDot && cursorDot.parentNode) {
        cursorDot.parentNode.removeChild(cursorDot);
      }
    };
  }, []);

  return { cursorRef, cursorDotRef };
};
