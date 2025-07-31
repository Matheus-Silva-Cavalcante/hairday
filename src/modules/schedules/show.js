import dayjs from "dayjs";

// Seleciona as sessões manhã, tarde e noite
const periodMorning = document.getElementById("period-morning");
const periodAfternoon = document.getElementById("period-afternoon");
const periodNight = document.getElementById("period-night");

export function scheduleShow({dailySchedules}){
    try {
        periodMorning.innerHTML = "";
        periodAfternoon.innerHTML = "";
        periodNight.innerHTML = "";

        dailySchedules.forEach((schedule) => {
            const item = document.createElement("li");
            const time = document.createElement("strong");
            const name = document.createElement("span");

            item.setAttribute("data-id", schedule.id);

            time.textContent = dayjs(schedule.when).format("HH:mm");
            name.textContent = schedule.name;

            const cancellIcon = document.createElement("img");
            cancellIcon.classList.add("cancel-icon");
            cancellIcon.setAttribute("src", "./src/assets/cancel.svg");
            cancellIcon.setAttribute("alt", "Cancelar");

            // Adiciona o tempo, nome e ícone no item.
            item.append(time, name, cancellIcon);

            // Obtém somente a hora
            const hour = dayjs(schedule.when).hour();

            // Renderiza o agendamento na sessão (manhã, tarde ou noite).
            if(hour <= 12){
                periodMorning.appendChild(item);
            } else if(hour > 12 && hour < 18){
                periodAfternoon.appendChild(item);
            } else {
                periodNight.appendChild(item);
            }
        });
    } catch (error) {
        console.log(error);
        alert("Não foi passível exibir os agendamentos");
    }
}