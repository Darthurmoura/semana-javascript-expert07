const { GestureDescription, Finger, FingerCurl, FingerDirection } = window.fp;

const ScrollUpGesture = new GestureDescription('scroll-up'); // 🖐
const ScrollDownGesture = new GestureDescription('scroll-down'); // ✊️
const ResumeVideoGesture = new GestureDescription('resume-video'); // 👍🏽
const PauseVideoGesture = new GestureDescription('pause-video'); // 👎
const RockHornsGesture = new GestureDescription('rock-horns'); // 🤘

// Rock
// thumb: half curled
// accept no curl with a bit lower confidence
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
// all other fingers: curled
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  ScrollDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  ScrollDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

// Paper
// no finger should be curled
for(let finger of Finger.all) {
  ScrollUpGesture.addCurl(finger, FingerCurl.NoCurl, 0.9);
}

// Thumb-up
ResumeVideoGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
ResumeVideoGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
ResumeVideoGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9);
ResumeVideoGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.9);
// all other fingers: curled
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  ResumeVideoGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  ResumeVideoGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}
ResumeVideoGesture.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
ResumeVideoGesture.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
ResumeVideoGesture.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);
ResumeVideoGesture.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

// Thumb-down
PauseVideoGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
PauseVideoGesture.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0);
PauseVideoGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.9);
PauseVideoGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.9);
// all other fingers: curled
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  PauseVideoGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  PauseVideoGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

// Rock horns
for(let finger of [Finger.Index, Finger.Pinky]) {
  RockHornsGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
  RockHornsGesture.addDirection(finger, FingerDirection.DiagonalUpRight, 0.6);
  RockHornsGesture.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.6);
  RockHornsGesture.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
for(let finger of [Finger.Middle, Finger.Ring, Finger.Thumb]) {
  RockHornsGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  RockHornsGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}


const knownGestures = [
  ScrollUpGesture,
  ScrollDownGesture,
  ResumeVideoGesture,
  PauseVideoGesture,
  RockHornsGesture,
];

const gestureStrings = {
  'scroll-up': '🖐',
  'scroll-down': '✊️',
  'resume-video': '👍🏽',
  'pause-video': '👎',
  'rock-horns': '🤘',
}

export {
  knownGestures, gestureStrings
}