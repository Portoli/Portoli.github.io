import * as THREE from "../build/three.module.js";
import { OrbitControls } from "./jsm/controls/OrbitControls.js";
import Object_ButtonLineMesh from "./Module-DecoButton.js";

$(document).ready(function () {
  let screenScale,
    pxHeight = 950,
    pxWidth = 1940,
    screenPos;
  var mouseEvent;
  $(document).mousemove(function (event) {
    mouseEvent = event;
  });

  Resize();

  $(window).resize(function () {
    Resize();
  });

  function Resize() {
    let cssProperty = document.documentElement.style;
    screenScale = ($(window).height() / 950) * 0.999;

    console.log(screenScale);

    if (screenScale <= 0.5) screenScale = 0.5;
    if (screenScale >= 1.1) screenScale = 1.1;
    screenPos = ($(window).width() - pxWidth * screenScale) / 2;
    if (screenPos <= 0) screenPos = 0;

    $("#container").css("left", screenPos + "px");
    $("#container").css("height", pxHeight * screenScale + "px");
    $("#container").css("width", pxWidth * screenScale + "px");

    cssProperty.setProperty("--ButtonsT", 30 * screenScale + "px");
    cssProperty.setProperty("--MenuText", 25 * screenScale + "px");
    cssProperty.setProperty("--W1", 38 * screenScale + "px");
    cssProperty.setProperty("--W2", 76 * screenScale + "px");
    cssProperty.setProperty("--W3", 29 * screenScale + "px");
    cssProperty.setProperty("--AMT", 57 * screenScale + "px");
    cssProperty.setProperty("--AM12", 29 * screenScale + "px");
    cssProperty.setProperty("--SkillN", 29 * screenScale + "px");
    cssProperty.setProperty("--SkillB", 86 * screenScale + "px");
    cssProperty.setProperty("--SkillI", 19 * screenScale + "px");
  }

  setInterval(function () {
    if (typeof mouseEvent == "object") {
      let x = mouseEvent.pageX;
      let y = mouseEvent.pageY;
      let goToY = x / 1200;
      let goToX = y / 800;
      let xDifDis = group.rotation.x - goToX;
      let yDifDis = group.rotation.y - goToY;

      group.rotation.x -= xDifDis / 20;
      group.rotation.y -= yDifDis / 20;
    }
  }, 10);

  setTimeout(function () {
    $("#loadScreen").css("opacity", "0");
  }, 1000);

  cameraMoveTo(6, 0, 5);

  setTimeout(function () {
    $("#loadScreen").css("display", "none");

    $("#startScreen").css("opacity", "0.98");
  }, 5000);
  setTimeout(function () {
    $("#welcome1").css("opacity", "1");
    $("#welcome1").css("top", "45%");
  }, 6000);
  setTimeout(function () {
    $("#welcome2").css("opacity", "1");
    $("#welcome2").css("top", "52%");
  }, 6200);
  setTimeout(function () {
    $("#welcome3").css("opacity", "1");
    $("#welcome3").css("top", "51%");
  }, 6400);
  setTimeout(function () {
    $("#buttonConteiner").css("opacity", "1");
  }, 6600);

  //home next button
  let nextCircle = new Object_ButtonLineMesh(ctx, 200, 200, 140, 11, 6, 300, 2);
  setInterval(function () {
    ctx.clearRect(0, 0, innerHeight, innerWidth);
    nextCircle.animate();
  }, 10);

  $("#inButton").hover(
    function () {
      nextCircle.hiding = false;
    },
    function () {
      nextCircle.hiding = true;
      setTimeout(function () {
        nextCircle.lineColor = "rgb(250,250,250";
      }, 100);
    }
  );

  // back home button
  let nextCircle2 = new Object_ButtonLineMesh(
    ctx2,
    200,
    200,
    140,
    11,
    6,
    300,
    2
  );
  setInterval(function () {
    ctx2.clearRect(0, 0, innerHeight, innerWidth);
    nextCircle2.animate();
  }, 10);
  $("#inButton2").hover(
    function () {
      nextCircle2.hiding = false;
    },
    function () {
      nextCircle2.hiding = true;
      setTimeout(function () {
        nextCircle2.lineColor = "rgb(250,250,250";
      }, 100);
    }
  );

  // Work button
  let nextCircle3 = new Object_ButtonLineMesh(
    ctx3,
    200,
    200,
    140,
    11,
    6,
    300,
    2
  );
  setInterval(function () {
    ctx3.clearRect(0, 0, innerHeight, innerWidth);
    nextCircle3.animate();
  }, 10);
  $("#inButton3").hover(
    function () {
      nextCircle3.hiding = false;
    },
    function () {
      nextCircle3.hiding = true;
      setTimeout(function () {
        nextCircle3.lineColor = "rgb(250,250,250";
      }, 100);
    }
  );

  // home next button function
  $("#inButton").mousedown(function () {
    nextCircle.lineColor = "rgb(0,90,0";
    $("#slideDiv").css("transition", "left ease-in-out 2s");
    $("#slideDiv").css("left", "-100%");
    setTimeout(function () {
      camera.position.set(-5, -1.2, 6);
      $("#slideDiv").css("transition", "none");
      $("#Div2_hide").css("opacity", "0");

      //hide background in startScreen
      $("#Div1_hide").css("opacity", "1");
    }, 2000);
    setTimeout(function () {
      $("#aboutMeTheme").css("opacity", "1");
      $("#aboutMeTheme").css("top", "6%");
    }, 2700);
    setTimeout(function () {
      $("#aboutMe1").css("opacity", "1");
      $("#aboutMe1").css("top", "16%");
    }, 2900);
    setTimeout(function () {
      $("#aboutMe2").css("opacity", "1");
      $("#aboutMe2").css("top", "30%");
    }, 3100);
    setTimeout(function () {
      $("#skillsContainer").css("top", "49%");
      $("#skillsContainer").css("opacity", "1");
      setTimeout(function () {
        $("#Cpp .skillsRate").css("background-position", "40% 0%");
        $("#HTML .skillsRate").css("background-position", "40% 0%");
        $("#CSS .skillsRate").css("background-position", "40% 0%");
        $("#JS .skillsRate").css("background-position", "40% 0%");
        $("#PHP .skillsRate").css("background-position", "40% 0%");

        $("#MySQL .skillsRate").css("background-position", "40% 0%");
        $("#JQ .skillsRate").css("background-position", "40% 0%");
        $("#THREE .skillsRate").css("background-position", "59% 0%");
        $("#NODE .skillsRate").css("background-position", "100% 0%");
        $("#BOOTSTRAP .skillsRate").css("background-position", "59% 0%");
      }, 800);
    }, 3300);
    setTimeout(function () {
      $("#buttonConteiner2").css("opacity", "1");
      $("#buttonConteiner2").css("top", "81.5%");
      setTimeout(function () {
        $("#buttonConteiner3").css("opacity", "1");
        $("#buttonConteiner3").css("top", "81.5%");
      }, 400);
    }, 4000);
  });
  $("#inButton").mouseup(function () {
    setTimeout(function () {
      nextCircle.lineColor = "rgb(250,250,250";
    }, 100);
  });

  // back home button function
  $("#inButton2").mousedown(function () {
    nextCircle2.lineColor = "rgb(0,90,0";
    $("#slideDiv").css("transition", "left ease-in-out 2s");
    $("#slideDiv").css("left", "0");
    setTimeout(function () {
      camera.position.set(6, 0, 5);
      $("#slideDiv").css("transition", "none");
      $("#Div1_hide").css("opacity", "0");

      //hide background in secondDiv
      $("#Div2_hide").css("opacity", "1");
    }, 2000);
  });
  $("#inButton2").mouseup(function () {
    setTimeout(function () {
      nextCircle2.lineColor = "rgb(250,250,250";
    }, 100);
  });

  // work button function
  $("#inButton3").mousedown(function () {
    window.location.href = "/Work.html";
  });
});
var c = document.getElementById("buttonCanvas");
var ctx = c.getContext("2d");

