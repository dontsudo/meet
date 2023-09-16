import React, { useState } from "react";
import classes from "./Calendar.module.css";

function TimeHeaderCell({ time, blockPerHour }) {
  return (
    <div className={classes.timeGroup}>
      <div className={classes.timeSlot}>
        {time}
        {time < 12 ? "am" : "pm"}
      </div>
      {blockPerHour > 1 &&
        // 가독성을 위해 map()을 사용하고 key를 적절히 설정
        Array.from({ length: blockPerHour - 1 }, (_, index) => (
          <div className={classes.timeSlot} key={index}></div>
        ))}
    </div>
  );
}

function DateColumn({
  date,
  timeRange,
  blockPerHour,
  onSelectSlot,
  selectedSlots,
}) {
  return (
    <div className={classes.column}>
      <div className={classes.header}>
        <span className={classes.dayOfWeek}>
          {date.toLocaleDateString("en-US", { weekday: "short" })}
        </span>
        <span className={classes.day}>{date.getDate()}</span>
      </div>
      <div className={classes.slots}>
        {Array.from({ length: timeRange }, (_, timeIndex) => (
          <div className={classes.slotGroup} key={timeIndex}>
            {Array.from({ length: blockPerHour }, (_, blockIndex) => (
              <div
                className={`${classes.slot} ${
                  selectedSlots[timeIndex * blockPerHour + blockIndex]
                    ? classes.selected
                    : ""
                }`}
                key={blockIndex}
                onClick={() =>
                  onSelectSlot(timeIndex * blockPerHour + blockIndex)
                }
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Calendar({ dates, startTime, endTime, blockPerHour = 2 }) {
  const timeRange = endTime - startTime;

  const [selectedSlots, setSelectedSlots] = useState(
    Array.from({ length: dates.length }, () =>
      Array.from({ length: timeRange }, () => false)
    )
  );

  const handleSelectSlot = (dateIndex) => (timeIndex) => {
    const newSelectedSlots = [...selectedSlots];

    newSelectedSlots[dateIndex][timeIndex] =
      !newSelectedSlots[dateIndex][timeIndex];

    setSelectedSlots(newSelectedSlots);
  };

  return (
    <div className={classes.calendar}>
      <div className={classes.timeColumn}>
        <div className={`${classes.timezone} ${classes.header}`}>KST</div>
        {Array.from({ length: timeRange }, (_, index) => (
          <TimeHeaderCell
            key={index}
            time={startTime + index}
            blockPerHour={blockPerHour}
          />
        ))}
      </div>
      <div className={classes.calendarGrid}>
        {dates.map((date, dateIndex) => (
          <DateColumn
            key={dateIndex}
            date={date}
            timeRange={timeRange}
            blockPerHour={blockPerHour}
            selectedSlots={selectedSlots[dateIndex]}
            onSelectSlot={handleSelectSlot(dateIndex)}
          />
        ))}
      </div>
    </div>
  );
}

export default Calendar;
