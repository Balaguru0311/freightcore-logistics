"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Menu, Route, Ship, Truck, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

const services = [
  { number:"01", eyebrow:"Road freight", title:"Every mile, orchestrated.", copy:"Live dispatch intelligence matches the right vehicle to every load, while predictive ETAs keep teams and customers aligned.", metric:"98.6%", label:"on-time delivery", icon:Truck },
  { number:"02", eyebrow:"Ocean freight", title:"Ports without the blind spots.", copy:"One view connects sailing schedules, container milestones and documentation across every carrier and terminal.", metric:"42", label:"global trade lanes", icon:Ship },
  { number:"03", eyebrow:"Control tower", title:"Decisions move in real time.", copy:"Exception-first workflows surface the shipment that needs attention now—not another dashboard full of noise.", metric:"24/7", label:"network visibility", icon:Route },
];

function NetworkScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 5.6);
    const renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true, powerPreference:"high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    const group = new THREE.Group();
    scene.add(group);
    const globe = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.72, 3),
      new THREE.MeshBasicMaterial({ color:0x395169, wireframe:true, transparent:true, opacity:0.22 })
    );
    group.add(globe);
    const points:number[] = [];
    for (let i=0;i<120;i+=1) {
      const phi=Math.acos(-1+(2*i)/120);
      const theta=Math.sqrt(120*Math.PI)*phi;
      points.push(1.77*Math.cos(theta)*Math.sin(phi),1.77*Math.sin(theta)*Math.sin(phi),1.77*Math.cos(phi));
    }
    const pointGeometry=new THREE.BufferGeometry();
    pointGeometry.setAttribute("position",new THREE.Float32BufferAttribute(points,3));
    const pointMaterial=new THREE.PointsMaterial({ color:0xf47920,size:0.025,transparent:true,opacity:0.85 });
    group.add(new THREE.Points(pointGeometry,pointMaterial));
    const route=new THREE.Mesh(
      new THREE.TorusGeometry(1.9,0.012,10,180,Math.PI*1.45),
      new THREE.MeshBasicMaterial({ color:0xf47920,transparent:true,opacity:0.9 })
    );
    route.rotation.set(0.55,0.35,-0.25);
    group.add(route);
    let frame=0;
    const resize=()=>{
      const {clientWidth,clientHeight}=mount;
      renderer.setSize(clientWidth,clientHeight,false);
      camera.aspect=clientWidth/Math.max(clientHeight,1);
      camera.updateProjectionMatrix();
    };
    const render=()=>{
      if (!reduceMotion) { group.rotation.y+=0.0018; group.rotation.x=Math.sin(Date.now()*0.0002)*0.08; }
      renderer.render(scene,camera);
      frame=window.requestAnimationFrame(render);
    };
    resize(); render(); window.addEventListener("resize",resize);
    return ()=>{
      window.removeEventListener("resize",resize); window.cancelAnimationFrame(frame);
      globe.geometry.dispose(); (globe.material as THREE.Material).dispose();
      pointGeometry.dispose(); pointMaterial.dispose(); route.geometry.dispose(); (route.material as THREE.Material).dispose();
      renderer.dispose(); renderer.domElement.remove();
    };
  },[]);
  return <div className="network-canvas" ref={mountRef} aria-hidden="true" />;
}