var c2 = document.getElementById("buttonCanvas2");
var ctx2 = c2.getContext("2d");

var c3 = document.getElementById("buttonCanvas3");
var ctx3 = c3.getContext("2d");

function easeInOutQuart(x) {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}
let cameraChange = false;
let cameraIndex = 0;
let cameraStart, cameraDis;
let group, group2;
const particlesData = [],
  particlesData2 = [];
let camera, scene, renderer;
let positions, positions2;
let colors, colors2;
let particles, particles2;
let pointCloud, pointCloud2;
let particlePositions, particlePositions2;
let linesMesh, linesMesh2;

let sphereRadius = 4,
  sphereRadius2 = 100;

let axisPositions, axisPositions2;

const maxParticleCount = 2000,
  maxParticleCount2 = 300;
let particleCount = 500,
  particleCount2 = 120;

const effectController = {
  showDots: true,
  showLines: true,
  minDistance: 1.28,
  limitConnections: false,
  maxConnections: 20,
  particleCount: 500,
};
const effectController2 = {
  showDots: true,
  showLines: true,
  minDistance: 50,
  limitConnections: false,
  maxConnections: 20,
  particleCount: 120,
};

//set scene and camera
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1200
);
//camera pos at first div 6,0,5
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 10;
camera.lookAt(0, 0, 0);

