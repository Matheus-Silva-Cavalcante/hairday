import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
import { scheduleShow } from "../schedules/show.js";
import { hoursLoad } from "../form/hours-load.js";

// Seleciona o input de data.
const selectedDate = document.querySelector("#date");

export async function schedulesDay(){
    // Obtém a data do input.
    const date = selectedDate.value;

    // Buscar na API os agendamentos.
    const dailySchedules = await scheduleFetchByDay({date});    

    // Exibe os agendamentos
    scheduleShow({dailySchedules});
    
    hoursLoad({ date, dailySchedules });
}