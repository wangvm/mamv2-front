//时分秒帧转换
export default function timeFormat(time, frameRate) {
  time = time/1000;
  let timeStr = "";
  let stringFormat = (i) => {
    //if i<10 return '0'+i else return i
    return i < 10 ? `0${i}` : `${i}`;
  };
  let stringFrame = (i) => {
    let res = parseInt(i * frameRate);
    return res < 10 ? `0${res}` : `${res}`;
  };
  let minuteTime = 0;
  let secondTime = 0;
  let hourTime = 0;
  let setTime = parseInt(time);
  let setFrame = time - parseInt(time);
  if (setTime < 60) {
    timeStr = `00:00:${stringFormat(setTime)}:${stringFrame(setFrame)}`;
  } else if (setTime >= 60 && setTime < 3600) {
    minuteTime = parseInt(setTime / 60);
    secondTime = parseInt(setTime % 60);
    timeStr = `00:${stringFormat(minuteTime)}:${stringFormat(
      secondTime
    )}:${stringFrame(setFrame)}`;
  } else if (setTime >= 3600) {
    let _time = parseInt(setTime % 3600);
    hourTime = parseInt(setTime / 3600);
    minuteTime = parseInt(_time / 60);
    secondTime = parseInt(_time % 60);
    timeStr = `${stringFormat(hourTime)}:${stringFormat(
      minuteTime
    )}:${stringFormat(secondTime)}:${stringFrame(setFrame)}`;
  }
  return timeStr;
}