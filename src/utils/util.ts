import dayjs from "dayjs";

export const currentDateToDt = (date:string) => dayjs(date).format("YYYY-MM-DD hh:mm");

