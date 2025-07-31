import dayjs from "dayjs";

import { scheduleNew } from "../../services/schedule-new.js";
import { schedulesDay } from "../schedules/load.js";

const form = document.querySelector("form");
const clientName = document.getElementById("client"); 
const selectedData = document.getElementById("date");

// Data atual para o input.
const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

// Carrega a data atual e Define a data mínima como sendo a data atual.
selectedData.value = inputToday;
selectedData.min = inputToday;

form.onsubmit = async (event) => {
    event.preventDefault();
    
    try {
        // Recuperando o nome do cliente. 
        const name = clientName.value.trim();
        
        if (!name) {
            return alert("Informe o nome do cliente!");
        }

        // Recupera o horário selecionado.
        const hourSelected = document.querySelector(".hour-selected");
        
        if (!hourSelected) {
            return alert("Selecione um horário disponível para o agendamento.")
        }
        
        const [hour] = hourSelected.innerText.split(":");
        
        const when = dayjs(selectedData.value).add(hour, "hour");

        const id = new Date().getTime().toString();

        // Faz o agendamentos.
        await scheduleNew({
            id,
            name,
            when,
        });

        // Recarrega os agendamentos.
        await schedulesDay();

        clientName.value = "";
    } catch (error) {
        alert("Não foi possível realizar o agendamento.");
        console.log(error);
    }
}