function cameraMoveTo(xE, yE, zE) {
  cameraStart = [camera.position.x, camera.position.y, camera.position.z];
  cameraDis = [xE - cameraStart[0], yE - cameraStart[1], zE - cameraStart[2]];
  cameraChange = true;
}

function cameraMovement() {
  let ShiftProc = easeInOutQuart(cameraIndex / 300);
  camera.position.x = cameraStart[0] + cameraDis[0] * ShiftProc;
  camera.position.y = cameraStart[1] + cameraDis[1] * ShiftProc;
  camera.position.z = cameraStart[2] + cameraDis[2] * ShiftProc;
  if (cameraIndex == 300) {
    cameraChange = false;
    cameraIndex = 0;
  } else {
    cameraIndex++;
  }
}

group = new THREE.Group();
scene.add(group);
group2 = new THREE.Group();
scene.add(group2);

//rendering
renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.getElementById("bg"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);

///////////////////////////////
//////////Objects///////////////
///////////////////////////////

//Random position on sphere
function randomSpherePoint(radius) {
  var u = Math.random();
  var v = Math.random();
  var theta = 2 * Math.PI * u;
  var phi = Math.acos(2 * v - 1);
  var x = radius * Math.sin(phi) * Math.cos(theta);
  var y = radius * Math.sin(phi) * Math.sin(theta);
  var z = radius * Math.cos(phi);
  return [x, y, z];
}
const segments = maxParticleCount * maxParticleCount;

positions = new Float32Array(segments * 3);
colors = new Float32Array(segments * 3);

//Material and geometry of points
const pTexture = new THREE.TextureLoader().load("img/+/point.png");
const pMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.03,
  blending: THREE.AdditiveBlending,
  transparent: true,
  map: pTexture,
});

particles = new THREE.BufferGeometry();
particlePositions = new Float32Array(maxParticleCount * 3);
axisPositions = new Float32Array(maxParticleCount * 3);

//Sphere black
const geometryt = new THREE.SphereGeometry(sphereRadius * 0.99, 24, 24);
const materialBlack = new THREE.MeshPhongMaterial({
  color: 0x000000,
  shininess: 0,
});
const sphereBlack = new THREE.Mesh(geometryt, materialBlack);
scene.add(sphereBlack);

//random points
for (let i = 0; i < maxParticleCount; i++) {
  //Two random points on sphere, first position is position of Point
  const [x, y, z] = randomSpherePoint(sphereRadius);
  const [x2, y2, z2] = randomSpherePoint(sphereRadius);

  particlePositions[i * 3] = x;
  particlePositions[i * 3 + 1] = y;
  particlePositions[i * 3 + 2] = z;

  //normal vector to plane with poin [0,0,0] and 2 random points on sphere
  let Va = y * z2 - z * y2;
  let Vb = -(x * z2 - z * x2);
  let Vc = x * y2 - y * x2;

  axisPositions[i * 3] = Va;
  axisPositions[i * 3 + 1] = Vb;
  axisPositions[i * 3 + 2] = Vc;

  // add it to the geometry
  particlesData.push({
    velocity: new THREE.Vector3(
      -1 + Math.random() * 2,
      -1 + Math.random() * 2,
      -1 + Math.random() * 2
    ),
    numConnections: 0,
  });
}

particles.setDrawRange(0, particleCount);
particles.setAttribute(
  "position",
  new THREE.BufferAttribute(particlePositions, 3).setUsage(
    THREE.DynamicDrawUsage
  )
);

// create the particle system
pointCloud = new THREE.Points(particles, pMaterial);
group.add(pointCloud);

const geometry = new THREE.BufferGeometry();

geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage)
);
geometry.setAttribute(
  "color",
  new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage)
);

geometry.computeBoundingSphere();

geometry.setDrawRange(0, 0);

const material = new THREE.LineBasicMaterial({
  vertexColors: true,
  blending: THREE.AdditiveBlending,
  transparent: true,
});

linesMesh = new THREE.LineSegments(geometry, material);
group.add(linesMesh);
///////////////////////////////
//////////second Object///////////
///////////////////////////////

const segments2 = maxParticleCount2 * maxParticleCount2;

positions2 = new Float32Array(segments2 * 3);
colors2 = new Float32Array(segments2 * 3);

