import React, { useEffect, useState } from "react";
import { interval, Subject, fromEvent } from "rxjs";
import { takeUntil, take, tap } from "rxjs/operators";
import {Button} from './Button';
import "./index.css";
 
export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState("stop");
 
  useEffect(() => {
    const unsubscribe$ = new Subject();
    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (status === "run") {
          setSeconds(val => val + 1000);
        }
      });
    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [status]);

  const start = () => {
    setStatus("run");
  }

  const stop = () => {
    setStatus("stop");
    setSeconds(0);
  }

  const reset = () => {
    setSeconds(0);
  }

  const wait = () => {
    let lastClicked = 0;
    fromEvent(document.getElementById('wait'), 'click').pipe(take(2), tap(v => {
      const timeNow = new Date().getTime();
      if (timeNow < (lastClicked + 300)) setStatus("wait");
      lastClicked = timeNow;
    })).subscribe();
  }
 
  return (
    <div>
      <h3 className="timer"> {new Date(seconds).toISOString().slice(11, 19)}</h3>
      <Button type="start" onClick={start}/>
      <Button type="stop" onClick={stop}/>
      <Button type="reset" onClick={reset}/>
      <Button type="wait" onClick={wait}/>
    </div>
  );
}