export default function Home() {
  const pageRef=useRef<HTMLElement>(null);
  const [menuOpen,setMenuOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{
    const updateHeader=()=>setScrolled(window.scrollY>24);
    updateHeader();
    window.addEventListener("scroll",updateHeader,{passive:true});
    return ()=>window.removeEventListener("scroll",updateHeader);
  },[]);
  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx=gsap.context(()=>{
      gsap.from(".hero-reveal",{ y:48,opacity:0,duration:1,stagger:0.12,ease:"power3.out" });
      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((item)=>{
        const target=Number(item.dataset.counter); const state={value:0};
        gsap.to(state,{ value:target,duration:1.6,ease:"power2.out",scrollTrigger:{trigger:item,start:"top 88%",once:true},onUpdate:()=>{item.textContent=Math.round(state.value).toString();} });
      });
      const track=document.querySelector<HTMLElement>(".service-track");
      if(track){
        gsap.to(track,{ x:()=>-(track.scrollWidth-window.innerWidth),ease:"none",scrollTrigger:{trigger:".service-stage",start:"top top",end:()=>`+=${track.scrollWidth-window.innerWidth}`,scrub:0.8,pin:true,anticipatePin:1,invalidateOnRefresh:true} });
      }
      gsap.utils.toArray<HTMLElement>(".reveal-block").forEach((block)=>{
        gsap.from(block,{y:42,opacity:0,duration:0.9,ease:"power3.out",scrollTrigger:{trigger:block,start:"top 84%"}});
      });
    },pageRef);
    return ()=>ctx.revert();
  },[]);

  return <main ref={pageRef}>
    <header className={`site-header${scrolled?" is-scrolled":""}${menuOpen?" is-menu-open":""}`}>
      <a className="brand" href="#top" aria-label="FreightCore home"><span className="brand-mark"><span /></span><span>FreightCore</span></a>
      <nav className={menuOpen?"nav-links is-open":"nav-links"} aria-label="Main navigation">
        <a href="#network" onClick={()=>setMenuOpen(false)}>Network</a><a href="#services" onClick={()=>setMenuOpen(false)}>Services</a><a href="#about" onClick={()=>setMenuOpen(false)}>About</a>
        <a className="nav-cta" href="#contact" onClick={()=>setMenuOpen(false)}>Start a shipment <ArrowUpRight size={16}/></a>
      </nav>
      <button className="menu-button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={()=>setMenuOpen(o=>!o)}>{menuOpen?<X/>:<Menu/>}</button>
    </header>

    <section className="hero" id="top">
      <div className="hero-grid"/><NetworkScene/>
      <div className="hero-content">
        <p className="kicker hero-reveal"><span/> Freight intelligence, in motion</p>
        <h1 className="hero-reveal">The world moves.<br/><em>We move ahead.</em></h1>
        <p className="hero-copy hero-reveal">One connected operating system for freight teams that need every route, vehicle and decision working as one.</p>
        <div className="hero-actions hero-reveal"><a className="primary-button" href="#services">Explore our network <ArrowDown size={18}/></a><span className="availability"><i/> Live across 42 trade lanes</span></div>
      </div>
      <div className="hero-foot hero-reveal"><span>Road · Ocean · Control tower</span><span>12.9716° N — 80.2206° E</span></div>
    </section>

    <section className="proof" id="network">
      <div className="section-intro reveal-block"><p className="kicker dark"><span/> Network performance</p><h2>Precision at enterprise scale.</h2><p>FreightCore turns fragmented movements into one continuously optimized network.</p></div>
      <div className="stat-grid reveal-block">
        <article><strong><span data-counter="18">0</span>K+</strong><p>shipments coordinated each month</p></article>
        <article><strong><span data-counter="96">0</span>%</strong><p>digital milestone coverage</p></article>
        <article><strong><span data-counter="31">0</span>%</strong><p>faster exception resolution</p></article>
        <article><strong><span data-counter="14">0</span></strong><p>regional operations hubs</p></article>
      </div>
    </section>

    <section className="service-stage" id="services"><div className="service-track">
      <div className="service-lead service-panel"><p className="kicker"><span/> Connected services</p><h2>One network.<br/><em>Every mode.</em></h2><p>Scroll to move through the FreightCore operating system.</p></div>
      {services.map((s)=>{const Icon=s.icon;return <article className="service-panel service-card" key={s.number}>
        <div className="service-top"><span>{s.number}</span><Icon size={28} strokeWidth={1.5}/></div>
        <div><p className="service-eyebrow">{s.eyebrow}</p><h3>{s.title}</h3><p className="service-copy">{s.copy}</p></div>
        <div className="service-metric"><strong>{s.metric}</strong><span>{s.label}</span></div>
      </article>})}
    </div></section>

    <section className="control" id="about">
      <div className="control-visual reveal-block" aria-hidden="true"><div className="route-map">
        <span className="map-label label-a">Chennai</span><span className="map-dot dot-a"/><span className="map-label label-b">Dubai</span><span className="map-dot dot-b"/><span className="map-label label-c">Rotterdam</span><span className="map-dot dot-c"/>
        <svg viewBox="0 0 700 440" preserveAspectRatio="none"><path d="M92 340 C210 210, 250 360, 355 225 S545 110, 625 78"/></svg><div className="moving-load"><Truck size={18}/><span>FC 2084</span></div>
      </div></div>
      <div className="control-copy reveal-block"><p className="kicker dark"><span/> The control tower</p><h2>See the next move before it happens.</h2><p>Live milestones, risk signals and predictive arrival windows give your team time to act—not just react.</p>
        <ul><li><span>01</span> Predictive ETAs across carriers</li><li><span>02</span> Automated exception workflows</li><li><span>03</span> Carbon and cost visibility</li></ul>
      </div>
    </section>
    <section className="cta-section" id="contact"><p className="kicker"><span/> Your next route starts here</p><h2>Move freight.<br/><em>Move forward.</em></h2><a className="cta-link" href="mailto:hello@freightcore.example">Plan your shipment <ArrowUpRight/></a></section>
    <footer><a className="brand footer-brand" href="#top"><span className="brand-mark"><span/></span><span>FreightCore</span></a><p>Connected freight for a world in motion.</p><div><a href="#services">Services</a><a href="#network">Network</a><a href="#about">About</a></div><small>© 2026 FreightCore Logistics. Concept experience.</small></footer>
  </main>;
}