//Material and geometry of points
const pTexture2 = new THREE.TextureLoader().load("img/+/point.png");
const pMaterial2 = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.01,
  blending: THREE.AdditiveBlending,
  transparent: true,
  map: pTexture2,
});

particles2 = new THREE.BufferGeometry();
particlePositions2 = new Float32Array(maxParticleCount2 * 3);
axisPositions2 = new Float32Array(maxParticleCount2 * 3);

//random points
for (let i = 0; i < maxParticleCount2; i++) {
  //Two random points on sphere, first position is position of Point
  const [x, y, z] = randomSpherePoint(sphereRadius2);
  const [x2, y2, z2] = randomSpherePoint(sphereRadius2);

  particlePositions2[i * 3] = x;
  particlePositions2[i * 3 + 1] = y;
  particlePositions2[i * 3 + 2] = z;

  //normal vector to plane with poin [0,0,0] and 2 random points on sphere
  let Va = y * z2 - z * y2;
  let Vb = -(x * z2 - z * x2);
  let Vc = x * y2 - y * x2;

  axisPositions2[i * 3] = Va;
  axisPositions2[i * 3 + 1] = Vb;
  axisPositions2[i * 3 + 2] = Vc;

  // add it to the geometry
  particlesData2.push({
    numConnections2: 0,
  });
}

particles2.setDrawRange(0, particleCount2);
particles2.setAttribute(
  "position",
  new THREE.BufferAttribute(particlePositions2, 3).setUsage(
    THREE.DynamicDrawUsage
  )
);

// create the particle system
pointCloud2 = new THREE.Points(particles2, pMaterial2);
group2.add(pointCloud2);

const geometry2 = new THREE.BufferGeometry();

geometry2.setAttribute(
  "position",
  new THREE.BufferAttribute(positions2, 3).setUsage(THREE.DynamicDrawUsage)
);
geometry2.setAttribute(
  "color",
  new THREE.BufferAttribute(colors2, 3).setUsage(THREE.DynamicDrawUsage)
);

geometry2.computeBoundingSphere();

geometry2.setDrawRange(0, 0);

linesMesh2 = new THREE.LineSegments(geometry2, material);
group2.add(linesMesh2);

///////////////////////////////
//////////Orbits///////////////
///////////////////////////////
//Rotate Point group, set position +vector[0,0,0], set arrow1 direction to match axis
var vectorT = new THREE.Vector3(0, 0, 0);
let axisVector = new THREE.Vector3(0, 0, 0);
function pointOrbitPosG(index = 0, alpha1 = 0.01) {
  let x = particlePositions[index * 3];
  let y = particlePositions[index * 3 + 1];
  let z = particlePositions[index * 3 + 2];

  let ax = axisPositions[index * 3];
  let ay = axisPositions[index * 3 + 1];
  let az = axisPositions[index * 3 + 2];
  // read axis of orbit and position of point as vector
  vectorT.set(x, y, z);
  axisVector.set(ax, ay, az);

  //Apply turn around axis and set new position
  vectorT.applyAxisAngle(axisVector, alpha1);
  //group.children[index].position.set(vectorT.x, vectorT.y, vectorT.z);
  particlePositions[index * 3] = vectorT.x;
  particlePositions[index * 3 + 1] = vectorT.y;
  particlePositions[index * 3 + 2] = vectorT.z;

  pointCloud.geometry.attributes.position.needsUpdate = true;
}
///////////////////////////////
//////////Orbits2///////////////
///////////////////////////////
//Rotate Point group, set position +vector[0,0,0], set arrow1 direction to match axis
function pointOrbitPosG2(index = 0, alpha1 = 0.01) {
  let x = particlePositions2[index * 3];
  let y = particlePositions2[index * 3 + 1];
  let z = particlePositions2[index * 3 + 2];

  let ax = axisPositions2[index * 3];
  let ay = axisPositions2[index * 3 + 1];
  let az = axisPositions2[index * 3 + 2];
  // read axis of orbit and position of point as vector
  vectorT.set(x, y, z);
  axisVector.set(ax, ay, az);

  //Apply turn around axis and set new position
  vectorT.applyAxisAngle(axisVector, alpha1);
  //group.children[index].position.set(vectorT.x, vectorT.y, vectorT.z);
  particlePositions2[index * 3] = vectorT.x;
  particlePositions2[index * 3 + 1] = vectorT.y;
  particlePositions2[index * 3 + 2] = vectorT.z;

  pointCloud2.geometry.attributes.position.needsUpdate = true;
}

//////////////////////////////////////////
//////////Helpers, Controls///////////////
//////////////////////////////////////////
//add helper grid
// const gridHelper = new THREE.GridHelper(200, 50);
// gridHelper.layers.enableAll();
//scene.add(gridHelper);

