import './style.css';

import { fromEvent, interval, merge, EMPTY } from 'rxjs';

import {
  takeWhile,
  takeUntil,
  switchMap,
  scan,
  mapTo,
  startWith,
  repeat,
  switchMapTo
} from 'rxjs/operators';

const startBtn = document.querySelector('#startBtn');
const stopBtn = document.querySelector('#stopBtn');
const pauseBtn = document.querySelector('#pauseBtn');
const counterDisplayHeader = document.querySelector('h3');

const startClick$ = fromEvent(startBtn, 'click');
const stopClick$ = fromEvent(stopBtn, 'click');
const pauseBtn$ = fromEvent(pauseBtn, 'click');
// pauseBtn$.pipe(mapTo(false)
const startValue = 10;

merge(startClick$.pipe(mapTo(true)), pauseBtn$.pipe(mapTo(false)))
  .pipe(
    switchMap(shouldStart => (shouldStart ? interval(1000) : EMPTY)),
    mapTo(-1),
    scan((acc: number, curr: number) => acc + curr, startValue),
    takeWhile(val => val >= 0),
    startWith(startValue),
    takeUntil(stopClick$),
    repeat()
  )
  .subscribe(val => {
    counterDisplayHeader.innerHTML = val.toString();
  });
