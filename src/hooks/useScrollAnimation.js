import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useScrollAnimation = (animationType = 'fadeInUp') => {
  const elementRef = useRef()

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    let animation = {}

    switch (animationType) {
      case 'fadeInUp':
        gsap.set(element, { opacity: 0, y: 50 })
        animation = {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        }
        break
      
      case 'fadeInLeft':
        gsap.set(element, { opacity: 0, x: -50 })
        animation = {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out'
        }
        break
      
      case 'fadeInRight':
        gsap.set(element, { opacity: 0, x: 50 })
        animation = {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out'
        }
        break
      
      case 'scaleIn':
        gsap.set(element, { opacity: 0, scale: 0.8 })
        animation = {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.7)'
        }
        break
      
      case 'slideInUp':
        gsap.set(element, { y: 100, opacity: 0 })
        animation = {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out'
        }
        break
      
      default:
        gsap.set(element, { opacity: 0, y: 30 })
        animation = {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }
    }

    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      animation: gsap.to(element, animation),
      toggleActions: 'play none none reverse'
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [animationType])

  return elementRef
}

export const useStaggerAnimation = (selector, animationType = 'fadeInUp') => {
  const containerRef = useRef()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll(selector)
    if (!elements.length) return

    let fromVars = {}
    let toVars = {}

    switch (animationType) {
      case 'fadeInUp':
        fromVars = { opacity: 0, y: 50 }
        toVars = { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        break
      
      case 'scaleIn':
        fromVars = { opacity: 0, scale: 0.8 }
        toVars = { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
        break
      
      default:
        fromVars = { opacity: 0, y: 30 }
        toVars = { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    }

    gsap.set(elements, fromVars)

    ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      animation: gsap.to(elements, {
        ...toVars,
        stagger: 0.2
      }),
      toggleActions: 'play none none reverse'
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [selector, animationType])

  return containerRef
}