//orbit controls
//const controls = new OrbitControls(camera, renderer.domElement);

///////////////////////////////
//////////Render///////////////
///////////////////////////////
function onWindowResize() {
  camera.aspect =
    document.getElementById("container").offsetWidth /
    document.getElementById("container").offsetHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(
    document.getElementById("container").offsetWidth,
    document.getElementById("container").offsetHeight
  );
}

const animate = function () {
  let vertexpos = 0;
  let colorpos = 0;
  let numConnected = 0;
  let numConnected2 = 0;
  for (let i = 0; i < particleCount; i++) particlesData[i].numConnections = 0;
  for (let i = 0; i < particleCount; i++) {
    // get the particle
    const particleData = particlesData[i];

    pointOrbitPosG(i, 0.0001);
    // Check collision
    for (let j = i + 1; j < particleCount; j++) {
      const particleDataB = particlesData[j];
      if (
        effectController.limitConnections &&
        particleDataB.numConnections >= effectController.maxConnections
      )
        continue;

      const dx = particlePositions[i * 3] - particlePositions[j * 3];
      const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
      const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < effectController.minDistance) {
        particleData.numConnections++;
        particleDataB.numConnections++;

        const alpha = 1.0 - dist / effectController.minDistance;

        positions[vertexpos++] = particlePositions[i * 3];
        positions[vertexpos++] = particlePositions[i * 3 + 1];
        positions[vertexpos++] = particlePositions[i * 3 + 2];

        positions[vertexpos++] = particlePositions[j * 3];
        positions[vertexpos++] = particlePositions[j * 3 + 1];
        positions[vertexpos++] = particlePositions[j * 3 + 2];

        colors[colorpos++] = alpha;
        colors[colorpos++] = alpha;
        colors[colorpos++] = alpha;

        colors[colorpos++] = alpha;
        colors[colorpos++] = alpha;
        colors[colorpos++] = alpha;

        numConnected++;
      }
    }
  }

  vertexpos = 0;
  colorpos = 0;

  for (let i = 0; i < particleCount2; i++)
    particlesData2[i].numConnections2 = 0;
  for (let i = 0; i < particleCount2; i++) {
    // get the particle
    const particleData2 = particlesData2[i];

    pointOrbitPosG2(i, 0.0000003);
    // Check collision
    for (let j = i + 1; j < particleCount2; j++) {
      const particleDataB = particlesData2[j];
      if (
        effectController2.limitConnections &&
        particleDataB.numConnections >= effectController2.maxConnections
      )
        continue;

      const dx = particlePositions2[i * 3] - particlePositions2[j * 3];
      const dy = particlePositions2[i * 3 + 1] - particlePositions2[j * 3 + 1];
      const dz = particlePositions2[i * 3 + 2] - particlePositions2[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < effectController2.minDistance) {
        particleData2.numConnections2++;
        particleDataB.numConnections2++;

        const alpha = 1.0 - dist / effectController2.minDistance;

        positions2[vertexpos++] = particlePositions2[i * 3];
        positions2[vertexpos++] = particlePositions2[i * 3 + 1];
        positions2[vertexpos++] = particlePositions2[i * 3 + 2];

        positions2[vertexpos++] = particlePositions2[j * 3];
        positions2[vertexpos++] = particlePositions2[j * 3 + 1];
        positions2[vertexpos++] = particlePositions2[j * 3 + 2];

        colors2[colorpos++] = alpha;
        colors2[colorpos++] = alpha;
        colors2[colorpos++] = alpha;

        colors2[colorpos++] = alpha;
        colors2[colorpos++] = alpha;
        colors2[colorpos++] = alpha;

        numConnected2++;
      }
    }
  }

  linesMesh.geometry.setDrawRange(0, numConnected * 2);
  linesMesh.geometry.attributes.position.needsUpdate = true;
  linesMesh.geometry.attributes.color.needsUpdate = true;

  pointCloud.geometry.attributes.position.needsUpdate = true;

  linesMesh2.geometry.setDrawRange(0, numConnected2 * 2);
  linesMesh2.geometry.attributes.position.needsUpdate = true;
  linesMesh2.geometry.attributes.color.needsUpdate = true;

  pointCloud2.geometry.attributes.position.needsUpdate = true;

  if (cameraChange) {
    cameraMovement();
  }
  //DivLineMesh1.objRender();

  requestAnimationFrame(animate);

  //controls.update();

  renderer.render(scene, camera);
  onWindowResize();
};

animate();
