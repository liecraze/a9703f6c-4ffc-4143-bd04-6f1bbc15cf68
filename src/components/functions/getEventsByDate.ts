import { EventDetail } from "../interfaces/eventDetail";

export const getEventsByDate = (events: EventDetail[]) => {
    const eventsOrderedByDate: { date: Date | undefined; events: EventDetail[] }[] = [];
    const eventsWithoutDate: EventDetail[] = [];

    events.forEach((event) => {
        if (event.startTime) {
            const date = new Date(event.startTime);
            const dateGroup = eventsOrderedByDate.find((orderedEvent) =>
                orderedEvent.date ? orderedEvent.date.toDateString() === date.toDateString() : false
            );
            if (dateGroup) {
                dateGroup.events.push(event);
            } else {
                eventsOrderedByDate.push({
                    date: date,
                    events: [event],
                });
            }
        } else {
            eventsWithoutDate.push(event);
        }
    });

    eventsOrderedByDate.sort((a, b) => {
        if (!a.date || !b.date) {
            return 0;
        }
        return a.date.getTime() - b.date.getTime();
    });

    eventsOrderedByDate.push({ date: undefined, events: eventsWithoutDate });

    return eventsOrderedByDate;
};
